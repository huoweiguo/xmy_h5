<template>
    <div id="app">
        <navigation>
            <a href="javascript:;" @click="goBack" slot="navigation_goback" class="navigation_goback"></a>
            <span slot="navigation_title" class="navigation_title">绑定银行卡</span>
        </navigation>
        <div class="order-bg"></div>
        <div class="card-ts">注意：请绑定您的借记卡或储蓄卡，不支持绑定信用卡。</div>
        <div class="card-txt">
            <div><span>持卡人</span><i v-text="userName">借百家</i></div>
            <!-- <div><span>持卡人</span><input type="text" v-model="userName" readonly /></div> -->
            <div><span>身份证号</span><i v-text="idCard">422801 1999 1212 131X</i></div>
            <div><span>银行卡号</span><input type="text" @input="isEmpty" @blur="cardName" maxlength="19" v-model="bankId" pattern="[0-9]*" placeholder="请输入卡号"></div>
            <div><span>银行名称</span><i>{{bankName}}</i></div>
            <div><span>预留电话</span><input type="number" @input="isEmpty" v-model="telphone" placeholder="请输入银行预留手机号"></div>
            <div>
                <span>验证码</span>
                <input type="number" v-model="chkcode" @input="isEmpty" placeholder="请输入验证码">
                <em v-show="isClick" @click="getSms">获取验证码</em>
                <em class="orange" v-show="!isClick">{{time}}s</em>
            </div>
        </div>

        <div class="bind-set">
            <a href="http://proxy.xiaomuyu.net:8704/jbj/listBanks">支持的银行卡和限额</a>
            <button v-show="!bind" class="bind-btn1">确认绑定银行卡</button>
            <button v-show="bind" @click="gobind" class="bind-btn2">确认绑定银行卡</button>
        </div>
        <div id="xdy_toast" class="xdy_toast" v-show="unOpen"></div>
    </div>
</template>

<script>
// import xdy from '../js/xdy.js';
import '../../common/css/bindCard.less';
import navigation from '../../components/navigation.vue';
import xmy from '../../../static/js/xmy.js';
export default {
    components: {
        navigation: navigation
    },
    data () {
        return {
            bankId: '',
            telphone: '',
            chkcode: '',
            time: 60,
            timer: null,
            isClick: true,
            unOpen: false,
            bind: false,
            userName: '',
            idCard:'',
            bankCode:'',
            bankName:'',
            bindCardSeqNo:'',
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            getInto: xmy.getQueryString('type')
        }
    },

    methods: {
        trim (str) {
            return (str ? str.replace(/(^\s*)|(\s*$)/g,"") : '');
        },

        cardName () {
            let _this = this;
            if(_this.bankId == ""){
                xmy.toast("输入银行卡号");
                return false;
            }
            if(_this.bankId.length>15){
                $.ajax({
                    url: '/gateway/api/proxy/jbj/getBankInfo?t='+(new Date()).getTime()+'&token='+_this.token+'&bankCard='+_this.bankId,
                    type: 'GET',
                    success: function(res){
                        if(res.respCode == "000000"){
                            _this.bankCode = res.bankCode;
                            _this.bankName = res.bankName;
                        }else{
                            xmy.toast(res.respMsg);
                        }
                    }
                });
            }else{
                xmy.toast("请输入正确的银行卡号");
            }
        },

        getSms () {
            let _this = this,
                telReg = /^1\d{10}$/,
                tel = this.trim(_this.telphone);
            
            if(telReg.test(tel)){
                // _hmt.push(['_trackEvent', "口代鱼绑卡发送短信验证码", "getsms"]);
                $.ajax({
                    url: '/gateway/api/order/bindCard/pre?t='+(new Date()).getTime(),
                    type: 'POST',
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        userType: "B",
                        custName: _this.userName,
                        custIdentity: _this.idCard,
                        bankCard: _this.bankId,
                        bankCode: _this.bankCode,
                        bankName: _this.bankName,
                        custPhone: _this.telphone
                    },
                    success: function(res){
                        if(res.respCode == "000000"){
                            _this.isClick = false;
                            _this.bindCardSeqNo = res.data;
                            clearInterval(_this.timer);
                            _this.timer = setInterval(function(){
                                if(_this.time <= 0){
                                    _this.time = 60;
                                    _this.isClick = true;
                                    clearInterval(_this.timer);
                                } else {
                                    _this.isClick = false;
                                    _this.time--;
                                }
                            },1000);
                        }else{
                            xmy.toast(res.respMsg);
                        }
                    }

                });
            }else{
                xmy.toast("请输入11位手机号码！");
            }
        },

        gobind () {
            let _this = this;
            _this.bind = false;
            // _hmt.push(['_trackEvent', "口代鱼绑卡", "bindcard"]);

            $.ajax({
                url: '/gateway/api/order/bindCard/confirm?t='+(new Date()).getTime(),
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    bindCardSeqNo: _this.bindCardSeqNo,
                    smsCode: _this.chkcode
                },

                success: function(res){
                    _this.bind = true;
                    if(res.respCode == "000000"){
                        if(_this.getInto == 1){
                            _this.buried(true)
                        }else{
                            xmy.toast(res.respMsg);
                            setTimeout(function(){
                                window.location.href = 'javascript:window.history.go(-1)'
                            },1000);
                        }
                    }else{
                        if(_this.getInto == 1){
                            _this.buried(false)
                        }
                        xmy.toast(res.respMsg);
                    }
                }
            });
        },
        goBack () {
            let _this = this;
            if(_this.getInto == 1){
                window.location.href = '/api/static/xmy_app/popAuth';
            }else{
                window.location.href = 'javascript:window.history.go(-1)'
            }
        },
        buried (status) {
            let _this = this;
            if(status){
                _this.buriedNo = 'Auth_RealName_Bank_Success';
            }else{
                _this.buriedNo = 'Auth_RealName_Bank_Fail';
            }
            $.ajax({
                url: '/gateway/api/report/userBuried/logging?t='+(new Date()).getTime(),
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    buriedNo: _this.buriedNo
                },
                success:function(s){
                    if(status){
                        window.location.href = '/api/static/xmy_app/popAuth';
                    }
                }
            })
        },

        isEmpty () {
            let bankid = this.trim(this.bankId || ""),
                tel = this.trim(this.telphone || ""),
                chkcode = this.trim(this.chkcode || "");
            if(bankid != '' && tel != '' && chkcode != ''){
                this.bind = true;
            } else {
                this.bind = false;
            }
        }
    },

    mounted () {
        let _this = this;

        $.ajax({
            url: '/gateway/api/user/jbj/findUserByUserIdAndType?t='+(new Date()).getTime(),
            type: 'POST',
            data: {
                token: _this.token,
                userId: _this.userId,
                userType: "B"
            },
            success: function(res){
                if(res.respCode == "000000"){
                    _this.userName = res.data.username;
                    _this.idCard = res.data.idCard;
                    _this.telphone = res.data.mobile;
                }else{
                    xmy.toast(res.respMsg);
                }
            }
        });
    }
}
</script>

