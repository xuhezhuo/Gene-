// page/goods/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
    collection: 'collection_0.png',
    goods_id: 0,
  },
  onLoad: function (options) {
    var self = this;
    // 页面初始化 options为页面跳转所带来的参数
    var goods_id = options.id ? options.id : 0;
    if (goods_id == 0) {
      wx.showToast("产品不存在");
      wx.navigateBack();
    } else {
      //产品信息
      self.setData({
        goods_id: goods_id
      });
      wx.request({
        url: app.globalData.serverUrl + "api.php?s=/Index/get_master_by_id",
        data: { id: goods_id },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          var goods_info = res.data.data;
          goods_info.head_pic = app.globalData.serverUrl + goods_info.head_pic.substring(1);
          goods_info.wx_qrc = app.globalData.serverUrl + goods_info.wx_qrc.substring(1);
          self.setData({
            goods_info: goods_info
          });
          WxParse.wxParse('desc', 'html', goods_info.desc, self);
          var timestamp = res.data.data.create_time;
          var date = new Date(timestamp * 1000);
          var d = date.toLocaleDateString();
          self.setData({
            date: d
          });

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      //联系电话
      wx.request({
        url: app.globalData.serverUrl + "api.php?s=/Index/get_customer_service_mobile",
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          self.setData({
            tel: res.data.data
          });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      //判断是否已收藏
      var report_id = app.globalData.report_id;
      if (report_id) {
        wx.request({
          url: app.globalData.serverUrl + "api.php?s=/Index/get_collection_by_rid_and_gid",
          data: { report_id: report_id, goods_id: self.data.goods_id },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            // success
            if (res.data.status == 1) {
              self.setData({
                collection: 'collection_1.png'
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
      }
    }
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
  do_collection: function () {
    var self = this;

    if (self.data.collection == "collection_1.png") {
      wx.showToast({
        'title': '已收藏过了'
      });
      return;
    }
    var report_id = app.globalData.report_id;
    if (!report_id) {
      wx.showToast({
        'title': '请先登录'
      });
      return;
    }

    //进行收藏
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/set_collection",
      data: { report_id: report_id, goods_id: self.data.goods_id },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.status == 1) {
          self.setData({
            collection: 'collection_1.png'
          });
          wx.showToast({
            'title': '收藏成功'
          });
        } else {
          wx.showToast({
            'title': '收藏失败'
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
  }
})