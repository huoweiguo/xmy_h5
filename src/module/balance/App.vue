<template>
    <div id="app">
        <navigation>
            <a href="javascript:;" @click="goCenter" slot="navigation_goback" class="navigation_goback"></a> 
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
        <a class="putForward" href="javascript:;" @click="isPutForward">提现</a>
        <div class="popup" v-show="toLeave">
            <div class="inquiry">
                <h2>您当前存在逾期订单，请先还款</h2>
                <div class="btn">
                    <button class="cancelBtn" @click="loankv">取消</button>
                    <button class="sureBtn" @click="gotoAuth">确定</button>
                </div>
            </div>
        </div>
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
            toLeave: false,
            goBack:"/back/myCenter?href=return",
            fineBalance: "/api/static/xmy/module/fineBalance.html?token="+xmy.getQueryString('token')+"&userId="+xmy.getQueryString('userId')
        }
    },
    methods:{
        goCenter () {
            // 退出余额埋点
            let _this = this;
            let params={
                token: _this.token,
                userId: _this.userId,
                buriedNo: 'Center_Balance_Quit'
            }
            xmy.buried(params,function(){
                window.location = _this.goBack;
            });
        },
        lookAmt: function(){
            this.showAmt = !this.showAmt;
        },
        goDetail: function(){
            window.location.href = this.fineBalance;
        },
        isPutForward () {
            let _this = this;
            $.ajax({
                url: '/gateway/api/order/billOrder/queryOverduePopTip?t='+(new Date()).getTime(),
                type: 'post',
                data: {
                    token: _this.token,
                    userId: _this.userId
                },
                success: function(res){
                    if(res.respCode == "000000"){
                        if(res.data.isPopWithdrawTip == "Y"){
                            // 弹窗
                            _this.toLeave = true;
                        }else{
                            window.location.href = _this.putForward
                        }
                    }else{
                        xmy.toast(res.respMsg)
                    }
                }
            })
        },
        loankv () {
            let _this = this
            _this.toLeave = false;
        },
        gotoAuth () {
            let _this = this;
            _this.toLeave = false;
            window.location.href = "/api/static/xmy/module/order.html?token="+xmy.getQueryString('token')+"&userId="+xmy.getQueryString('userId')
        }
    },
    mounted () {
        let _this = this;
        // 进入埋点
        let params={
            token: _this.token,
            userId: _this.userId,
            buriedNo: 'Center_Balance_Enter'
        }
        xmy.buried(params);
        $.ajax({
            url: '/gateway/api/proxy/jbj/getUserDetail?t='+(new Date()).getTime(),
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
