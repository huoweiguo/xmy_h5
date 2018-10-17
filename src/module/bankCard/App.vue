<template>
    <div class="main">
        <div class="none">
            <img src="../../../static/images/icon_bank_card@2x.png"/>
            <p>还没有银行卡哟！</p>
        </div>
        <ul>
            <li>
                <img src=""/>
                <div class="cardContent">
                    <h2><strong>工商银行</strong><span>默认</span></h2>
                    <h3>储蓄卡</h3>
                    <h4><span>****</span><span>****</span><span>****</span><em>3197</em></h4>
                </div>
            </li>
            <li>
                <img src=""/>
                <div class="cardContent">
                    <h2><strong>工商银行</strong></h2>
                    <h3>储蓄卡</h3>
                    <h4><span>****</span><span>****</span><span>****</span><em>3197</em></h4>
                </div>
            </li>
        </ul>
        <div class="addCard">
            <a href="bindCard.html">
                <img src="../../../static/images/more_add@2x.png"/>
                <span>添加银行卡</span>
                <img class="go" src="../../../static/images/rightarrow_1f.png"/>
            </a>
        </div>
        <!-- <div class="tip">还款时，将优先从默认银行卡扣款，如还款失败可尝试更换默认银行卡后再试。</div> -->
        <div class="body-mask" v-show="isChk"></div>
        <div class="operation" :class="{'showChange': isChk}">
            <div class="list">解绑绑定银行卡</div>
            <div class="list">设置默认银行卡</div>
            <div class="cancel">取消</div>
        </div>
        <div class="popup">
            <div class="inquiry">
                <h2>确认解除绑定？</h2>
                <p>解绑后，该银行卡将不再列表中展示，需重新绑定银行卡</p>
                <div class="btn">
                    <button class="cancelBtn">取消</button>
                    <button class="sureBtn">确定</button>
                </div>
            </div>
            <div class="notice">
                <h2>暂不支持解除</h2>
                <p>列表中至少保证有一张银行卡，不影响借款成功到账您的银行卡</p>
                <div class="btn">
                    <span>知道了</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return{
            isChk:false
        }
    }
}
</script>
<style lang="less">
@import '../../common/css/bankCard.less';
</style>
