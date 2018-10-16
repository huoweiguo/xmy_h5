<template>
    <div id="app">
        <div class="amount" v-show="amount">
            <p>注意：提现金额需≥10元，每笔将产生0.2%的提现手续费。</p>
            <div class="card" @click="selectBank">
                <img src=""/>
                <div class="cardName">
                    <span class="repayment">工商银行（1918）</span>
                    <!-- <em>单笔金额≤5万元，单日金额≤5万元</em> -->
                </div>
                <em>＞</em>
            </div>
            <div class="money">
                <span>¥</span>
                <input type="number" @input="inspect" pattern="[0-9]" v-model="amt" placeholder="请输入大于等于100的金额"/>
                <strong>全部转出</strong>
            </div>
            <div class="cost">提示：本次提现手续费<span>xx</span>元，实际到账金额<span>xx</span>元。</div>
            <a href="http://proxy.xiaomuyu.net:8704/jbj/listBanks">支持的银行卡和限额</a>
            <button v-show="!haveNum">下一步</button>
            <button class="click-btn" v-show="haveNum" @click="next">下一步</button>
        </div>
        <div class="bank-mask" @click="closeBank" v-show="selectCard"></div>
        <!--选择提现方式-->
        <div v-show="next" class="bank-slt">
            <h3 class="bank-nav">选择支付方式<span class="close-btn" @click="closeBank"></span></h3>
            <ul>
                
                <li>
                    <img src="../../../static/images/icon_bank_logo@2x.png" class="bankImg">
                    <div class="bank-detail">
                        <span class="bank-name">中国工商银行储蓄卡<i>(4488)</i></span>
                        <p>银行单笔限额10000.00元</p>
                    </div>
                    <i class="correct"></i>
                </li>

                <li>
                    <img src="../../../static/images/icon_bank_logo@2x.png" class="bankImg">
                    <div class="bank-detail">
                        <span class="bank-name">中国工商银行储蓄卡<i>(4488)</i></span>
                        <p>银行单笔限额10000.00元</p>
                    </div>
                    <i class="correct"></i>
                </li>

                <li class="active">
                    <img src="../../../static/images/icon_zhye@3x.png" class="bankImg">
                    <div class="bank-detail">
                        <span class="bank-name">账户余额</span>
                        <p>10000.00元</p>
                    </div>
                    <i class="correct"></i>
                </li>

                <li>
                    <img src="../../../static/images/icon_tjyhk@2x.png" class="bankImg">
                    <div class="add-card">添加银行卡支付</div>
                </li>
            </ul>
        </div>
        <div class="results" v-show="results">
            <img v-show="!success" src="../../../static/images/icon_ok@2x.png"/>
            <img v-show="success" src="../../../static/images/icon_refuse@2x.png"/>
            <h2 v-show="!success">提现成功</h2>
            <h2 v-show="success">提现失败</h2>
            <p v-show="success">展示提现失败的原因</p>
            <p v-show="!success">到账银行：工商银行 提现金额：1004.41元</p>
            <div class="again" v-show="!success">
                <a href="home.html">返回首页</a>
            </div>
            <div class="again" v-show="success">
                <a href="recharge.html">返回重试</a>
                <a class="look" href="home.html">返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
import '../../common/css/recharge.less';
export default {
    data () {
        return {
            amount:true,
            amt:'',
            code:'',
            haveNum: false,
            telphone: false,
            codeNum: false,
            haveCode: false,
            success:false,
            results:false,
            choose:true,
            selectCard:false
        }
    },
    methods:{
        trim (str) {
            return str.replace(/(^\s*)|(\s*$)/g,"");
        },
        inspect () {
            let _this = this;
            // 判断输入的是数字，显示手续费、实际支付金额和下一步按钮成可点击
            if(Number(_this.trim(_this.amt))!=NaN){
                _this.haveNum = true;
            }else{
                alert("请输入正确的数字")
            }
        },
        next () {
            this.amount = false
            this.results = true;
            let _this = this;
            if(Number(_this.trim(_this.amt))<100){
                alert("充值金额大于或等于100元")
            }else{
                
            }
            
        },
        codeCheck () {
            let _this = this;
            // 判断输入的是数字，显示手续费、实际支付金额和下一步按钮成可点击
            if(Number(_this.trim(_this.code))!=NaN){
                _this.haveCode = true;
            }else{
                alert("请输入正确的验证码！")
            }
        },
        chengeTel () {

        },
        countDown () {

        },
        chooseCard () {
            this.next = true;
        },
        selectBank(){
            this.selectCard = true;
            document.querySelector('.bank-slt').className = 'bank-slt showBank';
        },

        closeBank(){
            this.selectCard = false;
            document.querySelector('.bank-slt').className = 'bank-slt';
        },

        //选择银行卡
        selectPay(){
            let bankSlt = document.querySelector('.bank-slt');
            let aLi = bankSlt.querySelectorAll('li');
            let _this = this;

            aLi.forEach(function(item,index){
                item.addEventListener('click', function(){

                    if(index == aLi.length - 1){
                        console.log("添加银行卡");
                    }

                    aLi.forEach(function(item){
                        item.className = ''
                    });

                    _this.closeBank()
                    item.className = 'active';
                }, false);
            });
        }
    },
    mounted() {
        this.selectPay();
    }
}
</script>
