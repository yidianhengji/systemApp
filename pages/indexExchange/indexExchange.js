var httpRequest = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        queryAct: []
    },
    //查询活动列表
    quertActiveQuery() {
        var app = getApp();
        var params = {
            communityId: app.globalData.communityId
        }
        var _this = this;
        httpRequest.request('shop/queryList', params, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryAct: data.data.list
                })
            }
        })
    },
    //兑换弹窗
    exchangeBtn(event){
        console.log(event.currentTarget.dataset.itemUuid)
        wx.showModal({
            title: '温馨提示',
            content: '是否确认兑换该奖品？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.quertActiveQuery();
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