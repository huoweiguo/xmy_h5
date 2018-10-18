<template>
    <div id="app">
        <div class="text">
            <span>余额</span>
            <img src="./images/icon_eye.png" v-show="showAmt" @click="lookAmt"/>
            <img src="./images/icon_eye_close.png" v-show="!showAmt" @click="lookAmt"/>
        </div>
        <div class="amt" v-show="showAmt">{{accountBalance}}</div>
        <div class="amt" v-show="!showAmt">****</div>
        <a class="recharge" :href="recharge">充值</a>
        <a class="putForward" :href="putForward">提现</a>
    </div>
</template>
<script>
import '../../common/css/balance.less';
import xmy from '../../../static/js/xmy.js';
    
export default {
    data () {
        return {
            showAmt: true,
            accountBalance:'',
            recharge:'',
            putForward:"",
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
        }
    },
    methods:{
        lookAmt: function(){
            this.showAmt = !this.showAmt;
        }
    },
    mounted () {
        let _this = this;
        $.ajax({
            url: '/gateway/api/proxy/jbj/getUserDetail',
            type: 'post',
            data: {
                token: _this.token,
                userId: _this.userId,
                userType: "B"
            },
            success: function(res){
                if(res.respCode == "000000"){
                    _this.accountBalance = res.accountBalance;
                    _this.putForward = "putForward.html?token="+_this.token+"&userId="+_this.userId;
                    _this.recharge = "recharge.html?token="+_this.token+"&userId="+_this.userId;
                }
            }
        })
    }
}
</script>
