<template>
    <div class="main">
        <div class="none" v-show="noCard">
            <img src="../../../static/images/icon_bank_card@2x.png"/>
            <p>还没有银行卡哟！</p>
        </div>
        <ul>
            <li v-for="(item,index) in cardList" :key="index" :data-bankid="item.id" :data-isdefault="item.isDefault" @click="operationCard">
                <img :src="item.bankImag"/>
                <div class="cardContent">
                    <h2><strong>{{item.bankName}}</strong><span v-show="item.isDefault == 'Y'" >默认</span></h2>
                    <h3>储蓄卡</h3>
                    <h4><span>****</span><span>****</span><span>****</span><em>{{item.bankCard}}</em></h4>
                </div>
            </li>
        </ul>
        <div class="addCard">
            <a :href="bindCard">
                <img src="../../../static/images/more_add@2x.png"/>
                <span>添加银行卡</span>
                <img class="go" src="../../../static/images/rightarrow_1f.png"/>
            </a>
        </div>
        <!-- <div class="tip">还款时，将优先从默认银行卡扣款，如还款失败可尝试更换默认银行卡后再试。</div> -->
        <div class="body-mask" v-show="isChk"></div>
        <div class="operation" :class="{'showChange': isChk}">
            <div class="list" @click="relieve">解绑绑定银行卡</div>
            <div class="list" @click="major" v-show="isMain">设置默认银行卡</div>
            <div class="cancel" @click="abolish">取消</div>
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
import xmy from '../../../static/js/xmy.js';
export default {
    data () {
        return{
            isChk:false,
            cardList: [],
            bindCard:'',
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            noCard:true,
            cardId:'',
            isDefault:'',
            isMain:true
        }
    },
    methods:{
        // 操作卡
        operationCard ($event) {
            let _this = this;
            _this.cardId = $event.path[2].dataset.bankid;
            _this.isDefault = $event.path[2].dataset.isdefault;
            if(_this.isDefault == "Y"){
                _this.isMain = false;
            }else{
                _this.isMain = true;
            }
            _this.isChk = true;
        },
        // 解除绑定银行卡
        relieve () {

        },
        // 设为主卡
        major () {

        },
        // 取消
        abolish () {
            this.isChk = false;
        }
    },
    mounted () {
            let _this = this;
            // 获取银行卡列表
            _this.bindCard = "bindCard.html?userId="+_this.userId+'&token='+_this.token;
            $.ajax({
                url: '/gateway/api/user/jbj/findBankCardByUserId',
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B"
                },
                success: function(res){
                    if(res.respCode == "000000"){
                        if(res.data.length==0){
                            _this.noCard = false;
                        }
                        _this.cardList = res.data;
                    }
                }
            });
        }
}
</script>
<style lang="less">
@import '../../common/css/bankCard.less';
</style>
