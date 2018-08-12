var httpRequest = require('../../utils/request.js');

Page({
    data: {
        queryOne: [],
        uuid: '',
        queryTaskPeople: []
    },
    //弹窗
    clickAddBtn() {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否报名参加该任务？',
            success: function (res) {
                if (res.confirm) {
                    that.joinTaskGet(that.data.uuid);
                    that.queryOneGet(that.data.uuid);
                    that.queryTaskPeoplePost(that.data.uuid);
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //查询单个任务
    queryOneGet(uuid) {
        var _this = this;
        httpRequest.request('app/queryOneTasks', { uuid: uuid}, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryOne: data.data
                })
            }
        })
    },
    //查询报名居民
    queryTaskPeoplePost(uuid) {
        var _this = this;
        httpRequest.request('app/queryTaskPeople', { taskId: uuid }, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryTaskPeople: data.data.list
                })
            }
        })
    },
    //立即报名
    joinTaskGet(uuid) {
        var _this = this;
        httpRequest.requestGetData('app/joinTask?taskId=' + uuid + '', '', function (data) {
            if (data.code == 200) {
                wx.showToast({
                    title: '报名成功！',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
            }
        })
    },
    onLoad: function (options) {
        this.setData({
            uuid: options.uuid
        })
        this.queryOneGet(options.uuid);
        this.queryTaskPeoplePost(options.uuid);
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