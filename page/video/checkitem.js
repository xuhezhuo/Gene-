// page/video/checkitem.js
var app = getApp();

var productA = [];
var productB = [];
var productC = [];
var productD = [];
var productE = [];
var productF = [];
var remark1='';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items1: [
      { name: '叶酸吸收能力', value: '叶酸吸收能力' },
      { name: '抗衰老能力', value: '抗衰老能力', },
      { name: '咖啡因代谢能力', value: '咖啡因代谢能力' },
      { name: '酒精代谢能力', value: '酒精代谢能力' },
      { name: '脂质代谢能力', value: '脂质代谢能力' },
      { name: '尼古丁代谢能力', value: '尼古丁代谢能力' },
      { name: '运动类型', value: '运动类型' },
      { name: '肥胖症', value: '肥胖症' },
    ],
    items2: [
      { name: '前列腺癌', value: '前列腺癌' },
      { name: '肾癌', value: '肾癌', },
      { name: '酒精代谢能力', value: '酒精代谢能力' }
    ],
    items3: [
      { name: '乳腺癌', value: '乳腺癌' },
      { name: '宫颈癌', value: '宫颈癌', },
      { name: '叶酸吸收能力', value: '叶酸吸收能力' }
    ],
    items4: [
      { name: '鼻咽癌', value: '鼻咽癌' },
      { name: '肺癌', value: '肺癌', },
      { name: '食道癌', value: '食道癌' },
      { name: '胃癌', value: '胃癌' },
      { name: '肝癌', value: '肝癌' },
      { name: '结直肠癌', value: '结直肠癌' }
    ],
    items5: [
      { name: '高血压', value: '高血压' },
      { name: '高血脂', value: '高血脂', },
      { name: '高尿酸', value: '高尿酸' },
      { name: '高血糖', value: '高血糖' }
    ],
    items6: [
      { name: 'Ⅱ型糖尿病', value: 'Ⅱ型糖尿病' },
      { name: '冠心病', value: '冠心病', },
      { name: '脑卒中', value: '脑卒中' },
      { name: '阿尔茨海默症', value: '阿尔茨海默症' }
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  //A
  checkboxA: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items1: [
          { name: '叶酸吸收能力', value: '叶酸吸收能力' },
          { name: '抗衰老能力', value: '抗衰老能力', },
          { name: '咖啡因代谢能力', value: '咖啡因代谢能力' },
          { name: '酒精代谢能力', value: '酒精代谢能力' },
          { name: '脂质代谢能力', value: '脂质代谢能力' },
          { name: '尼古丁代谢能力', value: '尼古丁代谢能力' },
          { name: '运动类型', value: '运动类型' },
          { name: '肥胖症', value: '肥胖症' },
        ]
      });
      productA =[];


    }
    else {
      self.setData({
        items1: [
          { name: '叶酸吸收能力', value: '叶酸吸收能力', checked: 'true'},
          { name: '抗衰老能力', value: '抗衰老能力', checked: 'true'},
          { name: '咖啡因代谢能力', value: '咖啡因代谢能力', checked: 'true' },
          { name: '酒精代谢能力', value: '酒精代谢能力', checked: 'true' },
          { name: '脂质代谢能力', value: '脂质代谢能力', checked: 'true' },
          { name: '尼古丁代谢能力', value: '尼古丁代谢能力', checked: 'true' },
          { name: '运动类型', value: '运动类型', checked: 'true' },
          { name: '肥胖症', value: '肥胖症', checked: 'true' },
        ]
      });
      productA = ['叶酸吸收能力', '抗衰老能力', '咖啡因代谢能力', '酒精代谢能力', '脂质代谢能力', '尼古丁代谢能力', '运动类型','肥胖症'];
    }

  },
  checkboxAitem: function (e) {
    productA = e.detail.value;
    console.log(productA);
  },

  //B
  checkboxB: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items2: [
          { name: '前列腺癌', value: '前列腺癌' },
          { name: '肾癌', value: '肾癌', },
          { name: '酒精代谢能力', value: '酒精代谢能力' }
        ]
      });
      productB = [];


    }
    else {
      self.setData({
        items2: [
          { name: '前列腺癌', value: '前列腺癌', checked: 'true' },
          { name: '肾癌', value: '肾癌', checked: 'true' },
          { name: '酒精代谢能力', value: '酒精代谢能力', checked: 'true' }
        ]
      });
      productB = ['前列腺癌', '肾癌', '酒精代谢能力'];
    }

  },
  checkboxBitem: function (e) {
    productB = e.detail.value;
  },

  //C
  checkboxC: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items3: [
          { name: '乳腺癌', value: '乳腺癌' },
          { name: '宫颈癌', value: '宫颈癌', },
          { name: '叶酸吸收能力', value: '叶酸吸收能力' }
        ]
      });
      productC = [];


    }
    else {
      self.setData({
        items3: [
          { name: '乳腺癌', value: '乳腺癌', checked: 'true' },
          { name: '宫颈癌', value: '宫颈癌', checked: 'true' },
          { name: '叶酸吸收能力', value: '叶酸吸收能力', checked: 'true' }
        ]
      });
      productC = ['乳腺癌', '宫颈癌', '叶酸吸收能力'];
    }

  },
  checkboxCitem: function (e) {
    productC = e.detail.value;
  },
  //D
  checkboxD: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items4: [
          { name: '鼻咽癌', value: '鼻咽癌' },
          { name: '肺癌', value: '肺癌', },
          { name: '食道癌', value: '食道癌' },
          { name: '胃癌', value: '胃癌' },
          { name: '肝癌', value: '肝癌' },
          { name: '结直肠癌', value: '结直肠癌' }
        ]
      });
      productD = [];


    }
    else {
      self.setData({
        items4: [
          { name: '鼻咽癌', value: '鼻咽癌', checked: 'true' },
          { name: '肺癌', value: '肺癌', checked: 'true' },
          { name: '食道癌', value: '食道癌', checked: 'true' },
          { name: '胃癌', value: '胃癌', checked: 'true' },
          { name: '肝癌', value: '肝癌', checked: 'true' },
          { name: '结直肠癌', value: '结直肠癌', checked: 'true' }
        ]
      });
      productD = ['鼻咽癌', '肺癌', '食道癌', '胃癌', '肝癌', '结直肠癌'];
    }
  },
  checkboxDitem: function (e) {
    productD = e.detail.value;
  },
  //E
  checkboxE: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items5: [
          { name: '高血压', value: '高血压' },
          { name: '高血脂', value: '高血脂', },
          { name: '高尿酸', value: '高尿酸' },
          { name: '高血糖', value: '高血糖' }
        ]
      });
      productE = [];


    }
    else {
      self.setData({
        items5: [
          { name: '高血压', value: '高血压', checked: 'true' },
          { name: '高血脂', value: '高血脂', checked: 'true' },
          { name: '高尿酸', value: '高尿酸', checked: 'true' },
          { name: '高血糖', value: '高血糖', checked: 'true' }
        ]
      });
      productE = ['高血压', '高血脂', '高尿酸', '高血糖'];
    }
  },
  checkboxEitem: function (e) {
    productE = e.detail.value;
  },

  //F
  checkboxF: function (e) {
    var self = this;
    if (e.detail.value == '') {
      console.log(e.detail.value);
      self.setData({
        items6: [
          { name: 'Ⅱ型糖尿病', value: 'Ⅱ型糖尿病' },
          { name: '冠心病', value: '冠心病', },
          { name: '脑卒中', value: '脑卒中' },
          { name: '阿尔茨海默症', value: '阿尔茨海默症' }
        ]
      });
      productF = [];


    }
    else {
      self.setData({
        items6: [
          { name: 'Ⅱ型糖尿病', value: 'Ⅱ型糖尿病', checked: 'true' },
          { name: '冠心病', value: '冠心病', checked: 'true' },
          { name: '脑卒中', value: '脑卒中', checked: 'true' },
          { name: '阿尔茨海默症', value: '阿尔茨海默症', checked: 'true' }
        ]
      });
      productF = ['Ⅱ型糖尿病', '冠心病', '脑卒中', '阿尔茨海默症'];
    }
  },
  checkboxFitem: function (e) {
    productF = e.detail.value;
  },
  formSubmit:function(e)
  {
    var self = this;
    remark1 = e.detail.value.remark1

    if(productA == '' && productB =='' && productC =='' && productD == '' && productE == '' && productF == '')
    {
      wx.showToast({
        title: '您还未选择任何项目',
        icon: 'success',
        duration: 2000
      })
        return;
    }
  
      var url = app.globalData.serverUrl + "api.php?s=Index/set_items";
      wx.request({
        url: url, 
        data: {
          card_no:app.globalData.userInfo.card_no,
          remark1: remark1,
          a: productA,
          b: productB,
          c: productC,
          d: productD,
          e: productE,
          f: productF,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 1)
          {
            wx.redirectTo({
              url: '/page/video/success'
            })
          }
          else{
            wx.showToast({
              title: res.data.msg,
            });
          }
        }
      })

  }

})