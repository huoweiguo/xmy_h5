<template>
    <div>
        <div class="body-mask"></div>
        <navBar title="立即还款"></navBar>
        <h3 class="scrollText" v-show="next">注意：还款支持余额还款，银行卡仅支持储蓄卡还款。</h3>
        <div class="repay" v-show="next">
            <div class="select-bank" @click="selectBank">
                <img :src="bankIcon" class="bankIcon">
                <span class="bankName">中国银行<i>(1918)</i></span>
                <span class="bankSmall">快捷</span>
                <em class="right-arrow"></em>
            </div>
            <div class="bank-money"><span>&yen;</span>1003.84</div>
            <div class="bank-ts">提示：本次还款手续费<i>xx</i>元，实际支付金额<i>xx</i>元。</div>
        </div>

        <button class="next-btn" v-show="next" id="btnPassword">立即还款</button>


        <div class="bank-mask" @click="closeBank" v-show="selectCard"></div>
        <!--选择还款方式-->
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

        <!--还款信息-->
        <div class="repay_detail" v-show="!next">
            <div class="repay-hk">
                <div class="hk-ms">还款金额(元)</div>
                <div class="hk-money">{{order.amount}}</div>
            </div>

            <div class="hk-list">
                <div><span>订单编号</span><i>{{order.id}}</i></div>
                <div>
                    <span>银行名称</span>
                    <i>
                        <template v-if="order.payType == 'A'">账户余额</template>
                        <template v-if="order.payType == 'B'">{{order.bankName}}</template>
                    </i>
                </div>
                <div><span>银行卡号</span><i>{{order.bankCard}}</i></div>
                <div><span>姓名</span><i>{{order.cardName}}</i></div>
            </div>

            <div class="hk-list">
                <div>
                    <span>预留电话</span>
                    <h5 v-show="showTel">{{order.bankPhone}}</h5>
                    <input type="number" @input="chkVal" v-show="!showTel" v-model="order.bankPhone"> 
                    <em @click="showTel = false">修改电话</em>
                </div>
                <div>
                    <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="number" v-model="order.hkcode" @input="chkVal" placeholder="输入验证码">
                    <em class="getcode" v-show="!isSms" @click="getSms">获取验证码</em> 
                    <em class="getcode orange" v-show="isSms">{{getNumber}}s</em> 
                </div>
            </div>

            <div class="protocol"><label class="radio-chk" @click="agree" :class="{'active': isChk}">本人阅读并同意签署协议</label><a href="#">《银行卡用户服务协议》</a></div>

            <button class="repay-btn3" v-show="!showBtn">确认还款</button>
            <button class="repay-btn2" @click="sureRepay" v-show="showBtn">确认还款</button>
        </div>
    </div>
</template>

<script>
    import navBar from '../../components/nav.vue';
    import '../../common/css/repay.less';
    import xmy from '../../../static/js/xmy.js';
    export default {
        components: {
            navBar
        },

        data () {
            return {
                bankIcon: require('../../../static/images/icon_bank_logo@2x.png'),
                selectCard: false,
                next: true,
                showTel: true,
                isSms: false,
                getNumber: 60,
                showBtn: false, 
                isChk: true,
                timer: null,
                order: {
                    amount: 1120.84,
                    id: 'PL151185009670902300153306',
                    bankName: '中国工商银行',
                    payType: 'B',
                    bankCard: '6222 **** **** **** 390',
                    cardName: '*维国',
                    bankPhone: '18721686596',
                    hkcode: ''
                }
            }
        },

        methods: {
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
            },

            chkVal(){
                let hkcode = xmy.trim(this.order.hkcode),
                    bankPhone = xmy.trim(this.order.bankPhone);
                
                if(hkcode != '' && bankPhone != '' && this.isChk){
                    this.showBtn = true;
                } else {
                    this.showBtn = false;
                }
            },

            //获取验证码
            getSms(){
                let _this = this;
                this.isSms = true;
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    if(_this.getNumber <= 0){
                        _this.getNumber = 60;
                        _this.isSms = false;
                        clearInterval(_this.timer);
                    } else {
                        _this.isSms = true;
                        _this.getNumber--;
                    }
                },1000);
            },

            //是否同意借款协议
            agree(){
                this.isChk = !this.isChk;

                if(this.isChk == false){
                    this.showBtn = false;
                } else {
                    let hkcode = xmy.trim(this.order.hkcode),
                        bankPhone = xmy.trim(this.order.bankPhone);

                    if(hkcode != '' && bankPhone != ''){
                        this.showBtn = true;
                    }
                }
            },

            //确认还款
            sureRepay(){
                
            }
        },

        mounted() {
            this.selectPay();

            //立即还款
            $('#btnPassword').on('click', function () {
                $('#btnPassword').NumberKeypad({
                    random: true,
                    zIndex: 1001,
                    callback: function (elem, password) {
                        console.log('你的密码是：' + password);
                        elem.close();
                    }
                });
            });

        }
    }
</script>

