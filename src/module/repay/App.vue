<template>
    <div class="content-pro" id="process">
        <!-- <Menu>
            <span class="menu_nav" name="title">立即还款</span>
        </Menu> -->
        <div class="repaybg"></div>
        <div class="small-txt" v-show="nextProcess">注意：银行卡仅支持储蓄卡还款。</div>
        <div class="repay-detail" v-show="nextProcess">
            <div class="repay-bank" @click="selectCard = true">
                <template v-if="payType == 'A'"><img src="../../../static/images/icon_zhye@3x.png"> 账户余额</template>
                <template v-if="payType == 'B'"><img :src="bankLogo"> {{bankName}} ({{cardEndNum}})</template>
                <i class="arrow_right"></i>
            </div>
            <div class="repay-money">
                <span>&yen;</span>
                {{orderAmount}}
            </div>
        </div>

        <!--去除-->
        <!--<div class="no-repport">暂不支持余额还款</div>-->
        <!--<button class="repay-btn2" v-show="nextProcess" @click="nextClick">下一步</button>-->
        <div class="repay_small">本次还款手续费<span>{{serviceFee}}</span>元，实扣金额<span>{{orderAmount}}</span>元</div>
        <button class="repay-btn2" @click="repaySure">确认</button>

        <!--去除-->
        <!--
        <div class="repay_detail" v-show="!nextProcess">
            <div class="repay-hk">
                <div class="hk-ms">还款金额(元)</div>
                <div class="hk-money">{{orderAmount}}</div>
            </div>

            <div class="hk-list">
                <div><span>订单编号</span><i>{{orderId}}</i></div>
                <div>
                    <span>银行名称</span>
                    <i>
                        <template v-if="payType == 'A'">账户余额</template>
                        <template v-if="payType == 'B'">{{bankName}}</template>
                    </i>
                </div>
                <div><span>银行卡号</span><i>{{bankCard}}</i></div>
                <div><span>姓名</span><i>{{cardName}}</i></div>
            </div>

            <div class="hk-list">
                <div>
                    <span>预留电话</span>
                    <h5 v-show="showTel">{{bankPhone}}</h5>
                    <input type="number" @input="chkVal" v-show="!showTel" v-model="bankPhone"> 
                    <em @click="showTel = false">修改电话</em>
                </div>
                <div>
                    <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="number" v-model="hkcode" @input="chkVal" placeholder="输入验证码">
                    <em class="getcode" v-show="!isSms" @click="getSms">获取验证码</em> 
                    <em class="getcode orange" v-show="isSms">{{getNumber}}s</em> 
                </div>
            </div>

            <button class="repay-btn3" v-show="!showBtn">确认还款</button>
            <button class="repay-btn2" @click="sureRepay" v-show="showBtn">确认还款</button>
        </div>
        -->

        <div class="bank-mask" v-show="selectCard" @click="closeBank"></div>
        <!--选择还款方式-->
        <div class="bank-slt" id="bank_list" :class="{'showBank': selectCard}">
            <h3 class="bank-nav">选择支付方式<span class="close-btn" @click="closeBank"></span></h3>
            <ul v-show="cardList.length > 0">
                
                <li v-for="item in cardList"  :class="{'active': isClick == false && payType=='B' && item.isDefault == 'Y'}" :data-bankid="item.id" :data-endnum="item.bankCard" :data-bankimg="item.bankImag" :data-bankname="item.bankName" :data-id="item.realBankCard">
                    <img :src="item.bankImag" class="bankImg">
                    <div class="bank-detail">
                        <span class="bank-name">{{item.bankName}}<i>({{item.bankCard}})</i></span>
                        <p>银行单笔限额{{item.perTransactionLimit}}元</p>
                    </div>
                    <i class="correct"></i>
                </li>
            </ul>

            <template v-if="!adequate">
                <a class="addCardPay" href="bindCard.html">
                    <img src="../../../static/images/more_add@2x.png" class="bankImg">
                    <div class="add-card">添加银行卡支付</div>
                </a>

                <ul>
                    <li class="account_my" :class="{'active': payType=='A'}">
                        <img src="../../../static/images/icon_zhye@3x.png" class="bankImg">
                        <div class="bank-detail">
                            <span class="bank-name">账户余额</span>
                            <p>{{balance.number}}元</p>
                        </div>
                        <i class="correct"></i>
                    </li>
                </ul>
            </template>


            <template v-if="adequate">
                <ul>
                    <li class="account_my" :class="{'active': payType=='A'}">
                        <img src="../../../static/images/icon_zhye@3x.png" class="bankImg">
                        <div class="bank-detail">
                            <span class="bank-name">账户余额</span>
                            <p>{{balance.number}}元</p>
                        </div>
                        <i class="correct"></i>
                        <a href="javascript:;" class="mask-bank"></a>
                    </li>
                </ul>
                <a class="addCardPay" href="bindCard.html">
                    <img src="../../../static/images/more_add@2x.png" class="bankImg">
                    <div class="add-card">添加银行卡支付</div>
                </a>
            </template>

                

            
        </div>


        <!--还款成功/失败信息-->
        <div class="repay-mes" v-show="result"><!--v-show="result"-->
            <img v-show="faild" src="../../../static/images/more_add@2x.png">
            <img v-show="!faild" src="../../../static/images/icon_ok@2x.png">

            <h2 v-show="faild">
                <template v-if="deal">还款失败</template>
                <p>{{faildMes}}</p>
            </h2>

            <h2 v-show="!faild">
                还款成功，为信用点赞
                <p>还款方式：{{bankName}} 还款金额：{{tradeAmount}}元</p>
            </h2>

            <a v-show="faild" class="repay-btn5" href="orderDetail.html">返回重试</a>
            <!-- <a href="javascript:;" @click="download" v-show="faild" class="repay-btn6">下载小木鱼APP查看订单</a>
            <a href="javascript:;" @click="download" v-show="!faild" class="repay-btn5">下载小木鱼APP再借一笔</a> -->
        </div>
        <div id="xdy_toast" class="xdy_toast" v-show="unOpen"></div>
    </div>
