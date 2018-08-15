var httpRequest = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: '',
        uuid: '',
        queryTaskPeople: []
    },
    //查询报名居民
    queryTaskPeoplePost(uuid) {
        var _this = this;
        httpRequest.request('app/queryActPeople', { activityId: uuid }, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryTaskPeople: data.data.list
                })
            }
        })
    },
    //兑换弹窗
    exchangeBtn(event) {
        wx.showModal({
            title: '温馨提示',
            content: '是否确认派发该活动积分？',
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
        this.setData({
            num: options.num,
            uuid: options.uuid
        });
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