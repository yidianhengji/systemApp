// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
    data: {
        imagePath: '',
        placeholder: ''//默认二维码生成文本
    },
    onLoad: function (options) {
        var app = getApp();
        this.setData({
            placeholder: app.globalData.userUuid
        })
        // 页面初始化 options为页面跳转所带来的参数
        var size = this.setCanvasSize();//动态设置画布大小
        var initUrl = this.data.placeholder;
        this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    },
    //适配不同屏幕大小的canvas
    setCanvasSize: function () {
        var size = {};
        try {
            var res = wx.getSystemInfoSync();
            var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
            var width = res.windowWidth / scale;
            var height = width;//canvas画布为正方形
            size.w = width;
            size.h = height;
        } catch (e) {
            // Do something when catch error
            console.log("获取设备信息失败" + e);
        }
        return size;
    },
    createQrCode: function (url, canvasId, cavW, cavH) {
        //调用插件中的draw方法，绘制二维码图片
        QR.api.draw(url, canvasId, cavW, cavH);
        setTimeout(() => {
            this.canvasToTempImage();
        }, 1000);

    },
    //获取临时缓存照片路径，存入data中
    canvasToTempImage: function () {
        var that = this;
        wx.canvasToTempFilePath({
            canvasId: 'mycanvas',
            success: function (res) {
                var tempFilePath = res.tempFilePath;
                console.log(tempFilePath);
                that.setData({
                    imagePath: tempFilePath,
                    // canvasHidden:true
                });
            },
            fail: function (res) {
                console.log(res);
            }
        });
    },
})