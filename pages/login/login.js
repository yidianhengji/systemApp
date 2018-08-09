Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                wx.getUserInfo({
                    success: function (res) {
                        wx.navigateTo({
                            url: '../indexHome/indexHome'
                        })
                    }
                })
            }
        })
    },
    bindGetUserInfo: function (e) {
        wx.navigateTo({
            url: '../indexHome/indexHome'
        })
    }
})