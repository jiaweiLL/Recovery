var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
//获取应用实例
var app = getApp()

Page({
  //初始化数据
  data: {
    index:0,
    doorTime:null,
    yuyueAdress:null,
    adressInfo:null,
    cellYou:null,
    phone:null,
    remark:null,
    startTime:new Date(),
    region: ['曹县东城', '曹县西关', '曹县南关', '曹县北关', '闫殿楼','朱洪庙','夏庄'],
    customItem: '全部',
    // 短信
    hidden: true,
    btnValue:'',
    btnDisabled:false,
    name: '',
    code: '',
    second: 60
  },
 //提交信息复制的功能
 submit(){
  let that = this;
  let str = '你好！我目前有：';
  wx.setClipboardData({
      data: str,
      success: function (res) {
          wx.getClipboardData({
              success: function (res) {
                  console.log(res.data) // data  
              }
          })
      }
  })
},

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '曹县回收',
      desc: '预约上门回收!',
      path: '/pages/index/index'
    }
  },

  //预约地点
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
  },

  //提示框
  showModal: function (msg) {
    wx.showModal({
      title: '提示',
      // content:msg,
      showCancel: false,
    });
  },

  //回收清单轮播提示
  bindtapShow:function(e){
    this.showModal("5KG以上上门取件。1斤旧衣兑换1积分。1斤废纸及其他物资兑换0.3积分。仅支持贵阳地区（两城区上班日晚上及周末）");
  },
  //验证码输入
  // bindCodeInput(e) {
  //   this.setData({
  //     code: e.detail.value
  //   })
  // },
  bindadressInfoInput(e){
    this.setData({
      adressInfo: e.detail.value
    })
  },
  bindcellYouInput(e){
    this.setData({
      cellYou: e.detail.value
    })
  },
  showToast(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  bindPhoneInput(e) {
    //console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    console.log(this.data.code)
  },
  //提交预约
  submitForm:function(e){
    wx.showLoading({
      title: '正在提交预约...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    var that = this;
    //上门时间
    var doorTime = e.detail.value.doorTime;
    if (doorTime=='') {
      wx.showToast({
        title: '上门时间不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      if (!e.detail.value.remark=='') doorTime += ",备注:" + e.detail.value.remark;
    }

    //预约地点
    var yuyueAdress = e.detail.value.yuyueAdress;
    if (yuyueAdress=='') {
      wx.showToast({
        title: '预约地点不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //详细地址
    var adressInfo = e.detail.value.adressInfo;
    if (adressInfo=='') {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //对您称呼
    var cellYou = e.detail.value.cellYou;
    if (cellYou=='') {
      wx.showToast({
        title: '称呼不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //对您称呼
    var phone = e.detail.value.phone;
    if (phone=='') { 
      wx.showToast({
        title: '电话不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(phone.length!=11){
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (e.detail.value.code=='') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this;
    //检验验证码
   var result = zhenzisms.client.validateCode(this.data.phone, e.detail.value.code);
   if (result == 'ok'){
    //  发送订单信息
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '110969', 'cca7fe96-29bc-4227-8bba-6c38890e644c');
    var params = {};
    params.number = that.data.phone;
    // var totime=that.data.doorTime;
    // var address=that.data.region[that.data.index];
    // var detailAddress=that.data.adressInfo;
    // var username=that.data.name;
    // var phone=that.data.phone;
    params.templateId = '8279';
    var templateParams = ['2月8日','曹县','中央华府1801','曹先生','188**177'];
    params.templateParams = templateParams;
    zhenzisms.client.send(function (res) {
      console.log(res)
      that.showToast('验证正确,提交成功');
    }, params);    
     
   } else if (result == 'empty'){
     that.showToast('验证错误, 未生成验证码!');
   } else if (result == 'number_error') {
     that.showToast('验证错误，手机号不一致!');
   } else if (result == 'code_error') {
     that.showToast('验证错误，验证码不一致!');
   } else if (result == 'code_expired') {
     that.showToast('验证错误，验证码已过期!');
   }
  },
  // 获取验证码
  getCode(e) {
    wx.showLoading({
      title: '正在发送验证码...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    var that = this;
    //上门时间
    var doorTime = that.data.doorTime;
    if (doorTime==null) {
      wx.showToast({
        title: '上门时间不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      if (!that.data.remark=='') doorTime += ",备注:" + e.detail.value.remark;
    }
    //预约地点
    // var yuyueAdress =  that.data.yuyueAdress;
    // console.log(yuyueAdress)
    // if (yuyueAdress==null) {
    //   wx.showToast({
    //     title: '预约地点不能为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    //详细地址
    var adressInfo = that.data.adressInfo;
    console.log(adressInfo)
    if (adressInfo==null) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //对您称呼
    var cellYou =that.data.cellYou;
    if (cellYou==null) {
      wx.showToast({
        title: '称呼不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(that.data.phone==null){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    if(that.data.phone.length!=11){
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
      zhenzisms.client.init('https://sms_developer.zhenzikj.com', '110969', 'cca7fe96-29bc-4227-8bba-6c38890e644c');
      var params = {};
      params.number = that.data.phone;
      params.templateId = '8277';
      var code = zhenzisms.client.createCode(4, 300, params.number);
      var templateParams = [code, '5'];
      // var code = zhenzisms.client.createCode(4, 60, that.data.phone);
      // var templateParams = ['1233','10130020'];
      params.templateParams = templateParams;
      // params.messageId = '18817736087';
      // params.clientIp = '221.221.221.111';
      zhenzisms.client.send(function (res) {
        console.log(res)
        if(res.data.data=='发送成功'){
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 2000
          })
          console.log('成功')
        }else{
          wx.showToast({
            title: '发送失败，重新发送',
            icon: 'none',
            duration: 2000
          })
          console.log('失败')
        }
        
      }, params);       
  },
  //清空表单
  closeForm:function(that){
    that.setData({
      doorTime: null,
      yuyueAdress: null,
      adressInfo: null,
      cellYou: null,
      phone: null,
      remark:null,
    });
  },

  //上门时间
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      doorTime: e.detail.value,
    })
  },

  //发起登录请求
  loginRequest: function (that) {
    //地址
    var url = app.config.basePath_sys + "api/plug/save";
    //请求头
    var header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    console.log(that.data.userInfo);
    //参数
    var time = new Date().getTime();
    var token = app.md5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: "sys_userinfo",
        scriptName: "com.dahuo.plugin.impl.WxLgPlugin",
        nameSpaceMap: {
          rows: [{
            openid: wx.getStorageSync('openid'),         //用户id
            realname: that.data.userInfo.nickName,
            avatarUrl: that.data.userInfo.avatarUrl,
            appId: app.globalData.loginAppid,
          }]
        }
      })
    };
    //发送请求
  },
  
  //页面加载
  onLoad: function (options) {
    var that = this;
    //自动登录第一步，获取openid
    that.getOpenId(that);
  },

  //获取openid
  getOpenId: function (that) {
    //调用登录接口
    wx.login({
      success: function (logRes) {
        //获取openid
        var url = app.config.login_sys + 'sns/jscode2session';
        var data = {
          appid: app.globalData.appid,
          secret: app.globalData.secret,
          js_code: logRes.code,
          grant_type: 'authorization_code'
        }
        //发送请求
        app.request.reqGet(url, data,
          function (res) {
            app.globalData.openid = res.data.openid;
            wx.setStorageSync('openid', res.data.openid);
            that.setData({ openid: res.data.openid });
            //自动登录第二步，获取微信用户
            that.getUserInfo(that);
          });
      }, fail: function (res) {
        console.log(res);
      }
    });
  },

  //自定义获取用户数据
  getUserInfo: function (that) {
    //调用登录接口
    wx.login({
      success: function () {
        //获取用户
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo
            wx.setStorageSync('userinfo', res.userInfo);
            that.setData({ userInfo: res.userInfo });
            ////自动登录第三步，发送登录服务器请求
            that.loginRequest(that);
          }
        });
      }
    })
  },

  //获取我的贡献资源,个人
  getContribtion: function (that) {
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'myContribution',           //我的贡献表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            personalId: wx.getStorageSync("personalId"),  //用户id
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      //验证是否为空如果为空就生成一条贡献
      if (app.checkInput(res.data.rows)) {
        that.setContribtion(that);
      } else {
        var rows = res.data.rows[0];
        rows.lemonIntegral = parseFloat(rows.lemonIntegral).toFixed(1);
        that.setData({
          myContribution: rows,
        });
      }
    });
  },

  //设置我的贡献资源
  setContribtion: function (that) {
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    console.log(that.data.userInfo);
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'myContribution',           //我的贡献表
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            avatarUrl: that.data.userInfo.avatarUrl,//头像
            userName: that.data.userInfo.nickName,//名称
            personalId: wx.getStorageSync("personalId"),  //用户id
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log(res);
      that.setData({
        myContribution: res.data.rows[0],
      });
    });
  },
})
