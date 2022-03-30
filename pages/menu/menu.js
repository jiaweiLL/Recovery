// pages/menu/menu.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    greenImg:[
      { img: "/imgs/green1.png" },
      { img: "/imgs/lunbo/XC1.png" },
      { img: "/imgs/lunbo/XC2.png" },
      { img: "/imgs/lunbo/XC3.png" },
    ],
    callclass:[
      {
        img:'/imgs/CustomerType/zhixiang.png',
        descript:"纸箱",
        detail:"纸板、纸箱、书本...",
        price:'1.00元/kg(量大可谈)'
      },
      {
        img:'/imgs/CustomerType/kuang.png',
        descript:"塑料筐",
        detail:"水果筐、蔬菜筐...",
        price:'0.60元/kg'
      }
    ],
    callable:[
      {
        img: "/imgs/CustomerType/xiaoqu.png",
        descript:"住宅小区"
      },
      {
        img: "/imgs/CustomerType/school.png",
        descript:"学校"
      },
      {
        img: "/imgs/CustomerType/china.png",
        descript: "企事业单位"
      },
      {
        img: "/imgs/CustomerType/chang.png",
        descript: "制造工厂"
      },
      {
        img: "/imgs/CustomerType/car.png",
        descript:"物流仓储"
      },
      
      {
        img: "/imgs/CustomerType/doc.png",
        descript: "医院"
      },
      {
        img: "/imgs/CustomerType/lou.png",
        descript: "写字楼"
      },
      {
        img: "/imgs/CustomerType/market.png",
        descript: "商户超市"
      },
      // {
      //   img: "/imgs/CustomerType/shop.png",
      //   descript: "电商仓储"
      // },
      // {
      //   img: "/imgs/CustomerType/superm.png",
      //   descript: "商场"
      // },
    ],
    lajilist:[
      {
        img: "/imgs/lajiclass/kehuishou.png",
        descript:"可回收垃圾"
      },
      
      {
        img: "/imgs/lajiclass/youhai.png",
        descript: "有害垃圾"
      },
      {
        img: "/imgs/lajiclass/ganlaji.png",
        descript: "干垃圾"
      },
      {
        img: "/imgs/lajiclass/shilaji.png",
        descript: "湿垃圾"
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    that.setData({
      datas: app.globalData.datas
    })
  },
  ToDetailsTap: function () {
    wx.navigateTo({
        url: '/pages/confirmAddress/confirmAddress',
    })
  },
  appointMent:res=>{
    if (app.globalData.userMessage.data.length == 0){
      wx.navigateTo({
        url: "../addAddress/addAddress"
      })
    }
    else{
      wx.navigateTo({
        url: "../confirmAddress/confirmAddress"
      })
    }
  }
})