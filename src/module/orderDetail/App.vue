<template>
    <div>
        <div class="body-mask"></div>
        <div class="detail_header">
            <div class="xmy_nav">
                <a class="goback" href="javascript:window.history.go(-1);"></a>
                <span class="proname">订单详情</span>
            </div>

            <div class="order_header">
                <img class="head_img" :src="orderText.headImg">
                <span class="head_name">{{orderText.investorName}}</span>
                <span class="head_status">{{orderText.orderStatus}}</span>
            </div>
        </div>

        <div class="order_li">
            <div><span class="order_id">订单编号</span><span class="order_text">{{orderText.orderId}}</span></div>
            <div><span class="order_id">创建时间</span><span class="order_text">{{orderText.createTime}}</span></div>
            <div><span class="order_id">借款协议</span><a :href="orderText.protocolPage">点击查看</a></div>
        </div>

        <div class="order_table">
            <table class="tab_1" colspan="0">
                <tr>
                    <th>本金</th>
                    <th>年利率</th>
                    <th>期限</th>
                    <th>用途</th>
                    <th>处理日</th>
                </tr>

                <tr>
                    <td>{{orderText.originalAmt}}</td>
                    <td>{{orderText.annualInterestRate}}</td>
                    <td>{{orderText.timeLimit}}</td>
                    <td>{{orderText.loanPurpose}}</td>
                    <td>{{orderText.loanDate}}</td>
                </tr>
            </table>

            <div class="tab2_second">
                <table class="tab_1" colspan="0">
                    <tr>
                        <th>到期日</th>
                        <th>到期应还</th>
                        <th>违约金</th>
                        <th>罚息</th>
                        <th>逾期级别</th>
                    </tr>

                    <tr>
                        <td>{{orderText.dueDate}}</td>
                        <td>{{orderText.expireRepayment}}</td>
                        <td>{{orderText.penalSum}}</td>
                        <td>{{orderText.penaltyInterest}}</td>
                        <td>{{orderText.overdueLevel}}</td>
                    </tr>
                </table>

                <table class="tab_1" colspan="0">
                    <tr>
                        <th>减免金额</th>
                        <th>当前应还</th>
                        <th>还款方式</th>
                        <th>实还金额</th>
                        <th>处理日</th>
                    </tr>

                    <tr>
                        <td>{{orderText.reliefAmt}}</td>
                        <td>{{orderText.presentRepayment}}</td>
                        <td>{{orderText.repaymentWay}}</td>
                        <td>{{orderText.actualRepaymentAmt}}</td>
                        <td>{{orderText.actualRepaymentDate}}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="order_foot" v-if="orderText.orderStatus=='待还款'||orderText.orderStatus=='逾期中'">
            <!-- 找TA聊聊 -->
            <a :href="repaymentLink">
                <template>立即还款</template>
            </a>
        </div>
    </div>
</template>

<script>
import xmy from '../../../static/js/xmy.js';
export default {
     data () {
        return {
            orderText: {
                orderId: '',
                investorName: '',
                headImg: '',
                timeLimit: '',
                loanPurpose: '',
                createTime: '',
                protocolPage: '',
                originalAmt: '',
                annualInterestRate: '',
                loanDate: '',
                dueDate: '',
                expireRepayment: '',
                penalSum: '',
                penaltyInterest: '',
                overdueLevel: '',
                reliefAmt: '',
                presentRepayment: '',
                repaymentWay: '',
                actualRepaymentAmt: '',
                actualRepaymentDate: '',
                orderStatus: '',
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId')
            },
            repaymentLink:''
        }
    },
    methods: {
        orderContext () {
            let _this = this;
            let orderId = xmy.getQueryString('orderId');
            $.ajax({
                url: '/gateway/api/order/h5/orderDetail?token='+_this.orderText.token+'&userId='+_this.orderText.userId+'&orderId='+orderId,
                type: 'post',
                success: function(res){
                    if(res.respCode == '000000'){
                        _this.orderText.orderId = res.data.orderNo;
                        _this.orderText.headImg = res.data.investorAvatar;
                        _this.orderText.investorName = res.data.investorName;
                        _this.orderText.orderStatus = res.data.orderStatus;
                        
                        
                        _this.orderText.timeLimit = res.data.timeLimit;
                        _this.orderText.loanPurpose = res.data.loanPurpose;
                        _this.orderText.createTime = res.data.createTime;
                        _this.orderText.protocolPage = 'http://proxy.xiaomuyu.net:8704/xmy/agreement.html?userId='+_this.orderText.userId+'&loanUrl='+res.data.loanUrl;
                        _this.orderText.originalAmt = res.data.originalAmt;

                        _this.orderText.annualInterestRate = res.data.annualInterestRate;
                        _this.orderText.loanDate = res.data.loanDate;
                        _this.orderText.dueDate = res.data.dueDate;
                        _this.orderText.expireRepayment = res.data.expireRepayment;
                        _this.orderText.penalSum = res.data.penalSum;
                        _this.orderText.penaltyInterest = res.data.penaltyInterest;
                        _this.orderText.overdueLevel = res.data.overdueLevel;

                        _this.orderText.reliefAmt = res.data.reliefAmt;
                        _this.orderText.presentRepayment = res.data.presentRepayment;
                        _this.orderText.repaymentWay = res.data.repaymentWay;
                        _this.orderText.actualRepaymentAmt = res.data.actualRepaymentAmt;
                        _this.orderText.actualRepaymentDate = res.data.actualRepaymentDate;
                        
                        _this.repaymentLink = '/api/static/xmy/module/repay.html?userId='+_this.orderText.userId+'&token='+_this.orderText.token+'&orderId='+_this.orderText.orderId
                    } else {
                        xmy.toast(res.respMsg);
                    }
                }
            });
        }
    },
    mounted () {
        this.orderContext();
    }  
}
</script>

<style lang="less" scoped>
    @import '../../common/css/orderDetail.less';
</style>

