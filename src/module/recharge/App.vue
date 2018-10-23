<template>
    <div id="app">
        <div class="amount" v-show="amount">
            <navigation>
                <a href="javascript:window.history.go(-1);" slot="navigation_goback" class="navigation_goback"></a>
                <span slot="navigation_title" class="navigation_title">充值</span>
            </navigation>
            <p>注意：充值金额需大于等于100元，每笔将产生{{fee}}%的充值手续费。</p>
            <div class="card" @click="selectBank">
                <img :src="bankLogo"/>
                <div class="cardName">
                    <span>{{bankName}}</span>
                    <em>单笔金额≤{{perDayLimit}}万元，单日金额≤{{perTransactionLimit}}万元</em>
                </div>
                <em>＞</em>
            </div>
            <div class="money">
                <span>¥</span>
                <input type="text" id="bindcard" readonly v-model="tradeAmount" placeholder="请输入大于等于100的金额"/>
            </div>
            <div class="cost">提示：本次充值手续费<span>{{serviceFee}}</span>元，实际支付金额<span>{{actualAmount}}</span>元。</div>
            <a href="http://proxy.xiaomuyu.net:8704/jbj/listBanks">支持的银行卡和限额</a>
            <button v-show="!haveNum">确认</button>
            <button class="click-btn" v-show="haveNum" @click="next">确认</button>
        </div>
        <div class="bank-mask" @click="closeBank" v-show="selectCard"></div>
        <!--选择充值方式-->
        <div class="bank-slt">
            <h3 class="bank-nav">选择支付方式<span class="close-btn" @click="closeBank"></span></h3>
            <ul id="bank_list">
                <li v-for="item in bankList" :class="{'active':item.isDefault =='Y'}" :data-bankid="item.id" :data-bankname="item.bankName" :data-banklogo="item.bankImag">
                    <img :src="item.bankImag" class="bankImg">
                    <div class="bank-detail">
                        <span class="bank-name">{{item.bankName}}<i>({{item.bankCard}})</i></span>
                        <p>银行单笔限额{{item.perDayLimit}}元，单日限额{{item.perTransactionLimit}}元</p>
                    </div>
                    <i class="correct"></i>
                </li>
            </ul>
            <a class="add" :href="addCard">
                <img src="../../../static/images/icon_tjyhk@2x.png" class="bankImg">
                <div class="add-card">
                    <span>添加银行卡支付</span>
                    <p>该交易仅支持储蓄卡</p>
                </div>
            </a>
            
        </div>
        <div class="results" v-show="results">
            <navigation>
                <!-- <a href="javascript:window.history.go(-1);" slot="navigation_goback" class="navigation_goback"></a> -->
                <span slot="navigation_title" class="navigation_title">交易结果</span>
            </navigation>
            <img v-show="!success" src="../../../static/images/icon_ok@2x.png"/>
            <img v-show="success" src="../../../static/images/icon_refuse@2x.png"/>
            <h2 v-show="!success">充值成功</h2>
            <h2 v-show="success">充值失败</h2>
            <p v-show="success">{{result}}</p>
            <p v-show="!success">到账银行：{{bankAccount}} 充值金额：{{bankAmt}}元</p>
            <div class="again" v-show="!success">
                <a :href="myCenter">返回我的</a>
            </div>
            <div class="again" v-show="success">
                <a :href="recharge">返回重试</a>
            </div>
        </div>
    </div>
</template>

