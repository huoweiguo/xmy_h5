import { callbackify } from "util";

var xmy = {

    VAR: {
        timer: null
    },

    trim: function(str){
        return (str ? str.replace(/\s+/g, ""):''); 
    },

    chkPhone: function(tel){
        var phone = /^1\d{10}$/;
        if(phone.test(tel)){
            return true;
        } else {
            return false;
        }
    },

    chkCard: function(code){
        var card = /^\d{16}$/;
        if(card.test(code)){
            return true;
        } else {
            return false;
        }
    },

    chkIdCard: function(idCard){
        var identify = /^[1-9]\d{5}[1-9]\d{3}[0-1][0-9][0-3][0-9]\d{3}(\d|X|x)$/;
        if(identify.test(idCard)){
            return true;
        } else {
            return false;
        }
    },

    getData: function(json){
        $.ajax({
            url: json.url,
            type: json.type || 'GET',
            data: json.data || '',
            datatype:'JSON',
            ContentType: 'application/json',
            success: function(res){
                json.success && json.success(res);
            }
        });
    },

    //获取滚动条当前的位置
    getScrollTop: function() {
        var scrollTop = 0;
        if(document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if(document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    //获取当前可视范围的高度 
    getClientHeight: function() {
        var clientHeight = 0;
        if(document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    },

    //获取文档完整的高度 
    getScrollHeight: function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    getQueryString: function(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    },

    setCookie: function(name,value) {
        document.cookie = name + "="+ escape (value); 
    },

    getCookie: function(name) { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]); 
        else 
            return null; 
    },
    
    delCookie: function(name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval; 
    },

    toast: function(msg){
        layer.open({
            content: msg,
            skin: 'msg',
            time: 1.5
        });
    },

    buried (data,callback) {
        let _this = this;
        $.ajax({
            url: '/gateway/api/report/userBuried/logging?t='+(new Date()).getTime(),
            type: 'POST',
            data: data,
            success:function(s){
                callback();
            }
        })
    }
}

export default xmy;