import WxValidate from '../../utils/WxValidate.js'
var httpRequest = require('../../utils/request.js');
const App = getApp()

Page({
    data: {
        form: {
            phone: '',
        },
    },
    onLoad() {
        this.initValidate()
        console.log(this.WxValidate)
    },
    showModal(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
    },
    submitForm(e) {
        const params = e.detail.value

        console.log(params)

        // 传入表单数据，调用验证方法
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            this.showModal(error)
            return false
        }else {
            var that = this;
            httpRequest.request('people/verified', { mobile: params.phone }, function (data) {
                if (data.code == 200) {
                    that.showModal({
                        msg: '提交成功',
                    })
                    wx.reLaunch({
                        url: '../login/login',
                    })
                }
            })
        }
    },
    initValidate() {
        // 验证字段的规则
        const rules = {
            phone: {
                required: true,
                tel: true
            },
        }
        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            phone: {
                required: '请输入手机号码',
                tel: '请输入正确的手机号码'
            },
        }
        // 创建实例对象
        this.WxValidate = new WxValidate(rules, messages)
    },
})