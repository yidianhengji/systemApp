var httpRequest = require('../../utils/request.js');
var app = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onAuth() {
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                // 获取用户信息
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        var app = getApp();
                        app.globalData.userInfo = res.userInfo
                        // 由于getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (app.userInfoReadyCallback) {
                            app.userInfoReadyCallback(res)
                        }
                        console.log(code);
                        var data = {
                            code: code,
                            nickName: res.userInfo.nickName,
                            sex: res.userInfo.gender,
                            headPic: res.userInfo.avatarUrl,
                        }
                        console.log(data)
                        httpRequest.requestGet('user/loginApp', data, function (data) {
                            console.log("---------------------------------")
                            console.log(data)
                            console.log("---------------------------------")
                            if (data.code == 200) {
                                var app = getApp();
                                app.globalData.isRealName = data.data.isRealName
                                app.globalData.role = data.data.role
                                app.globalData.sessionId = data.data.sessionId
                                app.globalData.communityId = data.data.communityId
                                app.globalData.userUuid = data.data.uuid
                                app.globalData.userInfoData = data.data
                                console.log(app)
                                if (data.data.isRealName == "2") {
                                    wx.showModal({
                                        title: '温馨提示',
                                        content: '您还未实名认证！请先实名认证。',
                                        success: function (res) {
                                            if (res.confirm) {
                                                wx.navigateTo({
                                                    url: '../userName/userName'
                                                })
                                            } else if (res.cancel) {
                                                wx.reLaunch({
                                                    url: '../indexHome/indexHome',
                                                })
                                            }
                                        },
                                        fail: function (res) {
                                            console.log("")
                                        }
                                    })
                                }else {
                                    wx.reLaunch({
                                        url: '../indexHome/indexHome',
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    onLoad: function (options) {
        this.onAuth();
    }
})