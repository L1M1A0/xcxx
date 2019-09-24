// pages/request/request.js

const parmUtil = require('../../utils/parmUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var url = 'http://t.weather.sojson.com/api/weather/city/101030100';//parmUtil.serverPath + '/mobileLogin/mobileLogin';
    // var paramData = {

    // }
    // parmUtil.reqServer(url, paramData, "GET", that.getback, parmUtil.maskerror);
  },

  getback: function (resultData) {
    console.log(resultData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})