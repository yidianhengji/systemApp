var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        queryTasks: []
    },

    //跳转详情
    clickViewPage(event) {
        wx.navigateTo({
            url: '../indexTaskView/indexTaskView?uuid=' + event.currentTarget.dataset.itemUuid + ''
        })
    },
    //查询我的任务列表
    quertTaskQuery() {
        var params = {
            pageSize: 100,
            pageNum: 1,
        }
        var _this = this;
        httpRequest.request('app/queryMyAct', params, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryTasks: data.data.list
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.quertTaskQuery();
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