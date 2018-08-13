// pages/indexUser/indexUser.js
const app = getApp();
console.log(app)

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfoList: app.globalData.userInfo,
        dataList1: [
            { name: '我的活动', icon: '1', path: '../userActivity/userActivity' },
            { name: '我的任务', icon: '6', path: '../userTask/userTask' },
            //{ name: '积分排行', icon: '3', path: '../indexTop/indexTop' },
            //{ name: '我的消息', icon: '5', path: '../userNews/userNews' },
            { name: '兑换记录', icon: '5', path: '../userExchange/userExchange' },
        ],
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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