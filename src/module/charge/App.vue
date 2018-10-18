<template>
    <div id="app">
        <div class="charge_content">
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
                        <p>{{date}}</p>
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
                <em class="protocol" @click="ischk = !ischk" :class="{agree: ischk}">本人阅读并同意签署协议</em><a href="#" class="a_protocol">《借款合同及相关协议》</a>
                <div class="agree_btn_set">
                    <!-- <a href="javacsript:;" class="a_btn1">放弃借款</a> -->
                    <a href="javacsript:;" class="a_btn2" :class="{unclick: !ischk}">立即借款</a>
                </div>

                <div class="small_txt">
                    <p><strong>·</strong>点击<strong>“确认拿钱”</strong>，借款金额系统将自动放款至您绑定的银行卡</p>
                    <p><strong>·</strong>到账时间一般不超过<strong>2小时</strong>，不同银行到账时间有所不同，如有疑问请联系在线客服</p>
                    
                </div>
            </div>

            <!--借款结果-->
            <div class="loan-result" v-show="result">
                <img v-show="!success" class="result_img" src="../../../static/images/icon_refuse@2x.png">
                <img v-show="success" class="result_img" src="../../../static/images/icon_refuse@2x.png">
                <h2 v-show="refuse">这么任性，钱都不要</h2>
                <h2 v-show="!refuse">可惜！就差一点</h2>
                <span>亲，为您推荐更多借款了解一下</span>
                <div class="btn-set">
                    <a href="#" class="s_btn1">返回首页</a>
                    <a href="#" class="s_btn2">更多借款</a>
                </div>
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
                date: '7天',
                ischk: true,
                refuse: true,
                result: false,
                success: false,
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId'),
                productId: xmy.getQueryString('productId'),
                productUserId: xmy.getQueryString('productUserId'),
                publishOrderId: xmy.getQueryString('publishOrderId')
            }
        },

        methods: {
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
                        console.log(res);
                    }
                });
            }
        },

        mounted() {
            let _this = this;

            this.init();
        }
    }
</script>

