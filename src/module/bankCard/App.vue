<template>
    <div class="main">
        <navigation>
            <a href="/back/myCenter?href=return" slot="navigation_goback" class="navigation_goback"></a>
            <span slot="navigation_title" class="navigation_title">银行卡</span>
        </navigation>
        <div class="none" v-show="noCard">
            <img src="../../../static/images/icon_bank_card@2x.png"/>
            <p>还没有银行卡哟！</p>
        </div>
        <ul id="cardLi">
            <li v-for="(item,index) in cardList" :data-cardname="item.bankName" :data-realbankcard="item.realBankCard" :data-lastname="item.bankCard" :data-bankid="item.id" :data-isdefault="item.isDefault">
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
        <div class="popup" v-show="showTip">
            <div class="inquiry" v-show="success">
                <h2>{{question}}</h2>
                <p>{{makeSure}}</p>
                <div class="btn">
                    <button class="cancelBtn" @click="abolish">取消</button>
                    <button class="sureBtn" v-show="defaulted" @click="majorSure">确定</button>
                    <button class="sureBtn" v-show="clear" @click="relieveSure">确定</button>
                </div>
            </div>
            <div class="notice" v-show="showResult">
                <h2>{{resultTittle}}</h2>
                <p>{{resultReason}}</p>
                <div class="btn" @click="abolish">
                    <span>知道了</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navigation from '../../components/navigation.vue';
import xmy from '../../../static/js/xmy.js';
export default {
    components: {
        navigation: navigation
    },
    data () {
        return{
            isChk:false,
            cardList: [],
            bindCard:'',
            token: xmy.getQueryString('token'),
            userId: xmy.getQueryString('userId'),
            noCard: false,
            cardId:'',
            isDefault:'',
            isMain:true,
            realBankCard:'',
            showTip: false,
            success: false,
            question:'',
            cardName:'',
            makeSure:'',
            lastName:'',
            showResult:false,
            resultTittle:'',
            resultReason:'',
            defaulted:false,
            clear: false
        }
    },
    methods:{
        // 操作卡
        operationCard () {
            let _this = this;
            // _this.cardId = $event.path[2].dataset.bankid;
            // _this.isDefault = $event.path[2].dataset.isdefault;
            // _this.realBankCard =$event.path[2].dataset.realbankcard;
            // _this.cardName = $event.path[2].dataset.cardname;
            // _this.lastName = $event.path[2].dataset.lastname;
            if(_this.isDefault == "Y"){
                _this.isMain = false;
                _this.isChk = false;
                // 提示默认银行卡不可操作
                _this.showTip = true;
                _this.success = false;
                _this.showResult = true;
                _this.resultTittle = " 默认银行卡不可操作 请先更换默认卡"
                
            }else{
                _this.isMain = true;
                _this.isChk = true;
            }
        },
        // 解除绑定银行卡询问
        relieve () {
            let _this = this;
            _this.isChk = false;
            _this.clear = true;
            _this.defaulted = false;
            _this.success = true;
            _this.question = "确认解除绑定？";
            _this.makeSure = "您确定要把"+_this.cardName+"("+_this.lastName+") 的银行卡解除绑定，解绑后，该银行卡将不再列表中展示，需重新绑定银行卡？"
            _this.showTip = true;
        },
        // 确认解除绑定银行卡
        relieveSure () {
            let _this = this;
            $.ajax({
                url: '/gateway/api/order/unbindCard/direct?t='+(new Date()).getTime(),
                type: "post",
                data: {
                    userId: _this.userId,
                    token: _this.token,
                    bankId: _this.cardId
                },
                success:function(res){
                    if(res.respCode == "000000"){
                        _this.success = false;
                        _this.showResult = true;
                        _this.resultTittle = "已解除该银行卡的绑定";
                        // window.location.reload()
                    }else{
                        _this.success = false;
                        _this.showResult = true;
                        _this.resultTittle = "解除银行卡绑定失败"
                        _this.resultReason = res.respMsg;
                        // window.location.reload()
                    }
                }
            })
        },
        // 设为主卡询问
        major () {
            let _this = this;
            _this.isChk = false;
            _this.defaulted = true;
            _this.clear = false;
            _this.showTip = true;
            _this.success = true;
            _this.question = "设置为默认卡？";
            _this.makeSure = "您确定要把"+_this.cardName+"("+_this.lastName+") 设置为默认银行卡？"
        },
        // 设为主卡
        majorSure () {
            let _this = this;
            $.ajax({
                url: '/gateway/api/user/jbj/setDefaultCard?t='+(new Date()).getTime(),
                type: "post",
                data: {
                    userId: _this.userId,
                    token: _this.token,
                    bankCard: _this.realBankCard
                },
                success:function(res){
                    if(res.respCode == "000000"){
                        _this.success = false;
                        _this.showResult = true;
                        _this.resultTittle = "已设置为默认卡";
                        // window.location.reload();
                    }else{
                        _this.success = false;
                        _this.showResult = true;
                        _this.resultTittle = "设置默认卡失败"
                        _this.resultReason = res.respMsg;
                        // window.location.reload();
                    }
                }
            })
        },
        // 取消
        abolish () {
            this.isChk = false;
            this.showTip = false;
            window.location.reload();
        },
        chengeCard () {
            var cardLi = $("#cardLi").find("li");
            var _this = this;
            $.each(cardLi,function(index,item){
                $(item).click(function(){
                    _this.cardName = $(this).data('cardname');
                    _this.lastName = $(this).data('lastname');
                    _this.realBankCard = $(this).data('realbankcard');
                    _this.cardId = $(this).data('bankid');
                    _this.isDefault = $(this).data('isdefault');
                    _this.operationCard();
                });
            })
        }
    },
    mounted () {
            let _this = this;
            // 获取银行卡列表
            _this.bindCard = "/api/static/xmy/module/bindCard.html?userId="+_this.userId+'&token='+_this.token;
            $.ajax({
                url: '/gateway/api/user/jbj/findBankCardByUserId?t='+(new Date()).getTime(),
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.userId,
                    userType: "B"
                },
                success: function(res){
                    if(res.respCode == "000000"){
                        if(res.data.length==0){
                            _this.noCard = true;
                        }else{
                            _this.noCard = false;
                        }
                        _this.cardList = res.data;
                        // 渲染结束后再调用
                        _this.$nextTick(function(){
                            _this.chengeCard();
                        });
                        
                    }
                }
            });
            
        }
}
</script>
<style lang="less">
@import '../../common/css/bankCard.less';
</style>
