// page/goods/goods.js
var app = getApp();
Page({
  data:{
    page_index:1,
    page_size:5,
    goods_top10:[],
    isFinished:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_goods_by_page",
      data: {
        page_index:self.data.page_index,
        page_size:self.data.page_size,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var goods_top10=res.data.data;
        for(var i=0;i<goods_top10.length;i++){
          goods_top10[i].img=app.globalData.serverUrl+goods_top10[i].img.substring(1);
        }
        self.setData({
          goods_top10:goods_top10,
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
          'title':'已加载全部产品'
        });
        return;
    }
    //页数加1
    self.setData({
      page_index:self.data.page_index+1
    });
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/get_goods_by_page",
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
            'title':'已加载全部产品'
          });
        }else{
          var goods_top10=self.data.goods_top10;
          var goods_add10=res.data.data;
          for(var i=0;i<goods_add10.length;i++){
            goods_add10[i].img=app.globalData.serverUrl+goods_add10[i].img.substring(1);
            goods_top10.push(goods_add10[i]);
            
          }
          self.setData({
            goods_top10:goods_top10,
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