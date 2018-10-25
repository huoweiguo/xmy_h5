<template>
    <div id="app">
        <div class="circle_rotate">
            <div class="rotate_img"></div>
            <div class="computed_init">
                <p>智能计算您的额度</p>
                <span v-show="!com_result">计算中{{tickTime}}s</span>
                <div v-show="com_result" class="money_count">
                    <i>&yen;</i>
                    <div id="num-roll" class="num-roll"></div>
                </div>
            </div>
        </div>
        <div class="result_refuse" v-show="isRefuse">
            <p>提交失败，请重新提交！</p>
            <div class="btn">
                <a href="javascript:;" @click="gohome">返回首页</a>
                <span @click="reSubmit">重新提交</span>
            </div>
        </div>


        <div class="result" v-show="isResult">
            <div class="loan_result">借款结果</div>
            <div class="small-text">
                <img src="../../../static/images/icon_refuse@2x.png">
                <h3>{{refuse_reson}}</h3>
                <h5>{{refuse_msg}}</h5>
                <div class="small-btn">
                    <a href="/api/static/app_xmy/gohome" class="r-btn3">返回首页</a>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
    import '../../common/css/init.less';
    import xmy from '../../../static/js/xmy.js';
    
    export default {
        data () {
            return {
                timer: null,
                tickTime: 10,
                com_result: false,
                money: 0,
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId'),
                productId: xmy.getQueryString('productId'),
                productUserId: xmy.getQueryString('productUserId'),
                isRefuse: false,
                refuse_msg: '',
                refuse_reson: '',
                isResult: false,
                ajaxEV: null 
            }
        },

        methods: {
            cuntdown () {
                var _this = this;
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    if(_this.tickTime > 0){
                         _this.tickTime--;
                    }

                    if(_this.tickTime <= 0){
                        _this.isRefuse = true;
                        _this.ajaxEV.abort();
                    }
                },1000);
            },

            //计算后的额度显示效果
            scrollNumber () {
                var r1=new DigitRoll({
                    container:'#num-roll'
                });
                r1.roll(this.money);
            },

            verificationCredit() {
                let _this = this;
                _this.ajaxEV = $.ajax({
                    url: '/gateway/api/order/loan/verificationCredit?t='+(new Date()).getTime(),
                    type: 'POST',
                    data: {
                        token: _this.token,
                        borrowerId: _this.userId,
                        productId: _this.productId,
                        productUserId: _this.productUserId
                    },
                    success: function(res){
                        if(res.respCode == '000000'){

                            setTimeout(function() {
                                _this.money = res.loanExtend.limit;
                                _this.com_result = true;
                                clearInterval(_this.timer);
                                _this.scrollNumber();
                                _this.tickTime = 10;

                                setTimeout(function(){
                                    window.location.href = '/api/static/xmy/module/charge.html?token='+_this.token+'&userId='+_this.userId+'&productId='+_this.productId+'&productUserId='+_this.productUserId+'&publishOrderId='+res.publishOrderId;
                                },1500);

                            }, 1500);
                                                        
                            
                        } else {
                            setTimeout(function(){
                                clearInterval(_this.timer);
                                _this.tickTime = 10;
                                _this.isResult = true;
                                _this.refuse_msg = '小主别灰心，为您推荐更多借款产品';
                                _this.refuse_reson = res.respMsg;
                            },3000);
                        }
                    }
                });
            },
            
            //风控返回首页
            gohome () {
                var buriedNo = 'Risk_Return_Prod_' + this.productId;
                xmy.buried ({
                    token: _this.token,
                    userId: _this.userId,
                    buriedNo: buriedNo
                },function(){
                    window.location.href = '/api/static/app_xmy/gohome';
                });
            },

            //重新获取额度
            reSubmit () {
                var buriedNo = 'Risk_Submit_Prod_' + productId;
                var _this = this;
                xmy.buried({
                    token: _this.token,
                    userId: _this.userId,
                    buriedNo: buriedNo
                },function() {
                    _this.tickTime = 10;
                    _this.isRefuse = false;
                    _this.verificationCredit();
                });
            }
        },
        

        mounted() {
            
            //获取额度
            this.verificationCredit();

            //倒计时
            this.cuntdown();
        }
    }
</script>

