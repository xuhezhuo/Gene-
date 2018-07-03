// page/faq/index.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data:{
    page_index:1,
    page_size:10,
    faq_top10:[],
    isFinished:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var self=this;
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_faq_by_page",
      data: {
        page_index:self.data.page_index,
        page_size:self.data.page_size,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var faq_top10=res.data.data;
        self.setData({
          faq_top10:faq_top10,
        });
        var faqArr=[];
        for(let i=0;i<faq_top10.length;i++){
          faqArr.push(faq_top10[i].question); 
          faqArr.push(faq_top10[i].answer);
        } 
        for (let i = 0; i < faqArr.length; i++) {
          WxParse.wxParse('faq' + i, 'html', faqArr[i], self);
          if (i === faqArr.length - 1) {
            WxParse.wxParseTemArray("faqTemArray",'faq', faqArr.length, self)
          }
        }

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onReachBottom:function(){
    var self=this;
    if(self.data.isFinished){
        wx.showToast({
          'title':'已加载全部FAQ'
        });
        return;
    }
    //页数加1
    self.setData({
      page_index:self.data.page_index+1
    });
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_faq_by_page",
      data: {
        page_index:self.data.page_index,
        page_size:self.data.page_size,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.status==0){
          self.setData({
            isFinished:true
          });
          wx.showToast({
            'title':'已加载全部FAQ'
          });
        }else{
          var faq_top10=self.data.faq_top10;
          var faq_add10=res.data.data;
          for(var i=0;i<faq_add10.length;i++){
            faq_top10.push(faq_add10[i]);
            
          }
          self.setData({
            faq_top10:faq_top10,
          });
          var faqArr=[];
          for(let i=0;i<faq_top10.length;i++){
            faqArr.push(faq_top10[i].question); 
            faqArr.push(faq_top10[i].answer);
          } 
          for (let i = 0; i < faqArr.length; i++) {
            WxParse.wxParse('faq' + i, 'html', faqArr[i], self);
            if (i === faqArr.length - 1) {
              WxParse.wxParseTemArray("faqTemArray",'faq', faqArr.length, self)
            }
          }
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})