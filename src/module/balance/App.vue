<template>
    <div id="app">
        <navigation>
            <a href="javascript:window.history.go(-1);" slot="navigation_goback" class="navigation_goback"></a> 
            <span slot="navigation_title" class="navigation_title">余额</span>
            <a href="javascript:;" @click="goDetail" slot="navigation_small" class="navigation_small">余额明细</a>
        </navigation>
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
import navigation from '../../components/navigation.vue';
import xmy from '../../../static/js/xmy.js';
export default {
    components: {
        navigation: navigation
    },
    data () {
        return {
            showAmt: true,
            accountBalance:'',
            recharge:'',
            putForward:"",
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            fineBalance: '/api/static/xmy/findbalance.html?userId='+xmy.getQueryString('token')+'&token='+xmy.getQueryString('userId')
        }
    },
    methods:{
        lookAmt: function(){
            this.showAmt = !this.showAmt;
        },
        goDetail: function(){
            window.location.href = this.fineBalance;
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
<style lang="less" scoped>
    @import '../../common/css/balance.less';
</style>
