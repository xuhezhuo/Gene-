var app = getApp();
var server = require('../../utils/server');
var WxParse = require('../../wxParse/wxParse.js');
var telphone='';
Page({
	data: {
		filterId: 1,
		address: '',
		icons: [
			[
				{
					id: 1,
					img: '/imgs/index/read@2x.png',
          name: '采样信息',
					url: '/page/video/cymsg'
				},
				{
					id: 2,
					img: '/imgs/index/jkpg@2x.png',
					name: '健康自查',
					url: "/page/health/index"
				},
				{
					id: 3,
					img: '/imgs/index/lvshi@2x.png',
					name: '遗传咨询师',
					url: '/page/health/manager'
				},
				{
					id: 4,
					img: '/imgs/index/house@2x.png',
					name: '爱基因小屋',
					url: "/page/index/ihouse"
				}
				
			]
		],

    

	},
	onLoad: function () {
		var self = this;
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				console.log(res.latitude)
				console.log(res.longitude)

				var latitude = res.latitude;
				var longitude = res.longitude;
				var url = app.globalData.serverUrl + "api.php?s=Index/get_location";
				wx.request({
  url: url,
  data: {
     latitude: latitude ,
     longitude: longitude
  },
  method:'POST',
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    self.setData({
							address: res.data.data.result.ad_info.city
						});

  }
})
			}
		});

		//获取产品缩略图及banner图

			wx.request({
		  url: app.globalData.serverUrl + "api.php?s=/Index/get_setting_img",
		  data: {},
		  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		  // header: {}, // 设置请求的 header
		  success: function(res){
			// success
			var index_img=res.data.data;
      console.log(index_img.banner)
			
			self.setData({
				banners: [
			{
				id: 1,
				img: app.globalData.serverUrl +index_img.banner,
				url: '',
				name: '',
			}
		]
			});
			self.setData({
				product: [
			[	
				{
					id: 1,
					img: app.globalData.serverUrl +index_img.kepu,
					name: '基因科普',
					url: "/page/kepu/index"
				},
				{
					id:2,
					img: app.globalData.serverUrl +index_img.about,
					name: '公司介绍',
					url: "/page/about/index"
				},
					{
					id:3,
					img: app.globalData.serverUrl +index_img.product,
					name: '产品介绍',
					url: "/page/goods/goods"
				},
				{
					id: 4,
					img: app.globalData.serverUrl +index_img.caiyang,
					name: '采样',
					url: "/page/video/index"
				},
				{
					id:5,
					img: app.globalData.serverUrl +index_img.dongtai,
					name: '公司动态',
					url: "/page/news/index"
				},
				{
					id: 6,
					img: app.globalData.serverUrl +index_img.faq,
					name: '服务专区',
					url: '/page/faq/index'
				}
				
			]
		]
			})
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
		//获取产品top5
		wx.request({
		  url: app.globalData.serverUrl + "api.php?s=/Index/get_goods_top5",
		  data: {},
		  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		  // header: {}, // 设置请求的 header
		  success: function(res){
			// success
			var goods_top5=res.data.data;
			for(var i=0;i<goods_top5.length;i++){
				goods_top5[i].img=app.globalData.serverUrl+goods_top5[i].img.substring(1);
			}
			self.setData({
				goods_top5:goods_top5,
			});
		  },
		  fail: function() {
			// fail
		  },
		  complete: function() {
			// complete
		  }
		})
		//联系电话
      wx.request({
        url: app.globalData.serverUrl + "api.php?s=/Index/get_customer_service_mobile",
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
					telphone = res.data.data;
          self.setData({
            tel:res.data.data
          });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
		//获取常见问题top5
		wx.request({
		  url: app.globalData.serverUrl + "api.php?s=/Index/get_faq_top5",
		  data: {},
		  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		  // header: {}, // 设置请求的 header
		  success: function(res){
			// success
			var faq_top5=res.data.data;
			self.setData({
				faq_top5:faq_top5
			});
			var faqArr=[];
			for(var i=0;i<faq_top5.length;i++){
				faqArr.push(faq_top5[i].question); 
			} 
			for (var i = 0; i < faqArr.length; i++) {
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
	onShow: function () {
	},
	onScroll: function (e) {
		if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}
	},
	toNearby: function () {
		var self = this;
		self.setData({
			scrollIntoView: 'nearby'
		});
		self.setData({
			scrollIntoView: null
		});
	},
	toReport:function(){
		if(app.globalData.isLogin==false)
    {
           app.globalData.report = 1;
           
           wx.switchTab({url: '/page/mine/mine'});
           console.log('a');
           return; 
    }
		wx.navigateTo({
			url: '/page/report/report',
			success: function(res){
				// success
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
	},
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.shops.sort(function (a, b) {
					return a.id > b.id;
				});
				break;
			case '2':
				this.data.shops.sort(function (a, b) {
					return a.sales < b.sales;
				});
				break;
			case '3':
				this.data.shops.sort(function (a, b) {
					return a.distance > b.distance;
				});
				break;
		}
		this.setData({
			filterId: e.target.dataset.id,
			shops: this.data.shops
		});
	},
	tapBanner: function (e) {
		var name = this.data.banners[e.target.dataset.id].name;
	},
	make_call:function(){
		console.log('call');
		wx.makePhoneCall({
  phoneNumber: telphone //仅为示例，并非真实的电话号码
})
	}
});

