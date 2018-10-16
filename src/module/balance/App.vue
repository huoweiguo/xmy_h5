<template>
    <div id="app">
        <div class="text">
            <span>余额</span>
            <img src="./images/icon_eye.png" v-show="showAmt" @click="lookAmt"/>
            <img src="./images/icon_eye_close.png" v-show="!showAmt" @click="lookAmt"/>
        </div>
        <div class="amt" v-show="showAmt">0.00</div>
        <div class="amt" v-show="!showAmt">****</div>
        <a class="recharge" href="recharge.html">充值</a>
        <a class="putForward" href="putForward.html">提现</a>
    </div>
</template>
<script>
import '../../common/css/balance.less';
    
export default {
    data () {
        return {
            showAmt: true
        }
    },
    methods:{
        lookAmt: function(){
            this.showAmt = !this.showAmt;
        }
    }
}
</script>