</template>

<script>
// import xdy from '../js/xdy.js';
// import Menu from './menu.vue'
export default {
    components: {
        Menu
    },
    data (){
        return {
            nextProcess: true,
            hktel: '',
            hkcode: '',
            showTel: true,
            showBtn: false,
            unOpen: false,
            isSms: false,
            timer: null,
            getNumber: 60,
            faild: false,
            result: false,
            bankImg: '',
            orderAmount: '',
            payType: '',
            bankLogo: '',
            bankName: '',
            sysSeqId: '',
            bankId: '',
            orderId: '',
            bankPhone: '',
            bankCard: '',
            cardName: '',
            faildMes: '',
            tradeAmount: '',
            deal: true,
            hkuan: true,
            selectCard: false,
            serviceFee: 0,
            cardList: [],
            repayBankCard: '',
            cardEndNum: '',
            balance: {
                number: 0
            },
            adequate: true,
            isClick: false 
        }
    },

    methods: {
        trim (str) {
            return str.replace(/(^\s*)|(\s*$)/g,"");
        },

        chkVal () {
            let chkCode = this.trim(this.hkcode);
            let tel = this.trim(this.bankPhone);

            if(tel != '' && chkCode != ''){
                this.showBtn = true;
            } else {
                this.showBtn = false;
            }
        },


        //选择银行卡
        closeBank () {
            this.selectCard = false;
        },  

        //确认还款
        repaySure () {
            let _this = this;
            xdy.ajax({
                url: '/proxy/api/order/orderLog/confirmDirect',
                method: 'POST',
                params: {
                    token: window.localStorage.getItem('token'),
                    userId: window.localStorage.getItem('userId'),
                    sysSeqId: _this.sysSeqId,
                    payType: _this.payType,
                    bankId: _this.bankId
                },
                success: function(res){
                    _this.result = true;
                    if(res.data.respCode == '000000'){
                        _this.faild = false;
                        _this.bankName = res.data.data.bankName;
                        _this.tradeAmount = res.data.data.tradeAmount;
                    } else {
                        _this.faild = true;
                        _this.faildMes = res.data.respMsg;
                    }
                }
            });

            _hmt.push(['_trackEvent', "短信链接还款", "repayment"]);
        },


        download: function(){
            var _this = this;
            $.ajax({
                url:'/proxy/api/proxy/dl/getAndroidAppUrl?channel=M214',
                type:'GET',
                success:function(s){
                    if(s.respCode=="000000"){
                        if(ismobile()=="0"){
                            location.href="https://itunes.apple.com/cn/app/id1395223757?mt=8";
                        } else if(ismobile()=="1"){
                            location.href=s.data;
                        }
                    }     
                }
            });
        },



        //渲染卡列表
        renderCardList () {
            let _this = this;
            xdy.ajax({
                url: '/proxy/api/user/jbj/findBankCardByUserId',
                method: 'POST',
                params: {
                    token: window.localStorage.getItem('token'),
                    userId: window.localStorage.getItem('userId')
                },
                success: function(res){
                    if(res.data.respCode == '000000'){
                        _this.cardList = res.data.data;
                    }
                }
            });
        },

        //渲染余额
        renderYY () {
            let _this = this;
            xdy.ajax({
                url: '/proxy/api/proxy/jbj/getUserDetail',
                method: 'POST',
                params: {
                    token: window.localStorage.getItem('token'),
                    userId: window.localStorage.getItem('userId'),
                    userType: 'B'
                },
                success: function(res){
                    if(res.data.respCode == '000000'){
                        _this.balance.number = res.data.accountBalance;
                        if(parseFloat(res.data.accountBalance) >= _this.orderAmount){
                            _this.adequate = true;
                        } else {
                            _this.adequate = false;
                        }
                    }
                }
            });
        }, 

        toast (msg) {
            let _this = this;
            this.unOpen = true;
            document.getElementById('xdy_toast').innerHTML = msg;
            setTimeout(function(){
                _this.unOpen = false;
            },1500);
        },

        init () {

            let _this = this;
            this.orderId = this.$route.params.orderId;

            xdy.ajax({
                method: 'POST',
                url: '/proxy/api/order/orderLog/begin',
                params: {
                    token: window.localStorage.getItem('token'),
                    payerUserId: window.localStorage.getItem('userId'),
                    payerUserType: 'B',
                    orgOrderId: _this.$route.params.orderId,
                    orderType: 'HK'
                },
                success: function(res){
                    if(res.data.respCode == '000000'){
                        _this.bankImg = res.data.data.accountLogo;
                        _this.orderAmount = res.data.data.orderAmount;
                        _this.payType = res.data.data.payType;
                        _this.bankImg = res.data.data.accountLogo;
                        _this.bankLogo = res.data.data.bankLogo;
                        _this.bankName = res.data.data.bankName;
                        _this.sysSeqId = res.data.data.sysSeqId;
                        _this.bankId = res.data.data.bankId;
                        _this.serviceFee = res.data.data.serviceFee;
                        _this.balance.number = res.data.data.accountBalance;
                        _this.cardEndNum = res.data.data.cardEndNum;
                    }
                    _this.renderYY();
                    _this.listEvent();
                }
            });
        
        },


        listEvent(){
            let _this = this;
            let aLi = $('#bank_list').find('li');

            aLi.each(function(index,item){
                $(item).on("click",function(){
                    _this.isClick = true;
                    if($(this).hasClass('account_my')){
                        if(_this.orderAmount > parseFloat(_this.balance.number)){
                            _this.$toast.center("余额不足");
                            return false;
                        }  else {

                            aLi.each(function(index,item){
                                if(item.className.indexOf('account_my') != -1){
                                    aLi[index].className = 'account_my';
                                } else {
                                    aLi[index].className = '';
                                }
                            });

                            $('this').addClass('active');
                            _this.payType = 'A';
                            _this.bankId = '';

                            _this.closeBank();
                        }
                    } else {

                        aLi.each(function(index,item){
                            if(aLi[index].className.indexOf('account_my') != -1){
                                aLi[index].className = 'account_my';
                            } else {
                                aLi[index].className = '';
                            }
                        });
                            

                        $(this).addClass('active');
                        _this.repayBankCard = $(this).data('id');
                        _this.cardEndNum = $(this).data('endnum');
                        _this.bankName =  $(this).data('bankname');
                        _this.bankLogo = $(this).data('bankimg');
                        _this.payType = 'B';
                        _this.bankId = $(this).data('bankid');
                        
                        _this.closeBank();
                    }
                });
            });
        }
       
    },

    mounted () {
        this.init();
        this.renderCardList();

        let process = document.getElementById('process');
        let clientHeight = document.documentElement.clientHeight;
        process.style.height = clientHeight + 'px';
        
    }
}
</script>



<style lang="less" scoped>
@import url(../../common/css/repay.less);
</style>