<script>
import '../../common/css/recharge.less';
import navigation from '../../components/navigation.vue';
import xmy from '../../../static/js/xmy.js';
export default {
    components: {
        navigation: navigation
    },
    data () {
        return {
            amount:true,
            code:'',
            haveNum: false,
            telphone: false,
            codeNum: false,
            haveCode: false,
            success:false,
            results:false,
            choose:true,
            selectCard:false,
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            bankId:'',
            tradeAmount:'',
            serviceFee:'',
            actualAmount:'',
            bankLogo:'',
            bankName:'',
            balance:'',
            bankList:[],
            fee:'',
            result:'',
            homeLink:'',
            recharge:'',
            addCard:'',
            perDayLimit:'',
            perTransactionLimit:'',
            bankAccount:'',
            bankAmt:'',
            myCenter:'/api/static/xmy/module/myCenter.html?token='+xmy.getQueryString('token')+'&userId='+xmy.getQueryString('userId')
        }
    },
    methods:{
        trim (str) {
            return str.replace(/(^\s*)|(\s*$)/g,"");
        },
        // 输入数字，充值手续费和到账金额获取
        inspect () {
            let _this = this;
            // 判断输入的是数字，显示手续费、实际支付金额和下一步按钮成可点击
            if(Number(_this.trim(_this.tradeAmount))!=NaN){
                _this.haveNum = true;
                $.ajax({
                    type: "POST",
                    url: "/gateway/api/order/rechargeOrder/calc",
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        tradeType: "CZ",
                        tradeAmount: _this.tradeAmount,
                        userType: "B"
                    },
                    success: function(res){
                        if(res.respCode == "000000"){
                            _this.actualAmount = res.data.actualAmount;
                            _this.serviceFee = res.data.serviceFee;

                        }
                    }
                })
            }else{
                alert("请输入正确的数字")
            }
        },
        // 确认充值，接口等待小志
        next () {
            let _this = this;
            _this.haveNum = false;
            $.ajax({
                url: '/gateway/api/order/rechargeOrder/confirm',
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B",
                    tradeType: "CZ",
                    tradeAmount: _this.tradeAmount,
                    bankId: _this.bankId,
                    serviceFee: _this.serviceFee,
                    actualAmount: _this.actualAmount
                },
                success: function(res){
                    if(res.respCode === '000000'){
                        _this.amount = false
                        _this.results = true;
                        _this.bankAccount = res.data.type;
                        _this.bankAmt = res.data.amt;
                    }else{
                        _this.amount = false
                        _this.results = true;
                        _this.success = true;
                    }
                    _this.result = res.respMsg;
                    _this.recharge = "/api/static/xmy/module/recharge.html?userId="+_this.userId+'&token='+_this.token;
                }
            })
            
        },
        // 更换支付方式
        selectBank(){
            this.selectCard = true;
            document.querySelector('.bank-slt').className = 'bank-slt showBank';
        },
        // 关闭选择充值方式
        closeBank(){
            this.selectCard = false;
            document.querySelector('.bank-slt').className = 'bank-slt';
        },
        //选择银行卡
        selectPay(){
            let _this = this;
            let aLi = $('#bank_list').find('li');
            aLi.each(function(index,item){
                $(item).on("click",function(){
                    aLi.each(function(index,item){
                        aLi[index].className = '';    
                    });
                    $(this).addClass('active');
                    _this.bankId = $(this).data("bankid");
                    _this.bankLogo = $(this).data("banklogo");
                    _this.bankName = $(this).data("bankname");
                    _this.closeBank();
                });
            });
        },
        // 得到银行卡列表
        getBankList () {
            let _this = this;
            _this.addCard = "bindCard.html?userId="+_this.userId+'&token='+_this.token;
            $.ajax({
                type: "POST",
                url: "/gateway/api/proxy/jbj/reCharge",
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B"
                },
                success: function(res){
                    if(res.respCode == "000000"){
                        _this.bankList = res.bankList;
                        for(var i=0;i<res.bankList.length;i++){
                            if(res.bankList[i].isDefault == 'Y'){
                                _this.bankLogo = res.bankList[i].bankImag;
                                _this.bankName = res.bankList[i].bankName;
                                _this.bankId = res.bankList[i].id;
                                _this.balance = res.bankList[i].accountBalance;
                                _this.perDayLimit = res.bankList[i].perDayLimit/10000;
                                _this.perTransactionLimit = res.bankList[i].perTransactionLimit/10000;
                            }
                        }
                        _this.$nextTick(function(){
                            _this.selectPay();
                        });
                        
                    }
                    
                }
            })
        },
        // 得到手续费费率
        getFee () {
            let _this = this;
            $.ajax({
                url: "/gateway/api/order/get/fee",
                type: "POST",
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B",
                    tradeType: "CZ"
                },
                success: function(res){
                    if(res.respCode == "000000"){
                        _this.fee = res.data*100;
                    }
                }
            })
        }
    },
    mounted() {
        let _this = this;
        _this.getBankList();
        _this.getFee();
        $('#bindcard').on('click', function () {
            $('#bindcard').NumberKeypad({
                type: 'number',
                zIndex: 1001,
                callback: function (elem, number) {
                    _this.tradeAmount = number;
                    _this.inspect();
                    elem.close();
                }
            });
        });
        // $.ajax({
        //     url: '/gateway/api/proxy/jbj/getUserDetail',
        //     type: 'post',
        //     data: {
        //         token: _this.token,
        //         userId: _this.userId,
        //         userType: "B"
        //     },
        //     success: function(res){
        //         if(res.respCode == "000000"){
        //             _this.bankLogo = res.userBankInfo.bankImag;
        //             _this.bankName = res.userBankInfo.bankName;
        //             _this.bankId = res.userBankInfo.id;
        //             _this.balance = res.accountBalance;
        //             _this.perDayLimit = res.userBankInfo.perDayLimit/10000;
        //             _this.perTransactionLimit = res.userBankInfo.perTransactionLimit/10000;
        //         }
        //     }
        // });
    }
}
</script>
