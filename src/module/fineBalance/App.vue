<template>
    <div id="app">
        <div class="time"><button id='demo2' class="btn mui-btn mui-btn-block">2018年06月</button><img src="./images/arrow@2x.png"/></div>
        <div class="main" v-show="!noData">
            <div class="list">
                <img src="./images/icon2_chu1@2x.png"/>
                <div class="left">
                    <div class="second">
                        <h2>余额提现</h2>
                        <p>2018.06.21 13:14:25</p>
                    </div>
                    <div class="state chu">-1000.00</div>
                </div>
            </div>
            <div class="list">
                <img src="./images/icon2_ru@2x.png"/>
                <div class="left">
                    <div class="second">
                        <h2>余额充值</h2>
                        <p>2018.06.21 13:14:25</p>
                    </div>
                    <div class="state ru">+1000.00</div>
                </div>
            </div>
        </div>
        <div class="none" v-show="noData">
            <img src="./images//icon_empty@2x.png"/>
            <p> 暂无明细呦!</p>
        </div>
    </div>
</template>
<script>
import '../../common/css/fineBalance.less';
export default {
    data () {
        return {
            noData: false
        }
    }
}
</script>
