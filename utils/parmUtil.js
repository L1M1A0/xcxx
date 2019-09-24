// const website = "http://127.0.0.1:8181/ecp-gangbangbang-web-site";
const website = "https://wlxrtest.ouyeel56.com";
module.exports = {
  serverPath:'https://wlxrtest.ouyeel56.com',
  //serverPath: 'https://gbb.tgm365.com/ecp-gangbangbang-wechat-mini',
  mapKey:'RO4BZ-C4A6J-3BXFH-KH7VY-ZEUJ6-QYFJ3',
  img: img,
  listFormatArray: listFormatArray,
  isNull: isNull,
  navTabBar: navTabBar,
  openid: getopenid,
  reqServer: reqServer,
  getCurrentPageUrl: getCurrentPageUrl,
  maskerror:'10',//屏蔽层输出
  popuperror:'20',//弹框输出
  jumperror:'30',//跳到错误页面
  convertHtmlToText: convertHtmlToText,//富文本处理
  verify_phone: verify_phone,//手机号码验证码
  countDown:countDown,//倒计时
  authority: authority,//权限管理
  getback_authority: getback_authority,//权限接口回调
  webSocketUrl: webSocketUrl,//服务端Socket地址
}
function webSocketUrl(){
  return this.serverPath.replace("http://", 'ws://').replace("https://", 'ws://') +"/websocket";
}
/**
 * 图片服务器
 * @author 陈培坤
 * 2019年3月1日11:05:24
 */
function imgserver(id){
  return website +"/fileserver/loadImage/"+id;
}
/**
 * 传入数组、图片id属性名，进行转换图片地址
 * @parm list-----进行操作的对象/数组
 * @parm property-----对象/数组储存图片id的属性名
 * @return 返回需处理的数据
 * @author 陈培坤
 * 2019年3月1日11:47:35
 */
function img(list, property){
  var that = this;
  if (that.isNull(list) || list.length <= 0 || that.isNull(property)){
    return list;
  }
  if (list instanceof Array){//数组
    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      for (var key in obj) {
        if (property == key) {
          obj[key] = imgserver(obj[key]);
        }
      }
    }
  }else{//对象
    for (var key in list) {
      if (property == key) {
        list[key] = imgserver(list[key]);
      }
    }
  }
return list;
}

/**
 * list封装成数组的方法<br>
 * @author 陈培坤
 * 2018年3月21日23:23:38<br>
 */
function listFormatArray(oldarrs,list) {
  if (list == null || list == undefined || list.length <= 0) {
    return oldarrs;
  }
  var arrs ;
  if (oldarrs == undefined || oldarrs.length==0){
    arrs = new Array;
  }else{
    arrs = oldarrs;
  }
  for (var i = 0; i < list.length; i++) {
    arrs.push(list[i]);
  }
  return arrs;
}
//时间格式化
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
} 

/**
 * 判断value是否为空
 * @author 陈培坤
 * 2018年3月30日13:09:30
 */
function isNull(value){
  if (value == null || value == undefined || value == "" || value =="undefined"||value=="null"){
      return true;
  }else{
    return false;
  }
}

/**
 * 跳转导航页点击事件<br>
 * @author 陈培坤<br>
 * 2018年4月15日14:25:31<br>
 */
