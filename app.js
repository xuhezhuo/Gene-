App({
    //小程序加载
    onLaunch: function () {
        console.log('App Launch');
        var self = this;

        //判断用户是否登录,根据report_id,此小程序未使用微信的第三方登录
        var report_id = wx.getStorageSync('report_id');
        console.log('report_id', report_id);
        if (!report_id) {
            //未登录处理
            console.log('未登录');
        } else {
            //已登录处理
            console.log('已登录');
            self.globalData.isLogin = true;
            self.globalData.report_id = report_id;
            self.getUserInfo();
        }
    },
    //小程序显示
    onShow: function () {
        console.log('App Show')
    },
    //小程序隐藏
    onHide: function () {
        console.log('App Hide')
    },
    //全局数据
    globalData: {
        isLogin: false,
        report_id: 0,
        userInfo: {
            'card_no': '',
            'user_name': '',
            'sex':'',
            'birthday': '',
            'need_per': '',
            'address': '',
            'email': '',
            'org': '',
            'mobile': '',
            'file_name': '',
            'file_url': '',
            'create_time': '',
        },
        serverUrl: "https://aijiyin.qykfa.com/",
        download_file:'',
        report:0,
        is_download:'',
        que_id:0, //问卷id
        que_folume:'',//问卷得分公式
    },
    //获取用户信息
    getUserInfo: function () {
        var x = this;
        if (!self.globalData.report_id) {
            return;
        }
        
        var url = self.globalData.serverUrl + "api.php?s=/Index/get_report_info";
        wx.request({
            url: url,
            data: {
                report_id: self.globalData.report_id,
            },
            method: 'POST',
            success: function (res) {
                // success
                if (res.data.status == 1) {
                    self.globalData.userInfo.card_no = res.data.data.card_no;
                    self.globalData.userInfo.user_name = res.data.data.user_name;
                    self.globalData.userInfo.sex = res.data.data.sex;
                    self.globalData.userInfo.birthday = res.data.data.birthday;
                    self.globalData.userInfo.email = res.data.data.email;
                    self.globalData.userInfo.address = res.data.data.address;
                    self.globalData.userInfo.need_per = res.data.data.need_per;
                    self.globalData.userInfo.org = res.data.data.org;
                    self.globalData.userInfo.mobile = res.data.data.mobile;
                    self.globalData.userInfo.file_name = res.data.data.file_name;
                    self.globalData.userInfo.file_url = res.data.data.file_url;
                    self.globalData.userInfo.create_time = res.data.data.create_time;

                } else if (res.data.status == 0) {
                    wx.showToast({
                        title: 'report_id不存在',
                    });
                } else {
                    wx.showToast({
                        title: '非法请求',
                    });
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        });
    }
})
