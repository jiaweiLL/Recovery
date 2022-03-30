Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideFlag: true,//true-隐藏  false-显示
    animationData: {},//
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    navbarActiveIndex: 0,
    navbarTitle: [
      "FAQ",
      "关于估价",
      "关于运送",
      "关于交易"
    ],
    uhide: 1
  },
  onLoad(e){
    var that=this
    that.setData({
      navbarActiveIndex: e.p
    })
  },
  tigger: function(e) {
    var that = this;
    var toggleBtnVal = that.data.uhide
    var num = e.currentTarget.dataset.num
    if (toggleBtnVal == num) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: num
      })
    }
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    console.log(navbarTapIndex)
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },

  /**
   *
   */
  onBindAnimationFinish: function ({detail}) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },
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