var httpRequest = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        queryAct: [],
        userSelectUuid: ''
    },
    //查询活动列表
    quertActiveQuery() {
        var that = this;
        httpRequest.requestGetData('app/queryTaskByPeople?uuid=' + that.data.userSelectUuid+'&pageSize=100&pageNum=1', '', function (data) {
            if (data.code == 200) {
                console.log(data)
                that.setData({
                    queryAct: data.data.list
                })
            }
        })
    },
    //兑换弹窗
    exchangeBtn(event) {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '是否确认派发该任务？',
            success: function (res) {
                if (res.confirm) {
                    var datas = {
                        type: 2, //类型
                        foreignId: event.currentTarget.dataset.itemUuid, //任务记录id
                        peopleId: that.data.userSelectUuid, //用户uuid
                        foreignName: event.currentTarget.dataset.itemName, //任务名称
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
                            that.quertActiveQuery();
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail: function(res){
                console.log(res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userSelectUuid: options.userSelectUuid
        })
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