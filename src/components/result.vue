<template>
    <div class="result">
        <div class="loan_result">借款结果</div>
        <div class="small-text">
            <img v-show="refuse" src="../../static/images/icon_refuse@2x.png">
            <img v-show="!refuse" src="../../static/images/icon_ok@2x.png">
            <h3 v-show="refuse">这么任性，钱都不要</h3>
            <h5 v-show="refuse">{{message}}</h5>
            <div class="success"  v-show="!refuse">
                <div class="detail">
                    <h4>到账详情</h4>
                    <div class="process">
                        <div class="iconText">
                            <span>发起借款申请</span>
                            <h6>银行处理中</h6>
                            <span>预计10-11 14:14前到账</span>
                            <span>到账成功</span>
                        </div>
                        <div class="iconLine">
                            <em></em>
                            <strong></strong>
                            <img src="../../static/images/round_blue@2x.png"/>
                            <i></i>
                            <span></span>
                        </div>
                    </div>
                </div>
                
                <ul>
                    <li>
                        <span>借款金额</span>
                        <em>¥1500.00</em>
                    </li>
                    <li>
                        <span>到账金额</span>
                        <em>¥1200.00</em>
                    </li>
                    <li>
                        <span>到账银行</span>
                        <em>招商银行 尾号8899</em>
                    </li>
                </ul>
            </div>
            <div class="small-btn">
                <slot name="btn-1"></slot>
                <slot name="btn-2"></slot>
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

