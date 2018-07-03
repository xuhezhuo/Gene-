// page/health/manager.js
var app = getApp();
Page({
  data:{
    page_index:1,
    page_size:5,
    master_top10:[],
    isFinished:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_master_by_page",
      data: {
        page_index:self.data.page_index,
        page_size:self.data.page_size,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var master_top10=res.data.data;
        for(var i=0;i<master_top10.length;i++){
          master_top10[i].head_pic=app.globalData.serverUrl+master_top10[i].head_pic.substring(1);
          master_top10[i].wx_qrc=app.globalData.serverUrl+master_top10[i].wx_qrc.substring(1);
        }
        self.setData({
          master_top10:master_top10,
        });
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
          'title':'已加载全部'
        });
        return;
    }
    //页数加1
    self.setData({
      page_index:self.data.page_index+1
    });
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_master_by_page",
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
            'title':'已加载全部'
          });
        }else{
          var master_top10=self.data.master_top10;
          var master_add10=res.data.data;
          for(var i=0;i<master_add10.length;i++){
            master_add10[i].head_pic=app.globalData.serverUrl+master_add10[i].head_pic.substring(1);
            master_add10[i].wx_qrc=app.globalData.serverUrl+master_add10[i].wx_qrc.substring(1);
            master_top10.push(master_add10[i]);
            
          }
          self.setData({
            master_top10:master_top10,
          });
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