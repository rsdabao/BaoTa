var bt = {
  os: 'Linux',
  check_ip: function (ip) //验证ip
  {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
  },
  check_ips: function (ips) //验证ip段
  {
    var reg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?$/;
    return reg.test(ip);
  },
  // 验证域名列表
  check_domain_list: function (domainInfo) {
    var domainList = domainInfo.trim().replace(' ', '').split("\n");
    for (var i = 0; i < domainList.length; i++) {
      var item = domainList[i];
      if (!bt.check_domain(item)) {
        bt.msg({ status: false, msg: '第+' + (i + 1) + '行[ ' + item + ' ]域名格式错误' });
        return false;
      }
    }
    return domainList;
  },
  check_url: function (url) //验证url
  {
    var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
    return reg.test(url);
  },
  check_port: function (port) {
    var reg = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return reg.test(port);
  },
  check_chinese: function (str) {
    var reg = /[\u4e00-\u9fa5]/;
    return reg.test(str);
  },
  check_domain: function (domain) //验证域名
  {
    var reg = /^([\w\u4e00-\u9fa5\-\*]{1,100}\.){1,10}([\w\u4e00-\u9fa5\-]{1,24}|[\w\u4e00-\u9fa5\-]{1,24}\.[\w\u4e00-\u9fa5\-]{1,24})$/;
    return reg.test(bt.strim(domain));
  },
  check_img: function (fileName) //验证是否图片
  {
    var exts = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'ico'];
    var check = bt.check_exts(fileName, exts);
    return check;
  },
  check_email: function (email) {
    var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    return reg.test(email);
  },

  check_phone: function (phone) {
    var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return reg.test(phone);
  },
  check_zip: function (fileName) {
    var ext = fileName.split('.');
    var extName = ext[ext.length - 1].toLowerCase();
    if (extName == 'zip') return 0;
    if (extName == 'rar') return 2;
    if (extName == 'gz' || extName == 'tgz') return 1;
    return -1;
  },
  check_text: function (fileName) {
    var exts = ['rar', 'zip', 'tar.gz', 'gz', 'iso', 'xsl', 'doc', 'xdoc', 'jpeg', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'exe', 'so', '7z', 'bz'];
    return bt.check_exts(fileName, exts) ? false : true;
  },
  check_exts: function (fileName, exts) {
    var ext = fileName.split('.');
    if (ext.length < 2) return false;
    var extName = ext[ext.length - 1].toLowerCase();
    for (var i = 0; i < exts.length; i++) {
      if (extName == exts[i]) return true;
    }
    return false;
  },
  check_version: function (version, cloud_version) {
    var arr1 = version.split('.'); //
    var arr2 = cloud_version.split('.');
    var leng = arr1.length > arr2.length ? arr1.length : arr2.length;
    while (leng - arr1.length > 0) {
      arr1.push(0);
    }
    while (leng - arr2.length > 0) {
      arr2.push(0);
    }
    for (var i = 0; i < leng; i++) {
      if (i == leng - 1) {
        if (arr1[i] != arr2[i]) return 2; //子版本匹配不上
      } else {
        if (arr1[i] != arr2[i]) return -1; //版本匹配不上
      }
    }
    return 1; //版本正常
  },
  // url合成
  url_merge: function (url) {
    var origin = window.location.origin;
    return (cdn_url !== '/static' ? cdn_url : origin + cdn_url) + url + '?version=' + panel_version + '&repair=' + update_code
  },
  replace_all: function (str, old_data, new_data) {
    var reg_str = "/(" + old_data + "+)/g"
    var reg = eval(reg_str);
    return str.replace(reg, new_data);
  },
  get_file_ext: function (fileName) {
    var text = fileName.split(".");
    var n = text.length - 1;
    text = text[n];
    return text;
  },
  get_file_path: function (filename) {
    var arr = filename.split('/');
    path = filename.replace('/' + arr[arr.length - 1], "");
    return path;
  },
  get_date: function (a) {
    var dd = new Date();
    dd.setTime(dd.getTime() + (a == undefined || isNaN(parseInt(a)) ? 0 : parseInt(a)) * 86400000);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    return y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
  },
  get_form: function (select) {
    var sarr = $(select).serializeArray();
    var iarr = {}
    for (var i = 0; i < sarr.length; i++) {
      iarr[sarr[i].name] = sarr[i].value;
    }
    return iarr;
  },
  ltrim: function (str, r) {
    var reg_str = "/(^\\" + r + "+)/g"
    var reg = eval(reg_str);
    str = str.replace(reg, "");
    return str;
  },
  rtrim: function (str, r) {
    var reg_str = "/(\\" + r + "+$)/g"
    var reg = eval(reg_str);
    str = str.replace(reg, "");
    return str;
  },
  strim: function (str) {
    var reg_str = "/ /g"
    var reg = eval(reg_str);
    str = str.replace(reg, "");
    return str;
  },
  contains: function (str, substr) {
    if (str) {
      return str.indexOf(substr) >= 0;
    }
    return false;
  },
  format_size: function (bytes, is_unit, fixed, end_unit) //字节转换，到指定单位结束 is_unit：是否显示单位  fixed：小数点位置 end_unit：结束单位
  {
    if (bytes == undefined) return 0;

    if (is_unit == undefined) is_unit = true;
    if (fixed == undefined) fixed = 2;
    if (end_unit == undefined) end_unit = '';

    if (typeof bytes == 'string') bytes = parseInt(bytes);
    var unit = [' B', ' KB', ' MB', ' GB', 'TB'];
    var c = 1024;
    for (var i = 0; i < unit.length; i++) {
      var cUnit = unit[i];
      if (end_unit) {
        if (cUnit.trim() == end_unit.trim()) {
          var val = i == 0 ? bytes : fixed == 0 ? bytes : bytes.toFixed(fixed)
          if (is_unit) {
            return val + cUnit;
          } else {
            val = parseFloat(val);
            return val;
          }
        }
      } else {
        if (bytes < c) {
          var val = i == 0 ? bytes : fixed == 0 ? bytes : bytes.toFixed(fixed)
          if (is_unit) {
            return val + cUnit;
          } else {
            val = parseFloat(val);
            return val;
          }
        }
      }

      bytes /= c;
    }
  },
  format_data: function (tm, format) {
    if (format == undefined) format = "yyyy/MM/dd hh:mm:ss";
    tm = tm.toString();
    if (tm.length > 10) {
      tm = tm.substring(0, 10);
    }
    var data = new Date(parseInt(tm) * 1000);
    var o = {
      "M+": data.getMonth() + 1, //month
      "d+": data.getDate(), //day
      "h+": data.getHours(), //hour
      "m+": data.getMinutes(), //minute
      "s+": data.getSeconds(), //second
      "q+": Math.floor((data.getMonth() + 3) / 3), //quarter
      "S": data.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

    return format;
  },
  format_path: function (path) {
    var reg = /(\\)/g;
    path = path.replace(reg, '/');
    return path;
  },
  get_random: function (len) {
    len = len || 32;
    var $chars = 'AaBbCcDdEeFfGHhiJjKkLMmNnPpRSrTsWtXwYxZyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  refresh_pwd: function (length, obj) {
    if (obj == undefined) obj = 'MyPassword';
    var _input = $("#" + obj);
    if (_input.length > 0) {
      _input.val(bt.get_random(length))
    } else {
      $("." + obj).val(bt.get_random(length))
    }
  },
  get_random_num: function (min, max) //生成随机数
  {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
  },
  /**
   * 生成计算数字(加强计算，用于删除重要数据二次确认)
   * */
  get_random_code: function () {
    var flist = [20, 21, 22, 23]

    var num1 = bt.get_random_num(13, 19);
    var t1 = num1 % 10;

    var num2 = bt.get_random_num(13, 29);
    var t2 = num2 % 10;

    while ($.inArray(num2, flist) >= 0 || (t1 + t2) <= 10 || t1 == t2) {
      num2 = bt.get_random_num(13, 29);
      t2 = num2 % 10;
    }
    return { 'num1': num1, 'num2': num2 }
  },
  /**
   * @description 设置本地存储，local和session
   * @param {String} type 存储类型，可以为空，默认为session类型。
   * @param {String} key 存储键名
   * @param {String} val 存储键值
   * @return 无返回值
   */
  set_storage: function (type, key, val) {
    if (type != "local" && type != "session") val = key, key = type, type = 'local';
    window[type + 'Storage'].setItem(key, val);
  },


  /**
   * @description 获取本地存储，local和session
   * @param {String} type 存储类型，可以为空，默认为session类型。
   * @param {String} key 存储键名
   * @return {String} 返回存储键值
   */
  get_storage: function (type, key) {
    if (type != "local" && type != "session") key = type, type = 'local';
    return window[type + 'Storage'].getItem(key);
  },

  /**
   * @description 删除指定本地存储，local和session
   * @param {String} type 类型，可以为空，默认为session类型。
   * @param {String} key 键名
   * @return 无返回值
   */
  remove_storage: function (type, key) {
    if (type != "local" && type != "session") key = type, type = 'local';
    window[type + 'Storage'].removeItem(key);
  },

  /**
   * @description 删除指定类型的所有存储信息储，local和session
   * @param {String} type 类型，可以为空，默认为session类型。
   * @return 无返回值
   */
  clear_storage: function (type) {
    if (type != "local" && type != "session") key = type, type = 'local';
    window[type + 'Storage'].clear();
  },
  set_cookie: function (key, val, time) {
    if (time != undefined) {
      var exp = new Date();
      exp.setTime(exp.getTime() + time);
      time = exp.toGMTString();
    } else {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      time = exp.toGMTString();
    }
    var is_https = window.location.protocol == 'https:'
    var samesite = ';Secure; Path=/; SameSite=None'
    document.cookie = key + "=" + escape(val) + ";expires=" + time + (is_https ? samesite : '');
  },
  get_cookie: function (key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      var val = unescape(arr[2]);
      return val == 'undefined' ? '' : val;
    } else {
      return null;
    }
  },
  clear_cookie: function (key) {
    this.set_cookie(key, '', new Date());
  },
  /**
   * @description 选择文件目录或文件
   * @param id {string} 元素ID
   * @param type {string || function} 选择方式，文件或目录
   * @param success {function} 成功后的回调
   */
  select_path: function (id, type, success, default_path) {
    var _this = this;
    _this.set_cookie("SetName", "");
    if (typeof type !== 'string') success = type, type = 'dir';
    var loadT = bt.open({
      type: 1,
      area: "650px",
      title: type === 'all' ? '选择目录和文件' : type === 'file' ? lan.bt.file : lan.bt.dir,
      closeBtn: 2,
      shift: 5,
      content: "<div class='changepath'><div class='path-top'><button type='button' id='btn_back' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-share-alt'></span> " + lan['public']['return'] + "</button><div class='place' id='PathPlace'>" + lan.bt.path + "：<span></span></div></div><div class='path-con'><div class='path-con-left'><dl><dt id='changecomlist' >" + lan.bt.comp + "</dt></dl></div><div class='path-con-right'><ul class='default' id='computerDefautl'></ul><div class='file-list divtable'><table class='table table-hover' style='border:0 none'><thead><tr class='file-list-head'><th width='5%'></th><th width='38%'>" + lan.bt.filename + "</th><th width='24%'>" + lan.bt.etime + "</th><th width='8%'>" + lan.bt.access + "</th><th width='15%'>" + lan.bt.own + "</th></tr></thead><tbody id='tbody' class='list-list'></tbody></table></div></div></div></div><div class='getfile-btn' style='margin-top:0'><button type='button' class='btn btn-default btn-sm pull-left' onclick='CreateFolder()'>" + lan.bt.adddir + "</button><button type='button' class='btn btn-danger btn-sm mr5' onclick=\"layer.close(getCookie('ChangePath'))\">" + lan['public'].close + "</button> <button type='button' id='bt_select' class='btn btn-success btn-sm' >" + lan.bt.path_ok + "</button></div>",
      success: function () {
        $('#btn_back').on('click', function () {
          var path = $("#PathPlace").find("span").text();
          path = bt.rtrim(bt.format_path(path), '/');
          var back_path = bt.get_file_path(path);
          _this.get_file_list(back_path, type);
        })
        //选择
        $('#bt_select').on('click', function () {
          var path = bt.format_path($("#PathPlace").find("span").text());
          if (type === 'file' && !$('#tbody tr.active').length) {
            layer.msg('请选择文件后继续操作！', { icon: 0 })
            return false;
          }
          if ($('#tbody tr').hasClass('active')) {
            path = $('#tbody tr.active .bt_open_dir').attr('path');
          }
          path = bt.rtrim(path, '/');
          $("#" + id).val(path).change();
          $("." + id).val(path).change();
          if (typeof success === "function") success(path)
          loadT.close();
        })
        var element = $("#" + id), paths = element.val(), defaultPath = $('#defaultPath');
        if (defaultPath.length > 0 && element.parents('.tab-body').length > 0) {
          paths = defaultPath.text();
        }
        if (default_path) {
          paths = default_path;
        }
        _this.get_file_list(paths, type);
      }
    })
    _this.set_cookie('ChangePath', loadT.form);
  },
  get_file_list: function (path, type) {
    type = type || 'dir'
    var _that = this;
    bt.send('GetDir', 'files/GetDir', {
      path: path,
      disk: true
    }, function (rdata) {
      var d = '',
        a = '';
      if (rdata.DISK != undefined) {
        for (var f = 0; f < rdata.DISK.length; f++) {
          a += "<dd class=\"bt_open_dir\" path =\"" + rdata.DISK[f].path + "\"><span class='glyphicon glyphicon-hdd'></span>&nbsp;" + rdata.DISK[f].path + "</dd>"
        }
        $("#changecomlist").html(a)
      }
      for (var f = 0; f < rdata.DIR.length; f++) {
        var g = rdata.DIR[f].split(";");
        var e = g[0];
        if (e.length > 20) {
          e = e.substring(0, 20) + "..."
        }
        if (isChineseChar(e)) {
          if (e.length > 10) {
            e = e.substring(0, 10) + "..."
          }
        }
        d += "<tr><td>" + ((type === 'all' || type === 'dir') ? '<input type=\"checkbox\" />' : '') + "</td><td class=\"bt_open_dir\" path =\"" + rdata.PATH + "/" + g[0] + "\" data-type=\"dir\" title='" + g[0] + "'><span class='glyphicon glyphicon-folder-open'></span><span>" + e + "</span></td><td>" + bt.format_data(g[2]) + "</td><td>" + g[3] + "</td><td>" + g[4] + "</td></tr>"
      }

      if (rdata.FILES != null && rdata.FILES != "") {
        for (var f = 0; f < rdata.FILES.length; f++) {
          var g = rdata.FILES[f].split(";");
          var e = g[0];
          if (e.length > 20) {
            e = e.substring(0, 20) + "..."
          }
          if (isChineseChar(e)) {
            if (e.length > 10) {
              e = e.substring(0, 10) + "..."
            }
          }
          d += "<tr><td>" + ((type === 'all' || type === 'file') ? '<input type=\"checkbox\" />' : '') + "<td class=\"bt_open_dir\" title='" + g[0] + "' data-type=\"files\" path =\"" + rdata.PATH + "/" + g[0] + "\"><span class='glyphicon glyphicon-file'></span><span>" + e + "</span></td><td>" + bt.format_data(g[2]) + "</td><td>" + g[3] + "</td><td>" + g[4] + "</td></tr>"
        }
      }

      $(".default").hide();
      $(".file-list").show();
      $("#tbody").html(d);
      if (rdata.PATH.substr(rdata.PATH.length - 1, 1) != "/") {
        rdata.PATH += "/"
      }
      $("#PathPlace").find("span").html(rdata.PATH);
      $("#tbody tr").click(function () {
        if ($(this).find('td:eq(0) input').length > 0) {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('td:eq(0) input').prop('checked', false);
          } else {
            $(this).find('td:eq(0) input').prop('checked', true);
            $(this).siblings().find('td:eq(0) input').prop('checked', false);
            $(this).addClass('active').siblings().removeClass('active');
          }
        }
      });
      $('#changecomlist dd').click(function () {
        _that.get_file_list($(this).attr('path'), type);
      });
      $('.bt_open_dir span').click(function () {
        if ($(this).parent().data('type') == 'dir') _that.get_file_list($(this).parent().attr('path'), type);
      })
    })
  },
  prompt_confirm: function (title, msg, callback) {
    layer.open({
      type: 1,
      title: title,
      area: "350px",
      closeBtn: 2,
      btn: ['确认', '取消'],
      content: "<div class='bt-form promptDelete pd20'>\
            	<p>" + msg + "</p>\
            	<div class='confirm-info-box'>\
            		<input onpaste='return false;' id='prompt_input_box' type='text' value=''>\
            		<div class='placeholder c9 prompt_input_tips' >如果确认操作，请手动输入‘<font style='color: red'>" + title + "</font>’</div>\
                    <div style='margin-top:5px;display: none;' class='prompt_input_ps'>验证码错误，请手动输入‘<font style='color: red'>" + title + "</font>’</div></div>\
            	</div>",
      success: function () {
        var black_txt_ = $('#prompt_input_box')

        $('.placeholder').click(function () {
          $(this).hide().siblings('input').focus()
        })
        black_txt_.focus(function () {
          $('.prompt_input_tips.placeholder').hide()
        })
        black_txt_.blur(function () {
          black_txt_.val() == '' ? $('.prompt_input_tips.placeholder').show() : $('.prompt_input_tips.placeholder').hide()
        });
        black_txt_.keyup(function () {
          if (black_txt_.val() == '') {
            $('.prompt_input_tips.placeholder').show();
            $('.prompt_input_ps').hide();
          } else {
            $('.prompt_input_tips.placeholder').hide();
          }
        })
      },
      yes: function (layers, index) {
        var result = bt.replace_all($("#prompt_input_box").val(), ' ', '')
        if (result == title) {
          layer.close(layers)
          if (callback) callback()
        } else {
          $('.prompt_input_ps').show();
        }
      }
    });
  },
  show_confirm: function (title, msg, callback, error) {
    var d = Math.round(Math.random() * 9 + 1),
      c = Math.round(Math.random() * 9 + 1),
      t = d + " + " + c,
      e = d + c;

    function submit (index, layero) {
      var a = $("#vcodeResult"),
        val = a.val().replace(/ /g, "");
      if (val == undefined || val == "") {
        layer.msg(lan.bt.cal_err);
        return
      }
      if (val != a.data('value')) {
        layer.msg(lan.bt.cal_err);
        return
      }
      layer.close(index);
      if (callback) callback();
    }
    layer.open({
      type: 1,
      title: title,
      area: "365px",
      closeBtn: 2,
      shadeClose: true,
      btn: [lan['public'].ok, lan['public'].cancel],
      content: "<div class='bt-form webDelete pd20'>\
					<p style='font-size:13px;word-break: break-all;margin-bottom: 5px;'>" + msg + "</p>" + (error || '') + "<div class='vcode'>" + lan.bt.cal_msg + "<span class='text'>" + t + "</span>=<input type='number' id='vcodeResult' data-value='" + e + "' value=''></div>\
				</div>",
      success: function (layero, index) {
        $("#vcodeResult").focus().keyup(function (a) {
          if (a.keyCode == 13) {
            submit(index, layero);
          }
        });
      },
      yes: submit
    });
  },
  to_login: function () {
    layer.confirm('您的登陆状态已过期，请重新登陆!', {
      title: '会话已过期',
      icon: 2,
      closeBtn: 1,
      shift: 5
    }, function () {
      location.reload();
    });
  },
  do_login: function () {
    bt.confirm({
      msg: lan.bt.loginout
    }, function () {
      window.location.href = "/login?dologin=True"
    })
  },
  send: function (response, module, data, callback, sType) {

    if (sType == undefined) sType = 1;

    module = module.replace('panel_data', 'data');
    sType = 1;
    var str = bt.get_random(16);
    console.time(str);
    if (!response) alert(lan.get('lack_param', ['response']));
    modelTmp = module.split('/')
    if (modelTmp.length < 2) alert(lan.get('lack_param', ['s_module', 'action']));
    if (bt.os == 'Linux' && sType === 0) {
      socket.on(response, function (rdata) {
        socket.removeAllListeners(response);
        var rRet = rdata.data;
        if (rRet.status === -1) {
          bt.to_login();
          return;
        }
        console.timeEnd(str);
        if (callback) callback(rRet);
      });
      if (!data) data = {};
      data = bt.linux_format_param(data);
      data['s_response'] = response;
      data['s_module'] = modelTmp[0];
      data['action'] = modelTmp[1];
      socket.emit('panel', data)
    } else {
      data = bt.win_format_param(data);
      var url = '/' + modelTmp[0] + '?action=' + modelTmp[1];
      $.post(url, data, function (rdata) {

        //会话失效时自动跳转到登录页面
        if (typeof (rdata) == 'string') {
          if ((rdata.indexOf('/static/favicon.ico') != -1 && rdata.indexOf('/static/img/qrCode.png') != -1) || rdata.indexOf('<!DOCTYPE html>') === 0) {
            window.location.href = "/login"
            return
          }
        }

        if (callback) callback(rdata);
      }).error(function (e, f) {
        if (callback) callback('error');
      });
    }
  },
  linux_format_param: function (param) {
    if (typeof param == 'string') {
      var data = {};
      arr = param.split('&');
      var reg = /(^[^=]*)=(.*)/;
      for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i].match(reg);
        if (tmp.length >= 3) data[tmp[1]] = tmp[2] == 'undefined' ? '' : tmp[2];
      }
      return data;
    }
    return param;
  },
  win_format_param: function (param) {
    if (typeof data == 'object') {
      var data = '';
      for (var key in param) {
        data += key + '=' + param[key] + '&';
      }
      if (data.length > 0) data = data.substr(0, data.length - 1);
      return data;
    }
    return param;
  },
  msg: function (config) {
    var btns = [];
    var btnObj = {
      title: config.title ? config.title : false,
      shadeClose: config.shadeClose ? config.shadeClose : true,
      closeBtn: config.closeBtn ? config.closeBtn : 0,
      scrollbar: true,
      shade: 0.3,
    };
    if (!config.hasOwnProperty('time')) config.time = 2000;
    if (typeof config.msg == 'string' && bt.contains(config.msg, 'ERROR')) config.time = 0;

    if (config.hasOwnProperty('icon')) {
      if (typeof config.icon == 'boolean') config.icon = config.icon ? 1 : 2;
    } else if (config.hasOwnProperty('status')) {
      config.icon = config.status ? 1 : 2;
      if (!config.status) {
        btnObj.time = 0;
      }
    }
    if (config.icon) btnObj.icon = config.icon;
    btnObj.time = config.time;
    var msg = ''
    if (config.msg) msg += config.msg;
    if (config.msg_error) msg += config.msg_error;
    if (config.msg_solve) msg += config.msg_solve;

    layer.msg(msg, btnObj);
  },
  confirm: function (config, callback, callback1) {
    var btnObj = {
      title: config.title ? config.title : false,
      time: config.time ? config.time : 0,
      shadeClose: config.shadeClose ? config.shadeClose : true,
      closeBtn: config.closeBtn ? config.closeBtn : 2,
      scrollbar: true,
      shade: 0.3,
      icon: 3,
      cancel: (config.cancel ? config.cancel : function () { })
    };
    layer.confirm(config.msg, btnObj, function (index) {
      if (callback) callback(index);
    }, function (index) {
      if (callback1) callback1(index);
    });
  },
  load: function (msg) {
    if (!msg) msg = lan['public'].the;
    var loadT = layer.msg(msg, {
      icon: 16,
      time: 0,
      shade: [0.3, '#000']
    });
    var load = {
      form: loadT,
      close: function () {
        layer.close(load.form);
      }
    }
    return load;
  },
  open: function (config) {
    config.closeBtn = 2;
    var loadT = layer.open(config);
    var load = {
      form: loadT,
      close: function () {
        layer.close(load.form);
      }
    }
    return load;
  },
  closeAll: function () {
    layer.closeAll();
  },
  check_select: function () {
    setTimeout(function () {
      var num = $('input[type="checkbox"].check:checked').length;
      if (num == 1) {
        $('button[batch="true"]').hide();
        $('button[batch="false"]').show();
      } else if (num > 1) {
        $('button[batch="true"]').show();
        $('button[batch="false"]').show();
      } else {
        $('button[batch="true"]').hide();
        $('button[batch="false"]').hide();
      }
    }, 5)
  },
  render_help: function (arr) {
    var html = '<ul class="help-info-text c7">';
    for (var i = 0; i < arr.length; i++) {
      html += '<li>' + arr[i] + '</li>';
    }
    html += '</ul>';
    return html;
  },
  render_ps: function (item) {
    var html = '<p class=\'p1\'>' + item.title + '</p>';
    for (var i = 0; i < item.list.length; i++) {
      html += '<p><span>' + item.list[i].title + '：</span><strong>' + item.list[i].val + '</strong></p>';
    }
    html += '<p style="margin-bottom: 19px; margin-top: 11px; color: #666"></p>';
    return html;
  },
  render_table: function (obj, arr, append) { //渲染表单表格
    var html = '';
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        html += '<tr><th>' + key + '</th>'
        if (typeof arr[key] != 'object') {
          html += '<td>' + arr[key] + '</td>';
        } else {
          for (var i = 0; i < arr[key].length; i++) {
            html += '<td>' + arr[key][i] + '</td>';
          }
        }
        html += '</tr>'
      }
    }
    if (append) {
      $('#' + obj).append(html)
    } else {
      $('#' + obj).html(html);
    }
  },

  fixed_table: function (name) {

    $('#' + name).parent().bind('scroll', function () {
      var scrollTop = this.scrollTop;
      $(this).find("thead").css({
        "transform": "translateY(" + scrollTop + "px)",
        "position": "relative",
        "z-index": "1"
      });
    });
  },
  render_tab: function (obj, arr) {
    var _obj = $('#' + obj).addClass("tab-nav");
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var _tab = $('<span ' + (item.on ? 'class="on"' : '') + '>' + item.title + '</span>')
      if (item.callback) {
        _tab.data('callback', item.callback);
        _tab.click(function () {
          $('#' + obj).find('span').removeClass('on');
          $(this).addClass('on');
          var _contents = $('#' + obj).next('.tab-con');
          _contents.html('');
          $(this).data('callback')(_contents);
        })
      }
      _obj.append(_tab);
    }
  },
  render_form_line: function (item, bs, form) {
    var clicks = [],
      _html = '',
      _hide = '',
      is_title_css = ' ml0';
    if (!bs) bs = '';
    if (item.title) {
      _html += '<span class="tname">' + item.title + '</span>';
      is_title_css = '';
    }
    _html += "<div class='info-r " + item['class'] + " " + is_title_css + "'>";

    var _name = item.name;
    var _placeholder = item.placeholder;
    if (item.items && item.type != 'select') {
      for (var x = 0; x < item.items.length; x++) {
        var _obj = item.items[x];
        if (!_name && !_obj.name) {
          alert('缺少必要参数name');
          return;
        }
        if (_obj.hide) continue;
        if (_obj.name) _name = _obj.name;
        if (_obj.placeholder) _placeholder = _obj.placeholder;
        if (_obj.title) _html += '<div class="inlineBlock mr5"><span class="mr5">' + _obj.title + "</span>  ";
        switch (_obj.type) {
          case 'select':
            var _width = _obj.width ? _obj.width : '100px';
            _html += '<select ' + (_obj.disabled ? 'disabled' : '') + ' class="bt-input-text mr5 ' + _name + bs + '" name="' + _name + '" style="width:' + _width + '">';
            for (var j = 0; j < _obj.items.length; j++) {
              _html += '<option ' + (_obj.value == _obj.items[j].value ? 'selected' : '') + ' value="' + _obj.items[j].value + '">' + _obj.items[j].title + '</option>';
            }
            _html += '</select>';
            break;
          case 'textarea':
            var _width = _obj.width ? _obj.width : '330px';
            var _height = _obj.height ? _obj.height : '100px';
            _html += '<textarea class="bt-input-text mr20 ' + _name + bs + '" name="' + _name + '" style="width:' + _width + ';height:' + _height + ';line-height:22px">' + (_obj.value ? _obj.value : '') + '</textarea>';
            if (_placeholder) _html += '<div class="placeholder c9" style="top: 15px; left: 15px; display: block;">' + _placeholder + '</div>';
            break;
          case 'button':
            var _width = _obj.width ? _obj.width : '330px';
            _html += '<button name=\'' + _name + '\' class="btn btn-success btn-sm mr5 ml5 ' + _name + bs + ' ' + (_obj['class'] ? _obj['class'] : '') + '">' + _obj.text + '</button>';
            break;
          case 'radio':
            var _v = _obj.value === true ? 'checked' : ''
            _html += '<input type="radio" class="' + _name + '" id="' + _name + '" name="' + _name + '"  ' + _v + '><label class="mr20" for="' + _name + '" style="font-weight:normal">' + _obj.text + '</label>'
            break;
          case 'checkbox':
            var _v = _obj.value === true ? 'checked' : ''
            _html += '<input type="checkbox" class="' + _name + '" id="' + _name + '" name="' + _name + '"  ' + _v + '><label class="mr20" for="' + _name + '" style="font-weight:normal">' + _obj.text + '</label>'
            break;
          case 'number':
            var _width = _obj.width ? _obj.width : '330px';
            _html += "<input name='" + _name + "' " + (_obj.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='number' style='width:" + _width + "' value='" + (_obj.value ? _obj.value : '0') + "' />";
            _html += _obj.unit ? _obj.unit : '';
            break;
          case 'password':
            var _width = _obj.width ? _obj.width : '330px';
            _html += "<input name='" + _name + "' " + (_obj.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='password' style='width:" + _width + "' value='" + (_obj.value ? _obj.value : '') + "' />";
            break;
          case 'div':
            var _width = _obj.width ? _obj.width : '330px';
            var _height = _obj.height ? _obj.height : '100px';
            _html += '<div class="bt-input-text ace_config_editor_scroll mr20 ' + _name + bs + '" name="' + _name + '" style="width:' + _width + ';height:' + _height + ';line-height:22px">' + (_obj.value ? _obj.value : '') + '</div>';
            if (_placeholder) _html += '<div class="placeholder c9" style="top: 15px; left: 15px; display: block;">' + _placeholder + '</div>';
            break;
          case 'switch':
            _html += '<div style="display: inline-block;vertical-align: middle;">\
                            <input type="checkbox" id="' + _name + '" ' + (_obj.value == true ? 'checked' : '') + ' class="btswitch btswitch-ios">\
                            <label class="btswitch-btn" for="' + _name + '" style="margin-top:5px;"></label>\
                        </div>';
            break;
          default:
            var _width = _obj.width ? _obj.width : '330px';

            _html += "<input name='" + _name + "' " + (_obj.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='text' style='width:" + _width + "' value='" + (_obj.value ? _obj.value : '') + "' />";
            break;
        }
        if (_obj.title) _html += '</div>';
        if (_obj.callback) clicks.push({
          bind: _name + bs,
          callback: _obj.callback
        });
        if (_obj.event) {
          _html += '<span data-id="' + _name + bs + '" class="glyphicon cursor mr5 ' + _obj.event.css + ' icon_' + _name + bs + '" ></span>';
          if (_obj.event.callback) clicks.push({
            bind: 'icon_' + _name + bs,
            callback: _obj.event.callback
          });
        }
        if (_obj.ps) _html += " <span class='c9 mt10'>" + _obj.ps + "</span>";
        if (_obj.ps_help) _html += "<span class='bt-ico-ask " + _obj.name + "_help' tip='" + _obj.ps_help + "'>?</span>";
      }
      if (item.ps) _html += " <span class='c9 mt10'>" + item.ps + "</span>";
    } else {
      switch (item.type) {
        case 'select':
          var _width = item.width ? item.width : '100px';
          _html += '<select ' + (item.disabled ? 'disabled' : '') + ' class="bt-input-text mr5 ' + _name + bs + '" name="' + _name + '" style="width:' + _width + '">';
          for (var j = 0; j < item.items.length; j++) {
            _html += '<option ' + (item.value == item.items[j].value ? 'selected' : '') + ' value="' + item.items[j].value + '">' + item.items[j].title + '</option>';
          }
          _html += '</select>';
          break;
        case 'button':
          var _width = item.width ? item.width : '330px';
          _html += '<button name=\'' + _name + '\' class="btn btn-success btn-sm mr5 ml5 ' + _name + bs + '">' + item.text + '</button>';
          break;
        case 'number':
          var _width = item.width ? item.width : '330px';
          _html += "<input name='" + item.name + "' " + (item.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='number' style='width:" + _width + "' value='" + (item.value ? item.value : '0') + "' />";
          break;
        case 'checkbox':
          var _v = item.value === true ? 'checked' : ''
          _html += '<input type="checkbox" class="' + _name + '" id="' + _name + '" name="' + _name + '"  ' + _v + '><label class="mr20" for="' + _name + '" style="font-weight:normal">' + item.text + '</label>'
          break;
        case 'password':
          var _width = item.width ? item.width : '330px';
          _html += "<input name='" + _name + "' " + (item.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='password' style='width:" + _width + "' value='" + (item.value ? item.value : '') + "' />";
          break;
        case 'textarea':
          var _width = item.width ? item.width : '330px';
          var _height = item.height ? item.height : '100px';
          _html += '<textarea class="bt-input-text mr20 ' + _name + bs + '"  ' + (item.disabled ? 'disabled' : '') + '  name="' + _name + '" style="width:' + _width + ';height:' + _height + ';line-height:22px">' + (item.value ? item.value : '') + '</textarea>';
          if (_placeholder) _html += '<div class="placeholder c9" style="top: 15px; left: 15px; display: block;">' + _placeholder + '</div>';
          break;
        default:
          var _width = item.width ? item.width : '330px';

          _html += "<input name='" + item.name + "' " + (item.disabled ? 'disabled' : '') + " class='bt-input-text mr5 " + _name + bs + "' " + (_placeholder ? ' placeholder="' + _placeholder + '"' : "") + " type='text' style='width:" + _width + "' value='" + (item.value ? item.value : '') + "' />";
          break;
      }
      if (item.callback) clicks.push({
        bind: _name + bs,
        callback: item.callback
      });
      if (item.ps) _html += " <span class='c9 mt10 mr5'>" + item.ps + "</span>";
    }
    _html += '</div>';
    if (!item['class']) item['class'] = '';
    if (item.hide) _hide = 'style="display:none;"'
    _html = '<div class="line ' + item['class'] + '" ' + _hide + '>' + _html + '</div>'

    if (form) {
      form.append(_html)
      bt.render_clicks(clicks)
    }
    return {
      html: _html,
      clicks: clicks,
      data: item
    };
  },
  render_form: function (data, callback) {
    if (data) {
      var bs = '_' + bt.get_random(6);
      var _form = $("<div data-id='form" + bs + "' class='bt-form bt-form pd20 pb70 " + (data['class'] ? data['class'] : '') + "'></div>");
      var _lines = data.list;
      var clicks = [];
      for (var i = 0; i < _lines.length; i++) {
        var _obj = _lines[i]
        if (_obj.hasOwnProperty("html")) {
          _form.append(_obj.html)
        } else {
          var rRet = bt.render_form_line(_obj, bs);
          for (var s = 0; s < rRet.clicks.length; s++) clicks.push(rRet.clicks[s]);
          _form.append(rRet.html);
        }
      }

      var _btn_html = '';
      for (var i = 0; i < data.btns.length; i++) {
        var item = data.btns[i];
        var css = item.css ? item.css : 'btn-danger';
        _btn_html += "<button type='button' class='btn btn-sm " + css + " " + item.name + bs + "' >" + item.title + "</button>";
        clicks.push({
          bind: item.name + bs,
          callback: item.callback
        });
      }
      _form.append("<div class='bt-form-submit-btn'>" + _btn_html + "</div>");
      var loadOpen = bt.open({
        type: 1,
        skin: data.skin,
        area: data.area,
        title: data.title,
        closeBtn: 2,
        content: _form.prop("outerHTML"),
        end: data.end ? data.end : false
      })
      setTimeout(function () {
        bt.render_clicks(clicks, loadOpen, callback);
      }, 100)
    }
    return bs;
  },
  render_clicks: function (clicks, loadOpen, callback) {
    for (var i = 0; i < clicks.length; i++) {
      var obj = clicks[i];

      var btn = $('.' + obj.bind);
      btn.data('item', obj);
      btn.data('load', loadOpen);
      btn.data('callback', callback);

      switch (btn.prop("tagName")) {
        case 'SPAN':
          btn.click(function () {
            var _obj = $(this).data('item');
            _obj.callback($(this).attr('data-id'));
          })
          break;
        case 'SELECT':
          btn.change(function () {
            var _obj = $(this).data('item');
            _obj.callback($(this));
          })
          break;
        case 'TEXTAREA':
        case 'INPUT':
        case 'BUTTON':
          if (btn.prop("tagName") == 'BUTTON' || btn.attr("type") == 'checkbox') {
            btn.click(function () {

              var _obj = $(this).data('item');
              var load = $(this).data('load');
              var _callback = $(this).data('callback');
              var parent = $(this).parents('.bt-form').length === 0 ? $(this).parents('.bt-w-con') : $(this).parents('.bt-form');

              if (_obj.callback) {

                var data = {};
                parent.find('*').each(function (index, _this) {
                  var _name = $(_this).attr('name');

                  if (_name) {
                    if ($(_this).attr('type') == 'checkbox' || $(_this).attr('type') == 'radio') {
                      data[_name] = $(_this).prop('checked');
                    } else {
                      data[_name] = $(_this).val();
                    }
                  }
                })
                console.log(data)
                _obj.callback(data, load, function (rdata) {
                  if (_callback) _callback(rdata);
                });
              } else {
                load.close();
              }
            })
          } else {
            if (btn.attr("type") == 'radio') {
              btn.click(function () {
                var _obj = $(this).data('item');
                _obj.callback($(this))
              })
            } else {
              btn.on('input', function () {
                var _obj = $(this).data('item');
                _obj.callback($(this));
              })
            }
          }
          break;
      }
    }
  },
  render: function (obj) //columns 行
  {
    if (obj.columns) {
      var checks = {};
      $(obj.table).html('');
      var thead = '<thead><tr>';
      for (var h = 0; h < obj.columns.length; h++) {
        var item = obj.columns[h];
        if (item) {
          thead += '<th';
          if (item.width) thead += ' width="' + item.width + '" ';
          if (item.align || item.sort) {
            thead += ' style="';
            if (item.align) thead += 'text-align:' + item.align + ';';
            if (item.sort) thead += item.sort ? 'cursor: pointer;' : '';
            thead += '"';
          }
          if (item.type == 'checkbox') {
            thead += '><input  class="check"  onclick="bt.check_select();" type="checkbox">';
          } else {
            thead += '>' + item.title;
          }
          if (item.sort) {
            checks[item.field] = item.sort;
            thead += ' <span data-id="' + item.field + '" class="glyphicon glyphicon-triangle-top" style="margin-left:5px;color:#bbb"></span>';
          }
          if (item.help) thead += '<a href="' + item.help + '" class="bt-ico-ask" target="_blank" title="点击查看说明">?</a>';

          thead += '</th>';
        }
      }
      thead += '</tr></thead>';
      var _tab = $(obj.table).append(thead);
      if (obj.data.length > 0) {
        for (var i = 0; i < obj.data.length; i++) {
          var val = obj.data[i];
          var tr = $('<tr></tr>');
          for (var h = 0; h < obj.columns.length; h++) {
            var item = obj.columns[h];
            if (item) {
              var _val = val[item.field];
              if (typeof _val == 'string') _val = _val.replace(/\\/g, '');
              if (item.hasOwnProperty('templet')) _val = item.templet(val);
              if (item.type == 'checkbox') _val = '<input value=' + val[item.field] + '  class="check" onclick="bt.check_select();" type="checkbox">';
              var td = '<td ';
              if (item.align) {
                td += 'style="';
                if (item.align) td += 'text-align:' + item.align;
                td += '"';
              }
              if (item.index) td += 'data-index="' + i + '" '
              td += '>';
              tr.append(td + _val + '</td>');
              tr.data('item', val);
              _tab.append(tr);
            }
          }
        }
      } else {
        _tab.append("<tr><td colspan='" + obj.columns.length + "'>" + lan.bt.no_data + "</td></tr>");
      }
      $(obj.table).find('.check').click(function () {
        var checked = $(this).prop('checked');
        if ($(this).parent().prop('tagName') == 'TH') {
          $('.check').prop('checked', checked ? 'checked' : '');
        }
      })
      var asc = 'glyphicon-triangle-top';
      var desc = 'glyphicon-triangle-bottom';

      var orderby = bt.get_cookie('order');
      if (orderby != undefined) {
        var arrys = orderby.split(' ')
        if (arrys.length == 2) {
          if (arrys[1] == 'asc') {
            $(obj.table).find('th span[data-id="' + arrys[0] + '"]').removeClass(desc).addClass(asc);
          } else {
            $(obj.table).find('th span[data-id="' + arrys[0] + '"]').removeClass(asc).addClass(desc);
          }
        }
      }

      $(obj.table).find('th').data('checks', checks).click(function () {
        var _th = $(this);
        var _checks = _th.data('checks');
        var _span = _th.find('span');
        if (_span.length > 0) {
          var or = _span.attr('data-id');
          if (_span.hasClass(asc)) {
            bt.set_cookie('order', or + ' desc');
            $(obj.table).find('th span[data-id="' + or + '"]').removeClass(asc).addClass(desc);
            _checks[or]();

          } else if (_span.hasClass(desc)) {
            bt.set_cookie('order', or + ' asc');
            $(obj.table).find('th span[data-id="' + arrys[0] + '"]').removeClass(desc).addClass(asc);
            _checks[or]();
          }
        }
      })
    }
    return _tab;
  },
  // ACE编辑配置文件
  aceEditor: function (obj) {
    var aEditor = {
      ACE: ace.edit(obj.el, {
        theme: "ace/theme/chrome", //主题
        mode: "ace/mode/" + (obj.mode || 'nginx'), // 语言类型
        wrap: true,
        showInvisibles: false,
        showPrintMargin: false,
        showFoldWidgets: false,
        useSoftTabs: true,
        tabSize: 2,
        showPrintMargin: false,
        readOnly: false
      }),
      path: obj.path,
      content: '',
      saveCallback: obj.saveCallback
    },
      _this = this;
    $('#' + obj.el).css('fontSize', '12px');
    aEditor.ACE.commands.addCommand({
      name: '保存文件',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
      },
      exec: function (editor) {
        _this.saveEditor(aEditor, aEditor.saveCallback);
      },
      readOnly: false // 如果不需要使用只读模式，这里设置false
    });
    if (obj.path != undefined) {
      var loadT = layer.msg(lan.soft.get_config, {
        icon: 16,
        time: 0,
        shade: [0.3, '#000']
      })
      bt.send('GetFileBody', 'files/GetFileBody', {
        path: obj.path
      }, function (res) {
        layer.close(loadT);
        if (!res.status) {
          bt.msg(res);
          return false;
        }
        aEditor.ACE.setValue(res.data); //设置配置文件内容
        aEditor.ACE.moveCursorTo(0, 0); //设置文件光标位置
        aEditor.ACE.resize();
      });
    } else if (obj.content != undefined) {
      aEditor.ACE.setValue(obj.content);
      aEditor.ACE.moveCursorTo(0, 0); //设置文件光标位置
      aEditor.ACE.resize();
    }
    return aEditor;
  },
  // 保存编辑器文件
  saveEditor: function (ace) {
    if (!ace.saveCallback) {
      var loadT = bt.load(lan.soft.the_save);
      bt.send('SaveFileBody', 'files/SaveFileBody', {
        data: ace.ACE.getValue(),
        path: ace.path,
        encoding: 'utf-8'
      }, function (rdata) {
        loadT.close();
        bt.msg(rdata);
      });
    } else {
      ace.saveCallback(ace.ACE.getValue());
    }
  },
  /**
   * @description 遍历数组和对象
   * @param {Array|Object} obj 遍历数组|对象
   * @param {Function} fn 遍历对象或数组
   * @return 当前对象
   */
  each: function (obj, fn) {
    var key, that = this;
    if (typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
      for (key in obj) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    } else {
      for (key = 0; key < obj.length; key++) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    }
    return that;
  },

  /**
   * @description 获取时间简化缩写
   * @param {Numbre} dateTimeStamp 需要转换的时间戳
   * @return {String} 简化后的时间格式
   */
  get_simplify_time: function (dateTimeStamp) {
    if (dateTimeStamp === 0) return '刚刚';
    if (dateTimeStamp.toString().length === 10) dateTimeStamp = dateTimeStamp * 1000
    var minute = 1000 * 60, hour = minute * 60, day = hour * 24, month = day * 30, now = new Date().getTime(), diffValue = now - dateTimeStamp;
    if (diffValue < 0) return '刚刚';
    var monthC = diffValue / month, weekC = diffValue / (7 * day), dayC = diffValue / day, hourC = diffValue / hour, minC = diffValue / minute, result = '';
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }
    return result;
  }
};

bt.pub = {
  get_data: function (data, callback, hide) {
    if (!hide) var loading = bt.load(lan['public'].the);
    bt.send('getData', 'data/getData', data, function (rdata) {
      if (loading) loading.close();
      if (callback) callback(rdata);
    })
  },
  set_data_by_key: function (tab, key, obj) {
    var _span = $(obj);
    var _input = $("<input class='baktext' type='text' placeholder='" + lan.ftp.ps + "' />").val(_span.text())
    _span.hide().after(_input);
    _input.focus();
    _input.blur(function () {
      var item = $(this).parents('tr').data('item');
      var _txt = $(this);
      var data = {
        table: tab,
        id: item.id
      };
      data[key] = _txt.val()
      bt.pub.set_data_ps(data, function (rdata) {
        if (rdata.status) {
          _span.text(_txt.val());
          _span.show();
          _txt.remove();
        }
      })
    })
    _input.keyup(function () {
      if (event.keyCode == 13) {
        _input.trigger("blur");
      }
    })
  },
  set_data_ps: function (data, callback) {
    bt.send('setPs', 'data/setPs', data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_server_status: function (serverName, type) {
    if (bt.contains(serverName, 'php-')) {
      serverName = "php-fpm-" + serverName.replace('php-', '').replace('.', '');
    }
    if (serverName == 'pureftpd') serverName = 'pure-ftpd';
    if (serverName == 'mysql') serverName = 'mysqld';
    serverName = serverName.replace('_soft', '');
    var data = "name=" + serverName + "&type=" + type;
    var msg = lan.bt[type];
    var typeName = '';
    switch (type) {
      case 'stop':
        typeName = '停止';
        break;
      case 'restart':
        typeName = '重启';
        break;
      case 'reload':
        typeName = '重载';
        break;
    }
    bt.confirm({
      msg: lan.get('service_confirm', [msg, serverName]),
      title: typeName + serverName + '服务'
    }, function () {
      var load = bt.load(lan.get('service_the', [msg, serverName]))
      bt.send('system', 'system/ServiceAdmin', data, function (rdata) {
        load.close();
        var f = rdata.status ? lan.get('service_ok', [serverName, msg]) : lan.get('service_err', [serverName, msg]);
        bt.msg({
          msg: f,
          icon: rdata.status
        })

        if (type != "reload" && rdata.status) {
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        }
        if (!rdata.status) {
          bt.msg(rdata);
        }
      })
    })
  },
  set_server_status_by: function (data, callback) {
    bt.send('system', 'system/ServiceAdmin', data, function (rdata) {
      if (callback) callback(rdata)
    })
  },
  get_task_count: function (callback) {
    bt.send('GetTaskCount', 'ajax/GetTaskCount', {}, function (rdata) {
      $(".task").text(rdata);
      if (callback) callback(rdata);
    })
  },
  check_install: function (callback) {
    bt.send('CheckInstalled', 'ajax/CheckInstalled', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_user_info: function (callback) {
    var loading = bt.load();
    bt.send('GetUserInfo', 'ssl/GetUserInfo', {}, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  show_hide_pass: function (obj) {
    var a = "glyphicon-eye-open";
    var b = "glyphicon-eye-close";

    if ($(obj).hasClass(a)) {
      $(obj).removeClass(a).addClass(b);
      $(obj).prev().text($(obj).prev().attr('data-pw'))
    } else {
      $(obj).removeClass(b).addClass(a);
      $(obj).prev().text('**********');
    }
  },
  copy_pass: function (password) {
    var clipboard = new ClipboardJS('#bt_copys');
    clipboard.on('success', function (e) {
      bt.msg({
        msg: '复制成功',
        icon: 1
      });
    });

    clipboard.on('error', function (e) {
      bt.msg({
        msg: '复制失败，浏览器不兼容!',
        icon: 2
      });
    });
    $("#bt_copys").attr('data-clipboard-text', password);
    $("#bt_copys").click();
  },
  login_btname: function (username, password, callback) {
    var loadT = bt.load(lan.config.token_get);
    bt.send('GetToken', 'ssl/GetToken', {
      username: username,
      password: password
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (rdata.status) {
        if (callback) callback(rdata)
      }
    })
  },
  bind_btname: function (callback) {
    new BindAccount().bindUserView(1);
  },
  unbind_bt: function () {
    var name = $("input[name='btusername']").val();
    bt.confirm({
      msg: lan.config.binding_un_msg,
      title: lan.config.binding_un_title
    }, function () {
      bt.send('DelToken', 'ssl/DelToken', {}, function (rdata) {
        bt.msg(rdata);
        $("input[name='btusername']").val('');
      })
    })
  },
  get_menm: function (callback) {
    var loading = bt.load();
    bt.send('GetMemInfo', 'system/GetMemInfo', {}, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  on_edit_file: function (type, fileName) {
    if (type != 0) {
      var l = $("#PathPlace input").val();
      var body = encodeURIComponent($("#textBody").val());
      var encoding = $("select[name=encoding]").val();
      var loadT = bt.load(lan.bt.save_file);
      bt.send('SaveFileBody', 'files/SaveFileBody', "data=" + body + "&path=" + fileName + "&encoding=" + encoding, function (rdata) {
        if (type == 1) loadT.close();
        bt.msg(rdata);
      })
      return;
    }
    var loading = bt.load(lan.bt.read_file);
    ext = bt.get_file_ext(fileName);

    bt.send('GetFileBody', 'files/GetFileBody', 'path=' + fileName, function (rdata) {
      if (!rdata.status) {
        bt.msg({
          msg: rdata.msg,
          icon: 5
        });
        return;
      }
      loading.close();
      var u = ["utf-8", "GBK", "GB2312", "BIG5"];
      var n = "";
      var m = "";
      var o = "";
      for (var p = 0; p < u.length; p++) {
        m = rdata.encoding == u[p] ? "selected" : "";
        n += '<option value="' + u[p] + '" ' + m + ">" + u[p] + "</option>"
      }
      var aceEditor = {},
        r = bt.open({
          type: 1,
          shift: 5,
          closeBtn: 1,
          area: ["90%", "90%"],
          shade: false,
          title: lan.bt.edit_title + "[" + fileName + "]",
          btn: [lan['public'].save, lan['public'].close],
          content: '<form class="bt-form pd20 pb70"><div class="line"><p style="color:red;margin-bottom:10px">' + lan.bt.edit_ps +
            '		<select class="bt-input-text" name="encoding" style="width: 74px;position: absolute;top: 31px;right: 19px;height: 22px;z-index: 9999;border-radius: 0;">' +
            n + '</select></p><div class="mCustomScrollbar bt-input-text ace_config_editor_scroll" id="textBody" style="width:100%;margin:0 auto;line-height: 1.8;position: relative;top: 10px;"></div></div></form>',
          yes: function (layer, index) {
            bt.saveEditor(aceEditor);
          },
          btn2: function (layer, index) {
            r.close();
          },
          success: function () {
            var q = $(window).height() * 0.9;
            $("#textBody").height(q - 160);
            aceEditor = bt.aceEditor({
              el: 'textBody',
              content: rdata.data,
              mode: 'html',
              saveCallback: function (val) {
                bt.send('SaveFileBody', 'files/SaveFileBody', {
                  path: fileName,
                  encoding: $('[name="encoding"] option:selected').val(),
                  data: val
                }, function (rdata) {
                  bt.msg(rdata);
                });
              }
            });
          }
        })

    })
  }
};

bt.index = {
  rec_install: function () {
    bt.send('GetSoftList', 'ajax/GetSoftList', {}, function (l) {

      var c = "";
      var g = "";
      var e = "";
      for (var h = 0; h < l.length; h++) {
        if (l[h].name == "Tomcat") {
          continue
        }
        var o = "";
        var m = "<input id='data_" + l[h].name + "' data-info='" + l[h].name + " " + l[h].versions[0].version + "' type='checkbox' checked>";
        for (var b = 0; b < l[h].versions.length; b++) {
          var d = "";
          if ((l[h].name == "PHP" && (l[h].versions[b].version == "5.6" || l[h].versions[b].version == "5.6")) || (l[h].name == "MySQL" && l[h].versions[b].version == "5.6") || (l[h].name == "phpMyAdmin" && l[h].versions[b].version == "4.4")) {
            d = "selected";
            m = "<input id='data_" + l[h].name + "' data-info='" + l[h].name + " " + l[h].versions[b].version + "' type='checkbox' checked>"
          }
          o += "<option value='" + l[h].versions[b].version + "' " + d + ">" + l[h].name + " " + l[h].versions[b].version + "</option>"
        }
        var f = "<li><span class='ico'><img src='/static/img/" + l[h].name.toLowerCase() + ".png'></span><span class='name'><select id='select_" + l[h].name + "' class='sl-s-info'>" + o + "</select></span><span class='pull-right'>" + m + "</span></li>";
        if (l[h].name == "Nginx") {
          c = f
        } else {
          if (l[h].name == "Apache") {
            g = f
          } else {
            e += f
          }
        }
      }
      c += e;
      g += e;

      g = g.replace(new RegExp(/(data_)/g), "apache_").replace(new RegExp(/(select_)/g), "apache_select_");
      var k = layer.open({
        type: 1,
        title: lan.bt.install_title,
        area: ["670px", "510px"],
        closeBtn: 2,
        shadeClose: false,
        content: "<div class='rec-install'><div class='important-title'><p><span class='glyphicon glyphicon-alert' style='color: #f39c12; margin-right: 10px;'></span>" + lan.bt.install_ps + " <a href='javascript:jump()' style='color:#20a53a'>" + lan.bt.install_s + "</a> " + lan.bt.install_s1 + "</p></div><div class='rec-box'><h3>" + lan.bt.install_lnmp + "</h3><div class='rec-box-con'><ul class='rec-list'>" + c + "</ul><p class='fangshi1'>" + lan.bt.install_type + "：<label data-title='" + lan.bt.install_rpm_title + "'><span>" + lan.bt.install_rpm + "</span><input type='checkbox' checked></label><label data-title='" + lan.bt.install_src_title + "'><span>" + lan.bt.install_src + "</span><input type='checkbox'></label></p><div class='onekey'>" + lan.bt.install_key + "</div></div></div><div class='rec-box' style='margin-left:16px'><h3>LAMP</h3><div class='rec-box-con'><ul class='rec-list'>" + g + "</ul><p class='fangshi1'>" + lan.bt.install_type + "：<label data-title='" + lan.bt.install_rpm_title + "'><span>" + lan.bt.install_rpm + "</span><input type='checkbox' checked></label><label data-title='" + lan.bt.install_src_title + "'><span>" + lan.bt.install_src + "</span><input type='checkbox'></label></p><div class='onekey'>" + lan.bt.install_key + "</div></div></div></div>",
        success: function () {
          form_group.select_all([
            '#select_Nginx',
            '#select_MySQL',
            '#select_Pure-Ftpd',
            '#select_PHP',
            '#select_phpMyAdmin',
            '#apache_select_Apache',
            '#apache_select_MySQL',
            '#apache_select_Pure-Ftpd',
            '#apache_select_PHP',
            '#apache_select_phpMyAdmin'
          ]);
          form_group.checkbox();
          $('.layui-layer-content').css('overflow', 'inherit');
          $('.fangshi1 label').click(function () {
            var input = $(this).find('input'),
              siblings_label = input.parents('label').siblings()
            input.prop('checked', 'checked').next().addClass('active');
            siblings_label.find('input').removeAttr('checked').next().removeClass('active');
          });
          var loadT = '';
          $('.fangshi1 label').hover(function () {
            var _title = $(this).attr('data-title'),
              _that = $(this);
            loadT = setTimeout(function () {
              layer.tips(_title, _that[0], {
                tips: [1, '#20a53a'], //还可配置颜色
                time: 0
              });
            }, 500);
          }, function () {
            clearTimeout(loadT);
            layer.closeAll('tips');
          });
        }
      });
      $(".sl-s-info").change(function () {
        var p = $(this).find("option:selected").text();
        var n = $(this).attr("id");
        p = p.toLowerCase();
        $(this).parents("li").find("input").attr("data-info", p)
      });
      $("#apache_select_PHP").change(function () {
        var n = $(this).val();
        j(n, "apache_select_", "apache_")
      });
      $("#select_PHP").change(function () {
        var n = $(this).val();
        j(n, "select_", "data_")
      });

      function j (p, r, q) {
        var n = "4.4";
        switch (p) {
          case "5.2":
            n = "4.0";
            break;
          case "5.3":
            n = "4.0";
            break;
          case "5.4":
            n = "4.4";
            break;
          case "5.5":
            n = "4.4";
            break;
          default:
            n = "4.9"
        }
        $("#" + r + "phpMyAdmin option[value='" + n + "']").attr("selected", "selected").siblings().removeAttr("selected");
        $("#" + q + "phpMyAdmin").attr("data-info", "phpmyadmin " + n)
      }
      $("#select_MySQL,#apache_select_MySQL").change(function () {
        var n = $(this).val();
        a(n)
      });

      $("#apache_select_Apache").change(function () {
        var apacheVersion = $(this).val();
        if (apacheVersion == '2.2') {
          layer.msg(lan.bt.install_apache22);
        } else {
          layer.msg(lan.bt.install_apache24);
        }
      });

      $("#apache_select_PHP").change(function () {
        var apacheVersion = $("#apache_select_Apache").val();
        var phpVersion = $(this).val();
        if (apacheVersion == '2.2') {
          if (phpVersion != '5.2' && phpVersion != '5.3' && phpVersion != '5.4') {
            layer.msg(lan.bt.insatll_s22 + 'PHP-' + phpVersion, {
              icon: 5
            });
            $(this).val("5.4");
            $("#apache_PHP").attr('data-info', 'php 5.4');
            return false;
          }
        } else {
          if (phpVersion == '5.2') {
            layer.msg(lan.bt.insatll_s24 + 'PHP-' + phpVersion, {
              icon: 5
            });
            $(this).val("5.4");
            $("#apache_PHP").attr('data-info', 'php 5.4');
            return false;
          }
        }
      });

      function a (n) {
        memSize = bt.get_cookie("memSize");
        max = 64;
        msg = "64M";
        switch (n) {
          case "5.1":
            max = 256;
            msg = "256M";
            break;
          case "5.7":
            max = 1500;
            msg = "2GB";
            break;
          case "8.0":
            max = 5000;
            msg = "6GB";
            break;
          case "5.6":
            max = 800;
            msg = "1GB";
            break;
          case "AliSQL":
            max = 800;
            msg = "1GB";
            break;
          case "mariadb_10.0":
            max = 800;
            msg = "1GB";
            break;
          case "mariadb_10.1":
            max = 1500;
            msg = "2GB";
            break
        }
        if (memSize < max) {
          layer.msg(lan.bt.insatll_mem.replace("{1}", msg).replace("{2}", n), {
            icon: 5
          })
        }
      }
      var de = null;
      $(".onekey").click(function () {
        if (de) return;
        var v = $(this).prev().find("input").eq(0).prop("checked") ? "1" : "0";
        var r = $(this).parents(".rec-box-con").find(".rec-list li").length;
        var n = "";
        var q = "";
        var p = "";
        var x = "";
        var s = "";
        de = true;
        for (var t = 0; t < r; t++) {
          var w = $(this).parents(".rec-box-con").find("ul li").eq(t);
          var u = w.find("input");
          if (u.prop("checked")) {
            n += u.attr("data-info") + ","
          }
        }
        q = n.split(",");
        loadT = layer.msg(lan.bt.install_to, {
          icon: 16,
          time: 0,
          shade: [0.3, "#000"]
        });

        install_plugin(q);

        function install_plugin (q) {
          if (!q[0]) return;
          p = q[0].split(" ")[0].toLowerCase();
          x = q[0].split(" ")[1];
          if (p == 'pure-ftpd') p = 'pureftpd';
          if (p == 'php') p = 'php-' + x;

          s = "sName=" + p + "&version=" + x + "&type=" + v + "&id=" + (t + 1);
          bt.send('install_plugin', 'plugin/install_plugin', s, function () {
            q.splice(0, 1);
            install_plugin(q);
          });
        }

        layer.close(loadT);
        layer.close(k);
        setTimeout(function () {
          GetTaskCount()
        }, 2000);
        layer.msg(lan.bt.install_ok, {
          icon: 1
        });
        setTimeout(function () {
          task()
        }, 1000)
      });
    })
  }
}

bt.weixin = {
  settiming: '',
  relHeight: 500,
  relWidth: 500,
  userLength: '',
  get_user_info: function (callback) {
    bt.send('get_user_info', 'panel_wxapp/get_user_info', {}, function (rdata) {
      if (callback) callback(rdata);
    }, 1)
  },
  init: function () {
    var _this = this;
    $('.layui-layer-page').css('display', 'none');
    $('.layui-layer-page').width(_this.relWidth);
    $('.layui-layer-page').height(_this.relHeight);
    $('.bt-w-menu').height((_this.relWidth - 1) - $('.layui-layer-title').height());
    var width = $(document).width();
    var height = $(document).height();
    var boxwidth = (width / 2) - (_this.relWidth / 2);
    var boxheight = (height / 2) - (_this.relHeight / 2);
    $('.layui-layer-page').css({
      'left': boxwidth + 'px',
      'top': boxheight + 'px'
    });
    $('.boxConter,.layui-layer-page').css('display', 'block');
    $('.layui-layer-close').click(function (event) {
      window.clearInterval(_this.settiming);
    });
    this.get_user_details();
    $('.iconCode').hide();
    $('.personalDetails').show();
  },
  // 获取二维码
  get_qrcode: function () {
    var _this = this;
    var qrLoading = bt.load(lan.config.config_qrcode);

    bt.send('blind_qrcode', 'panel_wxapp/blind_qrcode', {}, function (res) {
      qrLoading.close();
      if (res.status) {
        $('#QRcode').empty();
        $('#QRcode').qrcode({
          render: "canvas", //也可以替换为table
          width: 200,
          height: 200,
          text: res.msg
        });
        _this.settiming = setInterval(function () {
          _this.verify_binding();
        }, 2000);
      } else {
        bt.msg(res);
      }
    })
  },
  // 获取用户信息
  get_user_details: function (type) {
    var _this = this;
    var conter = '';
    _this.get_user_info(function (res) {
      clearInterval(_this.settiming);
      if (!res.status) {
        res.time = 3000;
        bt.msg(res);

        $('.iconCode').hide();
        return false;
      }
      if (JSON.stringify(res.msg) == '{}') {
        if (type) {
          bt.msg({
            msg: lan.config.qrcode_no_list,
            icon: 2
          })
        } else {
          _this.get_qrcode();
        }
        $('.iconCode').show();
        $('.personalDetails').hide();
        return false;
      }
      $('.iconCode').hide();
      $('.personalDetails').show();
      var datas = res.msg;
      for (var item in datas) {
        conter += '<li class="item">\
								<div class="head_img"><img src="' + datas[item].avatarUrl + '" title="用户头像" /></div>\
								<div class="nick_name"><span>昵称:</span><span class="nick"></span>' + datas[item].nickName + '</div>\
								<div class="cancelBind">\
									<a href="javascript:;" class="btlink" title="取消当前微信小程序的绑定" onclick="bt.weixin.cancel_bind(' + item + ')">取消绑定</a>\
								</div>\
							</li>'
      }
      conter += '<li class="item addweChat" style="height:45px;"><a href="javascript:;" class="btlink" onclick="bt.weixin.add_wx_view()"><span class="glyphicon glyphicon-plus"></span>添加绑定账号</a></li>'
      $('.userList').empty().append(conter);
    })
  },
  // 添加绑定视图
  add_wx_view: function () {
    $('.iconCode').show();
    $('.personalDetails').hide();
    this.get_qrcode();
  },
  // 取消当前绑定
  cancel_bind: function (uid) {
    var _this = this;
    var bdinding = layer.confirm('您确定要取消当前绑定吗？', {
      btn: ['确认', '取消'],
      icon: 3,
      title: '取消绑定'
    }, function () {
      bt.send("blind_del", "panel_wxapp/blind_del", {
        uid: uid
      }, function (res) {
        bt.msg(res);
        _this.get_user_details();
      })
    }, function () {
      layer.close(bdinding);
    });
  },
  // 监听是否绑定
  verify_binding: function () {
    var _this = this;
    bt.send('blind_result', 'panel_wxapp/blind_result', {}, function (res) {
      if (res) {
        bt.msg({
          status: true,
          msg: '绑定成功!'
        });
        clearInterval(_this.settiming);
        _this.get_user_details();
      }
    })
  },
  open_wxapp: function () {
    var rhtml = '<div class="boxConter" style="display: none">\
								<div class="iconCode" >\
									<div class="box-conter">\
										<div id="QRcode"></div>\
										<div class="codeTip">\
											<ul>\
												<li>1、打开宝塔面板小程序<span class="btlink weChat">小程序二维码<div class="weChatSamll"><img src="https://app.bt.cn/static/app.png"></div></span></li>\
												<li>2、使用宝塔小程序扫描当前二维码，绑定该面板</li>\
											</ul>\
											<span><a href="javascript:;" title="返回面板绑定列表" class="btlink" style="margin: 0 auto" onclick="bt.weixin.get_user_details(true)">查看绑定列表</a></span>\
										</div>\
									</div>\
								</div>\
								<div class="personalDetails" style="display: none">\
									<ul class="userList"></ul>\
								</div>\
							</div>'

    bt.open({
      type: 1,
      title: "绑定微信",
      area: '500px',
      shadeClose: false,
      content: rhtml
    })
    bt.weixin.init();
  }
};

bt.ftp = {
  get_list: function (page, search, callback) {
    if (page == undefined) page = 1
    search = search == undefined ? '' : search;
    var order = bt.get_cookie('order') ? '&order=' + bt.get_cookie('order') : '';

    var data = 'tojs=ftp.get_list&table=ftps&limit=15&p=' + page + '&search=' + search + order;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  add: function (callback) {
    bt.data.ftp.add.list[1].items[0].value = bt.get_random(16);
    var bs = bt.render_form(bt.data.ftp.add, function (rdata) {
      if (callback) callback(rdata);
    });
    $('.path' + bs).val($("#defaultPath").text());
  },
  set_password: function (callback) {
    var bs = bt.render_form(bt.data.ftp.set_password, function (rdata) {
      if (callback) callback(rdata);
    });
    return bs;
  },
  del: function (id, username, callback) {
    var loading = bt.load(lan.get('del_all_task_the', [username]));
    bt.send('DeleteUser', 'ftp/DeleteUser', {
      id: id,
      username: username
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_status: function (id, username, status, callback) {
    var loadT = bt.load(lan['public'].the);
    var data = 'id=' + id + '&username=' + username + '&status=' + status;
    bt.send('SetStatus', 'ftp/SetStatus', data, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  set_port: function (callback) {
    var bs = bt.render_form(bt.data.ftp.set_port, function (rdata) {
      if (callback) callback(rdata);
    });
    return bs;
  }
}

bt.recycle_bin = {
  open_recycle_bin: function (type) {
    if (type == undefined) type = 1;
    bt.files.get_recycle_bin(type, function (rdata) {
      var data = [];
      switch (type) {
        case 2:
          data = rdata.dirs;
          break;
        case 3:
          data = rdata.files;
          break;
        case 4:
        case 5:
        case 6:
          for (var i = 0; i < rdata.files.length; i++) {
            if (type == 6 && bt.contains(rdata.files[i].name, 'BTDB_')) {
              data.push(rdata.files[i]);
            } else {
              if (type == 4 && bt.check_img(rdata.files[i].name)) {
                data.push(rdata.files[i]);
              } else if (type == 5 && !bt.check_img(rdata.files[i].name)) {
                data.push(rdata.files[i]);
              }
            }
          }
          for (var i = 0; i < rdata.dirs.length; i++) {
            if (type == 6 && bt.contains(rdata.dirs[i].name, 'BTDB_')) {
              data.push(rdata.dirs[i]);
            } else {
              if (type == 4 && bt.check_img(rdata.dirs[i].name)) {
                data.push(rdata.dirs[i]);
              } else if (type == 5 && !bt.check_img(rdata.dirs[i].name)) {
                data.push(rdata.dirs[i]);
              }
            }
          }
          break;
        default:
          data = rdata.dirs.concat(rdata.files);
          break;
      }
      if ($('#tab_recycle_bin').length <= 0) {
        bt.open({
          type: 1,
          skin: 'demo-class',
          area: ['80%', '606px'],
          title: lan.files.recycle_bin_title,
          closeBtn: 2,
          shift: 5,
          shadeClose: false,
          content: '<div class="re-head">\
							<div style="margin-left: 3px;" class="ss-text">\
			                        <em>' + lan.files.recycle_bin_on + '</em>\
			                        <div class="ssh-item">\
			                                <input class="btswitch btswitch-ios" id="Set_Recycle_bin" type="checkbox" ' + (rdata.status ? 'checked' : '') + '>\
			                                <label class="btswitch-btn" for="Set_Recycle_bin" onclick="bt.files.set_recycle_bin()"></label>\
			                        </div>\
			                        <em style="margin-left: 20px;">' + lan.files.recycle_bin_on_db + '</em>\
			                        <div class="ssh-item">\
			                                <input class="btswitch btswitch-ios" id="Set_Recycle_bin_db" type="checkbox" ' + (rdata.status_db ? 'checked' : '') + '>\
			                                <label class="btswitch-btn" for="Set_Recycle_bin_db" onclick="bt.files.set_recycle_bin(1)"></label>\
			                        </div>\
			                </div>\
							<span style="line-height: 32px; margin-left: 30px;">' + lan.files.recycle_bin_ps + '</span>\
			                <button style="float: right" class="btn btn-default btn-sm" onclick="bt.recycle_bin.clear_recycle_bin();">' + lan.files.recycle_bin_close + '</button>\
							</div>\
							<div class="re-con">\
								<div class="re-con-menu"></div>\
								<div class="re-con-con">\
								<div style="margin: 15px;" class="divtable">\
									<table id="tab_recycle_bin" width="100%" class="table table-hover"></table>\
								</div></div></div>'
        });
      }

      setTimeout(function () {
        var menus = [{
          title: lan.files.recycle_bin_type1,
          click: 'bt.recycle_bin.open_recycle_bin(1)'
        },
        {
          title: lan.files.recycle_bin_type2,
          click: 'bt.recycle_bin.open_recycle_bin(2)'
        },
        {
          title: lan.files.recycle_bin_type3,
          click: 'bt.recycle_bin.open_recycle_bin(3)'
        },
        {
          title: lan.files.recycle_bin_type4,
          click: 'bt.recycle_bin.open_recycle_bin(4)'
        },
        {
          title: lan.files.recycle_bin_type5,
          click: 'bt.recycle_bin.open_recycle_bin(5)'
        },
        {
          title: lan.files.recycle_bin_type6,
          click: 'bt.recycle_bin.open_recycle_bin(6)'
        }
        ];
        var m_html = '';
        for (var i = 0; i < menus.length; i++) {
          var c = type == (i + 1) ? 'class="on"' : '';
          m_html += '<p ' + c + ' onclick="' + menus[i].click + '" >' + menus[i].title + '</p>';
        }
        $('.re-con-menu').html(m_html);
        var _tab = bt.render({
          table: '#tab_recycle_bin',
          columns: [{
            field: 'name',
            title: lan.files.recycle_bin_th1
          },
          {
            field: 'dname',
            title: lan.files.recycle_bin_th2
          },
          {
            field: 'size',
            title: lan.files.recycle_bin_th3,
            templet: function (item) {
              return bt.format_size(item.size)
            }
          },
          {
            field: 'time',
            title: lan.files.recycle_bin_th4,
            templet: function (item) {
              return bt.format_data(item.time);
            }
          },
          {
            field: 'opt',
            title: lan.files.recycle_bin_th5,
            align: 'right',
            templet: function (item) {
              var opt = '<a class="btlink" href="javascript:;" onclick="bt.recycle_bin.re_recycle_bin(\'' + item.rname + '\',' + type + ')">恢复</a> | ';
              opt += '<a class="btlink" href="javascript:;" onclick="bt.recycle_bin.del_recycle_bin(\'' + item.rname + '\',' + type + ',\'' + item.name + '\')">永久删除</a>';
              return opt;
            }
          },
          ],
          data: data
        });
      }, 100)
    })
  },
  clear_recycle_bin: function () {
    var _this = this;
    bt.files.clear_recycle_bin(function (rdata) {
      _this.open_recycle_bin(1);
      bt.msg(rdata);
    })
  },
  del_recycle_bin: function (path, type, name) {
    var _this = this;
    bt.files.del_recycle_bin({ path: path, name: name }, function (rdata) {
      if (rdata.status) _this.open_recycle_bin(type);
      bt.msg(rdata);
    })
  },
  re_recycle_bin: function (path, type) {
    var _this = this;
    bt.files.re_recycle_bin(path, function (rdata) {
      if (rdata.status) {
        _this.open_recycle_bin(type);
        if (database) database.database_table_view();
      }
      bt.msg(rdata);
    })
  }
}

bt.files = {
  get_path: function () {
    path = path = bt.get_cookie('Path');
    if (!path) {
      bt.msg({
        msg: lan.get('lack_param', ['response'])
      });

    }
  },
  get_files: function (Path, searchV, callback, sort) {
    var searchtype = Path;
    if (isNaN(Path)) {
      var p = '1';
    } else {
      var p = Path;
      Path = bt.get_cookie('Path');
    }
    var search = '';
    if (searchV.length > 1 && searchtype == "1") {
      search = "&search=" + searchV;
    }
    sort_str = ''
    if (sort) sort_str = '&sort=' + sort + "&reverse=True";
    var showRow = bt.get_cookie('showRow');
    if (!showRow) showRow = '500';
    var totalSize = 0;
    var loadT = bt.load(lan['public'].the);
    bt.send('get_files', 'files/GetDir', 'tojs=GetFiles&p=' + p + '&showRow=' + showRow + search + '&path=' + Path + sort_str, function (rdata) {
      loadT.close();
      //bt.set_cookie('Path',rdata.PATH);
      if (callback) callback(rdata);
    })
  },
  get_recycle_bin: function (type, callback) {
    loading = bt.load(lan['public'].the);
    bt.send('Get_Recycle_bin', 'files/Get_Recycle_bin', {}, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  re_recycle_bin: function (path, callback) {
    bt.confirm({
      msg: lan.files.recycle_bin_re_msg,
      title: lan.files.recycle_bin_re_title
    }, function () {
      var loadT = bt.load(lan.files.recycle_bin_re_the);
      bt.send('Re_Recycle_bin', 'files/Re_Recycle_bin', 'path=' + path, function (rdata) {
        loadT.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    });
  },
  del_recycle_bin: function (obj, callback) {
    bt.prompt_confirm(lan.files.recycle_bin_del_title, '您确定要删除文件[' + obj.name + ']吗，该操作将<span style="color:red;">永久删除该文件</span>，是否继续操作？', function () {
      var loadT = bt.load(lan.files.recycle_bin_del_the);
      bt.send('Re_Recycle_bin', 'files/Del_Recycle_bin', 'path=' + obj.path, function (rdata) {
        loadT.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    });
  },
  clear_recycle_bin: function (callback) {
    bt.prompt_confirm(lan.files.recycle_bin_close, '您确定要清空回收站吗，该操作将<span style="color:red;">永久删除文件</span>，是否继续操作？', function () {
      var loadT = bt.load("<div class='myspeed'>" + lan.files.recycle_bin_close_the + "</div>");
      bt.send('Re_Recycle_bin', 'files/Close_Recycle_bin', {}, function (rdata) {
        loadT.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    });
  },
  set_recycle_bin: function (db) {
    var loadT = bt.load(lan['public'].the);
    var data = {};
    if (db) data = {
      db: db
    }
    bt.send('Recycle_bin', 'files/Recycle_bin', data, function (rdata) {
      loadT.close();
      bt.msg(rdata);
    })
  },
  rename: function (fileName, type, callback) {
    if (type == undefined) type = 0;
    _this = this;
    path = _this.get_path();
    if (type) {
      var newFileName = path + '/' + $("#newFileName").val();
      var oldFileName = path + '/' + fileName;
      var loading = bt.load(lan['public'].the);
      bt.send('MvFile', 'files/MvFile', 'sfile=' + oldFileName + '&dfile=' + newFileName, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      });
      return;
    }
    bt.open({
      type: 1,
      shift: 5,
      closeBtn: 2,
      area: '320px',
      title: lan.files.file_menu_rename,
      content: '<div class="bt-form pd20 pb70">\
						<div class="line">\
						<input type="text" class="bt-input-text" name="Name" id="newFileName" value="' + fileName + '" placeholder="' + lan.files.file_name + '" style="width:100%" />\
						</div>\
						<div class="bt-form-submit-btn">\
						<button type="button" class="btn btn-danger btn-sm btn-title" onclick="layer.closeAll()">' + lan['public'].close + '</button>\
						<button type="button" id="ReNameBtn" class="btn btn-success btn-sm btn-title">' + lan['public'].save + '</button>\
						</div>\
					</div>'
    });
    setTimeout(function () {
      $("#ReNameBtn").click(function () {
        _this.rename(fileName, 1, callback);
      })
      $("#newFileName").focus().keyup(function (e) {
        if (e.keyCode == 13) $("#ReNameBtn").click();
      });
    }, 100)

  },
  get_file_body: function (path, callback) {
    bt.send('GetFileBody', 'files/GetFileBody', 'path=' + path, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_file_body: function (path, data, encoding, callback) {
    var loading = bt.load(lan.site.saving_txt);
    bt.send('SaveFileBody', 'files/SaveFileBody', {
      path: path,
      data: data,
      encoding: encoding
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  del_file: function (path, callback) {
    bt.confirm({
      msg: lan.get('recycle_bin_confirm', [path]),
      title: lan.files.del_file
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('del_file', 'files/DeleteFile', 'path=' + path, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    })
  },
  del_dir: function (path, callback) {
    bt.confirm({
      msg: lan.get('recycle_bin_confirm_dir', [path]),
      title: lan.files.del_file
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('DeleteDir', 'files/DeleteDir', 'path=' + path, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    })
  },
  cut_file: function (fileName, callback) //裁剪
  {
    bt.set_cookie('cutFileName', fileName);
    bt.set_cookie('copyFileName', null);
    bt.msg({
      msg: lan.files.mv_ok,
      icon: 1,
      time: 1
    })
    if (callback) callback(rdata);
  },
  copy_file: function (fileName, callback) {
    bt.set_cookie('cutFileName', null);
    bt.set_cookie('copyFileName', fileName);
    bt.msg({
      msg: lan.files.copy_ok,
      icon: 1,
      time: 1
    })
    if (callback) callback(rdata);
  },
  paste_file: function (fileName, callback) //粘贴
  {
    _this = this;
    path = _this.get_path();
    var copyName = bt.get_cookie('copyFileName');
    var cutName = bt.get_cookie('cutFileName');
    var filename = copyName;
    if (cutName != 'null' && cutName != undefined) filename = cutName;
    filename = filename.split('/').pop();

    bt.send('CheckExistsFiles', 'files/CheckExistsFiles', {
      dfile: path,
      filename: filename
    }, function (rdata) {
      if (rdata.length > 0) {
        var tbody = '';
        for (var i = 0; i < rdata.length; i++) {
          tbody += '<tr><td>' + rdata[i].filename + '</td><td>' + bt.format_size(rdata[i].size) + '</td><td>' + bt.format_data(rdata[i].mtime) + '</td></tr>';
        }
        var mbody = '<div class="divtable"><table class="table table-hover" width="100%" border="0" cellpadding="0" cellspacing="0"><thead><th>' + lan.bt.filename + '</th><th>' + lan.bt.file_size + '</th><th>' + lan.bt.etime + '</th></thead>\
							<tbody>' + tbody + '</tbody>\
							</table></div>';
        bt.show_confirm(bt.files.file_conver_msg, mbody, function () {
          _this.paste_to(path, copyName, cutName, fileName, callback);
        })
      } else {
        _this.paste_to(path, copyName, cutName, fileName, callback);
      }
    })
  },
  paste_to: function (path, copyName, cutName, fileName, callback) {
    if (copyName != 'null' && copyName != undefined) {
      var loading = bt.msg({
        msg: lan.files.copy_the,
        icon: 16
      });
      bt.send('CopyFile', 'files/CopyFile', 'sfile=' + copyName + '&dfile=' + path + '/' + fileName, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
      bt.set_cookie('copyFileName', null);
      bt.set_cookie('cutFileName', null);
      return;
    }

    if (cutName != 'null' && cutName != undefined) {
      var loading = bt.msg({
        msg: lan.files.copy_the,
        icon: 16
      });
      bt.send('MvFile', 'files/MvFile', 'sfile=' + copyName + '&dfile=' + path + '/' + fileName, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      });
      bt.set_cookie('copyFileName', null);
      bt.set_cookie('cutFileName', null);

    }
  },
  zip: function (dirName, submits, callback) {
    _this = this;
    if (submits != undefined) {
      if (dirName.indexOf(',') == -1) {
        tmp = $("#sfile").val().split('/');
        sfile = tmp[tmp.length - 1];
      } else {
        sfile = dirName;
      }
      dfile = $("#dfile").val();
      layer.closeAll();
      var loading = bt.load(lan.files.zip_the);
      bt.send('Zip', 'files/Zip', 'sfile=' + sfile + '&dfile=' + dfile + '&type=tar&path=' + path, function (rdata) {
        loading.close();
        if (rdata == null || rdata == undefined) {
          bt.msg({
            msg: lan.files.zip_ok,
            icon: 1
          })
          if (callback) callback(rdata);
          return;
        }
        bt.msg(rdata);
        if (rdata.status)
          if (callback) callback(rdata);
      });
      return;
    }
    var ext = '.zip';
    if (bt.os == 'Linux') ext = '.tar.gz';

    param = dirName;
    if (dirName.indexOf(',') != -1) {
      tmp = path.split('/')
      dirName = path + '/' + tmp[tmp.length - 1]
    }
    bt.open({
      type: 1,
      shift: 5,
      closeBtn: 2,
      area: '650px',
      title: lan.files.zip_title,
      content: '<div class="bt-form pd20 pb70">' +
        '<div class="line noborder">' +
        '<input type="text" class="form-control" id="sfile" value="' + param + '" placeholder="" style="display:none" />' +
        '<span>' + lan.files.zip_to + '</span><input type="text" class="bt-input-text" id="dfile" value="' + dirName + ext + '" placeholder="' + lan.files.zip_to + '" style="width: 75%; display: inline-block; margin: 0px 10px 0px 20px;" /><span class="glyphicon glyphicon-folder-open cursor" onclick="ChangePath(\'dfile\')"></span>' +
        '</div>' +
        '<div class="bt-form-submit-btn">' +
        '<button type="button" class="btn btn-danger btn-sm btn-title" onclick="layer.closeAll()">' + lan['public'].close + '</button>' +
        '<button type="button" id="ReNameBtn" class="btn btn-success btn-sm btn-title"' + lan.files.file_menu_zip + '</button>' +
        '</div>' +
        '</div>'
    });

    setTimeout(function () {
      $("#dfile").change(function () {
        var dfile = bt.rtrim($(this).val(), '/');
        if (bt.check_zip(dfile) === -1) {
          dfile += ext;
          $(this).val(dfile)
        }
      });
      $("#ReNameBtn").click(function () {
        _this.zip(param, 1, callback);
      })
    }, 100);
  },
  un_zip: function (fileName, type, callback) // type: zip|tar
  {
    _this = this;
    if (type.length == 3) {
      var sfile = encodeURIComponent($("#sfile").val());
      var dfile = encodeURIComponent($("#dfile").val());
      var password = encodeURIComponent($("#unpass").val());
      coding = $("select[name='coding']").val();
      layer.closeAll();
      var loading = bt.load(lan.files.unzip_the);
      bt.send('UnZip', 'files/UnZip', 'sfile=' + sfile + '&dfile=' + dfile + '&type=' + type + '&coding=' + coding + '&password=' + password, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      });
      return
    }
    var path = bt.get_file_path(fileName);
    type = (type == 1) ? 'tar' : 'zip'
    var umpass = '';
    if (type == 'zip') {
      umpass = '<div class="line"><span class="tname">' + lan.files.zip_pass_title + '</span><input type="text" class="bt-input-text" id="unpass" value="" placeholder="' + lan.files.zip_pass_msg + '" style="width:330px" /></div>'
    }
    bt.open({
      type: 1,
      shift: 5,
      closeBtn: 2,
      area: '490px',
      title: lan.files.unzip_title,
      content: '<div class="bt-form pd20 pb70">' +
        '<div class="line unzipdiv">' +
        '<span class="tname">' + lan.files.unzip_name + '</span><input type="text" class="bt-input-text" id="sfile" value="' + fileName + '" placeholder="' + lan.files.unzip_name_title + '" style="width:330px" /></div>' +
        '<div class="line"><span class="tname">' + lan.files.unzip_to + '</span><input type="text" class="bt-input-text" id="dfile" value="' + path + '" placeholder="' + lan.files.unzip_to + '" style="width:330px" /></div>' + umpass +
        '<div class="line"><span class="tname">' + lan.files.unzip_coding + '</span><select class="bt-input-text" name="coding">' +
        '<option value="UTF-8">UTF-8</option>' +
        '<option value="gb18030">GBK</option>' +
        '</select>' +
        '</div>' +
        '<div class="bt-form-submit-btn">' +
        '<button type="button" class="btn btn-danger btn-sm btn-title" onclick="layer.closeAll()">' + lan['public'].close + '</button>' +
        '<button type="button" id="ReNameBtn" class="btn btn-success btn-sm btn-title" >' + lan.files.file_menu_unzip + '</button>' +
        '</div>' +
        '</div>'
    });
    setTimeout(function () {

      $("#ReNameBtn").click(function () {
        _this.un_zip(fileName, type, callback);
      })
    }, 100);
  },
  show_img: function (fileName) {
    var imgUrl = '/download?filename=' + fileName;
    bt.open({
      type: 1,
      closeBtn: 2,
      title: false,
      area: '500px',
      shadeClose: true,
      content: '<div class="showpicdiv"><img width="100%" src="' + imgUrl + '"></div>'
    });
    $(".layui-layer").css("top", "30%");
  },
  get_files_bytes: function (fileName, fileSize) {
    window.open('/download?filename=' + encodeURIComponent(fileName));
  },
  upload_files: function () {
    path = this.get_path();
    bt.open({
      type: 1,
      closeBtn: 2,
      title: lan.files.up_title,
      area: ['500px', '500px'],
      shadeClose: false,
      content: '<div class="fileUploadDiv"><input type="hidden" id="input-val" value="' + path + '" />\
					<input type="file" id="file_input"  multiple="true" autocomplete="off" />\
					<button type="button"  id="opt" autocomplete="off">' + lan.files.up_add + '</button>\
					<button type="button" id="up" autocomplete="off" >' + lan.files.up_start + '</button>\
					<span id="totalProgress" style="position: absolute;top: 7px;right: 147px;"></span>\
					<span style="float:right;margin-top: 9px;">\
					<font>' + lan.files.up_coding + ':</font>\
					<select id="fileCodeing" >\
						<option value="byte">' + lan.files.up_bin + '</option>\
						<option value="utf-8">UTF-8</option>\
						<option value="gb18030">GB2312</option>\
					</select>\
					</span>\
					<button type="button" id="filesClose" autocomplete="off" onClick="layer.closeAll()" >' + lan['public'].close + '</button>\
					<ul id="up_box"></ul></div>'
    });
    UploadStart();
  },
  set_chmod: function (action, fileName, callback) {
    _this = this;
    if (action == 1) {
      var chmod = $("#access").val();
      var chown = $("#chown").val();
      var data = 'filename=' + fileName + '&user=' + chown + '&access=' + chmod;
      var loadT = bt.load(lan['public'].config);
      bt.send('SetFileAccess', 'files/SetFileAccess', data, function (rdata) {
        loadT.close();
        if (rdata.status) layer.closeAll();
        bt.msg(rdata);
        if (callback) callback(rdata);
      });
      return;
    }

    var toExec = fileName == lan.files.all ? 'Batch(3,1)' : '_this.set_chmod(1,\'' + fileName + '\',callback)';

    bt.send('GetFileAccess', 'files/GetFileAccess', 'filename=' + fileName, function (rdata) {
      if (bt.os == 'Linux') {
        bt.open({
          type: 1,
          title: lan.files.set_auth + '[' + fileName + ']',
          area: '400px',
          shadeClose: false,
          content: '<div class="setchmod bt-form ptb15 pb70">\
								<fieldset>\
									<legend>' + lan.files.file_own + '</legend>\
									<p><input type="checkbox" id="owner_r" />' + lan.files.file_read + '</p>\
									<p><input type="checkbox" id="owner_w" />' + lan.files.file_write + '</p>\
									<p><input type="checkbox" id="owner_x" />' + lan.files.file_exec + '</p>\
								</fieldset>\
								<fieldset>\
									<legend>' + lan.files.file_group + '</legend>\
									<p><input type="checkbox" id="group_r" />' + lan.files.file_read + '</p>\
									<p><input type="checkbox" id="group_w" />' + lan.files.file_write + '</p>\
									<p><input type="checkbox" id="group_x" />' + lan.files.file_exec + '</p>\
								</fieldset>\
								<fieldset>\
									<legend>' + lan.files.file_public + '</legend>\
									<p><input type="checkbox" id="public_r" />' + lan.files.file_read + '</p>\
									<p><input type="checkbox" id="public_w" />' + lan.files.file_write + '</p>\
									<p><input type="checkbox" id="public_x" />' + lan.files.file_exec + '</p>\
								</fieldset>\
								<div class="setchmodnum"><input class="bt-input-text" type="text" id="access" maxlength="3" value="' + rdata.chmod + '">' + lan.files.file_menu_auth + '，\
								<span>' + lan.files.file_own + '\
								<select id="chown" class="bt-input-text">\
									<option value="www" ' + (rdata.chown == 'www' ? 'selected="selected"' : '') + '>www</option>\
									<option value="mysql" ' + (rdata.chown == 'mysql' ? 'selected="selected"' : '') + '>mysql</option>\
									<option value="root" ' + (rdata.chown == 'root' ? 'selected="selected"' : '') + '>root</option>\
								</select></span></div>\
								<div class="bt-form-submit-btn">\
									<button type="button" class="btn btn-danger btn-sm btn-title" onclick="layer.closeAll()">' + lan['public'].close + '</button>\
							        <button type="button" class="btn btn-success btn-sm btn-title" onclick="' + toExec + '" >' + lan['public'].ok + '</button>\
						        </div>\
							</div>'
        });

        settimeout(function () {
          _this.on_linux_access();
          $("#access").keyup(function () {
            _this.on_linux_access();
          });

          $("input[type=checkbox]").change(function () {
            var idName = ['owner', 'group', 'public'];
            var onacc = '';
            for (var n = 0; n < idName.length; n++) {
              var access = 0;
              access += $("#" + idName[n] + "_x").prop('checked') ? 1 : 0;
              access += $("#" + idName[n] + "_w").prop('checked') ? 2 : 0;
              access += $("#" + idName[n] + "_r").prop('checked') ? 4 : 0;
              onacc += access;
            }
            $("#access").val(onacc);
          });
        }, 100)
      }
    })
  },
  on_linux_access: function () {
    var access = $("#access").val();
    var idName = ['owner', 'group', 'public'];
    for (var n = 0; n < idName.length; n++) {
      $("#" + idName[n] + "_x").prop('checked', false);
      $("#" + idName[n] + "_w").prop('checked', false);
      $("#" + idName[n] + "_r").prop('checked', false);
    }
    for (var i = 0; i < access.length; i++) {
      var onacc = access.substr(i, 1);
      if (i > idName.length) continue;
      if (onacc > 7) $("#access").val(access.substr(0, access.length - 1));
      switch (onacc) {
        case '1':
          $("#" + idName[i] + "_x").prop('checked', true);
          break;
        case '2':
          $("#" + idName[i] + "_w").prop('checked', true);
          break;
        case '3':
          $("#" + idName[i] + "_x").prop('checked', true);
          $("#" + idName[i] + "_w").prop('checked', true);
          break;
        case '4':
          $("#" + idName[i] + "_r").prop('checked', true);
          break;
        case '5':
          $("#" + idName[i] + "_r").prop('checked', true);
          $("#" + idName[i] + "_x").prop('checked', true);
          break;
        case '6':
          $("#" + idName[i] + "_r").prop('checked', true);
          $("#" + idName[i] + "_w").prop('checked', true);
          break;
        case '7':
          $("#" + idName[i] + "_r").prop('checked', true);
          $("#" + idName[i] + "_w").prop('checked', true);
          $("#" + idName[i] + "_x").prop('checked', true);
          break;
      }
    }
  },
  on_win_access: function () {

  },
  get_right_click: function (type, path, name) {
    _this = this;
    var displayZip = bt.check_zip(type);
    var options = {
      items: [{
        text: lan.files.file_menu_copy,
        onclick: function () {
          _this.copy_file(path)
        }
      },
      {
        text: lan.files.file_menu_mv,
        onclick: function () {
          _this.cut_file(path)
        }
      },
      {
        text: lan.files.file_menu_rename,
        onclick: function () {
          _this.rename(path, name)
        }
      },
      {
        text: lan.files.file_menu_auth,
        onclick: function () {
          _this.set_chmod(0, path)
        }
      },
      {
        text: lan.files.file_menu_zip,
        onclick: function () {
          _this.zip(path)
        }
      }

      ]
    };
    if (type == "dir") {
      options.items.push({
        text: lan.files.file_menu_del,
        onclick: function () {
          _this.del_dir(path)
        }
      });
    } else if (isText(type)) {
      options.items.push({
        text: lan.files.file_menu_edit,
        onclick: function () {
          bt.on_edit_file(0, path)
        }
      }, {
        text: lan.files.file_menu_down,
        onclick: function () {
          _this.get_files_bytes(path)
        }
      }, {
        text: lan.files.file_menu_del,
        onclick: function () {
          _this.del_file(path)
        }
      });
    } else if (displayZip != -1) {
      options.items.push({
        text: lan.files.file_menu_unzip,
        onclick: function () {
          _this.un_zip(path, displayZip)
        }
      }, {
        text: lan.files.file_menu_down,
        onclick: function () {
          _this.get_files_bytes(path)
        }
      }, {
        text: lan.files.file_menu_del,
        onclick: function () {
          _this.del_file(path)
        }
      });
    } else if (isImage(type)) {
      options.items.push({
        text: lan.files.file_menu_img,
        onclick: function () {
          _this.show_img(path)
        }
      }, {
        text: lan.files.file_menu_down,
        onclick: function () {
          _this.get_files_bytes(path)
        }
      }, {
        text: lan.files.file_menu_del,
        onclick: function () {
          _this.del_file(path)
        }
      });
    } else {
      options.items.push({
        text: lan.files.file_menu_down,
        onclick: function () {
          _this.get_files_bytes(path)
        }
      }, {
        text: lan.files.file_menu_del,
        onclick: function () {
          _this.del_file(path)
        }
      });
    }
    return options;
  },
  get_dir_size: function (path, callback) {
    if (!path) path = this.get_path();
    var loading = bt.load(lan['public'].the);
    bt.send('GetDirSize', 'files/GetDirSize', {
      path: path
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  batch: function (type, access, callback) {
    _this = this;

    var el = document.getElementsByTagName('input');
    var len = el.length;
    var data = 'path=' + path + '&type=' + type;
    var name = 'data';

    var oldType = bt.get_cookie('BatchPaste');

    for (var i = 0; i < len; i++) {
      if (el[i].checked == true && el[i].value != 'on') {
        data += '&' + name + '=' + el[i].value;
      }
    }

    if (type == 3 && access == undefined) {
      _this.set_chmod(0, lan.files.all);
      return;
    }

    if (type < 3) bt.set_cookie('BatchSelected', '1');
    bt.set_cookie('BatchPaste', type);

    if (access == 1) {
      var access = $("#access").val();
      var chown = $("#chown").val();
      data += '&access=' + access + '&user=' + chown;
      layer.closeAll();
    }
    if (type == 4) {
      AllDeleteFileSub(data, path);
      bt.set_cookie('BatchPaste', oldType);
      return;
    }

    if (type == 5) {
      var names = '';
      for (var i = 0; i < len; i++) {
        if (el[i].checked == true && el[i].value != 'on') {
          names += el[i].value + ',';
        }
      }
      _this.zip(names);
      return;
    }

    myloadT = bt.load("<div class='myspeed'>" + lan['public'].the + "</div>");
    setTimeout(function () {
      getSpeed('.myspeed');
    }, 1000);
    bt.send('SetBatchData', 'files/SetBatchData', data, function (rdata) {
      myloadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    })
  },
  download_file: function (action, callback) {
    path = bt.get_cookie('Path');
    if (action == 1) {
      var fUrl = $("#mUrl").val();
      fUrl = fUrl;
      fpath = $("#dpath").val();
      fname = $("#dfilename").val();
      layer.closeAll();
      loading = bt.load(lan.files.down_task);
      bt.send('DownloadFile', 'files/DownloadFile', 'path=' + fpath + '&url=' + fUrl + '&filename=' + fname, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      });
      return;
    }
    layer.open({
      type: 1,
      shift: 5,
      closeBtn: 2,
      area: '500px',
      title: lan.files.down_title,
      content: '<form class="bt-form pd20 pb70">\
						<div class="line">\
						<span class="tname">' + lan.files.down_url + ':</span><input type="text" class="bt-input-text" name="url" id="mUrl" value="" placeholder="' + lan.files.down_url + '" style="width:330px" />\
						</div>\
						<div class="line">\
						<span class="tname ">' + lan.files.down_to + ':</span><input type="text" class="bt-input-text" name="path" id="dpath" value="' + path + '" placeholder="' + lan.files.down_to + '" style="width:330px" />\
						</div>\
						<div class="line">\
						<span class="tname">' + lan.files.file_name + ':</span><input type="text" class="bt-input-text" name="filename" id="dfilename" value="" placeholder="' + lan.files.down_save + '" style="width:330px" />\
						</div>\
						<div class="bt-form-submit-btn">\
						<button type="button" class="btn btn-danger btn-sm" onclick="layer.closeAll()">' + lan['public'].close + '</button>\
						<button type="button" id="dlok" class="btn btn-success btn-sm dlok" onclick="DownloadFile(1)">' + lan['public'].ok + '</button>\
						</div>\
					</form>'
    });
    fly("dlok");
    $("#mUrl").keyup(function () {
      durl = $(this).val()
      tmp = durl.split('/')
      $("#dfilename").val(tmp[tmp.length - 1])
    });
  }
}
// 任务管理器
bt.crontab = {
  // 执行计划任务请求
  start_task_send: function (id, name) {
    var that = this,
      loading = bt.load();
    bt.send('start_task_send', 'crontab/StartTask', {
      id: id
    }, function (rdata) {
      loading.close();
      rdata.time = 2000;
      bt.msg(rdata);
    });
  },

  // 删除计划任务
  del_task_send: function (id, name) {
    bt.show_confirm('删除[' + name + ']', '您确定要删除该任务吗?', function () {
      bt.send('del_task_send', 'crontab/DelCrontab', {
        id: id
      }, function (rdata) {
        loading.close();
        rdata.time = 2000;
        bt.msg(rdata);
        that.get_crontab_list();
      });
    });
  },

  // 设置计划任务状态
  set_crontab_status: function (id, status, callback) {
    var that = this,
      loading = bt.load();
    bt.confirm({
      title: '提示',
      msg: status ? '计划任务暂停后将无法继续运行，您真的要停用这个计划任务吗？' : '该计划任务已停用，是否要启用这个计划任务？'
    }, function () {
      bt.send('set_crontab_status', 'crontab/set_cron_status', {
        id: id
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata)
      });
    });
  },

  // 编辑计划任务脚本
  edit_crontab_file: function (echo) {
    bt.pub.on_edit_file(0, '/www/server/cron/' + echo);
  },

  // 编辑计划任务
  edit_crontab: function (id, data) {
    var that = this,
      loading = bt.load('提交数据中...');
    bt.send('edit_crontab', 'crontab/modify_crond', data, function (rdata) {
      loading.close();
      if (rdata.status) {
        // that.get_crontab_list();
        layer.msg(rdata.msg, {
          icon: 1
        });
      } else {
        layer.msg(rdata.msg, {
          icon: 2
        });
      }
    });
  },

  // 获取计划任务日志
  get_logs_crontab: function (id, name) {
    var that = this;
    bt.send('get_logs_crontab', 'crontab/GetLogs', {
      id: id
    }, function (rdata) {
      if (!rdata.status) {
        rdata.time = 1000;
        bt.msg(rdata);
      } else {
        bt.open({
          type: 1,
          title: '查看日志-[' + name + ']',
          area: ['700px', '520px'],
          shadeClose: false,
          closeBtn: 1,
          content: '<div class="setchmod bt-form pd20 pb70">' +
            '<pre class="crontab-log" style="overflow: auto; border: 0px none; line-height:28px;padding: 15px; margin: 0px; height: 405px; background-color: rgb(51,51,51);color:#f1f1f1;font-family: \"微软雅黑\"">' + (rdata.msg == '' ? '当前日志为空' : rdata.msg) + '</pre>' +
            '<div class="bt-form-submit-btn" style="margin-top: 0px;">' +
            '<button type="button" class="layui-btn layui-btn-sm" onclick="bt.crontab.del_logs_crontab(' + id + ')">' + lan['public'].empty + '</button>' +
            '<button type="button" class="layui-btn layui-btn-sm layui-btn-primary" onclick="layer.closeAll()">' + lan['public'].close + '</button>' +
            '</div>' +
            '</div>'
        })
        setTimeout(function () {
          var div = document.getElementsByClassName('crontab-log')[0]
          div.scrollTop = div.scrollHeight;
        }, 200);
      }
    })
  },

  // 删除计划任务日志
  del_logs_crontab: function (id, name) {
    var that = this,
      loading = bt.load();
    bt.send('del_logs_crontab', 'crontab/DelLogs', {
      id: id
    }, function (rdata) {
      loading.close();
      layer.closeAll();
      rdata.time = 2000;
      bt.msg(rdata);
    });
  },

  // 获取计划任务列表
  get_crontab_list: function (status, callback) {
    var that = this;
    var loading = bt.load();
    bt.send('get_crontab_list', 'crontab/GetCrontab', {}, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    });
  },

  // 获取站点和备份位置信息
  get_data_list: function (type, name) {
    var that = this;
    bt.send('get_data_list', 'crontab/GetDataList', {
      type: type
    }, function (rdata) {
      that.backupsList.siteList = [{
        'name': 'ALL',
        'ps': '所有'
      }]
      that.backupsList.optList = [{
        'name': '服务器磁盘',
        'value': 'localhost'
      }]
      that.backupsList.siteList = that.backupsList.siteList.concat(rdata.data);
      that.backupsList.optList = that.backupsList.optList.concat(rdata.orderOpt);
      that.initFrom["crontab-name"] = name + "[" + that.backupsList.siteList[that.initFrom['crontab-site']].name + "]";
      that.insert_control_from(that.initFrom['crontab-submit']);
    });
  },

  // 添加计划任务请求
  add_control_send: function (data) {
    var that = this,
      loading = bt.load('提交数据中...');
    bt.send('addCrontab', 'crontab/AddCrontab', data, function (rdata) {
      loading.close();
      if (rdata.status) {
        that.insert_control_from(true, true);
        that.get_crontab_list();
        layer.msg(rdata.msg, {
          icon: 1
        });
      } else {
        layer.msg(rdata.msg, {
          icon: 2
        });
      }
    });
  },
  get_crontab_find: function (id, callback) {
    bt.send('get_crontab_find', 'crontab/get_crontab_find', {
      id: id
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  }

}

bt.config = {
  close_panel: function (callback) {
    layer.confirm(lan.config.close_panel_msg, {
      title: lan.config.close_panel_title,
      closeBtn: 2,
      icon: 13,
      cancel: function () {
        if (callback) callback(false);
      }
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('ClosePanel', 'config/ClosePanel', {}, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    }, function () {
      if (callback) callback(false);
    });
  },
  set_auto_update: function (callback) {
    loading = bt.load(lan['public'].the);
    bt.send('AutoUpdatePanel', 'config/AutoUpdatePanel', {}, function (rdata) {
      loading.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    })
  },
  sync_data: function (callback) {
    var loadT = bt.load(lan.config.config_sync);
    bt.send('syncDate', 'config/syncDate', {}, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    });
  },
  save_config: function (data, callback) {
    loading = bt.load(lan.config.config_save);
    bt.send('setPanel', 'config/setPanel', data, function (rdata) {
      loading.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    });
  },
  set_template: function (template, callback) {
    var loadT = bt.load(lan['public'].the);
    bt.send('SetTemplates', 'config/SetTemplates', {
      templates: template
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    });
  },
  set_panel_ssl: function (status, callback) {
    var msg = status ? lan.config.ssl_close_msg : '<a style="font-weight: bolder;font-size: 16px;">' + lan.config.ssl_open_ps + '</a><li style="margin-top: 12px;color:red;">' + lan.config.ssl_open_ps_1 + '</li><li>' + lan.config.ssl_open_ps_2 + '</li><li>' + lan.config.ssl_open_ps_3 + '</li><p style="margin-top: 10px;"><input type="checkbox" id="checkSSL" /><label style="font-weight: 400;margin: 3px 5px 0px;" for="checkSSL">' + lan.config.ssl_open_ps_4 + '</label><a target="_blank" class="btlink" href="https://www.bt.cn/bbs/thread-4689-1-1.html" style="float: right;">' + lan.config.ssl_open_ps_5 + '</a></p>';
    layer.confirm(msg, {
      title: lan.config.ssl_title,
      closeBtn: 2,
      icon: 3,
      area: '550px',
      cancel: function () {
        if (callback) {
          if (status == 0) {
            callback(false);
          } else {
            callback(true);
          }
        }
      }
    }, function () {
      if (window.location.protocol.indexOf('https') == -1) {
        if (!$("#checkSSL").prop('checked')) {
          bt.msg({
            msg: lan.config.ssl_ps,
            icon: 2
          });
          if (callback) callback(false);
        }
      }
      var loadT = bt.load(lan.config.ssl_msg);
      bt.send('SetPanelSSL', 'config/SetPanelSSL', {}, function (rdata) {
        loadT.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    }, function () {
      if (callback) {
        if (status == 0) {
          callback(false);
        } else {
          callback(true);
        }
      }
    });
  },
  get_panel_ssl: function () {
    _this = this;
    loading = bt.load('正在获取证书信息...');
    bt.send('GetPanelSSL', 'config/GetPanelSSL', {}, function (cert) {
      loading.close();
      var certBody = '<div class="tab-con">\
				<div class="myKeyCon ptb15">\
					<div class="ssl-con-key pull-left mr20">密钥(KEY)<br>\
						<textarea id="key" class="bt-input-text">' + cert.privateKey + '</textarea>\
					</div>\
					<div class="ssl-con-key pull-left">证书(PEM格式)<br>\
						<textarea id="csr" class="bt-input-text">' + cert.certPem + '</textarea>\
					</div>\
					<div class="ssl-btn pull-left mtb15" style="width:100%">\
						<button class="btn btn-success btn-sm" id="btn_submit">保存</button>\
					</div>\
				</div>\
				<ul class="help-info-text c7 pull-left">\
					<li>粘贴您的*.key以及*.pem内容，然后保存即可<a href="http://www.bt.cn/bbs/thread-704-1-1.html" class="btlink" target="_blank">[帮助]</a>。</li>\
					<li>如果浏览器提示证书链不完整,请检查是否正确拼接PEM证书</li><li>PEM格式证书 = 域名证书.crt + 根证书(root_bundle).crt</li>\
				</ul>\
			</div>'
      bt.open({
        type: 1,
        area: "600px",
        title: '自定义面板证书',
        closeBtn: 2,
        shift: 5,
        shadeClose: false,
        content: certBody
      });

      $("#btn_submit").click(function () {
        key = $('#key').val();
        csr = $('#csr').val();
        _this.set_panel_ssl({
          privateKey: key,
          certPem: csr
        });
      })
    })
  },
  set_panel_ssl: function (data, callback) {
    var loadT = bt.load(lan.config.ssl_msg);
    bt.send('SavePanelSSL', 'config/SavePanelSSL', data, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    })
  },
  set_username: function (type) {
    if (type == 1) {
      if (p1 == "" || p1.length < 3) {
        bt.msg({
          msg: lan.bt.user_len,
          icon: 2
        })
        return;
      }
      if (p1 != p2) {
        bt.msg({
          msg: lan.bt.user_err_re,
          icon: 2
        })
        return;
      }
      var checks = ['admin', 'root', 'admin123', '123456'];
      if ($.inArray(p1, checks)) {
        bt.msg({
          msg: '禁止使用常用用户名!',
          icon: 2
        })
        return;
      }
      bt.send('setUsername', 'config/setUsername', {
        username1: p1,
        username2: p2
      }, function (rdata) {
        if (rdata.status) {
          layer.closeAll();
          $("input[name='username_']").val(p1)
        }
        bt.msg(rdata);
      })
      return;
    }
    bt.open({
      type: 1,
      area: "290px",
      title: lan.bt.user_title,
      closeBtn: 2,
      shift: 5,
      shadeClose: false,
      content: "<div class='bt-form pd20 pb70'><div class='line'><span class='tname'>" + lan.bt.user + "</span><div class='info-r'><input class='bt-input-text' type='text' name='password1' id='p1' value='' placeholder='" + lan.bt.user_new + "' style='width:100%'/></div></div><div class='line'><span class='tname'>" + lan.bt.pass_re + "</span><div class='info-r'><input class='bt-input-text' type='text' name='password2' id='p2' value='' placeholder='" + lan.bt.pass_re_title + "' style='width:100%'/></div></div><div class='bt-form-submit-btn'><button type='button' class='btn btn-danger btn-sm' onclick=\"layer.closeAll()\">" + lan['public'].close + "</button> <button type='button' class='btn btn-success btn-sm' onclick=\"bt.config.set_username(1)\">" + lan['public'].edit + "</button></div></div>"
    })
  },
  set_password: function (type) {
    if (type == 1) {
      p1 = $("#p1").val();
      p2 = $("#p2").val();
      if (p1 == "" || p1.length < 8) {
        bt.msg({
          msg: lan.bt.pass_err_len,
          icon: 2
        })
        return
      }

      //准备弱口令匹配元素
      var checks = ['admin888', '123123123', '12345678', '45678910', '87654321', 'asdfghjkl', 'password', 'qwerqwer'];
      pchecks = 'abcdefghijklmnopqrstuvwxyz1234567890';
      for (var i = 0; i < pchecks.length; i++) {
        checks.push(pchecks[i] + pchecks[i] + pchecks[i] + pchecks[i] + pchecks[i] + pchecks[i] + pchecks[i] + pchecks[i]);
      }

      //检查弱口令
      cps = p1.toLowerCase();
      var isError = "";
      for (var i = 0; i < checks.length; i++) {
        if (cps == checks[i]) {
          isError += '[' + checks[i] + '] ';
        }
      }
      if (isError != "") {
        bt.msg({
          msg: lan.bt.pass_err + isError,
          icon: 2
        })
        return;
      }

      if (p1 != p2) {
        bt.msg({
          msg: lan.bt.pass_err_re,
          icon: 2
        })
        return
      }
      bt.send('setPassword', 'config/setPassword', {
        password1: p1,
        password2: p2
      }, function (rdata) {
        layer.closeAll();
        bt.msg(rdata);
      })
      return
    }
    layer.open({
      type: 1,
      area: "290px",
      title: lan.bt.pass_title,
      closeBtn: 2,
      shift: 5,
      shadeClose: false,
      content: "<div class='bt-form pd20 pb70'><div class='line'><span class='tname'>" + lan['public'].pass + "</span><div class='info-r'><input class='bt-input-text' type='text' name='password1' id='p1' value='' placeholder='" + lan.bt.pass_new_title + "' style='width:100%'/></div></div><div class='line'><span class='tname'>" + lan.bt.pass_re + "</span><div class='info-r'><input class='bt-input-text' type='text' name='password2' id='p2' value='' placeholder='" + lan.bt.pass_re_title + "' style='width:100%' /></div></div><div class='bt-form-submit-btn'><span style='float: left;' title='" + lan.bt.pass_rep + "' class='btn btn-default btn-sm' onclick='randPwd(10)'>" + lan.bt.pass_rep_btn + "</span><button type='button' class='btn btn-danger btn-sm' onclick=\"layer.closeAll()\">" + lan['public'].close + "</button> <button type='button' class='btn btn-success btn-sm' onclick=\"bt.config.set_password(1)\">" + lan['public'].edit + "</button></div></div>"
    });
  }
}

bt.system = {
  get_total: function (callback) {
    bt.send('GetSystemTotal', 'system/GetSystemTotal', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_net: function (callback) {
    bt.send('GetNetWork', 'system/GetNetWork', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_disk_list: function (callback) {
    bt.send('GetDiskInfo', 'system/GetDiskInfo', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  re_memory: function (callback) {
    bt.send('ReMemory', 'system/ReMemory', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  check_update: function (callback, check) {
    var data = {};
    if (check == undefined) data = {
      check: true
    };
    if (check === false) data = {}
    if (check) var load = bt.load(lan.index.update_get);
    bt.send('UpdatePanel', 'ajax/UpdatePanel', data, function (rdata) {
      if (check) load.close();
      if (callback) callback(rdata);
    })
  },
  to_update: function (callback) {
    var load = bt.load(lan.index.update_the);
    bt.send('UpdatePanel', 'ajax/UpdatePanel', {
      toUpdate: 'yes'
    }, function (rdata) {
      load.close();
      if (callback) callback(rdata);
    })
  },
  reload_panel: function (callback) {
    bt.send('ReWeb', 'system/ReWeb', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  rep_panel: function (callback) {
    var loading = bt.load(lan.index.rep_panel_the)
    bt.send('RepPanel', 'system/RepPanel', {}, function (rdata) {
      loading.close();
      if (rdata) {
        if (callback) callback({
          status: rdata,
          msg: lan.index.rep_panel_ok
        });
        bt.system.reload_panel();
      }

    })
  },
  get_warning: function (callback) {
    bt.send('GetWarning', 'ajax/GetWarning', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  root_reload: function (callback) {
    bt.send('RestartServer', 'system/RestartServer', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  }
}

bt.control = {
  get_status: function (callback) {
    loading = bt.load(lan['public'].read);
    bt.send('GetControl', 'control/SetControl', {
      type: 1
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_control: function (type, day, callback) {
    loadT = bt.load(lan['public'].the);
    bt.send('SetControl', 'config/SetControl', {
      type: type,
      day: day
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    })
  },
  clear_control: function (callback) {
    bt.confirm({
      msg: lan.control.close_log_msg,
      title: lan.control.close_log
    }, function () {
      loadT = bt.load(lan['public'].the);
      bt.send('SetControl', 'config/SetControl', {
        type: 'del'
      }, function (rdata) {
        loadT.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    })
  },
  get_data: function (type, start, end, callback) {
    action = '';
    switch (type) {
      case 'cpu': //cpu和内存一起获取
        action = 'GetCpuIo';
        break;
      case 'disk':
        action = 'GetDiskIo';
        break;
      case 'net':
        action = 'GetNetWorkIo';
        break;
      case 'load':
        action = 'get_load_average';
        break;
    }
    if (!action) bt.msg(lan.get('lack_param', 'type'));
    bt.send(action, 'ajax/' + action, {
      start: start,
      end: end
    }, function (rdata) {
      if (callback) callback(rdata, type);
    })
  },
  format_option: function (obj, type) {
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: obj.formatter
      },
      grid: obj.grid || {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: obj.tData,
        axisLine: {
          lineStyle: {
            color: "#666"
          }
        }
      },
      yAxis: {
        type: 'value',
        name: obj.unit,
        boundaryGap: [0, '100%'],
        splitNumber: obj.splitNumber,
        min: 0,
        splitLine: {
          lineStyle: {
            color: "#ddd"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#666"
          }
        }
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        zoomLock: true
      }, {
        start: 0,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: []
    };
    if (obj.legend) option.legend = obj.legend;
    if (obj.dataZoom) option.dataZoom = obj.dataZoom;

    for (var i = 0; i < obj.list.length; i++) {
      var item = obj.list[i];
      series = {
        name: item.name,
        type: item.type ? item.type : 'line',
        smooth: item.smooth ? item.smooth : true,
        symbol: item.symbol ? item.symbol : 'none',
        showSymbol: item.showSymbol ? item.showSymbol : false,
        sampling: item.sampling ? item.sampling : 'average',
        areaStyle: item.areaStyle ? item.areaStyle : {},
        lineStyle: item.lineStyle ? item.lineStyle : {},
        itemStyle: item.itemStyle ? item.itemStyle : {
          normal: {
            color: 'rgb(0, 153, 238)'
          }
        },
        symbolSize: 6,
        symbol: 'circle',
        data: item.data
      }
      option.series.push(series);
    }
    return option;
  }
}

bt.firewall = {
  get_log_list: function (page, search, callback) {
    if (page == undefined) page = 1
    search = search == undefined ? '' : search;
    var order = bt.get_cookie('order') ? '&order=' + bt.get_cookie('order') : '';

    var data = 'tojs=firewall.get_log_list&table=logs&limit=10&p=' + page + '&search=' + search + order;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_list: function (page, search, callback) {
    if (page == undefined) page = 1
    search = search == undefined ? '' : search;
    var order = bt.get_cookie('order') ? '&order=' + bt.get_cookie('order') : '';

    var data = 'tojs=firewall.get_list&table=firewall&limit=10&p=' + page + '&search=' + search + order;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_logs_size: function (callback) {
    if (bt.os == 'Linux') {
      bt.files.get_dir_size('/www/wwwlogs', function (rdata) {
        if (callback) callback(rdata);
      })
    }
  },
  get_ssh_info: function (callback) {
    bt.send('GetSshInfo', 'firewall/GetSshInfo', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_mstsc: function (port, callback) {
    bt.confirm({
      msg: lan.firewall.ssh_port_msg,
      title: lan.firewall.ssh_port_title
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('SetSshPort', 'firewall/SetSshPort', {
        port: port
      }, function (rdata) {
        loading.close();
        bt.msg(rdata);
        if (callback) callback(rdata);
      })
    })
  },
  ping: function (status, callback) {
    var msg = status == 0 ? lan.firewall.ping_msg : lan.firewall.ping_un_msg;
    layer.confirm(msg, {
      closeBtn: 2,
      title: lan.firewall.ping_title,
      cancel: function () {
        if (callback) callback(-1); //取消
      }
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('SetPing', 'firewall/SetPing', {
        status: status
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    }, function () {
      if (callback) callback(-1); //关闭
    })
  },
  set_mstsc_status: function (status, callback) {
    var msg = status == 1 ? lan.firewall.ssh_off_msg : lan.firewall.ssh_on_msg;
    layer.confirm(msg, {
      closeBtn: 2,
      title: lan['public'].warning,
      cancel: function () {
        if (callback) callback(-1); //取消
      }
    }, function () {
      loading = bt.load(lan['public'].the);
      bt.send('SetSshStatus', 'firewall/SetSshStatus', {
        status: status
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    }, function () {
      if (callback) callback(-1); //关闭
    })
  },
  add_accept_port: function (type, port, ps, callback) {
    var action = "AddDropAddress";
    if (type == 'port') {
      ports = port.split(':');
      if (port.indexOf('-') != -1) ports = port.split('-');
      for (var i = 0; i < ports.length; i++) {
        if (!bt.check_port(ports[i])) {
          layer.msg(lan.firewall.port_err, {
            icon: 5
          });
          return;
        }
      }
      action = "AddAcceptPort";
    }

    if (ps.length < 1) {
      layer.msg(lan.firewall.ps_err, {
        icon: 2
      });
      return -1;
    }
    loading = bt.load();
    bt.send(action, 'firewall/' + action, {
      port: port,
      type: type,
      ps: ps
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  del_accept_port: function (id, port, callback) {
    var action = "DelDropAddress";
    if (port.indexOf('.') == -1) {
      action = "DelAcceptPort";
    }
    bt.confirm({
      msg: lan.get('confirm_del', [port]),
      title: lan.firewall.del_title
    }, function (index) {
      var loadT = bt.load(lan['public'].the_del);
      bt.send(action, 'firewall/' + action, {
        id: id,
        port: port
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    });
  },
  clear_logs_files: function (callback) {
    var loadT = bt.load(lan.firewall.close_the);
    bt.send('CloseLogs', 'files/CloseLogs', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  clear_logs: function (callback) {
    bt.show_confirm(lan.firewall.close_log, lan.firewall.close_log_msg, function () {
      var loadT = bt.load(lan.firewall.close_the);
      bt.send('delClose', 'ajax/delClose', {}, function (rdata) {
        loadT.close();
        if (callback) {
          callback(rdata);
        } else {
          bt.msg(rdata);
        }
      });
    });
  }
}

bt.soft = {
  pub: {
    wxpayTimeId: 0
  },
  php: {
    get_config: function (version, callback) { //获取禁用函数,扩展列表
      //var loading = bt.load();
      bt.send('GetPHPConfig', 'ajax/GetPHPConfig', {
        version: version
      }, function (rdata) {
        //loading.close();
        if (callback) callback(rdata);
      })
    },
    get_limit_config: function (version, callback) { //获取超时限制,上传限制
      var loading = bt.load();
      bt.send('get_php_config', 'config/get_php_config', {
        version: version
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    },
    get_php_config: function (version, callback) {
      var loading = bt.load();
      bt.send('GetPHPConf', 'config/GetPHPConf', {
        version: version
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    },
    install_php_lib: function (version, name, title, callback) {
      bt.confirm({
        msg: lan.soft.php_ext_install_confirm.replace('{1}', name),
        title: '安装【' + name + '】'
      }, function () {
        name = name.toLowerCase();
        var loadT = bt.load(lan.soft.add_install);
        bt.send('InstallSoft', 'files/InstallSoft', {
          name: name,
          version: version,
          type: "1"
        }, function (rdata) {
          loadT.close();
          if (callback) callback(rdata);
          bt.msg(rdata);
        });
        fly("bi-btn");
      });
    },
    un_install_php_lib: function (version, name, title, callback) {
      bt.confirm({
        msg: lan.soft.php_ext_uninstall_confirm.replace('{1}', name),
        title: '卸载【' + name + '】'
      }, function () {
        name = name.toLowerCase();
        var data = 'name=' + name + '&version=' + version;
        var loadT = bt.load();
        bt.send('UninstallSoft', 'files/UninstallSoft', {
          name: name,
          version: version
        }, function (rdata) {
          loadT.close();
          if (callback) callback(rdata);
          bt.msg(rdata);
        });
      });
    },
    set_upload_max: function (version, max, callback) {
      var loadT = bt.load(lan.soft.the_save);
      bt.send('setPHPMaxSize', 'config/setPHPMaxSize', {
        version: version,
        max: max
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    },
    set_php_timeout: function (version, time, callback) {
      var loadT = bt.load(lan.soft.the_save);
      bt.send('setPHPMaxTime', 'config/setPHPMaxTime', {
        version: version,
        time: time
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      });
    },
    disable_functions: function (version, fs, callback) {
      var loadT = bt.load();
      bt.send('setPHPDisable', 'config/setPHPDisable', {
        version: version,
        disable_functions: fs
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      });
    },
    get_fpm_config: function (version, callback) {
      var loadT = bt.load();
      bt.send('getFpmConfig', 'config/getFpmConfig', {
        version: version
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    },
    set_fpm_config: function (version, data, callback) {
      var loadT = bt.load();
      data.version = version;
      bt.send('setFpmConfig', 'config/setFpmConfig', data, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    },
    get_php_status: function (version, callback) {
      var loadT = bt.load();
      bt.send('GetPHPStatus', 'ajax/GetPHPStatus', {
        version: version
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    },
    // 获取PHP_session
    get_php_session: function (version, callback) {
      var loadT = bt.load();
      bt.send('GetSessionConf', 'config/GetSessionConf', {
        version: version
      }, function (res) {
        loadT.close();
        if (callback) callback(res);
      });
    },
    // 设置PHP_session文件
    set_php_session: function (obj, callback) {
      var loadT = bt.load();
      bt.send('SetSessionConf', 'config/SetSessionConf', obj, function (res) {
        loadT.close();
        if (callback) callback(res);
      });
    },
    // 获取PHP_session清理信息
    get_session_count: function (callback) {
      var loadT = bt.load();
      bt.send('GetSessionCount', 'config/GetSessionCount', {}, function (res) {
        loadT.close();
        if (callback) callback(res);
      });
    },
    // 清理php_session
    clear_session_count: function (obj, callback) {
      bt.confirm({
        msg: obj.msg,
        title: obj.title
      }, function () {
        var loadT = bt.load();
        bt.send('DelOldSession', 'config/DelOldSession', {}, function (res) {
          loadT.close();
          if (callback) callback(res);
        })
      });
    },
    get_fpm_logs: function (version, callback) {
      var loadT = bt.load();
      bt.send('GetFpmLogs', 'ajax/GetFpmLogs', {
        version: version
      }, function (logs) {
        loadT.close();
        if (logs.status !== true) {
          logs.msg = '';
        }
        if (logs.msg == '') logs.msg = '当前没有fpm日志.';
        if (callback) callback(logs);
      })
    },
    get_slow_logs: function (version, callback) {
      var loadT = bt.load();
      bt.send('GetFpmSlowLogs', 'ajax/GetFpmSlowLogs', {
        version: version
      }, function (logs) {
        loadT.close();
        if (logs.status !== true) {
          logs.msg = '';
        }
        if (logs.msg == '') logs.msg = '当前没有慢日志.';
        if (callback) callback(logs);
      })
    }
  },
  redis: {
    get_redis_status: function (callback) {
      var loadT = bt.load();
      bt.send('GetRedisStatus', 'ajax/GetRedisStatus', {}, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      });
    }
  },
  pro: {
    conver_unit: function (name) {
      var unit = '';
      switch (name) {
        case "year":
          unit = "年";
          break;
        case "month":
          unit = "个月";
          break;
        case "day":
          unit = "天";
          break;
        case "1":
          unit = "1个月";
          break;
        case "3":
          unit = "3个月";
          break;
        case "6":
          unit = "6个月";
          break;
        case "12":
          unit = "1年";
          break;
        case "24":
          unit = "2年";
          break;
        case "36":
          unit = "3年";
          break;
        case "999":
          unit = "永久";
          break;
      }
      return unit;
    },
    get_product_discount_by: function (pluginName, callback) {
      if (pluginName) {
        bt.send('get_plugin_price', 'auth/get_plugin_price', {
          pluginName: pluginName
        }, function (rdata) {
          if (callback) callback(rdata)
        })
      } else {
        bt.send('get_product_discount_by', 'auth/get_product_discount_by', {}, function (rdata) {
          if (callback) callback(rdata)
        })
      }

    },
    get_plugin_coupon: function (pid, callback) {
      bt.send('check_pay_status', 'auth/check_pay_status', {
        id: pid
      }, function (rdata) {
        if (callback) callback(rdata);
      })
    },
    get_wx_order_status: function (wxoid, callback) {
      bt.send('get_wx_order_status', 'auth/get_wx_order_status', {
        wxoid: wxoid,
        kf: ($('.libPay-kf-input').prop('checked') ? 1 : 0)
      }, function (rdata) {
        if (callback) callback(rdata);
      })
    },
    get_re_order_status: function (callback) {
      bt.send('get_re_order_status', 'auth/get_re_order_status', {}, function (rdata) {
        if (callback) callback(rdata);
      })
    },
    get_voucher: function (pid, callback) {
      if (pid) {
        bt.send('get_voucher_plugin', 'auth/get_voucher_plugin', {
          pid: pid
        }, function (rdata) {
          if (callback) callback(rdata);
        })
      } else {
        bt.send('get_voucher', 'auth/get_voucher', {}, function (rdata) {
          if (callback) callback(rdata);
        })
      }
    },
    create_order_voucher: function (pid, code, callback) {
      var loading = bt.load();
      if (pid) {
        bt.send('create_order_voucher_plugin', 'auth/create_order_voucher_plugin', {
          pid: pid,
          code: code
        }, function (rdata) {
          loading.close();
          if (callback) callback(rdata);
          bt.msg(rdata);
        })
      } else {
        bt.send('create_order_voucher', 'auth/create_order_voucher', {
          code: code
        }, function (rdata) {
          loading.close();
          if (callback) {
            callback(rdata);
          } else {
            bt.soft.pro.update();
          }
        })
      }
    },
    create_order: function (config, callback) {
      if (typeof config.pid != 'undefined') {
        bt.send('get_buy_code', 'auth/get_buy_code', config, function (rdata) {
          if (callback) callback(rdata);
        })
      } else {
        bt.send('create_order', 'auth/create_order', config, function (rdata) {
          if (callback) callback(rdata);
        })
      }
    }
  },
  get_index_renew: function () {
    bt.soft.get_product_renew(function (res) {
      var html = $('<div><div>');
      if (res.length > 0) {
        bt.soft.each(res, function (index, item) {
          html.append($('<p><span class="glyphicon glyphicon-alert" style="color: #f39c12; margin-right: 10px;"></span>' + item.msg + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="set_messages_status" style="color:#777">[ 忽略提示 ]</a></p>').data(item))
        });
        $('#messageError').show().html(html);
        $('.set_messages_status').click(function () {
          var data = $(this).parent().data(),
            that = this;
          bt.soft.set_product_renew_status({
            id: data.id,
            state: 0
          }, function (rdata) {
            if (!res.status) {
              $(that).parent().remove();
            }
            bt.msg(rdata);
          });
        })
      }

    });
  },
  // 获取产品续费状态
  get_product_renew: function (callback) {
    $.get('/message/get_messages', function (res) {
      if (res.status === false) {
        layer.msg(res.msg, {
          icon: 2
        });
        return false;
      }
      if (callback) callback(res)
    });
  },
  set_product_renew_status: function (data, callback) {
    $.post('/message/status_message', {
      id: data.id,
      state: data.state
    }, function (res) {
      if (res.status === false) {
        layer.msg(res.msg, {
          icon: 2
        });
        return false;
      }
      if (callback) callback(res)
    });
  },
  // 产品支付视图(配置参数)
  product_pay_view: function (config) {
    var bt_user_info = bt.get_cookie('bt_user_info'),
      ltd_end = bt.get_cookie('ltd_end'),
      pro_end = bt.get_cookie('pro_end');
    // 判断登录
    if (!bt_user_info) {
      bt.pub.bind_btname(function () {
        window.location.reload();
      });
      return false;
    }
    if (pro_end === '0' && (config.limit === 'pro' || config.limit === 'ltd')) {
      bt.msg({
        msg: '您当前【专业版】为永久授权，请通过官网解绑后重新操作 <a href="https://www.bt.cn/bbs/thread-50342-1-1.html" target="_blank" class="btlink ml5">《立即前往》</a>',
        icon: 7,
        time: 0,
        shade: [0.3, "#000"]
      })
      return false
    }
    if (config.ps !== undefined) config.ps = config.ps.replace(/#1/g, '<').replace(/#2/g, '>').replace(/#3/g, '"').replace(/#4/g, '\'')
    var that = this;
    var user_info = JSON.parse(bt_user_info);
    var username = user_info.data.username;
    bt.open({
      type: 1,
      title: false,
      skin: 'libPay-view',
      area: ['1000px', '650px'],
      shadeClose: false,
      content: '<div class="libPay-content-box ' + (config.source ? 'sourceTips' : '') + '">\
                <div class="libPay-menu ' + (config.plugin ? 'is_plugin' : '') + '">\
                    ' + (config.plugin ? '<div class="libPay-menu-type lib_plugin"><p>' + config.name + '</p><p>' + config.name + '</p></div>' : '') + '\
                    <div class="libPay-menu-type lib_pro" >\
                        <p><span class="glyphicon glyphicon-vip"></span><span style="margin-left:8px">' + bt.os + '专业版</span></p>\
                        <p>适用于个人用户、个人项目</p>\
                    </div>\
                    <div class="libPay-menu-type lib_ltd" >\
                        <p><span class="recommend-pay-icon"></span><span class="glyphicon glyphicon-vip"></span><span style="margin-left:8px">' + bt.os + '企业版</span></p>\
                        <p>适用于电商、教育、医疗、事业单位等企业用户</p>\
                    </div>\
                    <div class="libPay-menu-type lib_ver" >\
                        <p><span></span><span style="margin-left:8px">抵扣券</span></p>\
                        <p>抵扣券授权</p>\
                    </div>\
                </div>\
                <div id="pay_product_view">\
                    <div class="libVoucher-loading"><p><img src="/static/layer/skin/default/loading-2.gif"></p><p>正在获取数据，请稍候...</p></div>\
                    <div class="libPay-layer-item">\
                        <div class="libPay-line-item proS" id="libPay-theme-tips">\
                            <p>企业版特权:</p>\
                        </div>\
                        <div class="libPay-line-item proP" id="libPay-theme-price"><ul class="pay-pro-cycle"></ul></div>\
                        <div class="libPay-line-item prokf hide">\
                            <label>\
                                <i class="libPay-kf-consul"></i>\
                                <input type="checkbox" class="libPay-kf-input">\
                            </label>\
                            <span>是否需要客服电话联系，工作时间 9：30-18：00</span>\
                        </div>\
                        <div class="libPay-line-item mtb20" id="libPay-qcode-box">\
                            <div class="libPay-qcode-left">\
                                <div class="pay-radio-type" >\
                                    <div class="pay-type-btn active" data-condition="2" >\
                                        <label class="pay-type-label"> <span class="pay-radio-ati"></span><span class="pay-radio-tit">微信扫码支付</span></label>\
                                    </div>\
                                    <div class="pay-type-btn" data-condition="3">\
                                        <label class="pay-type-label"><span class="pay-radio-ati"></span><span class="pay-radio-tit">支付宝扫码支付</span></label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="libPay-qcode-right">\
                                <div class="libPay-loading"><p><img src="/static/layer/skin/default/loading-2.gif"></p><p>正在生成订单,请稍候...</p></div>\
                                <div class= "libPaycode-box">\
                                    <div class="pay-wx" style="height:155px;width: 155px" id="PayQcode" ></div>\
                                    <div class="payqcode-box" >\
                                        <span class="wx-pay-ico mr5 wechat"></span>\
                                    </div>\
                                    <div class="libPaycode-foo-txt" >\
                                        <div class="userinfo">\
                                            <div class="info_label">当前账号：</div>\
                                            <div class="info_value">' + username + '</div>\
                                            <a class="btlink" onclick="bt.pub.bind_btname()" href="javascript:;">切换账号</a>\
                                        </div>\
                                        <p> 订单总价:</p> <span class="libPayTotal">---</span> /<lable class="libPayCycle">--年</lable>\
                                        <div class= "libPaycode-pro-cylce">低至--元/天 </div>\
                                    </div>\
                                </div >\
                            </div>\
                        </div>\
                        <ul class="libPay-footer-tips">\
                            <li>所有不在堡塔付款的宝塔产品100%是骗人的，请勿上当。<a class="btlink" href="https://www.bt.cn/bbs/thread-22665-1-1.html" target="_blank">查看详情</a></p>\
                            <li>如果购买后未立即到账，请耐心等待5分钟后重新登录面板，如遇到支付异常请联系客服QQ：<a class="btlink" href="https://wpa1.qq.com/OUMbED4a?_type=wpa&qidian=true" target="_blank">3007255432</a></p>\
                        </ul>\
                    </div>\
                    <div class="libPay-layer-item">\
                        <p class="voucher-tit">产品类型</p>\
                        <div class="libVoucher-type"><ul class="li-c-item"></ul></div>\
                        <p class="voucher-tit" style="margin-top: 20px;">抵扣券列表</p>\
                        <div class="libVoucher-list"><ul class="pay-btn-group"></ul></div>\
                        <div class="libPay-voucher-submit" style="margin:33px 0">\
                            <div class="paymethod-submit text-center" >\
                                <button class="btn btn-success btn-sm f16 disabled" style="width: 200px; height: 40px;">暂无抵扣劵，请先购买</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>',
      success: function (indexs, layers) {
        var loadT = bt.load('正在获取产品推荐信息，请稍后...');
        bt.send('get_plugin_remarks', 'auth/get_plugin_remarks', {}, function (res) {
          loadT.close()
          //初始化
          that.pay_loading.init('start')
          that.pay_loading.init('end')
          // 防止浏览器过低
          $('.libPay-view .layui-layer-content').removeAttr('style')
          $('.libPay-view .layui-layer-page,.libPay-view .layui-layer-content').height(650);
          //客服电话咨询
          $('.libPay-line-item.prokf').click(function (ev) {
            if ($(this).find('i').hasClass('active')) {
              $(this).find('i').removeClass('active');
              $(this).find('input').prop('checked', false)
            } else {
              $(this).find('i').addClass('active');
              $(this).find('input').prop('checked', true)
            }
            ev.preventDefault();
          })
          var arry = [{
            title: '专业版',
            name: '宝塔面板专业版',
            pid: 100000011,
            type: 'pro',
            rlist: res.pro_list
          }, {
            title: '企业版',
            name: '宝塔面板企业版',
            pid: 100000032,
            type: 'ltd',
            rlist: res.list
          }]
          if (config.plugin) arry.unshift({
            name: config.name,
            pid: config.pid,
            type: 'plugin',
            typeid: config.type,
            ps: config.ps
          })
          $('.libPay-menu .libPay-menu-type').each(function (index) {
            $(this).data(arry[index])
          })
          $(".libPay-menu .libPay-menu-type").click(function () {
            var _item = $(this).data();
            that.get_product_change($(this).index(), _item.type)
          })

          //100000000表示获取所有抵扣券
          bt.soft.pro.get_voucher(100000000, function (rdata) {
            var tab_list = $(".libPay-menu .libPay-menu-type"),
              item = arry[rdata.length > 0 ? (tab_list.length - 1) : 0], is_coupon = false;
            $(".libVoucher-loading").hide()
            tab_list.last().data({
              type: 'ver',
              data: rdata
            })
            for (var i = 0; i < rdata.length; i++) {
              if (rdata[i].product_id === config.pid) {
                is_coupon = true;
                break;
              }
            }
            if (!is_coupon) {
              if (config.limit === 'ltd') tab_list.eq(1).click()
              if (config.limit === 'pro' || config.plugin) tab_list.eq(0).click()
            } else {
              that.get_product_change(tab_list.length - 1, 'ver')
            }
          });
        })
      },
      end: function () {
        clearInterval(bt.soft.pub.wxpayTimeId);
        bt.clear_cookie('pay_source');
      }
    });
  },
  //获取付款周期
  get_product_change: function (idx, btype) {
    var that = this,
      _pro_end = bt.get_cookie('pro_end'),
      _ltd_end = bt.get_cookie('ltd_end')

    clearInterval(bt.soft.pub.wxpayTimeId);
    $('.libPay-layer-item').eq(btype === 'ver' ? 1 : 0).addClass('aShow').siblings().removeClass('aShow');
    var _obj = $('.libPay-menu .libPay-menu-type').eq(idx)
    _obj.addClass('active').siblings().removeClass('active');
    var _data = _obj.data()
    if (btype !== 'ver') {
      var _html = '<p>' + _data.title + '特权</p>';
      if (btype !== 'plugin') {
        $.each(_data['rlist'], function (index, item) {
          _html += '<div class="pro-introduce"><span class="glyphicon glyphicon-ok"></span><span>' + item + '</span></div>';
        })
      } else {
        _html = '<p>插件说明</p><div style="height:70px;padding-top: 15px">' + _data.ps + '</div>'
      }
      $('#libPay-theme-tips').empty().append(_html)

      that.get_product_discount_cache(_data, function (rdata) {
        var _ul = $("#libPay-theme-price ul").empty(),
          num = 0,
          html = '';
        for (var keys in rdata) {
          var item = rdata[keys];
          if (typeof item === 'object') {
            num++;
            if (num > 4) break
            item['cycle'] = keys
            var _li = $('<li class="pay-cycle-btns" data-type="' + keys + '"><div class="pay-head-price"><span><div class="libPrice"><i>' + item.price + '</i>元</div>/' + that.pro.conver_unit(item.cycle + '') + '</span><p>原价:' + item.sprice + '元</p></div><div class="pay-foo-price">低至' + (item.price / ((item.cycle / 12) * 365)).toFixed(2) + '元/天</div>' + (item.tip ? '<em>' + item.tip + '</em>' : '') + '</li>')
            _li.data('data', item).click(function () {
              that.create_pay_code($(this).index())
            })
            _ul.append(_li)
          }
        }
        // if(num >= 4) $('#libPay-theme-price .pay-cycle-btns').css('width',((910  - ((num - 1) * 10)) / num) + 'px')
        that.create_pay_code(0)
      })
    } else {
      _data = _obj.data().data;
      if (_data === undefined || _data.length <= 0) {
        $(".libPay-layer-item.aShow p").hide()
        return
      }
      $(".libPay-layer-item.aShow p").show()
      var _arry = {}
      this.each(_data, function (index, item) {
        if (!_arry.hasOwnProperty(item.product_id)) {
          _arry[item.product_id] = {
            name: item.name,
            product_id: item.product_id,
            list: [],
            active: false
          }
        }
        _arry[item.product_id]['list'].push(item)
      })
      //抵扣券分类
      var _ul = $('.libVoucher-type ul').empty()
      $.each(_arry, function (index, oitem) {
        var p_html = '<span><span>' + oitem.name + '</span></span>'
        if ($.inArray(oitem.product_id, [100000030, 100000011]) >= 0) {
          p_html = '<span class="pro-font-icon"><span class="glyphicon glyphicon-vip" style="margin-right:5px"></span><span>' + oitem.name + '</span></span>'
        } else if ($.inArray(oitem.product_id, [100000046, 100000032]) >= 0) {
          p_html = '<span class="ltd-font-icon"><span class="glyphicon glyphicon-vip" style="margin-right:5px"></span><span>' + oitem.name + '</span></span>'
        }

        var _li = $('<li class="pay-cycle-btn auto" data-id="' + oitem.product_id + '" >' + p_html + '</li>').data(oitem).click(function (ev) {
          $(this).addClass('active').siblings().removeClass('active');

          //抵扣券列表
          var _vlist = $('.libVoucher-list ul').empty()
          var v_data = $(this).data()
          $.each(v_data.list, function (index, item) {
            var _v_li = $('<li class="pay-cycle-btn ' + (index == 0 ? "active" : "") + '"><span>' + (item.unit == 'month' && item.cycle == 999 ? '永久' : (item.cycle + that.pro.conver_unit(item.unit))) + '</span></li>').data(item).click(function () {
              $(this).addClass('active').siblings().removeClass('active');
            })
            _vlist.append(_v_li);
          })
          var sub_btn = $('.libPay-voucher-submit button');
          if (v_data.list.length > 0) {
            //抵扣券续费
            sub_btn.removeClass('disabled').text('提交').unbind('click').click(function () {
              var s_data = $('.libVoucher-list li.active').data();
              if (!s_data) {
                layer.msg('无可用优惠券');
                return false;
              }
              var _pro_end = bt.get_cookie('pro_end'),
                _ltd_end = bt.get_cookie('ltd_end')

              bt.soft.pro.create_order_voucher(s_data.product_id, s_data.code, function (rdata) {
                layer.closeAll();
                bt.set_cookie('force', 1);
                if (soft) soft.flush_cache();
                bt.msg(rdata);
              });
            })
          } else {
            sub_btn.addClass('disabled').text('暂无抵扣劵，请先购买').unbind('click')
          }
        })
        //企业版、专业版靠前
        if ($.inArray(oitem.product_id, [100000011, 100000032]) >= 0) {
          _ul.prepend(_li);
        } else {
          _ul.append(_li);
        }
      })

      //判断企业版、专业版未到期的产品
      if (_ltd_end > 0) {
        var ltd = _ul.find('li[data-id=100000032]');
        if (ltd.length) ltd.trigger('click')
      } else if (_pro_end > 0) {
        var pro = _ul.find('li[data-id=100000011]')
        if (pro.length) pro.trigger('click')
      } else {
        _ul.find('li').eq(0).trigger('click')
      }
    }
  },
  //生成支付二维码
  create_pay_code: function (idx) {
    var _obj = $('.pay-cycle-btns').eq(idx).addClass('active').siblings().removeClass('active');
    var that = this,
      _product = $('.libPay-menu-type.active').data(),
      _cycle = $(".pay-cycle-btns.active").data('data'),
      _source = 0,
      _locahostURL = window.location.pathname;
    switch (_locahostURL) {
      case '/':
        _source = 21
        break;
      case '/control':
        _source = 22
        break;
      case '/soft':
        _source = 24;
        if ($('.libPay-content-box').hasClass('sourceTips')) _source = 23;
        break;
      case '/btwaf/index':
        _source = 25
        break;
    };

    $(".wx-pay-ico").hide()
    $(".libPay-loading").show();

    $("#PayQcode").empty()
    $('.libPaycode-foo-txt .libPayTotal').text('---')
    $('.libPaycode-pro-cylce').text('低至--元 / 天')
    that.pay_loading.set('start')
    $(".pay-radio-type").data('data', 0)

    that.pro.create_order({
      pid: _product.pid,
      cycle: _cycle.cycle,
      source: _source
    }, function (rdata) {
      var start = that.pay_loading.get('start')
      var end = that.pay_loading.set('end')
      if (end < start) return

      $(".libPay-loading").hide()
      var active_idx = $('.pay-cycle-btns.active').index()
      if (idx != active_idx) {
        that.create_pay_code(active_idx)
        return
      }
      if (rdata.status === false) {

        bt.set_cookie('force', 1);
        if (soft) soft.flush_cache();
        layer.msg(rdata.msg, { icon: 2 });
        return;
      }
      $(".wx-pay-ico").show()
      $(".pay-radio-type").data('data', rdata)
      $(".libPay-content-box .pay-type-btn").unbind('click').click(function () {
        that.show_pay_code($(this).index())
      })
      // that.show_pay_code($(".pay-type-btn.active").index())
      if (rdata.pay_type === 1) {
        $('.libPay-content-box .pay-type-btn').eq(0).click();
      } else if (rdata.pay_type === 2) {
        $('.libPay-content-box .pay-type-btn').eq(1).click();
      } else {
        that.show_pay_code($(".pay-type-btn.active").index());
      }
      that.product_pay_monitor({
        pid: rdata.data.pid,
        wxoid: rdata.data.wxoid,
        name: _product.name
      });
    });
  },
  show_pay_code: function (idx) {
    var _data = $(".pay-radio-type").data('data'),
      _cycle = $(".pay-cycle-btns.active").data('data'),
      _obj = $(".libPay-content-box .pay-type-btn").eq(idx)
    
    if (!_data) return
    
    $('.libPaycode-foo-txt .libPayTotal').text('¥' + _cycle.price)
    $(".libPayCycle").text(this.pro.conver_unit(_cycle.cycle))
    $('.libPaycode-pro-cylce').text('低至' + (_cycle.price / (_cycle.cycle / 12 * 365)).toFixed(2) + "元 / 天")

    switch (idx) {
      //微信支付
      case 0:
        $('#PayQcode').empty().qrcode(_data.msg);
        $(".payqcode-box span").removeClass('alipay').addClass('wechat')
        break;
      //支付宝支付
      case 1:
        $('#PayQcode').empty().qrcode(_data.ali_msg);
        $(".payqcode-box span").removeClass('wechat').addClass('alipay')
        break;
    }
    _obj.addClass('active').siblings().removeClass('active');
  },
  pay_loading: {
    set: function (type) {
      var count = $(".libPay-loading").data(type)
      if (count) {
        count += 1
      } else {
        count = 1
      }
      $(".libPay-loading").data(type, count)
      return count
    },
    get: function (type) {
      return $(".libPay-loading").data(type)
    },
    init: function (type) {
      $(".libPay-loading").data(type, 0)
    }
  },
  product_cache: {}, //产品周期缓存
  order_cache: {},
  // 获取产品周期 ，并进行对象缓存
  get_product_discount_cache: function (config, callback) {
    var that = this;
    // if (typeof this.product_cache[config.pid] != "undefined") {
    //   if (callback) callback(this.product_cache[config.pid]);
    // } else {
    $(".libVoucher-loading").show()
    that.pay_loading.set('start_price')
    
    bt.soft.pro.get_product_discount_by(config.name, function (rdata) {
        if (that.pay_loading.set('end_price') == that.pay_loading.get('start_price')) {
            $(".libVoucher-loading").hide()
        }
        if (typeof rdata.status === "boolean") {
          if (!rdata.status) return false;
        }
        that.product_cache[config.pid] = rdata;
        setTimeout(function () {
          delete that.product_cache[config.pid]
        }, 60000);
        if (callback) callback(rdata);
    });
    // }
  },
  // 支付状态监听
  product_pay_monitor: function (config) {
    var that = this;

    function callback (rdata) {
      if (rdata.status) {
        clearInterval(bt.soft.pub.wxpayTimeId);
        layer.closeAll();
        var title = '';
        if (config.pid == 100000032 || config.pid === '') {
          title = config.pid === '' ? '专业版支付成功！' : '企业版支付成功！';
          setTimeout(function () {
            bt.set_cookie('force', 1);
            if (soft) soft.flush_cache();
            location.reload(true);
          }, 2000); // 需要重服务端重新获取软件列表，并刷新软件管理浏览器页面
        } else {
          title = config.name + '插件支付成功！';
          setTimeout(function () {
            bt.set_cookie('force', 1);
            if (soft) soft.flush_cache();
            location.reload(true);
          }, 2000); // 需要重服务端重新获取软件列表，
        }
        bt.msg({
          msg: title,
          icon: 1,
          shade: [0.3, "#000"]
        });
      }
    }
    clearInterval(bt.soft.pub.wxpayTimeId);

    function intervalFun () {
      if (config.wxoid) {
        that.pro.get_wx_order_status(config.wxoid, callback);
      } else {
        that.pro.get_re_order_status(callback);
      }
    }
    intervalFun();
    bt.soft.pub.wxpayTimeId = setInterval(function () {
      intervalFun();
    }, 2500);
  },

  updata_ltd: function (is_alone) {
    var param = {
      name: '宝塔面板企业版',
      pid: 100000032,
      source: 5,
      limit: 'ltd'
    };
    if (is_alone || false) $.extend(param, {
      source: 5,
      is_alone: true
    });
    bt.soft.product_pay_view(param);
  },

  updata_pro: function () {
    bt.soft.product_pay_view({
      name: '',
      pid: '',
      source: 5,
      limit: 'pro'
    });
  },
  //遍历数组和对象
  each: function (obj, fn) {
    var key, that = this;
    if (typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
      for (key in obj) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    } else {
      for (key = 0; key < obj.length; key++) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    }
    return that;
  },
  re_plugin_pay_other: function (pluginName, pid, type, price) {
    bt.pub.get_user_info(function (rdata) {
      if (!rdata.status) {
        bt.pub.bind_btname(0, function (rdata) {

        })
        return;
      }
      var txt = '购买';
      if (type) txt = '续费';
      var payhtml = '<div class="libPay" style="padding:15px 30px 30px 30px">\
					<div class="libpay-con">\
						<div class="payment-con">\
							<div class="pay-weixin">\
								<div class="libPay-item f14 plr15">\
									<div class="li-tit c4">' + txt + '时长</div>\
									<div class="li-con c6" id="PayCycle"><ul class="pay-btn-group">\
                                        <li class="pay-cycle-btn active" onclick="bt.soft.get_rscode_other(' + pid + ',' + price + ',1,' + type + ')"><span>1个月</span></li>\
                                        <li class="pay-cycle-btn" onclick="bt.soft.get_rscode_other(' + pid + ',' + price + ',3,' + type + ')"><span>3个月</span></li>\
                                        <li class="pay-cycle-btn" onclick="bt.soft.get_rscode_other(' + pid + ',' + price + ',6,' + type + ')"><span>6个月</span></li>\
                                        <li class="pay-cycle-btn" onclick="bt.soft.get_rscode_other(' + pid + ',' + price + ',12,' + type + ')"><span>1年</span></li>\
                                    </ul></div>\
								</div>\
								<div class="lib-price-box text-center"><span class="lib-price-name f14"><b>总计</b></span><span class="price-txt"><b class="sale-price"></b>元</span><s class="cost-price"></s></div>\
								<div class="paymethod">\
									<div class="pay-wx"></div>\
									<div class="pay-wx-info f16 text-center"><span class="wx-pay-ico mr5"></span>微信扫码支付</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>';

      layer.open({
        type: 1,
        title: txt + pluginName,
        area: ['616px', '450px'],
        closeBtn: 2,
        shadeClose: false,
        content: payhtml
      });
      bt.soft.get_rscode_other(pid, price, 1, type)
      setTimeout(function () {
        $(".pay-btn-group > li").unbind('click').click(function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
      }, 100);
    })
  },
  get_rscode_other: function (pid, price, cycle, type) {
    var loadT = layer.msg('正在获取支付信息...', {
      icon: 16,
      time: 0,
      shade: 0.3
    });
    $.post('/auth?action=create_plugin_other_order', {
      pid: pid,
      cycle: cycle,
      type: type
    }, function (rdata) {
      layer.close(loadT);
      if (!rdata.status) {
        layer.closeAll();
        layer.msg(rdata.msg, {
          icon: rdata.status ? 1 : 2
        });
        return;
      }

      if (!rdata.msg.code) {
        layer.closeAll();
        layer.msg(rdata.msg, {
          icon: rdata.status ? 1 : 2
        });
        soft.flush_cache();
        return;
      }
      $(".sale-price").text((price * cycle).toFixed(2))
      $(".pay-wx").html('');
      $(".pay-wx").qrcode(rdata.msg.code);
      bt.set_cookie('other_oid', rdata.msg.oid)
      bt.soft.get_order_stat(rdata.msg.oid, type);
    });
  },
  get_order_stat: function (order_id, type) {
    if (bt.get_cookie('other_oid') != order_id) return;
    setTimeout(function () {
      $.post('/auth?action=get_order_stat', {
        oid: order_id,
        type: type
      }, function (stat) {
        if (stat == 1) {
          layer.closeAll();
          soft.flush_cache();
          return;
        }

        if ($(".pay-btn-group").length > 0) {
          bt.soft.get_order_stat(order_id, type);
        }
      });

    }, 1000)
  },
  get_index_list: function (callback) {
    bt.send('get_index_list', 'plugin/get_index_list', {}, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_sort_index: function (data, callback) {
    var loading = bt.load();
    bt.send('sort_index', 'plugin/sort_index', {
      ssort: data
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_soft_list: function (p, type, search, callback) {
    if (p == undefined) p = 1;
    if (type == undefined) type = 0;
    if (search == undefined) search = '';
    var force = bt.get_cookie('force');
    if (force == undefined) force = 0;
    p = p + ''
    if (p.indexOf('not_load') == -1) {
      var loading = bt.load(lan['public'].the, 1);
    } else {
      var loading = null;
      p = p.split("not_load")[0];
    }

    bt.send('get_soft_list', 'plugin/get_soft_list', {
      p: p,
      type: type,
      tojs: 'soft.get_list',
      force: force,
      query: search
    }, function (rdata) {
      if (loading) loading.close();
      bt.set_cookie('force', 0);
      bt.set_cookie('ltd_end', rdata.ltd);
      bt.set_cookie('pro_end', rdata.pro);
      if (callback) callback(rdata);
    })
  },
  to_index: function (name, callback) {
    var status = $("#index_" + name).prop("checked") ? "0" : "1";
    if (name.indexOf('php-') >= 0) {
      var verinfo = name.replace(/\./, "");
      status = $("#index_" + verinfo).prop("checked") ? "0" : "1";
    }
    if (status == 1) {
      bt.send('add_index', 'plugin/add_index', {
        sName: name
      }, function (rdata) {
        rdata.time = 1000;
        if (!rdata.status) bt.msg(rdata);
        if (callback) callback(rdata);
      })
    } else {
      bt.send('remove_index', 'plugin/remove_index', {
        sName: name
      }, function (rdata) {
        rdata.time = 1000;
        if (!rdata.status) bt.msg(rdata);
        if (callback) callback(rdata);
      })
    }
  },
  add_make_args: function (name, init) {
    name = bt.soft.get_name(name);
    pdata = {
      name: name,
      args_name: $("input[name='make_name']").val(),
      init: init,
      ps: $("input[name='make_ps']").val(),
      args: $("input[name='make_args']").val()
    }
    if (pdata.args_name.length < 1 || pdata.args.length < 1) {
      layer.msg('自定义模块名称和参数不能为空!');
      return
    }
    loadT = bt.load('正在添加自定义模块...')
    bt.send('add_make_args', 'plugin/add_make_args', pdata, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (rdata.status) {
        bt.soft.loadOpen.close();
        bt.soft.get_make_args(name)
      }
    })
  },
  show_make_args: function (name) {
    name = bt.soft.get_name(name);
    var _aceEditor = '';
    bt.soft.loadOpen = bt.open({
      type: 1,
      title: '添加自定义选装模块',
      area: '500px',
      btn: [lan['public'].submit, lan['public'].close],
      content: '<div class="bt-form c6">\
				<from class="bt-form" id="outer_url_form" style="padding:30px 10px;display:inline-block;">\
					<div class="line">\
						<span class="tname">模块名称</span>\
						<div class="info-r">\
							<input name="make_name" class="bt-input-text mr5" type="text" placeholder="只能是字母、数字、下划线" style="width:350px" value="">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">模块描述</span>\
						<div class="info-r">\
							<input name="make_ps" class="bt-input-text mr5" placeholder="30字以内的描述" type="text" style="width:350px" value="">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">模块参数</span>\
						<div class="info-r">\
							<input name="make_args" class="bt-input-text mr5" type="text" placeholder="如：--add-module=/tmp/echo/echo-nginx-module-master" style="width:350px" value="">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">前置脚本</span>\
						<div class="info-r">\
							<div id="preposition_shell" class="bt-input-text" style="height:300px;width:350px;font-size:11px;line-height:20px;"></div>\
						</div>\
					</div>\
				</from>\
			</div>',
      success: function (layer, index) {
        _aceEditor = ace.edit('preposition_shell', {
          theme: "ace/theme/chrome", //主题
          mode: "ace/mode/sh", // 语言类型
          wrap: true,
          showInvisibles: false,
          showPrintMargin: false,
          showFoldWidgets: false,
          useSoftTabs: true,
          tabSize: 2,
          showPrintMargin: false,
          readOnly: false
        });
        _aceEditor.setValue('# 在编译前执行的shell脚本内容，通常为第三方模块的依赖安装和源码下载等前置准备');
      },
      yes: function () {
        bt.soft.add_make_args(name, _aceEditor.getValue());
      }
    })
  },
  modify_make_args: function (name, args_name) {
    name = bt.soft.get_name(name);
    var _aceEditor = '';
    bt.soft.loadOpen = bt.open({
      type: 1,
      title: '编辑自定义选装模块[' + name + ':' + args_name + ']',
      area: '500px',
      btn: [lan['public'].submit, lan['public'].close],
      content: '<div class="bt-form c6">\
				<from class="bt-form" id="outer_url_form" style="padding:30px 10px;display:inline-block;">\
					<div class="line">\
						<span class="tname">模块名称</span>\
						<div class="info-r">\
							<input name="make_name" class="bt-input-text mr5" type="text" placeholder="只能是字母、数字、下划线" style="width:350px" value="' + bt.soft.make_data[args_name].name + '">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">模块描述</span>\
						<div class="info-r">\
							<input name="make_ps" class="bt-input-text mr5" placeholder="30字以内的描述" type="text" style="width:350px" value="' + bt.soft.make_data[args_name].ps + '">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">模块参数</span>\
						<div class="info-r">\
							<input name="make_args" class="bt-input-text mr5" type="text" placeholder="如：--add-module=/tmp/echo/echo-nginx-module-master" style="width:350px" value="' + bt.soft.make_data[args_name].args + '">\
						</div>\
					</div>\
					<div class="line">\
						<span class="tname">前置脚本</span>\
						<div class="info-r">\
							<div id="preposition_shell" class="bt-input-text" style="height:300px;width:350px;font-size:11px;line-height:20px;"></div>\
						</div>\
					</div>\
				</from>\
			</div>',
      success: function (layer, index) {
        _aceEditor = ace.edit('preposition_shell', {
          theme: "ace/theme/chrome", //主题
          mode: "ace/mode/sh", // 语言类型
          wrap: true,
          showInvisibles: false,
          showPrintMargin: false,
          showFoldWidgets: false,
          useSoftTabs: true,
          tabSize: 2,
          showPrintMargin: false,
          readOnly: false
        });
        _aceEditor.setValue(bt.soft.make_data[args_name].init);
      },
      yes: function () {
        bt.soft.add_make_args(name, _aceEditor.getValue());
      }
    })
  },
  set_make_args: function (_this, name, args_name) {
    name = bt.soft.get_name(name);
    if ($('.args_' + args_name)[0].checked) {
      bt.soft.make_config.push(args_name)
    } else {
      index = bt.soft.make_config.indexOf(args_name)
      if (index === -1) return;
      bt.soft.make_config.splice(index, 1);
    }
    index = bt.soft.make_config.indexOf('')
    if (index !== -1) bt.soft.make_config.splice(index, 1);
    bt.send('set_make_args', 'plugin/set_make_args', {
      name: name,
      args_names: bt.soft.make_config.join("\n")
    }, function (rdata) {
      if (!rdata.status) {
        bt.msg(rdata)
      }
    })
  },
  del_make_args: function (name, args_name) {
    name = bt.soft.get_name(name);
    bt.confirm({
      msg: '真的要删除[' + name + ':' + args_name + ']模块吗？',
      title: '删除[' + name + ':' + args_name + ']模块!'
    }, function () {
      loadT = bt.load('正在删除模块[' + args_name + ']...')
      bt.send('del_make_args', 'plugin/del_make_args', {
        name: name,
        args_name: args_name
      }, function (rdata) {
        bt.msg(rdata);
        bt.soft.get_make_args(name);
      });
    });
  },
  get_make_args: function (name) {
    name = bt.soft.get_name(name);
    loadT = bt.load('正在获取可选模块...')
    bt.send('get_make_args', 'plugin/get_make_args', {
      name: name
    }, function (rdata) {
      loadT.close();
      var module_html = '';
      bt.soft.make_config = rdata.config.split("\n")
      bt.soft.make_data = {}
      for (var i = 0; i < rdata.args.length; i++) {
        bt.soft.make_data[rdata.args[i].name] = rdata.args[i]
        var checked_str = (bt.soft.make_config.indexOf(rdata.args[i].name) == -1 ? '' : 'checked="checked"')
        module_html += '<tr>\
									<td>\
										<input class="args_' + rdata.args[i].name + '" onclick="bt.soft.set_make_args(this,\'' + name + '\',\'' + rdata.args[i].name + '\')" type="checkbox" ' + checked_str + ' />\
									</td>\
									<td>' + rdata.args[i].name + '</td><td>' + rdata.args[i].ps + '</td>\
									<td>\
										<a onclick="bt.soft.modify_make_args(\'' + name + '\',\'' + rdata.args[i].name + '\')" class="btlink">编辑</a>\
										| <a onclick="bt.soft.del_make_args(\'' + name + '\',\'' + rdata.args[i].name + '\')" class="btlink">删除</a>\
									</td>\
								</tr>';
      }
      $(".modules_list").html(module_html);
    });
  },
  check_make_is: function (name) {
    name = bt.soft.get_name(name);
    var shows = ["nginx", 'apache', 'mysql', 'php']
    for (var i = 0; i < shows.length; i++) {
      if (name.indexOf(shows[i]) === 0) {
        return true
      }
    }
    return false
  },
  get_name: function (name) {
    if (name.indexOf('php-') === 0) {
      return 'php';
    }
    return name
  },
  install: function (name, that) {
    var _this = this;
    if (bt.soft.is_install) {
      layer.msg('正在安装其他软件，请稍后操作！', { icon: 0 });
      return false;
    }
    _this.get_soft_find(name, function (rdata) {
      var arrs = ['apache', 'nginx', 'mysql'], html = '';
      if ($.inArray(name, arrs) >= 0 || name.indexOf('php-') >= 0) {
        var select = '';
        if (rdata.versions.length > 1) {
          $.each(rdata.versions, function (index, item) {
            select += '<option data-index="' + index + '">' + name + item.m_version + '</option>';
          })
          html += '<select id="SelectVersion" class="bt-input-text ml10" style="margin-left:10px">' + select + '</select>'
        } else {
          html += '<span id="SelectVersion">' + rdata.name + rdata.versions[0].m_version + '</span>'
        }
        var loadOpen = bt.open({
          type: 1,
          title: name + lan.soft.install_title,
          area: '400px',
          btn: [lan['public'].submit, lan['public'].close],
          content: "<div class='bt-form pd20 c6'>\
						<div class='version line' style='padding-left:15px'>" + lan.soft.install_version + "：" + html + "</div>\
						<div class='fangshi line' style='padding-left:15px;margin-bottom:0px'>" + lan.bt.install_type + "：<label data-title='" + lan.bt.install_src_title + "'>" + lan.bt.install_src + "<input type='checkbox' name='installType' value='0'></label><label data-title='" + lan.bt.install_rpm_title + "'>" + lan.bt.install_rpm + "<input type='checkbox' name='installType' value='1' checked></label></div>\
						<div class='install_modules' style='display: none;'>\
							<div style='margin-bottom:15px;padding-top:15px;border-top:1px solid #ececec;'><button onclick=\"bt.soft.show_make_args(\'" + name + "\')\" class='btn btn-success btn-sm'>添加自定义模块</button></div>\
							<div class='select_modules divtable' style='margin-bottom:20px'>\
								<table class='table table-hover'>\
									<thead>\
										<tr>\
											<th width='10px'></th>\
											<th width='80px'>模块名称</th>\
											<th >模块描述</th>\
											<th width='80px'>操作</th>\
										</tr>\
									</thead>\
									<tbody class='modules_list'></tbody>\
								</table>\
							</div>\
						</div>\
					</div>",
          success: function () {
            $('.fangshi input').click(function () {
              $(this).attr('checked', 'checked').parent().siblings().find("input").removeAttr('checked');
              var type = parseInt($('[name="installType"]:checked').val())
              if (type) {
                $(".install_modules").hide();
                return;
              }
              if (bt.soft.check_make_is(name)) {
                $(".install_modules").show();
                bt.soft.get_make_args(name);
              }
            });
          },
          yes: function (indexs, layers) {
            loadOpen.close();
            layer.close(indexs)
            rdata['install_type'] = parseInt($('[name="installType"]:checked').val())
            if (rdata.versions.length > 1) {
              var index = $("#SelectVersion option:selected").attr('data-index')
              rdata['install_version'] = rdata.versions[index]
              _this.install_soft(rdata, that);
            } else {
              rdata['install_version'] = rdata.versions[0]
              _this.install_soft(rdata, that);
            }
          }
        });
      } else if (rdata.versions.length > 1) {
        var SelectVersion = '';
        for (var i = 0; i < rdata.versions.length; i++) {
          var item = rdata.versions[i];
          var beta = item.beta === 1 ? ' Beta' : ' Stable';
          SelectVersion += '<option  data-index="' + i + '">' + item.m_version + '.' + item.version + beta + '</option>';
        }
        bt.open({
          type: 1,
          title: '【' + rdata.title + '】' + lan.soft.install_title,
          area: '350px',
          btn: ['安装', '取消'],
          content: "<div class='bt-form pd20 c6'>\
						<div class='version line'>" + lan.soft.install_version + "：<select id='SelectVersion' class='bt-input-text' style='margin-left:30px;width:200px;'>" + SelectVersion + "</select></div>\
				    </div>",
          yes: function (indexs, layers) {
            var index = $("#SelectVersion option:selected").attr('data-index')
            layer.close(indexs)
            rdata['install_version'] = rdata.versions[index]
            _this.install_soft(rdata, that);
          }
        })
      } else {
        rdata['install_version'] = rdata.versions[0]
        _this.install_soft(rdata, that);
      }
    })
  },
  is_loop_speed: true,
  is_install: false,

  /**
   * @description 监听下载进度
   * @param {object} param 参数
   * @param {function} callback 回调函数
   * @param {string} type 判断是否为第一次
   */
  monitor_soft_download_speed: function (param, callback, type) {
    var that = this
    if (!type) {
      layer.open({
        type: 1,
        title: false,
        area: '450px',
        btn: false,
        closeBtn: 0,
        skin: 'soft_download_speed',
        content: '<div class="message-list" style="padding: 12px 15px;">' +
          '<div class="mw-con">' +
          '<ul class="waiting-down-list">' +
          '<li>' +
          '<div class="down-filse-name">' +
          '<span class="fname" style="width:80%;" title="">正在下载' + param.name + ' ' + param.version + '.' + param.min_version + '，请稍后...</span>' +
          '<span style="width: 20%;display: inline-block;vertical-align: top;text-align: right;" data-name="down_pre">0%</span></div>' +
          '<div class="down-progress">' +
          '<div class="done-progress" data-name="progress" style="width:0%"></div></div>' +
          '<div class="down-info"><span class="total-size" data-name="size">0 KB/0 KB</span><span  class="speed-size" data-name="speed">0K/s</span><span style="margin-left: 20px;" data-name="time">预计还要: -- 秒</span></div>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</div>',
        success: function (layero, index) {
          that.monitor_soft_download_speed(param, callback, true)
        }
      })
    } else {
      that.get_soft_download_speed(param, function (res) {
        if ($('.soft_download_speed').length === 0) return false
        if (res.down_pre) {
          $('[data-name="down_pre"]').text(res.down_pre + ' %')
          $('[data-name="size"]').text(bt.format_size(res.down_size) + ' / ' + bt.format_size(res.total_size))
          $('[data-name="speed"]').text(bt.format_size(res.sec_speed) + '/s')
          $('[data-name="time"]').text('预计还要:' + res.need_time + '秒')
          $('[data-name="progress"]').css({
            'width': res.down_pre + '%'
          })
        }
        setTimeout(function () {
          that.monitor_soft_download_speed(param, callback, true)
        }, 1000)
      })
    }


  },
  /**
   * @description 获取软件下载进度
   * @param {function} callback 回调函数
   */
  get_soft_download_speed: function (param, callback) {
    bt.send('get_download_speed', 'plugin/get_download_speed', {
      plugin_name: param.plugin_name
    }, function (res) {
      if (callback) callback(res);
    })
  },
  //显示进度
  show_speed: function () {
    bt.send('get_lines', 'ajax/get_lines', {
      num: 10,
      filename: "/tmp/panelShell.pl"
    }, function (rdata) {
      var msg_lines = rdata.msg.trim().split("\n")
      if (msg_lines[msg_lines.length - 1] === 'Successify') {
        layer.closeAll();
        if (soft) {
          soft.get_list();
          setTimeout(function () {
            bt.msg({ status: true, msg: '安装成功！' });
          }, 500)
        }
        return false;
      }
      if ($("#install_show").length < 1) return;
      if (rdata.status === true) {
        $("#install_show").text(rdata.msg);
        $('#install_show').animate({
          scrollTop: $('#install_show').prop("scrollHeight")
        }, 400);
      }
      if (bt.soft.is_loop_speed) {
        setTimeout(function () {
          bt.soft.show_speed();
        }, 1000)
      }
    });
  },
  loadT: null,
  //显示进度窗口
  show_speed_window: function (config, callback) {
    if (!config.soft) config['soft'] = {
      type: 10
    }
    if (config.soft.type == 5) { //使用消息盒子安装
      if (callback) callback();
      return false;
    } else if (config.soft.type == 10 && !config.status) { //第三方安装, 非安装，仅下载安装脚本
      if (callback) callback();
      return false;
    }

    layer.closeAll();
    bt.soft.loadT = layer.open({
      title: config.title || '正在执行安装脚本，请稍后...',
      type: 1,
      closeBtn: false,
      maxmin: true,
      shade: false,
      skin: 'install_soft',
      area: ["500px", '300px'],
      content: "<pre style='width:500px;margin-bottom: 0px;height:100%;border-radius:0px; text-align: left;background-color: #000;color: #fff;white-space: pre-wrap;' id='install_show'>" + config.msg + "</pre>",
      success: function (layers, index) {
        $(config.event).removeAttr('onclick').html('正在安装');
        $('.layui-layer-max').hide();
        bt.soft.is_loop_speed = true;
        bt.soft.is_install = true;
        bt.soft.show_speed();
        if (callback) callback();
      },
      end: function () {
        bt.soft.is_install = false;
        bt.soft.is_loop_speed = false;
      },
      min: function () {
        $('.layui-layer-max').show();
      },
      restore: function () {
        $('.layui-layer-max').hide();
      }
    });
  },
  /**
   * @description 安装指定软件版本
   * @param item
   * @param version
   * @param min_version
   * @param type
   * @param that
   */
  install_soft: function (item, that) { //安装单版本

    if (!item.install_version) {
      if (typeof (that) == 'string') {
        item.install_version = {
          m_version: that,
          version: ''
        }
      } else {
        layer.msg('没有找到要安装的版本号!', { icon: 2, time: 5000 });
        return
      }
    }
    var that = this,
      install_info = item.install_version,
      version = install_info.m_version,
      min_version = install_info.version;
    layer.closeAll()
    item.title = bt.replace_all(item.title, '-' + version, '');
    if (item.type === 10 || (item.type === 5 && item.versions.length < 2)) {
      layer.confirm(item.type !== 5 ? lan.soft.lib_insatll_confirm.replace('{1}', item.title) : lan.get('install_confirm', [item.title, version]), { closeBtn: 2 }, function () {
        that.get_install_plugin(item);
      })
    } else {
      that.get_install_plugin(item);
      if (item.type !== 5) {
        bt.soft.monitor_soft_download_speed({
          plugin_name: item.name,
          name: item.title,
          version: version,
          min_version: min_version
        })
      }
    }
  },

  /**
   * @description 获取安装插件
   * @param
   */

  get_install_plugin: function (item) {
    var plugin_info = bt.load('正在获取插件安装信息，请稍后<img src="/static/img/ing.gif" />');
    bt.send('install_plugin', 'plugin/install_plugin', {
      sName: item.name,
      version: item.install_version.m_version,
      min_version: item.install_version.version,
      type: item.install_type
    }, function (rdata) {
      plugin_info.close();
      if (rdata.install_opt) {
        bt.soft.show_plugin_info(rdata);
        return
      }
      if (rdata.size) {
        bt.soft.install_other(rdata, status);
        return;
      }
      bt.pub.get_task_count(function (rdata) {
        if (rdata > 0 && item.type === 5) messagebox();
      });
      if (typeof soft != "undefined") soft.get_list();
      if (!rdata.status) layer.closeAll()
      if (rdata.msg.indexOf('依赖以下软件,请先安装') > -1) {
        layer.msg(rdata.msg.replace(/.*\[([A-z]*)].*/, function () {
          return '依赖以下软件,请先安装[' + arguments[1] + ']，<a href="javascript:;" onclick="bt.soft.install(\'' + arguments[1] + '\',this)" class="btlink">点击安装软件</a>'
        }), { icon: 0, time: 0, closeBtn: 2, shade: .3 })
        return false;
      }
      bt.msg(rdata);
    })
  },

  /**
   * 安装插件过程 - 1 显示插件安装信息
   * @author hwliang<2021-06-23>
   * @param {object} data
   * @return void
   */
  show_plugin_info: function (data, is_beta) {
    layer.closeAll();
    var loadT = null,
      title = ''
    if (typeof is_beta === "undefined") is_beta = false

    switch (data.install_opt) {
      case 'i':
        title = '安装'
        if (data.update) title = '更新'
        break;
      case 'u':
        title = '更新'
        break;
      case 'r':
        title = '修复'
        break;
    }
    var loadT = bt.load('正在获取插件版本信息，请稍后...');
    if (data === 'error') return false;
    bt.send('get_plugin_upgrades', 'plugin/get_plugin_upgrades', {
      plugin_name: data.name,
      show: 1
    }, function (rdata) {
      loadT.close()
      var info = {};
      if (is_beta) {
        var last_info = rdata[rdata.length - 1]
        info = (last_info.beta ? last_info : {})
      } else {
        info = rdata[0]
      }
      if (data.install_opt === 'i') {
        $.each(rdata, function (index, item) {
          var version = item.m_version + '.' + item.version;
          if (version === data.versions) info = item
        })
      }
      console.log(info)
      layer.open({
        type: 1,
        area: "520px",
        title: "[ " + data.title + " ]" + title + '插件',
        closeBtn: 2,
        shift: 5,
        shadeClose: false,
        zIndex: 1989101,
        btn: [title + '插件', '取消'],
        content: '<style>\
                        .install-three-plugin{padding:30px 45px;}\
                        .install-header-title{text-align:center;}\
                        .install-header-title .install-icon{background: url("/static/layer/skin/default/icon.png") no-repeat;height: 30px;width: 30px;display: inline-block;vertical-align: middle;}\
                        .install-header-title .install-tips{display: inline-block;height: 30px;line-height: 30px;font-size: 17px;vertical-align: middle;padding-left: 10px;color: #333;}\
                        .install-header-title .install-tips span{display: inline-block;max-width: 155px;text-overflow: ellipsis;white-space: pre;overflow: hidden;vertical-align: bottom;}\
                        .plugin-title{height: 40px;line-height: 20px;padding:10px;color: #444;margin: 5px 0;}\
                        .plugin-title .item {display: inline-block;margin-right: 25px;font-size: 13px;font-weight: 600;}\
                        .plugin-title .item:nth-child(1){float:left}\
                        .plugin-title .item:nth-child(2){float:right;margin-right: 0;}\
                        .plugin-user-info .plugin-info-title{color: #666;font-weight: 600;font-size: 12px;margin-bottom: 5px}\
                        .plugin-user-info .plugin-info-content{font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;color: #888;padding: 0;background: transparent;border: none;font-size: 12.5px;margin-bottom: 10px;line-height: 20px}\
                        .historicVersion{display: inline-block;width: 100%;text-align: center;color: #20a53a;height: 30px;line-height: 20px;margin-top: 15px;padding: 5px 0;border-top: 1px solid #ececec;cursor: pointer;}\
                        .plugin-user-info {padding: 20px 20px 0 20px;line-height: 25px;background: #f5f6fa;border-radius: 2px;border: 1px solid #efefef;font-size: 12.4px;}\
                        .btn-content{text-align: center;margin-top: 25px;}\
                        .checkbox-btn{cursor: pointer}\
                        .install-plugin{width: 240px;height: 38px;margin-top:10px;}\
                        .item_list{margin-left:150px;border-left:5px solid #e1e1e1;position:relative;padding:5px 0 0 2px}\
                        .item_list:first-child .index_acive::before{content: "";display: inline-block;position: absolute;top: -22px;left: 5px;height: 22px;width: 5px;background: #fff;z-index: 998}\
                        .index_title{border-bottom:1px solid #ececec;margin-bottom:5px;font-size:12px;color:#20a53a;padding: 7px 0 5px 15px;margin-top:7px;margin-left:5px;}\
                        .index_conter{line-height:25px;font-size:12px;min-height:40px;padding-left:20px;color:#888}\
                        .index_date{position:absolute;left:-140px;top:20px;font-size:12px;color:#333}\
                        .index_acive{width:15px;height:15px;background-color:#20a53a;display:block;border-radius:50%;position:absolute;left:-10px;top:21px;z-index: 999}\
                        .index_acive::after{position:relative;display:block;content:"";height:5px;width:5px;display:block;border-radius:50%;background-color:#fff;top:5px;left:5px}\
                        .bt-form-conter> span{text-align: center;width: 100%;display: inline-block;padding: 15px;font-size: 16px;}\
                    </style>\
                    <div class="bt-form c7 install-three-plugin">\
                        <div class="install-header-title"><span class="install-icon"></span><span class="install-tips">' + title + '【<span title="' + data.title + '">' + data.title + '</span>】插件，是否继续？</span></div>\
                        <div class="plugin-title"><div class="item"><span>最新版本：</span><span style="color:#20A53a;">' + data.title + 'v' + info.m_version + '.' + info.version + '</span></div><div class="item"><span>文件大小：</span><span>' + bt.format_size(data.size, true) + '</span></div></div>\
                        <div class="plugin-user-info">\
                           <div class="plugin-info-title">插件详情：</div>\
                           <div class="plugin-info-content">' + data.ps + '</div>\
                           <div class="plugin-info-title">更新内容( V' + info.m_version + '.' + info.version + ' )：</div>\
                           <pre class="plugin-info-content" style="margin-bottom: 0">' + (info.update_msg || '无') + '</pre>\
                           <div class="historicVersion"><span  class="mr5">历史版本</span><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span></div>\
                        </div>\
                        <div class="divtable bt_table mtb20 ">\
                            <table class="table table-hover ' + (JSON.stringify(data.dependnet) === '{}' ? 'hide' : '') + '">\
                                <thead><tr><th>依赖软件</th><th>安装状态</th><th style="text-align: right;">操作</th></tr></thead>\
                                <tbody>' +
          (function () {
            var html = '';
            for (var dataKey in data.dependnet) {
              var item = data.dependnet[dataKey]
              html += '<tr><td>' + dataKey + '</td><td>' + (item ? '<span style="color:#20a532"><span class="glyphicon glyphicon-ok mr5"></span><span>已安装</span></span>' : '<span style="color:#FF9C00"><span class="glyphicon glyphicon-remove mr5"></span><span>未安装</span></span>') + '</td><td style="text-align: right;">' + (item ? '--' : '<a href="javascript:;" class="btlink">立即安装</a>') + '</td><tr>'
            }
            return html;
          }()) +
          '</tbody></table>' + (false ? ('<div style="margin: 15px 5px">' + '<div class="checkbox-btn"><i class="cust—checkbox cursor-pointer checkbox-btn-safety mr10"></i><span style="font-weight: 500;color:red">当前操作存在安全风险，请点击进行二次确认后，继续操作？</span></div></div>') : '') + '</div>\
                    <ul class="help-info-text c7">\
                        <li >插件来源【' + data.author + '】，网址 <a href="' + data.home + '" target="_blank" class="btlink" style="text-decoration: revert;">' + data.home + '</a></li>\
                        <li>如果已存在此插件，文件将被替换！</li>\
                        <li style="color:red" class="' + (JSON.stringify(data.dependnet) === '{}' ? 'hide' : '') + '">请手动按照插件依赖环境，如果未安装，将无法正常使用该插件</li>\
                        <li style="color:red" class="' + ((data.update) && data.name === 'mysql' ? '' : 'hide') + '">更新数据库有风险,建议在更新前,先备份您的数据库！</li>\
                        <li style="color:red" class="' + (!data.update ? 'hide' : '') + '">更新过程可能会导致服务中断,请须知</li>\
                        <li style="color:red" class="' + (!data.update ? 'hide' : '') + '">建议您在服务器负载闲时进行软件更新</li></li>\
                        <li class="' + (data.update ? 'hide' : '') + '">安装过程可能需要几分钟时间，请耐心等候!</li>\
                    </ul>\
                </div>',
        success: function (layers, indexs) {
          $('.historicVersion').on('click', function () {
            bt.send('get_plugin_upgrades', 'plugin/get_plugin_upgrades', {
              plugin_name: data.name
            }, function (res) {
              layer.open({
                type: 1,
                area: ["520px", '400px'],
                title: (data.title + " -更新日志"),
                closeBtn: 2,
                shift: 5,
                shadeClose: false,
                zIndex: 1989101,
                content: '<div class="bt-form-conter pd20">' +
                  '<div class="item_box" style="height:315px;overflow: auto;">' +
                  (function () {
                    var html = '';
                    for (var i = 0; i < res.length; i++) {
                      var item = res[i];
                      html += '<div class="item_list">' +
                        '<span class="index_acive"></span>' +
                        '<div class="index_date">' + bt.format_data(item.update_time) + '</div>' +
                        '<div class="index_title">' + data.title + item.m_version + '.' + item.version + '- ' + (item.beta ? '测试版' : '正式版') + '</div>' +
                        '<div class="index_conter">' + (item.update_msg.replace(/\n/g, '</br>') || '无') + '</div>' +
                        '</div>'
                    }
                    return html
                  }()) +
                  '</div>' +
                  '</div>'
              })
            })
          })
        },
        yes: function (indexs) {
          if (parseInt(data.type) === 11 || data.update) {
            bt.show_confirm('安全验证', '<span style="color:red">' + (data.author === '宝塔' ? '更新过程可能会导致服务中断,是否继续升级？<br>建议您在服务器负载闲时进行软件更新。' : '安装第三方插件存在一定的安全风险，是否继续安装？') + '</span>', function () {
              bt.soft.input_package(data.name, data.tmp_path, data);
            })
            return false
          }
          bt.soft.input_package(data.name, data.tmp_path, data);
        },
        btn2: function () {
          bt.send('close_install', 'plugin/close_install', {
            plugin_name: data.name
          }, function (rdata) {
            console.log(rdata)
          })
        },
        cancel: function () {
          bt.send('close_install', 'plugin/close_install', {
            plugin_name: data.name
          }, function (rdata) {
            console.log(rdata)
          })
        }
      });
    });
    if (data.force_message !== '' && typeof data.force_message != "undefined") {
      layer.open({
        type: 1,
        area: '400px',
        title: '提示内容',
        closeBtn: false,
        shift: 5,
        btn: ['确认', '取消'],
        content: '<div class="bt-form webDelete pd20">' +
          '<p style="font-size:13px;word-break: break-all;margin-bottom: 15px;padding:5px;"><span style="color:red;font-size:14px;">' + data.force_message + '</span></p>' +
          '<div class="vcode" style="padding: 4px 50px;height: auto;line-height: 40px;">计算结果：<span class="text"></span>=<input type="number" id="vsResult" value="" style="height: 30px;padding-left: 10px;width: 60px;border: 1px solid #888;border-radius: 2px;outline: none;"></div>' +
          '</div>',
        success: function (layers, indexs) {
          var num1 = bt.get_random_num(1, 9),
            num2 = bt.get_random_num(1, 9),
            vsResult = $('#vsResult');
          if (num1 === num2) num2 = num1 + 1
          $('.vcode .text').text(num1 + ' + ' + num2);
          vsResult.data('value', num1 + num2);
          vsResult.on('keyup', function (event) {
            if (event.keyCode === 13) {
              var data = $(this).data()
              if (parseInt($(this).val()) !== data.value) {
                layer.msg('计算结果错误，请重新计算！', {
                  icon: 2
                })
              } else {
                layer.close(indexs)
              }
            }
          })
        },
        yes: function (indexs) {
          var $vcode = $('#vsResult'),
            data = $vcode.data()
          if (parseInt($vcode.val()) !== data.value) {
            layer.msg('计算结果错误，请重新计算！', {
              icon: 2
            })
          } else {
            layer.close(indexs)
          }
        },
        btn2: function (indexs) {
          layer.closeAll()
        }
      })
    }
  },
  /**
   * @description 插件管理
   */
  plugin_toolbox_info: function (name, title, version, is_beta) {
    var loadT = bt.load('获取插件信息，请稍后...')
    if (!name) return;
    bt.send('get_plugin_upgrades', 'plugin/get_plugin_upgrades', {
      plugin_name: name,
      show: 1
    }, function (rdata) {
      loadT.close()
      var info = {},
        beta = {},
        tls = {};
      var last_info = rdata[rdata.length - 1]
      beta = (last_info.beta ? last_info : {});
      tls = rdata[0];
      info = is_beta ? beta : tls;
      if (!info) {
        var versions = version.split[0]
        info = {
          beta: 2,
          m_version: version.split[0],
          update_msg: 0,
          update_time: 0,
          version: version.split[1]
        }
      }
      layer.open({
        type: 1,
        area: "500px",
        title: title + "v" + version + "-修复插件",
        closeBtn: 2,
        shift: 5,
        shadeClose: false,
        btn: false,
        content: '<style>' +
          '.plugin_toolbox{padding: 35px;}' +
          '.plugin_toolbox .alert i{font-style: normal;font-weight: 600;color: red;padding:0 2px;}' +
          '.cut_plugin_version{background: #f5f6fa;border-radius: 4px;padding: 20px;margin-bottom: 15px;height: 200px;width: 100%;border: 1px solid #efefef;}' +
          '.plugin_title_info{font-weight: 600;height: 25px;}' +
          '.plugin_title_info span{color:#666;font-size: 13px;}' +
          '.plugin_title_info>span:nth-child(1) span{color:#20a53a;}' +
          '.plugin_title_info>span:nth-child(1){font-weight: 600;float: left;}' +
          '.plugin_title_info span:nth-child(2){font-weight: 600;float: right;}' +
          '.plugin_content_info{font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;color: #888;clear: both;padding: 0;font-size: 13px;color: #555;border: 0;background: none;margin-top: 15px;}' +
          '.plugin_content_info{margin: 0 auto;height: 140px;line-height:24px}' +
          '.cutPlugin{height: 38px;width:180px;}' +
          '</style>' +
          '<div class="plugin_toolbox">' +
          '<div class="alert alert-success" role="alert"><span>提示：如果当前插件<i>出现异常错误</i>或<i>无法使用</i>，请尝试点击</span><button class="btn btn-success btn-xs ml5 repairPlugin">修复插件</button></div>' +
          (JSON.stringify(beta) === '{}' || is_beta ? '' : '<div class="cut_plugin_version "><div class="plugin_title_info ' + (info.beta === 2 ? 'hide' : '') + '"><span>最新' + (!is_beta ? '测试版' : '正式版') + '：<span>' + title + 'v' + info.m_version + '.' + info.version + '</span></span><span>更新时间：' + bt.format_data(info.update_time, 'yyyy-MM-dd') + '</span></div><pre class="plugin_content_info">' + (info.beta === 2 ? '无版本信息' : info.update_msg) + '</pre></div>' +
            '<div class="text-center"><button class="btn btn-success btn-xs ' + (info.beta === 2 ? 'hide' : '') + ' cutPlugin">切换' + (!is_beta ? '测试版' : '正式版') + '</button></div>') +
          '</div>',
        success: function (layers, indexs) {
          $('.repairPlugin').click(function () {
            layer.closeAll()
            info = tls
            bt.soft.monitor_soft_download_speed({
              plugin_name: name,
              name: title,
              version: info.m_version,
              min_version: info.version
            })
            bt.send('repair_plugin', 'plugin/repair_plugin', {
              version: info.m_version,
              min_version: info.version,
              plugin_name: name
            }, function (res) {
              layer.close(indexs)
              bt.soft.show_plugin_info(res, is_beta)
            })
          })
          $('.cutPlugin').click(function () {
            info = !is_beta ? beta : tls
            bt.soft.monitor_soft_download_speed({
              plugin_name: name,
              name: title,
              version: info.m_version,
              min_version: info.version
            })
            bt.send('upgrade_plugin', 'plugin/upgrade_plugin', {
              version: info.m_version,
              min_version: info.version,
              plugin_name: name
            }, function (res) {
              layer.close(indexs)
              bt.soft.show_plugin_info(res, !is_beta)
            })
          })
        }
      });
    })
  },


  /**
   * 安装插件过程 - 2 导入到面板
   * @author hwliang<2021-06-23>
   * @param {string} plugin_name 插件名称
   * @param {string} tmp_path  临时路径
   * @param {object} data 插件信息
   * @return void
   */
  input_package: function (plugin_name, tmp_path, data) {
    bt.soft.show_speed_window({
      title: '正在安装【' + data.title + '】，可能需要几分钟时间，请耐心等候!',
      status: true
    }, function () {
      $.post('/plugin?action=input_package', {
        plugin_name: plugin_name,
        tmp_path: tmp_path,
        install_opt: data.install_opt
      }, function (rdata) {
        layer.closeAll()
        if (rdata.status) {
          if (typeof soft !== "undefined") {
            soft.get_list();
          } else {
            setTimeout(function () {
              window.refresh()
            }, 2000)
          }
        }
        setTimeout(function () {
          layer.msg(rdata.msg, {
            icon: rdata.status ? 1 : 2
          })
        }, 1000);
      });
    });
  },

  install_other: function (data) {
    layer.closeAll();
    var loadT = layer.open({
      type: 1,
      area: "500px",
      title: (data.update ? "更新" : "安装") + "第三方插件包",
      closeBtn: 2,
      shift: 5,
      shadeClose: false,
      btn: ['确定' + (data.update ? "更新" : "安装"), '取消'],
      content: '<style>\
                        .install_three_plugin{padding:25px;}\
                        .plugin_user_info p { font-size: 14px;}\
                        .plugin_user_info {padding: 25px;line-height: 26px;background: #f5f6fa;border-radius: 5px;border: 1px solid #efefef;}\
                        .btn-content{text-align: center;margin-top: 25px;}\
                    </style>\
                    <div class="bt-form c7  install_three_plugin pb70">\
                        <div class="plugin_user_info">\
                            <p><b>名称：</b>' + data.title + '</p>\
                            <p><b>版本：</b>' + data.versions + '</p>\
                            <p><b>描述：</b>' + (data.update ? data.update : data.ps) + '</p>\
                            <p><b>大小：</b>' + bt.format_size(data.size, true) + '</p>\
                            <p><b>开发商：</b>' + data.author + '</p>\
                            <p><b>来源：</b><a class="btlink" href="' + data.home + '" target="_blank">' + data.home + '</a></p>\
                        </div>\
                        <ul class="help-info-text c7">\
                            ' + (data.update ? "<li>更新过程可能需要几分钟时间，请耐心等候!</li>" : "<li>安装过程可能需要几分钟时间，请耐心等候!</li><li>如果已存在此插件，将被替换!</li>") + '\
                        </ul>\
                    </div>',
      yes: function (index, event) {
        soft.input_zip(data.name, data.tmp_path, data);
      }
    });
  },
  update_soft: function (name, title, version, min_version, update_msg, type) {
    var _this = this;
    if (parseInt(type) !== 5) {
      _this.update_soft_request(name, title, version, min_version)
      return false;
    }
    var msg = "<li style='color:red;'>建议您在服务器负载闲时进行软件更新.</li>";
    if (name === 'mysql') msg = "<ul style='color:red;'><li>更新数据库有风险,建议在更新前,先备份您的数据库.</li><li>如果您的是云服务器,强烈建议您在更新前做一个快照.</li><li>建议您在服务器负载闲时进行软件更新.</li></ul>";
    if (update_msg) msg += '<div style="    margin-top: 10px;"><span style="font-size: 14px;font-weight: 900;">本次更新说明: </span><hr style="margin-top: 5px; margin-bottom: 5px;" /><pre>' + update_msg.replace(/(_bt_)/g, "\n") + '</pre><hr style="margin-top: -5px; margin-bottom: -5px;" /></div>';
    bt.show_confirm('更新[' + title + ']', '更新过程可能会导致服务中断,您真的现在就将[' + title + ']更新到[' + version + '.' + min_version + ']吗?', function () {

      bt.soft.show_speed_window({
        title: '正在更新到[' + title + '-' + version + '.' + min_version + '],请稍候...',
        status: true,
        soft: {
          type: parseInt(type)
        }
      }, function () {
        bt.set_cookie('softType', type)
        _this.update_soft_request(name, title, version, min_version)
      })
    }, msg);
  },
  /**
   * @description 更新插件请求
   * @param {string} name 插件名称
   * @param {number} version 插件版本
   * @param {number} min_version 插件子版本
   */
  update_soft_request: function (name, title, version, min_version) {
    var _this = this,
      type = bt.get_cookie('softType')

    if (type !== '5' && type !== 5) bt.soft.monitor_soft_download_speed({
      plugin_name: name,
      name: title,
      version: version,
      min_version: min_version
    })
    bt.send('install_plugin', 'plugin/install_plugin', {
      sName: name,
      version: version,
      min_version: min_version,
      upgrade: version
    }, function (rdata) {
      if (rdata.install_opt) {
        _this.show_plugin_info($.extend(true, {}, rdata, {
          update: true
        }));
        return
      }
      if (rdata.size) {
        _this.install_other(rdata);
        return;
      }
      layer.close(bt.soft.loadT);
      bt.pub.get_task_count(function (rdata) {
        if (rdata > 0 && type === '5') messagebox();
      });
      if (typeof soft != "undefined") soft.get_list();
      bt.msg(rdata);
    })
  },
  un_install: function (name) {
    var _this = this;
    _this.get_soft_find(name, function (item) {
      var version = '';
      for (var i = 0; i < item.versions.length; i++) {
        if (item.versions[i].setup && bt.contains(item.version, item.versions[i].m_version)) {
          version = item.versions[i].m_version;
          if (version.indexOf('.') < 0) version += '.' + item.versions[i].version;
          break;
        }
      }
      var title = bt.replace_all(item.title, '-' + version, '');
      bt.confirm({
        msg: lan.soft.uninstall_confirm.replace('{1}', title).replace('{2}', item.version),
        title: lan.soft.uninstall,
        icon: 3,
        closeBtn: 2
      }, function () {
        var loadT = bt.load(lan.soft.lib_uninstall_the);
        bt.send('uninstall_plugin', 'plugin/uninstall_plugin', {
          sName: name,
          version: version
        }, function (rdata) {
          loadT.close();
          bt.pub.get_task_count();
          if (typeof soft != "undefined") soft.get_list();
          bt.msg(rdata);
        })
      })
    })

  },
  get_soft_find: function (name, callback) {
    var loadT = bt.load();
    bt.send('get_soft_find', 'plugin/get_soft_find', {
      sName: name
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  get_config_path: function (name) {
    var fileName = '';
    if (bt.os == 'Linux') {
      switch (name) {
        case 'mysql':
        case 'mysqld':
          fileName = '/etc/my.cnf';
          break;
        case 'nginx':
          fileName = '/www/server/nginx/conf/nginx.conf';
          break;
        case 'pureftpd':
          fileName = '/www/server/pure-ftpd/etc/pure-ftpd.conf';
          break;
        case 'apache':
          fileName = '/www/server/apache/conf/httpd.conf';
          break;
        case 'tomcat':
          fileName = '/www/server/tomcat/conf/server.xml';
          break;
        case 'memcached':
          fileName = '/etc/init.d/memcached';
          break;
        case 'redis':
          fileName = '/www/server/redis/redis.conf';
          break;
        case 'openlitespeed':
          fileName = '/usr/local/lsws/conf/httpd_config.conf';
          break;
        default:
          fileName = '/www/server/php/' + name + '/etc/php.ini';
          break;
      }
    }
    return fileName
  },
  set_lib_config: function (name, title, version) {
    var loadT = bt.load(lan.soft.menu_temp);
    $.ajax({
      url: '/plugin?action=getConfigHtml',
      data: {
        name: name,
        version: version
      },
      type: 'get',
      success: function (rhtml) {
        loadT.close();
        if (rhtml.status === false) {
          if (name == "phpguard") {
            layer.msg(lan.soft.menu_phpsafe, {
              icon: 1
            })
          } else {
            layer.msg(rhtml.msg, {
              icon: 2
            });
          }
          return;
        }
        bt.open({
          type: 1,
          shift: 5,
          offset: '20%',
          closeBtn: 2,
          area: '700px',
          title: '<img style="width: 24px;margin-right: 5px;margin-left: -10px;margin-top: -3px;" src="/static/img/soft_ico/ico-' + name + '.png" />' + title,
          content: rhtml.replace('"javascript/text"', '"text/javascript"'),
          success: function () {
            if (rhtml.indexOf('CodeMirror') != -1) {
              loadLink(['/static/codemirror/lib/codemirror.css']);
              loadScript(['/static/codemirror/lib/codemirror.js', '/static/codemirror/addon/edit/editAll.js', '/static/codemirror/mode/modeAll.js', '/static/codemirror/addon/dialog/dialog.js', '/static/codemirror/addon/search/search.js', '/static/codemirror/addon/scroll/annotatescrollbar.js']);
            }
          }
        });
        /*rtmp = rhtml.split('<script type="javascript/text">')
        if (rtmp.length < 2) {
            rtmp = rhtml.split('<script type="text/javascript">')
        }
        rcode = rtmp[1].replace('</script>','');
        setTimeout(function(){
            if(!!(window.attachEvent && !window.opera)){
                execScript(rcode);
            }else{
                window.eval(rcode);
            }
        },200)*/
      }
    })
  },
  save_config: function (fileName, data) {
    var encoding = 'utf-8';
    var loadT = bt.load(lan.soft.the_save);
    bt.send('SaveFileBody', 'files/SaveFileBody', {
      data: data,
      path: fileName,
      encoding: encoding
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
    })
  }
}


bt.database = {
  get_list: function (page, search, callback) {
    if (page == undefined) page = 1
    search = search == undefined ? '' : search;
    var order = bt.get_cookie('order') ? '&order=' + bt.get_cookie('order') : '';

    var data = 'tojs=database.get_list&table=databases&limit=15&p=' + page + '&search=' + search + order;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_root_pass: function (callback) {
    bt.send('getKey', 'data/getKey', {
      table: 'config',
      key: 'mysql_root',
      id: 1
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_root: function () {
    bt.database.get_root_pass(function (rdata) {
      var bs = bt.render_form(bt.data.database.root);
      $('.password' + bs).val(rdata);
    })
  },
  set_data_pass: function (callback) {
    var bs = bt.render_form(bt.data.database.data_pass, function (rdata) {
      if (callback) callback(rdata);
    });
    return bs;
  },
  set_data_access: function (name) {
    var loading = bt.load();
    bt.send('GetDatabaseAccess', 'database/GetDatabaseAccess', {
      name: name
    }, function (rdata) {
      loading.close();
      var bs = bt.render_form(bt.data.database.data_access);
      $('.name' + bs).val(name);
      setTimeout(function () {
        if (rdata.msg == '127.0.0.1' || rdata.msg == '%') {
          $('.dataAccess' + bs).val(rdata.msg)
        } else {
          $('.dataAccess' + bs).val('ip').trigger('change');
          $('#dataAccess_subid').val(rdata.msg);
        }
      }, 100)
    })
  },
  add_database: function (callback) {
    bt.data.database.data_add.list[2].items[0].value = bt.get_random(16);
    bt.render_form(bt.data.database.data_add, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  del_database: function (data, callback) {
    var loadT = bt.load(lan.get('del_all_task_the', [data.name]));
    bt.send('DeleteDatabase', 'database/DeleteDatabase', data, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    })
  },
  sync_database: function (callback) {
    var loadT = bt.load(lan.database.sync_the);
    bt.send('SyncGetDatabases', 'database/SyncGetDatabases', {}, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    });
  },
  sync_to_database: function (data, callback) {
    var loadT = bt.load(lan.database.sync_the);
    bt.send('SyncToDatabases', 'database/SyncToDatabases', data, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  open_phpmyadmin: function (name, username, password) {
    if ($("#toPHPMyAdmin").attr('action').indexOf('phpmyadmin') == -1) {
      layer.msg(lan.database.phpmyadmin_err, {
        icon: 2,
        shade: [0.3, '#000']
      })
      setTimeout(function () {
        window.location.href = '/soft';
      }, 3000);
      return;
    }
    $("#toPHPMyAdmin").attr('action', $("#toPHPMyAdmin").attr('public-data'))
    var murl = $("#toPHPMyAdmin").attr('action');
    $("#pma_username").val(username);
    $("#pma_password").val(password);
    $("#db").val(name);
    layer.msg(lan.database.phpmyadmin, {
      icon: 16,
      shade: [0.3, '#000'],
      time: 1000
    });
    setTimeout(function () {
      $("#toPHPMyAdmin").submit();
      layer.closeAll();
    }, 200);
  },
  submit_phpmyadmin: function (name, username, password, pub) {
    if (pub === true) {
      $("#toPHPMyAdmin").attr('action', $("#toPHPMyAdmin").attr('public-data'))
    } else {
      $("#toPHPMyAdmin").attr('action', '/phpmyadmin/index.php')
    }
    var murl = $("#toPHPMyAdmin").attr('action');
    $("#pma_username").val(username);
    $("#pma_password").val(password);
    $("#db").val(name);
    layer.msg(lan.database.phpmyadmin, {
      icon: 16,
      shade: [0.3, '#000'],
      time: 1000
    });
    setTimeout(function () {
      $("#toPHPMyAdmin").submit();
      layer.closeAll();
    }, 200);
  },

  input_sql: function (fileName, dataName) {
    bt.show_confirm(lan.database.input_title, '<span style="color:red;font-size:13px;">【' + dataName + '】' + lan.database.input_confirm + '</span>', function (index) {
      var loading = bt.load(lan.database.input_the);
      bt.send('InputSql', 'database/InputSql', {
        file: fileName,
        name: dataName
      }, function (rdata) {
        loading.close();
        bt.msg(rdata);
      })
    });
  },
  backup_data: function (id, dataname, callback) {
    var loadT = bt.load(lan.database.backup_the);
    bt.send('ToBackup', 'database/ToBackup', {
      id: id
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    });

  },
  del_backup: function (id, dataId, dataName) {
    bt.confirm({
      msg: lan.database.backup_del_confirm,
      title: lan.database.backup_del_title
    }, function () {
      var loadT = bt.load();
      bt.send('DelBackup', 'database/DelBackup', {
        id: id
      }, function (rdata) {
        loadT.close();
        if (rdata.status) {
          if (database) {
            database.database_detail(dataId, dataName);
            database.database_table_view();
          }
        }
        bt.msg(rdata);
      });
    });
  }
}

bt.send('get_config', 'config/get_config', {}, function (rdata) {
  bt.config = rdata;
});

bt.plugin = {
  get_plugin_byhtml: function (name, callback) {
    bt.send('getConfigHtml', 'plugin/getConfigHtml', {
      name: name
    }, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  get_firewall_state: function (callback) {
    var typename = getCookie('serverType');
    var name = 'btwaf_httpd';
    if (typename == "nginx") name = 'btwaf'
    bt.send('a', 'plugin/a', {
      name: name,
      s: 'get_total_all'
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  }
}

bt.site = {
  get_list: function (page, search, type, callback) {
    if (page == undefined) page = 1
    type = type == undefined ? '&type=-1' : ('&type=' + type);
    search = search == undefined ? '' : search;
    var order = bt.get_cookie('order') ? '&order=' + bt.get_cookie('order') : '';
    var data = 'tojs=site.get_list&table=sites&limit=15&p=' + page + '&search=' + search + order + type;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_domains: function (id, callback) {
    var data = 'table=domain&list=True&search=' + id;
    bt.pub.get_data(data, function (rdata) {
      if (callback) callback(rdata);
    }, 1)
  },
  get_type: function (callback) {
    bt.send('get_site_types', 'site/get_site_types', '', function (rdata) {
      if (callback) callback(rdata);
    });
  },
  add_type: function (name, callback) {
    bt.send('add_site_type', 'site/add_site_type', {
      name: name
    }, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  edit_type: function (data, callback) {
    bt.send('modify_site_type_name', 'site/modify_site_type_name', {
      id: data.id,
      name: data.name
    }, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  del_type: function (id, callback) {
    bt.send('remove_site_type', 'site/remove_site_type', {
      id: id
    }, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  set_site_type: function (data, callback) {
    bt.send('set_site_type', 'site/set_site_type', {
      id: data.id,
      site_ids: data.site_array
    }, function (rdata) {
      if (callback) callback(rdata);
    });
  },
  get_site_domains: function (id, callback) {
    var loading = bt.load();
    bt.send('GetSiteDomains', 'site/GetSiteDomains', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  add_domains: function (id, webname, domains, callback) {
    var loading = bt.load();
    bt.send('AddDomain', 'site/AddDomain', {
      domain: domains,
      webname: webname,
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  del_domain: function (siteId, siteName, domain, port, callback) {
    var loading = bt.load();
    bt.send('DelDomain', 'site/DelDomain', {
      id: siteId,
      webname: siteName,
      domain: domain,
      port: port
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  get_dirbind: function (id, callback) {
    var loading = bt.load();
    bt.send('GetDirBinding', 'site/GetDirBinding', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  add_dirbind: function (id, domain, dirName, callback) {
    var loading = bt.load();
    bt.send('AddDirBinding', 'site/AddDirBinding', {
      id: id,
      domain: domain,
      dirName: dirName
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  del_dirbind: function (id, callback) {
    var loading = bt.load();
    bt.send('DelDirBinding', 'site/DelDirBinding', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_dir_rewrite: function (data, callback) {
    var loading = bt.load();
    bt.send('GetDirRewrite', 'site/GetDirRewrite', data, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_site_path: function (id, callback) {
    bt.send('getKey', 'data/getKey', {
      table: 'sites',
      key: 'path',
      id: id
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_dir_userini: function (id, path, callback) {
    bt.send('GetDirUserINI', 'site/GetDirUserINI', {
      id: id,
      path: path
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_dir_userini: function (path, callback) {
    var loading = bt.load();
    bt.send('SetDirUserINI', 'site/SetDirUserINI', {
      path: path
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_logs_status: function (id, callback) {
    var loading = bt.load();
    bt.send('logsOpen', 'site/logsOpen', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_site_runpath: function (id, path, callback) {
    var loading = bt.load();
    bt.send('SetSiteRunPath', 'site/SetSiteRunPath', {
      id: id,
      runPath: path
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_site_path: function (id, path, callback) {
    var loading = bt.load();
    bt.send('SetPath', 'site/SetPath', {
      id: id,
      path: path
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_site_pwd: function (id, username, password, callback) {
    var loading = bt.load();
    bt.send('SetHasPwd', 'site/SetHasPwd', {
      id: id,
      username: username,
      password: password
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  close_site_pwd: function (id, callback) {
    var loading = bt.load();
    bt.send('SetHasPwd', 'site/CloseHasPwd', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_limitnet: function (id, callback) {
    bt.send('GetLimitNet', 'site/GetLimitNet', {
      id: id
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_limitnet: function (id, perserver, perip, limit_rate, callback) {
    var loading = bt.load();
    bt.send('SetLimitNet', 'site/SetLimitNet', {
      id: id,
      perserver: perserver,
      perip: perip,
      limit_rate: limit_rate
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  close_limitnet: function (id, callback) {
    var loading = bt.load();
    bt.send('CloseLimitNet', 'site/CloseLimitNet', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_rewrite_list: function (siteName, callback) {
    bt.send('GetRewriteList', 'site/GetRewriteList', {
      siteName: siteName
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_rewrite_tel: function (name, data, callback) {
    var loading = bt.load(lan.site.saving_txt);
    bt.send('SetRewriteTel', 'site/SetRewriteTel', {
      name: name,
      data: data
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_index: function (id, callback) {
    bt.send('GetIndex', 'site/GetIndex', {
      id: id
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_index: function (id, index, callback) {
    var loading = bt.load();
    bt.send('SetIndex', 'site/SetIndex', {
      id: id,
      Index: index
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_site_config: function (siteName, callback) {
    if (bt.os == 'Linux') {
      var sPath = '/www/server/panel/vhost/' + bt.get_cookie('serverType') + '/' + siteName + '.conf';
      bt.files.get_file_body(sPath, function (rdata) {
        if (callback) callback(rdata);
      })
    }
  },
  set_site_config: function (siteName, data, encoding, callback) {
    var loading = bt.load(lan.site.saving_txt);
    if (bt.os == 'Linux') {
      var sPath = '/www/server/panel/vhost/' + bt.get_cookie('serverType') + '/' + siteName + '.conf';
      bt.files.set_file_body(sPath, data, 'utf-8', function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    }
  },
  set_phpversion: function (siteName, version, other, callback) {
    var loading = bt.load();
    bt.send('SetPHPVersion', 'site/SetPHPVersion', {
      siteName: siteName,
      version: version,
      other: other
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  // 重定向列表
  get_redirect_list: function (name, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetRedirectList', 'site/GetRedirectList', {
      sitename: name
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  // 重定向列表
  get_redirect_list: function (name, callback) {
    var loadT = layer.load();
    bt.send('GetRedirectList', 'site/GetRedirectList', {
      sitename: name
    }, function (rdata) {
      layer.close(loadT);
      if (callback) callback(rdata);
    });
  },
  create_redirect: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('CreateRedirect', 'site/CreateRedirect', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  modify_redirect: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('ModifyRedirect', 'site/ModifyRedirect', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  remove_redirect: function (sitename, redirectname, callback) {
    bt.show_confirm('删除重定向[' + redirectname + ']', '您真的要删除该重定向吗?', function () {
      var loadT = bt.load(lan.site.the_msg);
      bt.send('DeleteRedirect', 'site/DeleteRedirect', {
        sitename: sitename,
        redirectname: redirectname
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      });
    });
  },
  get_redirect_config: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetRedirectFile', 'site/GetRedirectFile', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  save_redirect_config: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('SaveProxyFile', 'site/SaveRedirectFile', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  get_site_proxy: function (siteName, callback) {
    bt.send('GetProxy', 'site/GetProxy', {
      name: siteName
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_site_proxy: function (siteName, type, proxyUrl, toDomain, sub1, sub2, callback) {
    var loading = bt.load();
    bt.send('SetProxy', 'site/SetProxy', {
      name: siteName,
      type: type,
      proxyUrl: proxyUrl,
      toDomain: toDomain,
      sub1: sub1,
      sub2: sub2
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_open_proxy_cache: function (siteName, callback) {
    var loading = bt.load();
    bt.send('ProxyCache', 'site/ProxyCache', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_proxy_list: function (name, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetProxyList', 'site/GetProxyList', {
      sitename: name
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  create_proxy: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('CreateProxy', 'site/CreateProxy', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  remove_proxy: function (sitename, proxyname, callback) {
    bt.show_confirm('删除反向代理[' + proxyname + ']', '您真的要从列表中删除吗?', function () {
      var loadT = bt.load(lan.site.the_msg);
      bt.send('RemoveProxy', 'site/RemoveProxy', {
        sitename: sitename,
        proxyname: proxyname
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
        bt.msg(rdata);
      })
    })
  },
  modify_proxy: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('ModifyProxy', '	site/ModifyProxy', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  get_proxy_config: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetProxyFile', 'site/GetProxyFile', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  save_proxy_config: function (obj, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('SaveProxyFile', 'site/SaveProxyFile', obj, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  get_site_security: function (id, name, callback) {
    bt.send('GetSecurity', 'site/GetSecurity', {
      id: id,
      name: name
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_site_security: function (id, name, fix, domains, status, return_rule, callback) {
    var loading = bt.load(lan.site.the_msg);
    bt.send('SetSecurity', 'site/SetSecurity', {
      id: id,
      name: name,
      fix: fix,
      domains: domains,
      status: status,
      return_rule: return_rule
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_site_301: function (siteName, callback) {
    bt.send('Get301Status', 'site/Get301Status', {
      siteName: siteName
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  set_site_301: function (siteName, srcDomain, toUrl, type, callback) {
    var loading = bt.load();
    bt.send('Set301Status', 'site/Set301Status', {
      siteName: siteName,
      toDomain: toUrl,
      srcDomain: srcDomain,
      type: type
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_tomcat: function (siteName, callback) {
    var loading = bt.load(lan['public'].config);
    bt.send('SetTomcat', 'site/SetTomcat', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_site_logs: function (siteName, callback) {
    var loading = bt.load();
    bt.send('GetSiteLogs', 'site/GetSiteLogs', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (rdata.status !== true) rdata.msg = '';
      if (rdata.msg == '') rdata.msg = '当前没有日志.';
      if (callback) callback(rdata);
    })
  },
  get_site_error_logs: function (siteName, callback) {
    var loading = bt.load();
    bt.send('get_site_errlog', 'site/get_site_errlog', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (rdata.status !== true) rdata.msg = '';
      if (rdata.msg == '') rdata.msg = '当前没有日志.';
      if (callback) callback(rdata);
    })
  },
  get_site_ssl: function (siteName, callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetSSL', 'site/GetSSL', {
      siteName: siteName
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  create_let: function (data, callback) {
    var loadT = layer.open({
      title: false,
      type: 1,
      closeBtn: 0,
      shade: 0.3,
      area: "500px",
      offset: "30%",
      content: "<pre style='margin-bottom: 0px;height:250px;text-align: left;background-color: #000;color: #fff;white-space: pre-wrap;' id='create_lst'>正在准备申请证书...</pre>",
      success: function (layers, index) {
        bt.site.get_let_logs();
        bt.send('CreateLet', 'site/CreateLet', data, function (rdata) {
          layer.close(loadT);
          if (callback) callback(rdata);
        });
      }
    });
  },
  get_let_logs: function () {
    bt.send('get_lines', 'ajax/get_lines', {
      num: 10,
      filename: "/www/server/panel/logs/letsencrypt.log"
    }, function (rdata) {
      if ($("#create_lst").text() === "") return;
      if (rdata.status === true) {
        $("#create_lst").text(rdata.msg);
        $("#create_lst").scrollTop($("#create_lst")[0].scrollHeight);
      }
      setTimeout(function () {
        bt.site.get_let_logs();
      }, 1000);
    });
  },
  get_dns_api: function (callback) {
    var loadT = bt.load();
    bt.send('GetDnsApi', 'site/GetDnsApi', {}, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  set_dns_api: function (data, callback) {
    var loadT = bt.load();
    bt.send('SetDnsApi', 'site/SetDnsApi', data, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  verify_domain: function (partnerOrderId, siteName, callback) {
    var loadT = bt.load(lan.site.ssl_apply_2);
    bt.send('Completed', 'ssl/Completed', {
      partnerOrderId: partnerOrderId,
      siteName: siteName
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  get_dv_ssl: function (domain, path, callback) {
    var loadT = bt.load(lan.site.ssl_apply_1);
    bt.send('GetDVSSL', 'ssl/GetDVSSL', {
      domain: domain,
      path: path
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  get_ssl_info: function (partnerOrderId, siteName, callback) {
    var loadT = bt.load(lan.site.ssl_apply_3);
    bt.send('GetSSLInfo', 'ssl/GetSSLInfo', {
      partnerOrderId: partnerOrderId,
      siteName: siteName
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  set_cert_ssl: function (certName, siteName, callback) {
    var loadT = bt.load('正在部署证书...');
    bt.send('SetCertToSite', 'ssl/SetCertToSite', {
      certName: certName,
      siteName: siteName
    }, function (rdata) {
      loadT.close();
      site.reload();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  remove_cert_ssl: function (certName, callback) {
    bt.show_confirm('删除证书', '您真的要从证书夹删除证书吗?', function () {
      var loadT = bt.load(lan.site.the_msg);
      bt.send('RemoveCert', 'ssl/RemoveCert', {
        certName: certName
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
        bt.msg(rdata);
      })
    })
  },
  set_http_to_https: function (siteName, callback) {
    var loading = bt.load();
    bt.send('HttpToHttps', 'site/HttpToHttps', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  close_http_to_https: function (siteName, callback) {
    var loading = bt.load();
    bt.send('CloseToHttps', 'site/CloseToHttps', {
      siteName: siteName
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
      bt.msg(rdata);
    })
  },
  set_ssl: function (siteName, data, callback) {
    if (data.path) {
      //iis导入证书
    } else {
      console.log(data)
      var loadT = bt.load(lan.site.saving_txt);
      bt.send('SetSSL', 'site/SetSSL', {
        type: 1,
        siteName: siteName,
        key: data.key,
        csr: data.csr
      }, function (rdata) {
        loadT.close();
        if (callback) callback(rdata);
      })
    }
  },
  set_ssl_status: function (action, siteName, callback) {
    var loadT = bt.load(lan.site.get_ssl_list);
    bt.send(action, 'site/' + action, {
      updateOf: 1,
      siteName: siteName
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  get_cer_list: function (callback) {
    var loadT = bt.load(lan.site.the_msg);
    bt.send('GetCertList', 'ssl/GetCertList', {}, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  get_order_list: function (siteName, callback) {
    bt.send('GetOrderList', 'ssl/GetOrderList', {
      siteName: siteName
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  del_site: function (data, callback) {
    var loadT = bt.load(lan.get('del_all_task_the', [data.webname]));
    bt.send('DeleteSite', 'site/DeleteSite', data, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    })
  },
  add_site: function (callback) {
    var _form = $.extend(true, {}, bt.data.site.add);
    bt.site.get_all_phpversion(function (rdata) {
      bt.site.get_type(function (tdata) {
        for (var i = 0; i < _form.list.length; i++) {
          if (_form.list[i].name == 'version') {
            var items = [];
            for (var j = rdata.length - 1; j >= 0; j--) {
              var o = rdata[j];
              o.value = o.version;
              o.title = o.name;
              items.push(o);
            }
            _form.list[i].items = items;
          } else if (_form.list[i].name == 'type_id') {
            for (var x = 0; x < tdata.length; x++) _form.list[i].items.push({
              value: tdata[x].id,
              title: tdata[x].name
            });
          }
        }
        var bs = bt.render_form(_form, function (rdata) {
          if (callback) callback(rdata);
        });
        $(".placeholder").click(function () {
          $(this).hide();
          $('.webname' + bs).focus();
        })
        $('.path' + bs).val($("#defaultPath").text());
        $('.webname' + bs).focus(function () {
          $(".placeholder").hide();
        });
        $('.webname' + bs).blur(function () {
          if ($(this).val().length == 0) {
            $(".placeholder").show();
          }
        });
      })
    })
  },
  get_all_phpversion: function (callback) {
    bt.send('GetPHPVersion', 'site/GetPHPVersion', {
      s_type: 1
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  get_site_phpversion: function (siteName, callback) {
    bt.send('GetSitePHPVersion', 'site/GetSitePHPVersion', {
      siteName: siteName
    }, function (rdata) {
      if (callback) callback(rdata);
    })
  },
  stop: function (id, name, callback) {
    bt.confirm({
      title: '停用站点 【' + name + '】',
      msg: lan.site.site_stop_txt
    }, function (index) {
      if (index > 0) {
        var loadT = bt.load();
        bt.send('SiteStop', 'site/SiteStop', {
          id: id,
          name: name
        }, function (ret) {
          loadT.close();
          if (site && typeof callback == "undefined") {
            site.get_list();
          } else {
            if (callback) callback(ret);
          }
          bt.msg(ret);
        });
      }
    });
  },
  start: function (id, name, callback) {
    bt.confirm({
      title: '启动站点 【' + name + '】',
      msg: lan.site.site_start_txt
    }, function (index) {
      if (index > 0) {
        var loadT = bt.load();
        bt.send('SiteStart', 'site/SiteStart', {
          id: id,
          name: name
        }, function (ret) {
          loadT.close();
          if (site && typeof callback == "undefined") {
            site.get_list();
          } else {
            if (callback) callback(ret);
          }
          bt.msg(ret);
        });
      }
    });
  },
  backup_data: function (id, callback) {
    var loadT = bt.load(lan.database.backup_the);
    bt.send('ToBackup', 'site/ToBackup', {
      id: id
    }, function (rdata) {
      loadT.close();
      bt.msg(rdata);
      if (callback) callback(rdata);
    });
  },
  del_backup: function (id, siteId, siteName) {
    bt.confirm({
      msg: lan.site.webback_del_confirm,
      title: lan.site.del_bak_file
    }, function (index) {
      var loadT = bt.load();
      bt.send('DelBackup', 'site/DelBackup', {
        id: id
      }, function (frdata) {
        loadT.close();
        if (frdata.status) {
          if (site) site.site_detail(siteId, siteName);
        }
        bt.msg(frdata);
      });
    });
  },
  set_endtime: function (id, dates, callback) {
    var loadT = bt.load(lan.site.saving_txt);
    bt.send('SetEdate', 'site/SetEdate', {
      id: id,
      edate: dates
    }, function (rdata) {
      loadT.close();
      if (callback) callback(rdata);
    });
  },
  get_default_path: function (type, callback) {
    var vhref = '';
    if (bt.os == 'Linux') {
      switch (type) {
        case 0:
          vhref = '/www/server/panel/data/defaultDoc.html';
          break;
        case 1:
          vhref = '/www/server/panel/data/404.html';
          break;
        case 2:
          var serverType = bt.get_cookie('serverType');
          vhref = '/www/server/apache/htdocs/index.html';
          if (serverType == 'nginx') vhref = '/www/server/nginx/html/index.html';
          break;
        case 3:
          vhref = '/www/server/stop/index.html';
          break;
      }
    }
    if (callback) callback(vhref);
  },
  get_default_site: function (callback) {
    var loading = bt.load();
    bt.send('GetDefaultSite', 'site/GetDefaultSite', {}, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  set_default_site: function (name, callback) {
    var loading = bt.load();
    bt.send('SetDefaultSite', 'site/SetDefaultSite', {
      name: name
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  get_dir_auth: function (id, callback) {
    var loading = bt.load();
    bt.send('get_dir_auth', 'site/get_dir_auth', {
      id: id
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  create_dir_guard: function (data, callback) {
    var loading = bt.load();
    bt.send('set_dir_auth', 'site/set_dir_auth', {
      id: data.id,
      name: data.name,
      site_dir: data.site_dir,
      username: data.username,
      password: data.password
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  edit_dir_account: function (data, callback) {
    var loading = bt.load();
    bt.send('modify_dir_auth_pass', 'site/modify_dir_auth_pass', {
      id: data.id,
      name: data.name,
      username: data.username,
      password: data.password
    }, function (rdata) {
      loading.close();
      if (callback) callback(rdata);
    })
  },
  delete_dir_guard: function (id, data, callback) {
    bt.show_confirm('删除[' + data + ']', "你确定要删除目录保护吗", function () {
      var loading = bt.load();
      bt.send('delete_dir_auth', 'site/delete_dir_auth', {
        id: id,
        name: data
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    })
  },
  delete_php_guard: function (website, data, callback) {
    bt.show_confirm('删除PHP防护', "你确定要删除PHP防护[" + data + "]吗？", function () {
      var loading = bt.load();
      bt.send('del_file_deny', 'config/del_file_deny', {
        website: website,
        deny_name: data
      }, function (rdata) {
        loading.close();
        if (callback) callback(rdata);
      })
    })
  }
}



bt.form = {
  btn: {
    close: function (title, callback) {
      var obj = {
        title: '关闭',
        name: 'btn-danger'
      };
      if (title) obj.title = title;
      if (callback) obj['callback'] = callback;
      return obj;
    },
    submit: function (title, callback) {
      var obj = {
        title: '提交',
        name: 'submit',
        css: 'btn-success'
      };
      if (title) obj.title = title;
      if (callback) obj['callback'] = callback;
      return obj;
    }
  },
  item: {
    data_access: {
      title: '访问权限',
      items: [{
        name: 'dataAccess',
        type: 'select',
        width: '100px',
        items: [{
          title: '本地服务器',
          value: '127.0.0.1'
        },
        {
          title: '所有人(不安全)',
          value: '%'
        },
        {
          title: '指定IP',
          value: 'ip'
        }
        ],
        callback: function (obj) {
          var subid = obj.attr('name') + '_subid';
          $('#' + subid).remove();
          if (obj.val() == 'ip') {
            obj.parent().append('<input id="' + subid + '" class="bt-input-text mr5" type="text" name="address" placeholder="多个IP使用逗号(,)分隔" style="width: 203px; display: inline-block;">');
          }
        }
      }]
    },
    password: {
      title: '密码',
      name: 'password',
      items: [{
        type: 'text',
        width: '311px',
        value: bt.get_random(16),
        event: {
          css: 'glyphicon-repeat',
          callback: function (obj) {
            bt.refresh_pwd(16, obj);
          }
        }
      }]
    },
  }
}

bt.data = {
  database: {
    root: {
      title: lan.database.edit_pass_title,
      area: '530px',
      list: [{
        title: 'root密码',
        name: 'password',
        items: [{
          type: 'text',
          width: '311px',
          event: {
            css: 'glyphicon-repeat',
            callback: function (obj) {
              bt.refresh_pwd(16, obj);
            }
          }
        }]
      },],
      btns: [
        bt.form.btn.close(),
        bt.form.btn.submit('提交', function (rdata, load) {
          var loading = bt.load();
          bt.send('SetupPassword', 'database/SetupPassword', rdata, function (rRet) {
            loading.close();
            bt.msg(rRet);
            load.close();
          })
        })
      ]
    },
    data_add: {
      title: lan.database.add_title,
      area: '530px',
      list: [{
        title: '数据库名',
        items: [{
          name: 'name',
          placeholder: '新的数据库名称',
          type: 'text',
          width: '65%',
          callback: function (obj) {
            $('input[name="db_user"]').val(obj.val());
          }
        },
        {
          name: 'codeing',
          type: 'select',
          width: '27%',
          items: [{
            title: 'utf-8',
            value: 'utf8'
          },
          {
            title: 'utf8mb4',
            value: 'utf8mb4'
          },
          {
            title: 'gbk',
            value: 'gbk'
          },
          {
            title: 'big5',
            value: 'big5'
          },
          ]
        }
        ]
      },
      {
        title: '用户名',
        name: 'db_user',
        placeholder: '数据库用户',
        width: '65%'
      },
      bt.form.item.password,
      {
        title: '类型',
        name: 'dtype',
        type: 'select',
        disabled: (bt.contains(bt.get_cookie('serverType'), 'nginx') || bt.contains(bt.get_cookie('serverType'), 'apache') ? true : false),
        items: [{
          title: 'MySQL',
          value: 'MySQL'
        },
        {
          title: 'SQLServer',
          value: 'SQLServer'
        }
        ]
      },
      bt.form.item.data_access
      ],
      btns: [
        bt.form.btn.close(),
        bt.form.btn.submit('提交', function (rdata, load, callback) {
          if (!rdata.address) rdata.address = rdata.dataAccess;
          if (!rdata.ps) rdata.ps = rdata.name;
          var loading = bt.load();
          bt.send('AddDatabase', 'database/AddDatabase', rdata, function (rRet) {
            loading.close();
            if (rRet.status) load.close();
            if (callback) callback(rRet);
            bt.msg(rRet);
          })
        })
      ]
    },
    data_access: {
      title: '设置数据库权限',
      area: '480px',
      list: [{
        title: 'name',
        name: 'name',
        hide: true
      },
      bt.form.item.data_access
      ],
      btns: [
        bt.form.btn.close(),
        {
          title: '提交',
          name: 'submit',
          css: 'btn-success',
          callback: function (rdata, load) {
            var loading = bt.load();
            rdata.access = rdata.dataAccess;
            if (rdata.access == 'ip') rdata.access = rdata.address;
            bt.send('SetDatabaseAccess', 'database/SetDatabaseAccess', rdata, function (rRet) {
              loading.close();
              bt.msg(rRet);
              if (rRet.status) load.close();
            })
          }
        }
      ]
    },
    data_pass: {
      title: '修改数据库密码',
      area: '530px',
      list: [{
        title: 'id',
        name: 'id',
        hide: true
      },
      {
        title: '用户名',
        name: 'name',
        disabled: true
      },
      {
        title: '密码',
        name: 'password',
        items: [{
          type: 'text',
          event: {
            css: 'glyphicon-repeat',
            callback: function (obj) {
              bt.refresh_pwd(16, obj);
            }
          }
        }]
      },
      ],
      btns: [{
        title: '关闭',
        name: 'close'
      },
      {
        title: '提交',
        name: 'submit',
        css: 'btn-success',
        callback: function (rdata, load, callback) {
          var loading = bt.load();
          bt.send('ResDatabasePassword', 'database/ResDatabasePassword', rdata, function (rRet) {
            loading.close();
            bt.msg(rRet);
            if (rRet.status) load.close();
            if (callback) callback(rRet);
          })
        }
      }
      ]
    }
  },
  site: {
    add: {
      title: lan.site.site_add,
      area: '640px',
      list: [{
        title: '域名',
        name: 'webname',
        items: [{
          type: 'textarea',
          width: '458px',
          callback: function (obj) {
            var array = obj.val().split("\n");
            var ress = array[0].split(":")[0];
            var res = bt.strim(ress.replace(new RegExp(/([-.])/g), '_'));
            var ftp_user = res;
            var data_user = res;
            if (!isNaN(res.substr(0, 1))) {
              ftp_user = 'ftp_' + ftp_user;
              data_user = 'sql_' + data_user;
            }
            if (data_user.length > 16) data_user = data_user.substr(0, 16)
            obj.data('ftp', ftp_user);
            obj.data('database', data_user);

            $('.ftp_username').val(ftp_user);
            $('.datauser').val(data_user);

            var _form = obj.parents('div.bt-form');
            var _path_obj = _form.find('input[name="path"]');
            var path = _path_obj.val();
            var defaultPath = $('#defaultPath').text();
            var dPath = bt.rtrim(defaultPath, '/');
            if (path.substr(0, dPath.length) == dPath) _path_obj.val(dPath + '/' + ress);
            _form.find('input[name="ps"]').val(ress);
          },
          placeholder: '每行填写一个域名，默认为80端口<br>泛解析添加方法 *.domain.com<br>如另加端口格式为 www.domain.com:88'
        }]
      },
      {
        title: '备注',
        name: 'ps',
        placeholder: '网站备注'
      },
      {
        title: '根目录',
        name: 'path',
        items: [{
          type: 'text',
          width: '330px',
          event: {
            css: 'glyphicon-folder-open',
            callback: function (obj) {
              bt.select_path(obj);
            }
          }
        }]
      },
      {
        title: 'FTP',
        items: [{
          name: 'ftp',
          type: 'select',
          items: [{
            value: 'false',
            title: '不创建'
          },
          {
            value: 'true',
            title: '创建'
          }
          ],
          callback: function (obj) {
            var subid = obj.attr('name') + '_subid';
            $('#' + subid).remove();
            if (obj.val() == 'true') {
              var _bs = obj.parents('div.bt-form').attr('data-id');
              var ftp_user = $('textarea[name="webname"]').data('ftp');
              var item = {
                title: 'FTP设置',
                items: [{
                  name: 'ftp_username',
                  title: '用户名',
                  width: '173px',
                  value: ftp_user
                },
                {
                  name: 'ftp_password',
                  title: '密码',
                  width: '173px',
                  value: bt.get_random(16)
                }
                ],
                ps: '创建站点的同时，为站点创建一个对应FTP帐户，并且FTP目录指向站点所在目录。'
              }
              var _tr = bt.render_form_line(item)

              obj.parents('div.line').append('<div class="line" id=' + subid + '>' + _tr.html + '</div>');
            }
          }
        }]
      },
      {
        title: '数据库',
        items: [{
          name: 'sql',
          type: 'select',
          items: [{
            value: 'false',
            title: '不创建'
          },
          {
            value: 'MySQL',
            title: 'MySQL'
          },
          {
            value: 'SQLServer',
            title: 'SQLServer'
          }
          ],
          callback: function (obj) {
            var subid = obj.attr('name') + '_subid';
            $('#' + subid).remove();
            if (obj.val() != 'false') {
              if (bt.os == 'Linux' && obj.val() == 'SQLServer') {
                obj.val('false');
                bt.msg({
                  msg: 'Linux暂不支持SQLServer!',
                  icon: 2
                });
                return;
              }
              var _bs = obj.parents('div.bt-form').attr('data-id');
              var data_user = $('textarea[name="webname"]').data('database');
              var item = {
                title: '数据库设置',
                items: [{
                  name: 'datauser',
                  title: '用户名',
                  width: '173px',
                  value: data_user
                },
                {
                  name: 'datapassword',
                  title: '密码',
                  width: '173px',
                  value: bt.get_random(16)
                }
                ],
                ps: '创建站点的同时，为站点创建一个对应的数据库帐户，方便不同站点使用不同数据库。'
              }
              var _tr = bt.render_form_line(item)
              obj.parents('div.line').append('<div class="line" id=' + subid + '>' + _tr.html + '</div>');
            }
          }
        },
        {
          name: 'codeing',
          type: 'select',
          items: [{
            value: 'utf8',
            title: 'utf-8'
          },
          {
            value: 'utf8mb4',
            title: 'utf8mb4'
          },
          {
            value: 'gbk',
            title: 'gbk'
          },
          {
            value: 'big5',
            title: 'big5'
          }
          ]
        }
        ]
      },
      {
        title: '程序类型',
        type: 'select',
        name: 'type',
        disabled: (bt.contains(bt.get_cookie('serverType'), 'IIS') ? false : true),
        items: [{
          value: 'PHP',
          title: 'PHP'
        },
        {
          value: 'Asp',
          title: 'Asp'
        },
        {
          value: 'Aspx',
          title: 'Aspx'
        },
        ],
        callback: function (obj) {
          if (obj.val() == 'Asp' || obj.val() == 'Aspx') {
            obj.parents('div.line').next().hide();
          } else {
            obj.parents('div.line').next().show();
          }
        }
      },
      {
        title: 'PHP版本',
        name: 'version',
        type: 'select',
        items: [{
          value: '00',
          title: '纯静态'
        }]
      }, {
        title: '网站分类',
        name: 'type_id',
        type: 'select',
        items: [

        ]
      }
      ],
      btns: [{
        title: '关闭',
        name: 'close'
      },
      {
        title: '提交',
        name: 'submit',
        css: 'btn-success',
        callback: function (rdata, load, callback) {
          var loading = bt.load();
          if (!rdata.webname) {
            bt.msg({
              msg: '主域名格式不正确',
              icon: 2
            });
            return;
          }
          var webname = bt.replace_all(rdata.webname, 'http:\\/\\/', '');
          webname = bt.replace_all(webname, 'https:\\/\\/', '');
          var arrs = webname.split('\n');
          var list = [];
          var domain_name, port;
          for (var i = 0; i < arrs.length; i++) {
            if (arrs[i]) {
              var temp = arrs[i].split(':');
              var item = {};
              item['name'] = temp[0]
              item['port'] = temp.length > 1 ? temp[1] : 80;
              if (!bt.check_domain(item.name)) {
                bt.msg({
                  msg: lan.site.domain_err_txt,
                  icon: 2
                })
                return;
              }
              if (i > 0) {
                list.push(arrs[i]);
              } else {
                domain_name = item.name;
                port = item.port;
              }
            }
          }
          var domain = {};
          domain['domain'] = domain_name;
          domain['domainlist'] = list;
          domain['count'] = list.length;
          rdata.webname = JSON.stringify(domain);
          rdata.port = port;
          bt.send('AddSite', 'site/AddSite', rdata, function (rRet) {
            loading.close();
            if (rRet.siteStatus) load.close();
            if (callback) callback(rRet);
          })
        }
      }
      ]
    }
  },
  ftp: {
    add: {
      title: lan.ftp.add_title,
      area: '530px',
      list: [{
        title: '用户名',
        name: 'ftp_username',
        callback: function (obj) {
          var defaultPath = $('#defaultPath').text();
          var wootPath = bt.rtrim(defaultPath, '/');
          if (bt.contains($('input[name="path"]').val(), wootPath)) {
            $('input[name="path"]').val(wootPath + '/' + obj.val())
          }
        }
      },
      {
        title: '密码',
        name: 'ftp_password',
        items: [{
          type: 'text',
          width: '330px',
          value: bt.get_random(16),
          event: {
            css: 'glyphicon-repeat',
            callback: function (obj) {
              bt.refresh_pwd(16, obj);
            }
          }
        }]
      },
      {
        title: '根目录',
        name: 'path',
        items: [{
          type: 'text',
          event: {
            css: 'glyphicon-folder-open',
            callback: function (obj) {
              bt.select_path(obj);
            }
          }
        }]
      }
      ],
      btns: [{
        title: '关闭',
        name: 'close'
      },
      {
        title: '提交',
        name: 'submit',
        css: 'btn-success',
        callback: function (rdata, load, callback) {
          var loading = bt.load();
          if (!rdata.ps) rdata.ps = rdata.ftp_username;
          bt.send('AddUser', 'ftp/AddUser', rdata, function (rRet) {
            loading.close();
            if (rRet.status) load.close();
            if (callback) callback(rRet);
            bt.msg(rRet);
          })
        }
      }
      ]
    },
    set_port: {
      title: lan.ftp.port_title,
      skin: '',
      area: '500px',
      list: [{
        title: '默认端口',
        name: 'port',
        width: '250px'
      }],
      btns: [{
        title: '关闭',
        name: 'close'
      },
      {
        title: '提交',
        name: 'submit',
        css: 'btn-success',
        callback: function (rdata, load, callback) {
          var loading = bt.load();
          bt.send('setPort', 'ftp/setPort', rdata, function (rRet) {
            loading.close();
            if (rRet.status) load.close();
            if (callback) callback(rRet);
            bt.msg(rRet);
          })
        }
      }
      ]
    },
    set_password: {
      title: lan.ftp.pass_title,
      area: '530px',
      list: [{
        title: 'id',
        name: 'id',
        hide: true
      },
      {
        title: '用户名',
        name: 'ftp_username',
        disabled: true
      },
      {
        title: '密码',
        name: 'new_password',
        items: [{
          type: 'text',
          event: {
            css: 'glyphicon-repeat',
            callback: function (obj) {
              bt.refresh_pwd(16, obj);
            }
          }
        }]
      },
      ],
      btns: [{
        title: '关闭',
        name: 'close'
      },
      {
        title: '提交',
        name: 'submit',
        css: 'btn-success',
        callback: function (rdata, load, callback) {
          bt.confirm({
            msg: lan.ftp.pass_confirm,
            title: lan.ftp.stop_title
          }, function () {
            var loading = bt.load();
            bt.send('SetUserPassword', 'ftp/SetUserPassword', rdata, function (rRet) {
              loading.close();
              if (rRet.status) load.close();
              if (callback) callback(rRet);
              bt.msg(rRet);
            })
          })
        }
      }
      ]
    }
  }
}
var form_group = {
  select_all: function (_arry) {
    for (var j = 0; j < _arry.length; j++) {
      this.select(_arry[j]);
    }
  },
  select: function (elem) {
    $(elem).after('<div class="bt_select_group"><div class="bt_select_active"><span class="select_val default">请选择</span><span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span> </div><ul class="bt_select_ul"></ul></div>');
    var _html = '',
      select_el = $(elem),
      select_group = select_el.next(),
      select_ul = select_group.find('.bt_select_ul'),
      select_val = select_group.find('.select_val'),
      select_icon = select_group.find('.glyphicon');
      php_data = {
        '4.0': [ '5.2', '5.3', '5.4', '5.5', '5.6', '7.0', '7.1', '7.2', '7.3', '7.4' ],
        '4.4': [ '5.4', '5.5', '5.6', '7.0', '7.1', '7.2', '7.3' ],
        '4.9': [ '5.6', '7.0', '7.1', '7.2', '7.3', '7.4', '8.0' ],
        '5.0': [ '7.2', '7.3', '7.4', '8.0' ],
        '5.1': [ '7.2', '7.3', '7.4', '8.0' ]
      };
    select_el.find('option').each(function (index, el) {
      var active = select_el.val() === $(el).val(),
        _val = $(el).val(),
        _name = $(el).text();
      _html += '<li data-val="' + _val + '" class="' + (active ? 'active' : '') + '">' + _name + '</li>';
      if (active) {
        select_val.text(_name);
        _val !== '' ? select_val.removeClass('default') : select_val.addClass('default');
      }
    });
    select_el.hide();
    select_ul.html(_html);
    $(elem).next('.bt_select_group').find('.bt_select_active').unbind('click').click(function (e) {
      if (!$(this).next().hasClass('active')) {
        $(this).parents().find('li').siblings().find('.bt_select_ul.active').each(function () {
          is_show_slect_parent(this);
        });
        $(this).parents('.rec-box').siblings().find('.bt_select_ul.active').each(function () {
          is_show_slect_parent(this);
        });
      }
      is_show_select_ul($(this).next().hasClass('active'));
      $(document).click(function (ev) {
        is_show_select_ul(true);
        $(this).unbind('click');
        ev.stopPropagation();
        ev.preventDefault();
      });
      e.stopPropagation();
      e.preventDefault();
    });
    
    $(elem).next('.bt_select_group').on('click', '.bt_select_ul li', function () {
      var _val = $(this).attr('data-val'),
        _name = $(this).text();
      $(this).addClass('active').siblings().removeClass('active');
      _val !== '' ? select_val.removeClass('default') : select_val.addClass('default');
      select_val.text(_name);
      select_el.val(_val);
      $(elem).find('option[value="' + _val + '"]').change();
      // console.log($(elem).find('option[value="' + _val + '"]').val(), elem.replace('#select_', ''));
      is_show_select_ul(true);
      // 根据php版本筛选phpMyAdmin
      var is_php = elem.indexOf('select_PHP') !== -1;
      if (is_php) {
        var php_my_admin_data = [];
        for (var key in php_data) {
          for (var i = 0; i < php_data[key].length; i++) {
            if (php_data[key][i] === _val) {
              php_my_admin_data.push(key);
              break;
            }
          }
        }
        var _select_html = '',
            _ul_html = '',
            $select_ul;
        $.each(php_my_admin_data, function (index, item) {
          _select_html += '<option value="' + item + '">phpMyAdmin ' + item + '</option>';
          _ul_html += '<li data-val="' + item + '" class="">phpMyAdmin ' + item + '</li>';
        });
        if (elem.indexOf('apache') !== -1) {
          $('#apache_select_phpMyAdmin').html(_select_html);
          $select_ul = $('#apache_select_phpMyAdmin').next().find('.bt_select_ul');
        } else {
          $('#select_phpMyAdmin').html(_select_html);
          $select_ul = $('#select_phpMyAdmin').next().find('.bt_select_ul');
        }
        $select_ul.html(_ul_html);
        if (_ul_html) $select_ul.find('li').eq(0).click();
      }
    });

    function is_show_slect_parent (that) {
      $(that).removeClass('active fadeInUp animated');
      $(that).prev().find('.glyphicon').removeAttr('style');
      $(that).parent().removeAttr('style');
    }

    function is_show_select_ul (active) {
      if (active) {
        select_group.removeAttr('style');
        select_icon.css({
          'transform': 'rotate(0deg)'
        });
        select_ul.removeClass('active fadeInUp animated');
      } else {
        select_group.css('borderColor', '#20a53a');
        select_icon.css({
          'transform': 'rotate(180deg)'
        });
        select_ul.addClass('active fadeInUp animated');
      }
    }
  },
  checkbox: function () {
    $('input[type="checkbox"]').each(function (index, el) {
      $(el).hide();
      $(el).after('<div class="bt_checkbox_group ' + ($(this).prop("checked") ? 'active' : 'default') + '"></div>');
    });
    $('.bt_checkbox_group').click(function () {
      $(this).prev().click();
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).prev().removeAttr('checked');
      } else {
        $(this).addClass('active');
        $(this).prev().attr('checked', 'checked');
      }
    });
  },
}

var dynamic = {
  loadList: [],
  fileFunList: {},
  load: false,
  callback: null,

  // 初始化执行
  execution: function () {
    for (var i = 0; i < this.loadList.length; i++) {
      var fileName = this.loadList[i];
      if (fileName in this.fileFunList) this.fileFunList[fileName]()
    }
  },

  /**
   * @description 动态加载js,css文件
   * @param url {string|array} 文件路径或文件数组
   * @param fn {function|undefined} 回调函数
   */
  require: function (url, fn, config) {
    var urlList = url, total = 0, num = 0, that = this;
    if (!Array.isArray(url)) urlList = [url];
    total = urlList.length;
    this.load = true;
    this.fileFunList = {};
    function createElement (url) {
      var element = null;
      if (url.indexOf('.js') > -1) {
        element = document.createElement('script')
        element.type = 'text/javascript'
        element.src = bt.url_merge('/vue/' + url)
      } else if (url.indexOf('.css') > -1) {
        element = document.createElement('link')
        element.rel = 'stylesheet'
        element.href = bt.url_merge('/vue/' + url)
      }
      return element
    }
    for (var i = 0; i < urlList.length; i++) {
      var item = urlList[i], dirArray = item.split('/'), filName = dirArray[dirArray.length - 1].split('.')[0]
      if (this.loadList.indexOf(filName) > -1) break;
      this.loadList.push(filName);
      (function (url) {
        var element = createElement(url);
        if (element.readyState) {
          element.onreadystatechange = function (ev) {
            if (element.readyState === 'loaded' || element.readyState === 'complete') {
              element.onreadystatechange = null
              num++;
              if (total === num) {
                that.execution()
                if (fn) {
                  fn.call(that)
                }
                that.load = false;
              }
            }
          };
        } else {
          element.onload = function (ev) {
            that.loadList[filName] = that.fn
            num++;
            if (total === num) {
              that.execution()
              if (fn) {
                fn.call(that)
              }
              that.load = false;
            }
          }
        }
        document.getElementsByTagName('head')[0].appendChild(element);
      }(item))
    }
  },
  /**
   * @default 执行延迟文件内容执行
   * @param fileName {string} 文件名称，不要加文件后缀
   * @param callback {function} 回调行数
   */
  delay: function delay (fileName, callback) {
    if (!this.load) {
      callback()
      return false
    }
    this.fileFunList[fileName] = callback
  }
}
