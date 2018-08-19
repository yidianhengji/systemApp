var httpRequest = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        windowHeight: '',
        queryTasks: []
    },

    //跳转详情
    clickViewPage(event) {
        wx.navigateTo({
            url: '../indexActivityView/indexActivityView?uuid=' + event.currentTarget.dataset.itemUuid + ''
        })
    },
    
    //积分派发
    clickViewPageExchange(event){
        wx.navigateTo({
            url: '../indexActivityIntegral/indexActivityIntegral?uuid=' + event.currentTarget.dataset.itemUuid + '&num=' + event.currentTarget.dataset.itemNum + '&title=' + event.currentTarget.dataset.itemTitle+''
        })
    },

    //查询活动列表
    quertTaskQuery(flag) {
        var params = {
            pageSize: 100,
            pageNum: 1,
            flag: flag
        }
        var _this = this;
        httpRequest.request('app/queryAct', params, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryTasks: data.data.list
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight - 44,
                    // canvasHidden:true
                });
            }
        })
        that.quertTaskQuery(3);
    },

    swichNav: function (e) {
        var that = this;
        if (e.target.dataset.current == 0) {
            that.quertTaskQuery(3);
        } else if (e.target.dataset.current == 1) {
            that.quertTaskQuery(4);
        } else if (e.target.dataset.current == 2) {
            that.quertTaskQuery(5);
        }

        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current,
            })
        }
    },
    /**
     * 导航页面显示2）
     */
    swiperChange: function (e) {
        this.setData({
            currentTab: e.detail.current,
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