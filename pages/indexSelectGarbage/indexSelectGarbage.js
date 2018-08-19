var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        description: [],
        content: [],
        userSelectUuid: ''
    },
    //查询
    quertActiveQuery() {
        var _this = this;
        var app = getApp();
        httpRequest.requestGetData('garbage/queryOne?sysType=' + app.globalData.userInfoData.sysType + '', '', function (data) {
            if (data.code == 200) {
                _this.setData({
                    description: data.data.description,
                    content: JSON.parse(data.data.content)
                })
            }
        })
    },
    //兑换弹窗
    exchangeBtn(event) {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否确认派发该重量？',
            success: function (res) {
                if (res.confirm) {
                    var datas = {
                        type: 3, //类型
                        peopleId: that.data.userSelectUuid, //用户uuid
                        integral: event.currentTarget.dataset.itemIntegral, //积分
                    }
                    httpRequest.request('integral/distribute', datas, function (data) {
                        if (data.code == 200) {
                            wx.showToast({
                                title: '派发成功！',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail: function (res) {
                console.log(res)
            }
        })
    },
    onLoad: function (options) {
        this.quertActiveQuery();
        this.setData({
            userSelectUuid: options.userSelectUuid
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