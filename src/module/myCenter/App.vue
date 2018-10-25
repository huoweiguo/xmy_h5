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
            <li v-for="(item,index) in menuList" :key="index" v-if="item.id!=1">
                <a v-if="item.id == 3" :href="order">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                    <em style="color:#FF7F26;">{{repayment}}</em>
                </a>
                <a v-if="item.id == 2" href="/api/static/xmy_app/stars">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                <a v-if="item.id == 4" :href="myCard">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                <a v-if="item.id == 5" href="/api/static/xmy_app/khfk">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                <a v-if="item.id == 6" :href="shareLink">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                <a v-if="item.id == 7" :href="creditCard">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                <a v-if="item.id == 8" href="/api/static/xmy_app/phone">
                    <span>{{item.name}}</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
                
            </li>
            <li>
                <a href="/api/static/xmy_app/setting">
                    <span>设置</span>
                    <img src="../../../static/images/rightarrow_1f.png"/>
                </a>
            </li>
        </ul>
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
            appVersion: xmy.getQueryString('appVersion'),
            device: xmy.getQueryString('device'),
            channelType: xmy.getQueryString('channelType'),
            appId: 'xiaomuyu',
            repayment:'',
            shareLink:'',
            myCard:"/api/static/xmy/module/bankCard.html?userId="+xmy.getQueryString('userId')+"&token="+xmy.getQueryString('token'),
            balance:'',
            order:'',
            bankCardAuth:'',
            menuList:[]
        }
    },
    methods: {
        getMenu () {
            let _this = this;
            $.ajax({
            url: '/gateway/api/proxy/jbj/personalList?t='+(new Date()).getTime(),
            type: 'post',
            data: {
                token: _this.token,
                appId: _this.appId,
                appVersion: _this.appVersion,
                channelType: _this.channelType,
                device: _this.device
            },
            success: function(res){
                if(res.respCode == "000000"){
                    _this.menuList = res.voList;
                }else{
                    xmy.toast(res.respMsg)
                }
            }
        })
        }
    },
    mounted () {
        let _this = this;
        _this.getMenu ();
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
                    if(res.user.repaymentNum!=0&&res.user.repaymentNum!=''){
                        _this.repayment = res.user.repaymentNum+"笔订单待还";
                    }else{
                        _this.repayment = '';
                    }
                    _this.shareLink = "http://test-proxy.xiaomuyu.net:8704/myd/share.html?userId="+_this.userId+"&token="+_this.token;
                    _this.creditCard = "http://test-proxy.xiaomuyu.net:8704/myd/creditCard.html?userId="+_this.userId+"&token="+_this.token+"&userType=B";
                    _this.bankCardAuth = res.userAuthInfo.bankCardAuth;
                    _this.balance = "/api/static/xmy/module/balance.html?userId="+_this.userId+"&token="+_this.token;
                    _this.order = "/api/static/xmy/module/order.html?userId="+_this.userId+"&token="+_this.token+"&linkType=mycenter";
                }else{
                    xmy.toast(res.respMsg)
                }
            }
        })
    }
}
</script>
<style lang="less" scoped>
    @import '../../common/css/myCenter.less';
</style>