var httpRequest = require('utils/request.js');
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                // 获取用户信息
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                            // 由于getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                            this.userInfoReadyCallback(res)
                        }
                        console.log(code);
                        var data = {
                            code: code,
                            nickName: res.userInfo.nickName,
                            sex: res.userInfo.gender,
                            headPic: res.userInfo.avatarUrl,
                        }
                        httpRequest.requestGet('user/loginApp', data, function(data) {
                            if (data.code == 200) {
                                var app = getApp();
                                app.globalData.isRealName = data.data.isRealName
                                app.globalData.role = data.data.role
                                app.globalData.sessionId = data.data.sessionId
                                app.globalData.communityId = data.data.communityId
                                app.globalData.userUuid = data.data.uuid
                                if (data.data.isRealName == "2") {
                                    wx.showModal({
                                        title: '温馨提示',
                                        content: '您还未实名认证！请先实名认证。',
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.navigateTo({
                                                    url: '../userName/userName'
                                                })
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        },
                                        fail: function(res) {
                                            console.log("")
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    globalData: {
        userInfo: null,
        path: 'http://192.168.199.231:8090/backen/',
        //path: 'http://120.79.177.219:8090/backen/',
        isRealName: '', //实名认证
        role: '', //角色身份
        sessionId: '', //用户信息
        communityId: '',
        userUuid: ''
    },
})