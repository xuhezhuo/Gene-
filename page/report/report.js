// page/report/report.js
var app = getApp();
var download_flag = 0;
var server = require('../../utils/server');
Page({
    data: {download_state: true},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        if (app.globalData.isLogin == false) {
            app.globalData.report = 1;

            wx.switchTab({url: '/page/mine/mine'});
            console.log('a');
            return;
        }

        this.setData({
            card_no: app.globalData.userInfo.card_no,
            user_name: app.globalData.userInfo.user_name,
            sex: app.globalData.userInfo.sex,
            birthday: app.globalData.userInfo.birthday,
            need_per: app.globalData.userInfo.need_per,
            address: app.globalData.userInfo.address,
            email: app.globalData.userInfo.email,
            org: app.globalData.userInfo.org,
            mobile: app.globalData.userInfo.mobile, create_time: app.globalData.userInfo.create_time,
            isLogin: app.globalData.isLogin,
            download_state: true,
            file_url: app.globalData.userInfo.file_url
        });
        if (app.globalData.download_file != '') {
            this.setData({
                download_state: false,
                is_download: app.globalData.is_download
            });
        }
    },
    onReady: function () {
        // 页面渲染完成


    },
    onShow: function () {
        // 页面显示
        console.log('b');
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    download_pdf: function (event) {
        console.log('download_pdf');
        if(app.globalData.download_file !='')
        {
            wx.openDocument({
                filePath: app.globalData.download_file,
                success: function (res) {
                    console.log('打开文档成功')
                },
                fail: function (err) {
                    console.log(err)
                },
                complete: function (res) {
                    console.log(res);
                }
            })
        }
        else if (download_flag == 0) {
            download_flag = 1;
            var self = this;
            var url = app.globalData.serverUrl + "api.php?s=Index/get_report_info";
            wx.request({
                url: url,
                data: {
                    report_id: app.globalData.report_id
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    var path = res.data.data.file_url;
                    self.setData({
                        download_state: false
                    });
                    if (app.globalData.download_file == '') {

                        self.setData({
                            dstate: '下载中……'
                        });
                        wx.downloadFile({
                            url: app.globalData.serverUrl + path,
                            success: function (res) {
                                var filePath = res.tempFilePath
                                download_flag = 0;
                                self.setData({
                                    dstate: '下载完成'
                                });
                                app.globalData.is_download = 'downloaded';
                                self.setData({
                                    is_download: app.globalData.is_download
                                });
                                app.globalData.download_file = filePath;
                                wx.openDocument({
                                    filePath: filePath,
                                    success: function (res) {
                                        console.log('打开文档成功')
                                    },
                                    fail: function (err) {
                                        console.log(err)
                                    },
                                    complete: function (res) {
                                        console.log(res);
                                    }
                                })
                            },
                            complete: function (res) {
                                console.log('complete');
                            }
                        })
                    }
                }
            })
        }
    }
})