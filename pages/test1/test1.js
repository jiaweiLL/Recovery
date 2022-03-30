const app = getApp()
Page({
  data: {
    uhide: 1
  },
  onLoad: function() {
 
  },
  //显示隐藏
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
  }
})
