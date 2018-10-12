<template>
    <div id="app">
        <div class="charge_content" :class="{moveTo: isMove}">
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
                <em class="protocol" @click="ischk = !ischk" :class="{agree: ischk}">本人阅读并同意签署</em><a href="#" class="a_protocol">《借款合同及相关信息》</a>
                <div class="agree_btn_set">
                    <a href="javacsript:;" class="a_btn1">放弃借款</a>
                    <a href="javacsript:;" class="a_btn2" :class="{unclick: !ischk}">立即借款</a>
                </div>

                <div class="small_txt">
                    <p>提示:</p>
                    <p>1、点击立即借款，则系统将自动打款到您的绑定银行卡；</p>
                    <p>2、到账时间大约5～15分钟。</p>
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
    export default {
        data () {
            return {
                money: "1568.00",
                account: 750,
                repayment: 1020.11,
                date: '7天',
                ischk: true,
                isMove: false,
                refuse: true,
                result: false,
                success: false
            }
        },

        mounted() {
            let _this = this;

            //初始化移动
            setTimeout(function(){
                _this.isMove = true;
            },100);
        }
    }
</script>

