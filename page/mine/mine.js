var maxTime = 60
var currentTime = -1 //倒计时的事件（单位：s）
var interval = null
var app = getApp();
var mobile=null;
var code='';

Page({
    data: {
        time: '发送验证码',
        isLogin: app.globalData.isLogin,
        userInfo: app.globalData.userInfo,
    },
    onLoad: function (options) {
        console.log(options);

    },
    onShow: function () {
        console.log('bb');
    },

    login: function () {
    },

    formSubmit: function (e) {
        var self = this;
         if(e.detail.value.user_name == '')
        {
            wx.showToast({
                        title: '请输入姓名',
                    });
            return;
        }
        if(e.detail.value.mobile == '')
        {
            wx.showToast({
                        title: '请输入手机号',
                    });
            return;
        }
         if(e.detail.value.check_code == '')
        {
            wx.showToast({
                        title: '请输入验证码',
                    });
            return;
        }
        if(e.detail.value.check_code != code)
        {
            wx.showToast({
                        title: '验证码错误',
                    });
            return;
        }
        console.log('fromSubmit');
        var url = app.globalData.serverUrl + "api.php?s=Index/xcx_login";
        wx.request({
            url: url,
            data: {
                card_no: e.detail.value.card_no,
                user_name: e.detail.value.user_name,
                mobile: e.detail.value.mobile,
            },
            method: 'POST',
            success: function (res) {
                // success
                if (res.data.status == 1) {
                    app.globalData.report_id = res.data.data.report_id;
                    app.globalData.isLogin=true;
                    app.globalData.userInfo.card_no = res.data.data.card_no;
                    app.globalData.userInfo.user_name = res.data.data.user_name;
                    app.globalData.userInfo.sex = res.data.data.sex;
                    app.globalData.userInfo.birthday = res.data.data.birthday;
                    app.globalData.userInfo.need_per = res.data.data.need_per;
                    app.globalData.userInfo.address = res.data.data.address;
                    app.globalData.userInfo.email = res.data.data.email;
                    app.globalData.userInfo.org = res.data.data.org;
                    app.globalData.userInfo.mobile = res.data.data.mobile;
                    app.globalData.userInfo.file_name = res.data.data.file_name;
                    app.globalData.userInfo.file_url = res.data.data.file_url;
                    app.globalData.userInfo.create_time = res.data.data.create_time;
                    self.setData({
                            isLogin: app.globalData.isLogin
                        });
                        if(app.globalData.report == 1)
                        {
                            wx.navigateTo({
  url: '/page/report/report'
})
                        }

                } else if (res.data.status == 0) {
                    wx.showToast({
                      title: '暂无您的报告',
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
    },
    formReset: function () {
    },
    sendcode: function () {

        if(mobile == null || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)))
        {
            wx.showToast({
                title: '请输入正确的手机号码',
                icon: 'loading',
                duration: 700
            });
            return;
        }
        

        if (currentTime < 0) {
            var that = this
            currentTime = 60;
            if(currentTime == 60)
            {
                code = Math.floor(Math.random()*9000)+1000;
                var url = app.globalData.serverUrl + "api.php?s=Index/send_smscode";
                wx.request({
  url: url, //仅为示例，并非真实的接口地址
  data: {
     mobile: mobile,
     code: code
  },
  method:"POST",
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data);
    wx.showToast({
  title: '验证码已发送',
  icon: 'success',
  duration: 2000
})
  }
})

         


            }
            interval = setInterval(function () {
                currentTime--
                that.setData({
                    time: '重新获取（' + currentTime + 's)'
                });
                

                if (currentTime <= 0) {
                    that.setData({
                        time: '发送验证码'
                    })
                    currentTime = -1
                    clearInterval(interval);
                    
                }
            }, 1000)
        } else {
            wx.showToast({
                title: '短信已发到您的手机，请稍后重试!',
                icon: 'loading',
                duration: 700
            })
        }
    },
    loginout:function(){
var self = this;
        wx.showModal({
  title: '提示',
  content: '您确定要退出登录吗？',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      
        app.globalData.isLogin=false;
        self.setData({
                            isLogin: app.globalData.isLogin
                        });
                        wx.switchTab({
  url: '/page/index/index'
})
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
                
    },
    mobile_input:function(e){
        mobile = e.detail.value
        console.log(mobile)
    },
    scan_code:function(){
        var self = this;
      wx.scanCode({
  success: (res) => {
    console.log(res)
    self.setData({card_no: res.result });
  }
})
    }
    
}); 

