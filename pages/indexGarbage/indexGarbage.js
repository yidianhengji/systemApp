var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        windowHeight: "",
        description: [],
        content: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                    // canvasHidden:true
                });
            }
        })
        this.quertActiveQuery();
    },

    //查询
    quertActiveQuery() {
        var _this = this;
        var app = getApp();
        httpRequest.requestGetData('garbage/queryOne?sysType=' + app.globalData.userInfoData.sysType+'', '', function (data) {
            if (data.code == 200) {
                _this.setData({
                    description: data.data.description,
                    content: JSON.parse(data.data.content)
                })
            }
        })
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