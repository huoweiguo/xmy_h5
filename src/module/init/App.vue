<template>
    <div id="app">
        <div class="circle_rotate">
            <div class="computed_init">
                <p>智能计算您的额度</p>
                <span v-show="!com_result">计算中{{tickTime}}s</span>
                <div v-show="com_result" class="money_count">
                    <i>&yen;</i>
                    <div id="num-roll" class="num-roll"></div>
                </div>
            </div>
        </div>
        <div class="result">
            <p>提交失败，请重新提交！</p>
            <div class="btn">
                <a href="home.html">返回首页</a>
                <span>重新提交</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../common/css/init.less';
    
    export default {
        data () {
            return {
                timer: null,
                tickTime: 3,
                com_result: false,
                money: 1289
            }
        },

        methods: {
            cuntdown () {
                var _this = this;
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    if(_this.tickTime > 0){
                         _this.tickTime--;
                    } else {

                        _this.com_result = true;
                        _this.scrollNumber();
                        
                        clearInterval(_this.timer); 

                        setTimeout(function(){
                            location.href='/module/charge.html'
                        },1500);

                        
                        
                    }
                },1000);
            },

            //计算后的额度显示效果
            scrollNumber () {
                var r1=new DigitRoll({
                    container:'#num-roll'
                });
                r1.roll(this.money);
            }
        },

        mounted() {
            //倒计时
            this.cuntdown();
        }
    }
</script>

