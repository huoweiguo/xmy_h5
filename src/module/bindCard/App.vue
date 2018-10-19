<template>
    <div>
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
import xmy from '../../../static/js/xmy.js';
import Toast from "../../../static/js/toast.js";
export default {
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
            userId: xmy.getQueryString('userId')
        }
    },

    methods: {
        trim (str) {
            return str.replace(/(^\s*)|(\s*$)/g,"");
        },

        cardName () {
            let _this = this;
            $.ajax({
                url: '/gateway/api/proxy/jbj/getBankInfo?token='+_this.token+'&bankCard='+_this.bankId,
                type: 'GET',
                success: function(res){
                    if(res.respCode == "000000"){
                        _this.bankCode = res.bankCode;
                        _this.bankName = res.bankName;
                    }else{
                        // _this.$toast.center(res.respMsg);
                    }
                }
            });
        },

        getSms () {
            let _this = this,
                telReg = /^1\d{10}$/,
                tel = this.trim(_this.telphone);
            
            if(telReg.test(tel)){
                // _hmt.push(['_trackEvent', "口代鱼绑卡发送短信验证码", "getsms"]);
                $.ajax({
                    url: '/gateway/api/order/bindCard/pre',
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
                            // _this.$toast.center(res.data.respMsg);
                        }
                    }

                });

                
            }else{
                // _this.$toast.center("请输入11位手机号码！");
            }
        },

        gobind () {
            let _this = this;

            // _hmt.push(['_trackEvent', "口代鱼绑卡", "bindcard"]);

            $.ajax({
                url: '/gateway/api/order/bindCard/confirm',
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    bindCardSeqNo: _this.bindCardSeqNo,
                    smsCode: _this.chkcode
                },

                success: function(res){
                    if(res.respCode == "000000"){
                        window.history.back();
                    }else{
                        // _this.$toast.center(res.data.respMsg);
                    }
                }
            });
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
            url: '/gateway/api/order/bindCardLog/initBandCardInfo',
            type: 'POST',
            data: {
                token: _this.token,
                userId: _this.userId,
                userType: "B"
            },
            success: function(res){
                if(res.respCode == "000000"){
                    _this.userName = res.data.userName;
                    _this.idCard = res.data.idCard;
                    _this.telphone = res.data.mobile;
                }
                // _this.$toast.center("gsgege");
            }
        });
        
    }
}
</script>

