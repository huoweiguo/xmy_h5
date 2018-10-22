<template>
    <div id="app">
        <div class="charge_content">
            <div class="charge_nav">
                <a href="javascript:;" class="goback" @click="goback"></a>
                <span>{{productName}}</span>
                <a href="javascript:;" @click="productDetail" class="charge_pro">产品详情</a>
            </div>
            <!--额度金额-->
            <div class="quota">
                <h6 class="qu_h6">额度金额(元)</h6>
                <h3 class="qu_h3">{{money}}</h3>
                <div class="qu_list">
                    <div>
                        <span>到账金额</span>
                        <p>{{account}}元</p> 
                    </div>
                    <div>
                        <span>期限</span>
                        <p>{{date}}{{dw}}</p>
                    </div>
                    <div>
                        <span>还款金额</span>
                        <p>{{repayment}}元</p>
                    </div>
                </div>
            </div>

            <!--中间线-->
            <img class="quota_line" src="./images/line@2x.png">


            <!--相关协议-->
            <div class="charge_agree">
                <em class="protocol" @click="ischk = !ischk" :class="{agree: ischk}">本人阅读并同意签署协议</em><a :href="protocolPage" class="a_protocol">《借款合同及相关协议》</a>
                <div class="agree_btn_set">
                    <a href="javacsript:;" class="a_btn2" @click="toLoan" :class="{unclick: !ischk}">立即借款</a>
                </div>

                <div class="small_txt">
                    <p><strong>·</strong>点击<strong>“确认拿钱”</strong>，借款金额系统将自动放款至您绑定的银行卡</p>
                    <p><strong>·</strong>到账时间一般不超过<strong>2小时</strong>，不同银行到账时间有所不同，如有疑问请联系在线客服</p>
                    
                </div>
            </div>
        </div>
        <!--借款结果-->
        <div class="result" v-show="result">
            <div class="loan_result">借款结果</div>
            <img v-show="!success" class="result_img" src="../../../static/images/icon_refuse@2x.png">
            <img v-show="success" class="result_img" src="../../../static/images/icon_ok@2x.png">
            <h2>{{message}}</h2>
            <div v-show="success" class="loan_small_txt">
                到期准时还款，再次借款每笔
                <p>提额<span>最高50%</span>降息<span>最高30%</span></p> 
            </div>
            <h5 v-show="showMsg">{{faildMsg}}</h5>
            <div class="success"  v-show="success && bank_suc">
                <div class="detail">
                    <h4>到账详情</h4>
                    <div class="process">
                        <div class="iconText">
                            <span>发起借款申请</span>
                            <h6>银行处理中</h6>
                            <span>预计2小时内到账</span>
                            <span>到账成功</span>
                        </div>
                        <div class="iconLine">
                            <em></em>
                            <strong></strong>
                            <img src="../../../static/images/round_blue@2x.png"/>
                            <i></i>
                            <span></span>
                        </div>
                    </div>
                </div>
                
                <ul>
                    <li>
                        <span>借款金额</span>
                        <em>¥{{tradeAmt}}</em>
                    </li>
                    <li>
                        <span>到账金额</span>
                        <em>¥{{actualAmt}}</em>
                    </li>
                    <li>
                        <span>到账方式</span>
                        <em v-show="isCard">{{bankName}} 尾号{{bankCard}}</em>
                        <em v-show="!isCard">账户余额</em>
                    </li>
                </ul>
            </div>
            <div class="small-btn">
                <a href="/api/static/app_xmy/gohome" class="r-btn1">返回首页</a>
                <a href="/api/static/app_xmy/gohome" @click="" class="r-btn2" v-show="!success">更多借款</a>
                <a href="javascript:;" @click="lookOrder" class="r-btn2" v-show="success">查看订单</a>
            </div>
        </div>

        <div class="loan_mask" v-show="toLeave"></div>
        <div class="go_combox" v-show="toLeave">
            <h3>任性！确认不拿钱了？</h3>
            <div class="loan_small">借款成功后，下次借款可以<span>提额</span>还<span>降息</span>哟</div>
            <div class="loan_set">
                <a href="/api/static/app_xmy/gohome">确认返回</a>
                <a href="javascript:;" @click="loankv" class="loankv">再考虑下</a>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../common/css/charge.less';
    import xmy from '../../../static/js/xmy.js';
    export default {
        data () {
            return {
                money: "1568.00",
                account: 750,
                repayment: 1020.11,
                date: '7',
                dw: '天',
                ischk: true,
                result: false,
                success: false,
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId'),
                productId: xmy.getQueryString('productId'),
                productUserId: xmy.getQueryString('productUserId'),
                publishOrderId: xmy.getQueryString('publishOrderId'),
                productName: xmy.getCookie('productName'),
                message: '',
                faildMsg: '',
                bank_suc: false,
                afterTime: '',
                showMsg: false,
                isCard: true,
                bankName: '',
                tradeAmt: '',
                bankCard: '',
                actualAmt: '',
                toLeave: false,
                protocolPage: 'http://proxy.xiaomuyu.net:8704/xmy/agreement.html?loanUrl=http://baijiajiekuan.oss-cn-shanghai.aliyuncs.com/protocol/template/20180304231453.png&userId='+xmy.getQueryString('userId')
            }
        },

        methods: {
            goback () {
                this.toLeave = true;
            },

            productDetail() {
                window.location.href = 'http://proxy.xiaomuyu.net:8704/xmy/productDetail.html?productId='+this.productId+'&publishOrderId=' + this.publishOrderId;
            },

            toLoan () {
                let _this = this;
                $.ajax({
                    url: '/gateway/api/order/loan/confirmLoan',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        borrowerId: _this.userId,
                        productId: _this.productId,
                        productUserId: _this.productUserId,
                        publishOrderId: _this.publishOrderId
                    },
                    success: function(res){

                        if(res.respCode == '000000'){
                            _this.message = '借款成功';
                            _this.success = true;
                            _this.bank_suc = true;
                            _this.isCard = true;
                            _this.actualAmt = res.data.actualAmt;
                            _this.bankName = res.data.bankName;
                            _this.tradeAmt = res.data.tradeAmt;
                            _this.bankCard = res.data.bankCard;
                            
                        } else if(res.respCode == '080001') {
                            _this.message = '借款成功';
                            _this.success = true;
                            _this.bank_suc = false;
                            _this.showMsg = true;
                            _this.isCard = false;
                            _this.faildMsg = res.respMsg;
                        } else {
                            _this.message = '借款失败';
                            _this.success = false;
                            _this.showMsg = true;
                            _this.faildMsg = res.respMsg;
                        }

                        _this.result = true;
                    }
                });
            },

            init () {
                var _this = this;
                $.ajax({
                    url: '/gateway/api/order/loan/verificationCredit',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        borrowerId: _this.userId,
                        productId: _this.productId,
                        productUserId: _this.productUserId
                    },
                    success: function(res){
                        if(res.respCode == '000000'){
                            _this.money = res.loanExtend.limit;
                            _this.account = res.loanExtend.toAccountAmount;
                            _this.repayment = res.loanExtend.repaymentAmount;
                            _this.date = res.loanExtend.loanPeriodTime;
                            _this.dw = res.loanExtend.loanPeriodUnit;
                        } 
                    }
                });
            },

            loankv () {
                this.toLeave = false;
            },

            lookOrder () {
                window.location.href = '/api/static/xmy/module/order.html?token='+_this.token+'&userId='+_this.userId;
            }
        },

        mounted() {
            let _this = this;
            this.init();
        }
    }
</script>

