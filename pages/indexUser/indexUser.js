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
            { name: '我的活动', icon: '1', path: '../MyVolunteer/MyVolunteer' },
            { name: '我的任务', icon: '6', path: '../MyActivity/MyActivity' },
            { name: '积分排行', icon: '3', path: '' },
            { name: '我的消息', icon: '5', path: '../MyNews/MyNews' },
            { name: '兑换记录', icon: '5', path: '../MyNews/MyNews' },
        ],
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