function navTabBar(e){
  var url = e.currentTarget.dataset.url;
  if (!isNull(url)){
    wx.switchTab({
      url: url,   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
  }
}
/**
 * 获取缓存openid
 */
function getopenid(){
  return wx.getStorageSync('openid');
}

/**
 * 统一封装请求后台
 * @param url--------请求地址
 * @param data--------请求参数（openid必传）
 * @param method--------请求方法
 * @param callback--------请求成功回调函数
 * @param resErrorType--------请求异常时响应方式（传递全局参数：屏蔽层输出报错、弹框式输出报错、跳转到错误页面）
 * @param jump_pages--------跳转到错误页面的路径
 * @param ismask--------是否需要屏蔽层
 * @return 统一数据格式，异常时输出异常；成功时只返回业务数据
 * @author 陈培坤
 * @since weChatMiniApps 0.0.1
 */
function reqServer(url, data, method, callback, resErrorType, jump_pages, ismask){
  var that = this;
  if (ismask!=false){
    wx.showLoading({
      title: '正在处理...',
      mask: true,
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 80000000)
  }
  var content_type = "application/json";
  if(method=="POST"){
    content_type = "application/x-www-form-urlencoded";
    //content_type = "json";
  }
  console.log(url);
  wx.request({
    url: url,
    header: { //这里写你接口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
      'Content-Type': content_type
    },
    method: method,
    data: data,
    mask: true,
    success: function (res) {
      if (res.statusCode!=200){
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '连接服务器异常,连接代码：' + res.statusCode,
          showCancel: false,//是否显示取消按钮
        })
        return;
      }
      if (res.data.success==true){
        wx.hideLoading();
        callback(res.data.data);
        return;
      }
      if (resErrorType == that.maskerror || that.isNull(resErrorType)){
        wx.hideLoading();
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'loading'
        });
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      } else if (resErrorType == that.popuperror){
        wx.hideLoading();
        wx.showModal({
          title: '错误代码:'+res.data.errorCode+'',
          content: res.data.errorMsg,
          showCancel: false,//是否显示取消按钮
        })
      } else if (resErrorType == that.jumperror){
        jump_pages = jump_pages.replace("#msg#", res.data.errorMsg);
        wx.redirectTo({
          url: jump_pages
        });
      }
    }, fail:function(){
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '服务器维护中',
        showCancel: false,//是否显示取消按钮
      })
    }
  })
}

/**
 * 获取当前页面的url
 * 这个url是不带参数的
 * @author 吴芳
 * @since weChatMiniApps 0.0.1
 * 
 */
function getCurrentPageUrl() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}

/**
 * 富文本处理<br>
 * @author 陈培坤<br>
 * 2019年2月14日15:48:05<br>
 */
function convertHtmlToText(inputText) {
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '\r\n');
  returnText = returnText.replace(/<\/li>/ig, '\r\n');
  returnText = returnText.replace(/<li>/ig, '  *  ');
  returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, "\r\n");
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '');
  returnText = returnText.replace('&nbsp;', ' ');
  //-- get rid of html-encoded characters:
  returnText = returnText.replace(/ /gi, " ");
  returnText = returnText.replace(/&/gi, "&");
  returnText = returnText.replace(/"/gi, '"');
  returnText = returnText.replace(/</gi, '<');
  returnText = returnText.replace(/>/gi, '>');

  return returnText;
}
/**
 * 验证码手机号码
 * 非法返回false，合法返回true
 * @author 陈培坤
 * 2019年2月19日13:27:46
 */
function verify_phone(phone){
  if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
  }
  return true;
}
/**
 * 倒计时功能
 * @parm datatime 
 * @parm type 10:当前时间小于计算时间（用于结束倒计时）、20当前时间大于计算时间（用于开始倒计时）
 *  @author 陈培坤
 * 2019年2月27日10:36:47
 */
function countDown(datatime){
  var countdown = {
    day: '00',
    hour: '00',
    min: '00',
    second: '00'
  }
  var second = datatime - Date.parse(new Date()) / 1000;
  // 天数位
  var day = Math.floor(second / 3600 / 24);
  var dayStr = day.toString();
  if (dayStr.length == 1) dayStr = '0' + dayStr;

  // 小时位
  var hr = Math.floor((second - day * 3600 * 24) / 3600);
  var hrStr = hr.toString();
  if (hrStr.length == 1) hrStr = '0' + hrStr;

  // 分钟位
  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
  var minStr = min.toString();
  if (minStr.length == 1) minStr = '0' + minStr;

  // 秒位
  var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
  var secStr = sec.toString();
  if (secStr.length == 1) secStr = '0' + secStr;
  countdown = {
    day: dayStr,
    hour: hrStr,
    min: minStr,
    second: secStr
  }
  datatime--;
  if (datatime < 0) {
    countdown = {
      day: '00',
      hour: '00',
      min: '00',
      second: '00'
    }
  }
  return countdown;
}

/**
 * 权限管理<br>
 * 当用户已经登录时判断是否为运营人员，是的话直接强行跳转页面到运营主页<br>
 * @author 陈培坤<br>
 * 2019年3月7日17:16:52<br>
 */
function authority(){
  var that = this;
  var url = that.serverPath + '/wecaht/authority.wechatHtm';
  var paramData = {
    openid: that.openid()
  }
  that.reqServer(url, paramData, "GET", that.getback_authority, that.maskerror);
}
/**
 * 验证身份回调
 */
function getback_authority(data){
  if (data==true){
      wx.redirectTo({
        url:'../../../packageMyHome/pages/ManagerAuthorized/Home/Home'
      })
  }
}