<template>
    <div id="app">
        <div class="result">
            <div class="small-text">
                <img v-show="refuse" src="../../static/images/icon_refuse@2x.png">
                <img v-show="!refuse" src="../../static/images/icon_ok@2x.png">
                <h3 v-show="refuse">这么任性，钱都不要</h3>
                <h5 v-show="refuse">{{message}}</h5>
                <div class="success"  v-show="!refuse">
                    <h4>到账详情</h4>
                    <div class="">
                        
                    </div>
                </div>
                <div class="small-btn">
                    <slot name="btn-1"></slot>
                    <slot name="btn-2"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../common/css/result.less';
    
    export default {
        props: ['refuse','message']
    }
</script>

