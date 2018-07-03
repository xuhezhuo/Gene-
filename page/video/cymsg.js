// page/video/cymsg.js
var maxTime = 60
var currentTime = -1 //倒计时的事件（单位：s）
var interval = null
var app = getApp();
var mobile = null;
var code = '';
var sex = 0;
var need_per = 1;
var y=1900;
var m=1;
var d = 1;
var date;


Page({
  data: {
    time: '发送验证码',
    items: [
      { name: '0', value: '男', checked: 'true' },
      { name: '1', value: '女' }
    ],
    items1: [
      { name: '1', value: '是', checked: 'true' },
      { name: '0', value: '否' }
    ],
    date: '请选择出生日期',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  sendcode: function () {

    if (mobile == null || !(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))) {
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
      if (currentTime == 60) {
        code = Math.floor(Math.random() * 9000) + 1000;
        var url = app.globalData.serverUrl + "api.php?s=Index/send_smscode";
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          data: {
            mobile: mobile,
            code: code
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
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
  mobile_input: function (e) {
    mobile = e.detail.value
    console.log(mobile)
  },
  scan_code: function () {
    var self = this;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        self.setData({ card_no: res.result });
      }
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    y = this.data.years[val[0]]
    m = this.data.months[val[1]]
    d = this.data.days[val[2]]
  },
  selectSex: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    sex = e.detail.value
  },
  selectPer: function (e) {
    need_per = e.detail.value

  },
  formSubmit: function (e) {
    
    if (e.detail.value.card_no == '') {
      wx.showToast({
        title: '请输入样本编号',
      });
      return;
    }
    else if (e.detail.value.user_name == '') {
      wx.showToast({
        title: '请输入姓名',
      });
      return;
    }
    else if (e.detail.value.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
      });
      return;
    }
    else if (e.detail.value.check_code == '') {
      wx.showToast({
        title: '请输入验证码',
      });
      return;
    }
    else if (e.detail.value.check_code != code) {
      wx.showToast({
        title: '验证码错误',
      });
      return;
    }
    if (need_per == 1)
    {
      if (e.detail.value.address == '') {
        wx.showToast({
          title: '请输入地址',
        });
        return;
      }
    }
    
    var url = app.globalData.serverUrl + "api.php?s=Index/get_userinfo";
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: {
        card_no: e.detail.value.card_no,
        user_name: e.detail.value.user_name,
        mobile: e.detail.value.mobile,
        sex:sex,
        birthday: date,
        need_per: need_per,
        address: e.detail.value.address,
        email: e.detail.value.email,
        org: e.detail.value.org,
        remark: e.detail.value.remark
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == 1)
        {
          app.globalData.userInfo.card_no = res.data.data.card_no;
          wx.redirectTo({
            url: '/page/video/checkitem'
          })
        }
        else{
          wx.showToast({
            title: res.data.msg,
          });
        }
        

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
    date = e.detail.value;
  }, 
})