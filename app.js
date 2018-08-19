var httpRequest = require('utils/request.js');
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    globalData: {
        userInfo: null,
        //path: 'http://192.168.199.231:8090/backen/',
        path: 'https://www.xxsghp.cn/backen/',
        isRealName: '', //实名认证
        role: '', //角色身份
        sessionId: '', //用户信息
        communityId: '',
        userUuid: '',
        userInfoData: []
    },
})