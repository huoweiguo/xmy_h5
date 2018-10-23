<template>
    <div id="app">
        <ul>
            <li>
                <a :href="balance">
                    <span>余额(元)</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                    <em>{{accountBalance}}</em>
                </a>
            </li>
            <li>
                <a :href="order">
                    <span>我的订单</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                    <em style="color:#FF7F26;">{{repayment}}</em>
                </a>
            </li>
            <li>
                <a href="/api/static/xmy_app/stars">
                    <span>我的星级</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
            <li>
                <a :href="myCard">
                    <span>我的银行卡</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
        </ul>
        <ol>
            <li>
                <a :href="shareLink">
                    <span>邀请返现金</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
            <!-- <li>
                <a :href="creditCard">
                    <span>信用卡取现</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li> -->
            <!-- <li>
                <a>
                    <span>签到拿现金</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li> -->
        </ol>
        <ol>
            <li>
                <a href="/api/static/xmy_app/khfk">
                    <span>客服与反馈</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
            <li>
                <a href="/api/static/xmy_app/setting">
                    <span>设置</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
            <li>
                <a href="/api/static/xmy_app/phone">
                    <span>手机检测</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
        </ol>
    </div>
</template>
<script>
import xmy from '../../../static/js/xmy.js';
export default {
    data () {
        return {
            accountBalance:'',
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            repayment:'',
            shareLink:'',
            myCard:'',
            balance:'',
            order:''
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
                    if(res.user.repaymentNum!=0&&res.user.repaymentNum!=''){
                        _this.repayment = res.user.repaymentNum+"笔订单待还";
                    }else{
                        _this.repayment = '';
                    }
                    _this.shareLink = "http://proxy.xiaomuyu.net:8704/myd/share.html?userId="+_this.userId+'&token='+_this.token;
                    _this.creditCard = "http://proxy.xiaomuyu.net:8704/myd/creditCard.html?userId="+_this.userId+'&token='+_this.token+"&userType=B";
                    if(res.userAuthInfo.bankCardAuth == "Y"){
                        _this.myCard = "/api/static/xmy/module/bankCard.html?userId="+_this.userId+'&token='+_this.token+'gotoType=mycenter';
                    }else{
                        _this.myCard = "/api/static/xmy/module/bindCard.html?userId="+_this.userId+'&token='+_this.token+'gotoType=mycenter';
                    }
                    _this.balance = "/api/static/xmy/module/balance.html?userId="+_this.userId+'&token='+_this.token+'gotoType=mycenter';
                    _this.order = "/api/static/xmy/module/order.html?userId="+_this.userId+'&token='+_this.token+'gotoType=mycenter';
                }
            }
        })
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/css/myCenter.less';
</style>