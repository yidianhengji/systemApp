var httpRequest = require('../../utils/request.js');
Page({
    data: {
        role: '1',
        btnAreaData: [
            { 'name': '积分码', 'imgurl': '../image/icon/icon1.png', 'path': '../indexCode/indexCode'},
            { 'name': '扫一扫', 'imgurl': '../image/icon/icon2.png', 'path': 'saoyisao' },
            { 'name': '垃圾分类', 'imgurl': '../image/icon/icon3.png', 'path': '' },
            { 'name': '任务中心', 'imgurl': '../image/icon/icon4.png', 'path': '../indexTask/indexTask' },
            { 'name': '活动中心', 'imgurl': '../image/icon/icon5.png', 'path': '../indexActivity/indexActivity' },
            { 'name': '积分排行', 'imgurl': '../image/icon/icon6.png', 'path': '../indexTop/indexTop' },
            { 'name': '消息中心', 'imgurl': '../image/icon/icon7.png', 'path': '../indexNews/indexNews' },
            { 'name': '奖品兑换', 'imgurl': '../image/icon/icon8.png', 'path': '../indexExchange/indexExchange' },
        ],
        autoplay: false,
        interval: 5000,
        duration: 1000,
        show: "",
        queryAct: [],
        queryTasks: [],
    },
    test(str){
        console.log(1)
        debugger
        return '123'
    },
    onShow: function (options) {
        //给角色赋
        var app = getApp();
        this.setData({
            role: app.globalData.role
        })
        
        //查询活动列表
        this.quertActiveQuery();
        //查询任务列表
        this.quertTaskQuery();
    },
    //查询活动列表
    quertActiveQuery() {
        var params = {
            pageSize: 3,
            pageNum: 1,
        }
        var _this = this;
        httpRequest.request('app/queryAct', params, function (data) {
            if (data.code == 200) {
                _this.setData({
                    queryAct: data.data.list
                })
            }
        })
    },
    //查询任务列表
    quertTaskQuery(){
        var params = {
            pageSize: 3,
            pageNum: 1,
        }
        var _this = this;
        httpRequest.request('app/queryTasks', params, function (data) {
            if(data.code==200){
                _this.setData({
                    queryTasks: data.data.list
                })
            }
        })
    },
    //活动，任务详情跳转
    clickViewPage(event) {
        if (event.currentTarget.dataset.itemType==1){
            wx.navigateTo({
                url: '../indexActivityView/indexActivityView?uuid=' + event.currentTarget.dataset.itemUuid + ''
            })
        } else if (event.currentTarget.dataset.itemType == 2){
            wx.navigateTo({
                url: '../indexTaskView/indexTaskView?uuid=' + event.currentTarget.dataset.itemUuid + ''
            })
        }
    },
    clickIndexView(event){
        /*
        * 1、点击列表功能判断是否实名
        * 2、未实名的功能有积分码，扫一扫、消息中心、奖品兑换、积分排行
        */
        var app = getApp();
        var title = event.currentTarget.dataset.itemTitle;
        if (app.globalData.isRealName==2){
            if (title == '积分码' || title == '扫一扫' || title == '积分排行' || title == '消息中心' || title =='奖品兑换'){
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
                if (event.currentTarget.dataset.itemPath == 'saoyisao') {
                    wx.scanCode({
                        onlyFromCamera: true,
                        success: (res) => {
                            console.log(res)
                            wx.navigateTo({
                                url: '../indexSelect/indexSelect?userUuid=' + res.result + ''
                            })
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: event.currentTarget.dataset.itemPath + '?title=' + event.currentTarget.dataset.itemTitle
                    })
                }
            }
        }
    },
})