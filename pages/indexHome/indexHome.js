// pages/indexHome/indexHome.js
Page({
    data: {
        btnAreaData: [
            { 'name': '积分码', 'imgurl': '../image/icon/icon1.png', 'path': '../indexCode/indexCode'},
            { 'name': '扫一扫', 'imgurl': '../image/icon/icon2.png', 'path': 'saoyisao' },
            { 'name': '垃圾分类', 'imgurl': '../image/icon/icon3.png', 'path': '' },
            { 'name': '任务中心', 'imgurl': '../image/icon/icon4.png', 'path': '../indexTask/indexTask' },
            { 'name': '活动中心', 'imgurl': '../image/icon/icon5.png', 'path': '../indexActivity/indexActivity' },
            { 'name': '积分排行', 'imgurl': '../image/icon/icon6.png', 'path': '' },
            { 'name': '消息中心', 'imgurl': '../image/icon/icon7.png', 'path': '' },
            { 'name': '奖品兑换', 'imgurl': '../image/icon/icon8.png', 'path': '' },
        ],
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        autoplay: false,
        interval: 5000,
        duration: 1000,
        show: ""
    },
    onLoad: function (options) {
        
    },
    clickIndexView(event){
        if (event.currentTarget.dataset.itemPath!=''){
            if (event.currentTarget.dataset.itemPath =='saoyisao'){
                wx.scanCode({
                    onlyFromCamera: true,
                    success: (res) => {
                        console.log(res)
                    }
                })
            }else {
                wx.navigateTo({
                    url: event.currentTarget.dataset.itemPath + '?title=' + event.currentTarget.dataset.itemTitle
                })
            }
        }
    },
})