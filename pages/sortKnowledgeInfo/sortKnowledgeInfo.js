const app = getApp();

Page({
  data: {
    index: 0,
    datas: []
  },

  onLoad: function (o) {
    const that = this;
    console.log(o);
    that.setData({
      datas: app.globalData.datas,
      index: o.index
    })
    wx.setNavigationBarTitle({
      title: that.data.datas[o.index].name
    })
  },
})
