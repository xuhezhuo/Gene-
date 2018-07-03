// page/index/ihouse.js
var app = getApp();
var markers = [];
var all_city = [];
var cur_city = '厦门市';

Page({
    data: {
        address: '厦门市',
        index: 0,
        latitude: 24.46,
        longitude: 118.10,
        cur_city: cur_city
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        
        wx.getSystemInfo({
            success: function (res) {
                self.setData({height: res.windowHeight - 150});
            }
        });
        var url = app.globalData.serverUrl + "api.php?s=Index/get_all_house_city";
        wx.request({
            url: url,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                markers=[];
                for (var i = 0; i < res.data.data.length; i++) {
                    var tmp = {
                        id: i,
                        iconPath: '/imgs/index/location.png',
                        latitude: parseFloat(res.data.data[i].y_point),
                        longitude: parseFloat(res.data.data[i].x_point),
                        width: 24,
                        height: 24,
                        addr: res.data.data[i].url,
                        desc: res.data.data[i].desc,
                        contact: res.data.data[i].contact
                        
                    }
                    markers.push(tmp)
                }
                self.setData({
                    markers: markers
                });
                console.log('set markers');
                console.log(res.data.data)

            }
        })

        wx.request({
            url: app.globalData.serverUrl + "api.php?s=Index/get_all_house",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                all_city=[];
                for (var i = 0; i < res.data.data.length; i++) {
                    all_city.push(res.data.data[i].city)
                }
                self.setData({
                    all_city: all_city
                });
            }
        })
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var url = app.globalData.serverUrl + "api.php?s=Index/get_location";
                wx.request({
                    url: url,
                    data: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        cur_city = res.data.data.result.ad_info.city;
                        self.setData({
                            address: cur_city
                        });

                        //当前城市坐标
                        var url = app.globalData.serverUrl + "api.php?s=Index/get_city_xy";
                        wx.request({
                            url: url,
                            data: {
                                city: cur_city
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                self.setData({
                                    latitude: res.data.data.result.location.lat,
                                    longitude: res.data.data.result.location.lng
                                });
                            }
                        })


                    }
                })
            }
        })
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
    markertap: function (e) {
        console.log(e);
        var addr = markers[e.markerId].addr;
        var desc = markers[e.markerId].desc;
        var contact = markers[e.markerId].contact;

        this.setData({
            addr: addr,
            desc:desc,
            contact: contact,
        });
    },
    bindPickerChange: function (e) {
        var self = this;
        cur_city = all_city[e.detail.value];
        console.log(cur_city);
        var url = app.globalData.serverUrl + "api.php?s=Index/get_city_xy";
        wx.request({
            url: url,
            data: {
                city: all_city[e.detail.value]
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var lat = res.data.data.result.location.lat;
                var lng = res.data.data.result.location.lng;
                self.setData({
                    latitude: lat,
                    longitude: lng
                });
            }
        })

        this.setData({
            index: e.detail.value
        });


    },
    daohang:function(){}
})