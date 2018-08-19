var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfoList: '',
        peopleNum: '',
        dataList1: [
            { name: '我的活动', icon: '1', path: '../userActivity/userActivity' },
            { name: '我的任务', icon: '6', path: '../userTask/userTask' },
            //{ name: '积分排行', icon: '3', path: '../indexTop/indexTop' },
            //{ name: '我的消息', icon: '5', path: '../userNews/userNews' },
            { name: '兑换记录', icon: '5', path: '../userExchange/userExchange' },
        ],
        
    },
    //查询活动列表
    quertActiveQuery() {
        var _this = this;
        var app = getApp();
        var peopleId = app.globalData.userUuid
        httpRequest.requestGetData('/people/queryIntegral?peopleId=' + peopleId+'', '', function (data) {
            if (data.code == 200) {
                _this.setData({
                    peopleNum: data.data
                })
            }
        })
    },
    clickIndexView(event){
        var app = getApp();
        var title = event.currentTarget.dataset.itemTitle;
        if (app.globalData.isRealName == 2) {
            if (title == '积分码' || title == '我的活动' || title == '我的任务' || title == '积分排行' || title == '我的消息' || title == '兑换记录'){
                wx.showModal({
                    title: '温馨提示',
                    content: '您还未实名认证！请先实名认证。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../userName/userName'
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    },
                    fail: function (res) {
                        console.log("")
                    }
                })
            }
        }else {
            if (event.currentTarget.dataset.itemPath != '') {
                wx.navigateTo({
                    url: event.currentTarget.dataset.itemPath + '?title=' + event.currentTarget.dataset.itemTitle
                })
            }
        }
        
    },
    onLoad: function (options) {
        var app = getApp();
        this.setData({
            userInfoList: app.globalData.userInfoData
        })
    },
    onShow: function (options) {
        
        this.quertActiveQuery();
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