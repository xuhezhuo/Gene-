// page/mine/collection.js
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    if(app.globalData.isLogin==false)
      {
           wx.switchTab({url: '/page/mine/mine'})  
        }
        wx.request({
          url: app.globalData.serverUrl + "api.php?s=Index/get_collection_by_report_id",
          data: {
            report_id:app.globalData.report_id
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.status==0){
              collection_list:'no data'
            }else if(res.data.status==1){
              var collection_list=res.data.data;
              for(var i=0;i<collection_list.length;i++){
                collection_list[i].img=app.globalData.serverUrl+collection_list[i].img.substring(1);
              }
              self.setData({
                collection_list:collection_list
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
  }
})