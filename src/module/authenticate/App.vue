<template>
    <div>
        <div class="identi-banner">
            <div class="banner-txt1">当前可借额度(元)</div>
            <div class="banner-je">2000～50000</div>
            <div class="banner-txt1">完成以下认证项，即可申请借款</div>
        </div>

        <!--1已认证，2认证中，3未认证，4认证失效，5认证失败-->
        <div class="identi-list">
            <a href="#">
                <i class="id_icon1"></i>实名认证
                <img v-if="status == 1" src="./images/taps_certified@2x.png">
                <img v-if="status == 2" src="./images/taps_certification@2x.png">
                <img v-if="status == 3" src="./images/taps_uncertified @2x.png">
                <img v-if="status == 4" src="./images/taps_uncertified@2x.png">
                <img v-if="status == 5" src="./images/taps_fied@2x.png">
            </a>
            <a href="#">
                <i class="id_icon2"></i>手机认证
                <img v-if="status2 == 1" src="./images/taps_certified@2x.png">
                <img v-if="status2 == 2" src="./images/taps_certification@2x.png">
                <img v-if="status2 == 3" src="./images/taps_uncertified @2x.png">
                <img v-if="status2 == 4" src="./images/taps_uncertified@2x.png">
                <img v-if="status2 == 5" src="./images/taps_fied@2x.png">
            </a>
            <a href="#">
                <i class="id_icon3"></i>基础信息
                <img v-if="status3 == 1" src="./images/taps_certified@2x.png">
                <img v-if="status3 == 2" src="./images/taps_certification@2x.png">
                <img v-if="status3 == 3" src="./images/taps_uncertified @2x.png">
                <img v-if="status3 == 4" src="./images/taps_uncertified@2x.png">
                <img v-if="status3 == 5" src="./images/taps_fied@2x.png">
            </a>
            <a href="#">
                <i class="id_icon4"></i>支付宝
                <img v-if="status4 == 1" src="./images/taps_certified@2x.png">
                <img v-if="status4 == 2" src="./images/taps_certification@2x.png">
                <img v-if="status4 == 3" src="./images/taps_uncertified @2x.png">
                <img v-if="status4 == 4" src="./images/taps_uncertified@2x.png">
                <img v-if="status4 == 5" src="./images/taps_fied@2x.png">
            </a>
            <a href="#">
                <i class="id_icon5"></i>信用卡
                <img v-if="status5 == 1" src="./images/taps_certified@2x.png">
                <img v-if="status5 == 2" src="./images/taps_certification@2x.png">
                <img v-if="status5 == 3" src="./images/taps_uncertified @2x.png">
                <img v-if="status5 == 4" src="./images/taps_uncertified@2x.png">
                <img v-if="status5 == 5" src="./images/taps_fied@2x.png">
            </a>
        </div>

        <div class="identi-foot">
            <div class="small-text">为保证成功借款，请保证以上认证的真实性哟～</div>
            <div class="contact">
                <a href="#" class="kf"><img src="./images/icon_lxkf@2x.png">联系客服</a>
                <button class="idt_btn1">立即申请</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                status: 1,
                status2: 2,
                status3: 3,
                status4: 4,
                status5: 5
            }
        }
    }    
</script>

<style lang="less" scoped>
    @import '../../common/css/authenticate.less';
</style>