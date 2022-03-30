// var util = require('/utils/util.js');
// var api = require('/utils/util.js');
// var user = require('/services/user.js');

// TODO 订单显示数量在图标上

const app = getApp()

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        status: {},
        optionList:['所有','选项1','选项2'],
        value:'所有',
        hideFlag: true,//true-隐藏  false-显示
        animationData: {},//
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        animationData: '',
        showModalStatus: false
    },

    onLoad: function(options) {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
  //     var that = this;
  // // 查看是否授权
  //     wx.getSetting({
  //     success (res){
  //       console.log(res.authSetting['scope.userInfo'])
  //       if (!res.authSetting['scope.userInfo']) {
  //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //       wx.getUserInfo({
  //         success: function(res) {
  //         console.log(res.userInfo)
  //         that.setData({
  //           result:'ok',// 结果
  //           nickName:res.userInfo.nickName,// 微信昵称
  //           avatarUrl:res.userInfo.avatarUrl,// 微信头像
  //         })
  //         }
  //       })
  //       }else{
  //       // 未授权，结果返回null
  //       that.setData({
  //         result:'null',// 结果
  //       })
  //       }
  //     }
  //     })
    },
    onShow: function() {
        // let userInfo = wx.getStorageSync('userInfo');
        // console.log(userInfo)
        // if(userInfo == ''){
        //     this.setData({
        //         hasUserInfo: 0,
        //     });
        // }
        // else{
        //     this.setData({
        //         hasUserInfo: 1,
        //     });
        // }
        // this.setData({
        //     userInfo: userInfo,
        // });
        // this.getOrderInfo();
        // wx.removeStorageSync('categoryId');
    },
    // 用户点击显示弹窗 
    // 分享
    onShareAppMessage() {
      return {
        title: '邀请您使用物回收小程序', // 分享出的卡片标题
        path: 'pages/menu/menu', // 他人通过卡片进入小程序的路径，可以在后面拼接URL的形式带参数
        // imageUrl: '/static/mainImg/logosareas.jpg', // 分享出去的图片，默认为当前页面的截图。图片路径可以是本地文件路径或者网络图片路径。支持PNG及JPG。
      };
    },
    onShareTimeline(res){
      console.log(res)
      return {
        title: '测试小程序分享至朋友圈',
        path: 'pages/menu/menu',
        // imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
      }
    },
    //显示对话框
 showModalshare: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
   duration: 200,
   timingFunction: "linear",
   delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
   animationData: animation.export(),
   showModalStatus: true
  })
  setTimeout(function () {
   animation.translateY(0).step()
   this.setData({
   animationData: animation.export()
   })
  }.bind(this), 200)
  },
  //隐藏对话框
  hideModalshare: function () {
  // 隐藏遮罩层
  var animation = wx.createAnimation({
   duration: 200,
   timingFunction: "linear",
   delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
   animationData: animation.export(),
  })
  setTimeout(function () {
   animation.translateY(0).step()
   this.setData({
   animationData: animation.export(),
   showModalStatus: false
   })
  }.bind(this), 200)
  },

    // 登录
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    toFAQ(){
      wx.navigateTo({
        url: '/pages/question/question?'+'p=0',
      })
    },
    toPrice(){
      wx.navigateTo({
        url: '/pages/question/question?'+'p=1',
      })
    },
    toGet(){
      wx.navigateTo({
        url: '/pages/question/question?'+'p=2',
      })
    },
    toMoney(){
      wx.navigateTo({
        url: '/pages/question/question?'+'p=3',
      })
    },
    toAbout(){
      wx.navigateTo({
        url: '/pages/about/about',
      })
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading()
        this.getOrderInfo();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
    },
    getOrderInfo: function(e) {
        let that = this;
        util.request(api.OrderCountInfo).then(function(res) {
            if (res.errno === 0) {
                let status = res.data;
                that.setData({
                    status: status
                });
            }
        });
    },
    // 查看全部问题
    toAllQuestion:function(){
      wx.navigateTo({
        url: '/pages/question/question',
      })
    },
    // 查看全部问题
    // 弹出框
    //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },
 
  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },
 
  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块
    
  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  
  // 点击选项
  getOption:function(e){
    var that = this;
    that.setData({
      value:e.currentTarget.dataset.value,
      hideFlag: true
    })
  },
  // 弹出框

  // 电话
  freeTell: function(){
    wx.makePhoneCall({
      phoneNumber: '18817736087',
    })
  },
  // }电话
  
})