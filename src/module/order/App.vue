<template>
    <div>
        <div class="body-mask"></div>
        <navBar title="订单列表"></navBar>
        <div class="order_menu">
            <span :class="{'active': isAll}" @click="isAll=true, isDeal=false, isComplete=false">全部</span>
            <span :class="{'active': isDeal}" @click="isAll=false, isDeal=true, isComplete=false">待处理</span>
            <span :class="{'active': isComplete}" @click="isAll=false, isDeal=false, isComplete=true">已完成</span>
        </div>


        <div v-show="isAll">
            <ul class="order_list">
                <li v-for="item in allList">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.platLogo">
                            {{item.company}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.status == 0" src="../../../static/images/icon_yjj@2x.png">
                            <img v-if="item.status == 1" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.status == 2" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.status == 3" src="../../../static/images/icon_lyz@2x.png">
                            <template v-if="item.status == 0">已拒绝</template>
                            <template v-if="item.status == 1">已逾期</template>
                            <template v-if="item.status == 2">已还款</template>
                            <template v-if="item.status == 3">处理中</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.amount}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.excharge}}</p>
                            <p>利率：{{item.rate}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.Loan}}</p>
                            <p>还款日：{{item.repayment}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="isbottom" v-show="showAll">别扯了，已经到底了...</div>
            <div class="nodata" v-show="visAll">
                <img src="../../../static/images/group7@2x.png">
                暂无数据
            </div>
        </div>

        <div v-show="isDeal">
            <ul class="order_list">
                <li v-for="item in dealList">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.platLogo">
                            {{item.company}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.status == 0" src="../../../static/images/icon_yjj@2x.png">
                            <img v-if="item.status == 1" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.status == 2" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.status == 3" src="../../../static/images/icon_lyz@2x.png">
                            <template v-if="item.status == 0">已拒绝</template>
                            <template v-if="item.status == 1">已逾期</template>
                            <template v-if="item.status == 2">已还款</template>
                            <template v-if="item.status == 3">处理中</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.amount}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.excharge}}</p>
                            <p>利率：{{item.rate}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.Loan}}</p>
                            <p>还款日：{{item.repayment}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="isbottom" v-show="showDeal">别扯了，已经到底了...</div>
            <div class="nodata" v-show="visDeal">
                <img src="../../../static/images/group7@2x.png">
                暂无数据
            </div>
        </div>
        

        <div v-show="isComplete">
            <ul class="order_list">
                <li v-for="item in completeList">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.platLogo">
                            {{item.company}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.status == 0" src="../../../static/images/icon_yjj@2x.png">
                            <img v-if="item.status == 1" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.status == 2" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.status == 3" src="../../../static/images/icon_lyz@2x.png">
                            <template v-if="item.status == 0">已拒绝</template>
                            <template v-if="item.status == 1">已逾期</template>
                            <template v-if="item.status == 2">已还款</template>
                            <template v-if="item.status == 3">处理中</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.amount}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.excharge}}</p>
                            <p>利率：{{item.rate}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.Loan}}</p>
                            <p>还款日：{{item.repayment}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="isbottom" v-show="showComplete">别扯了，已经到底了...</div>
            <div class="nodata" v-show="visComplete">
                <img src="../../../static/images/group7@2x.png">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    import navBar from '../../components/nav.vue';
    import xmy from '../../../static/js/xmy.js';
    export default{
        components: {
            navBar
        },

        data () {
            return {
                isAll: true,
                isDeal: false,
                isComplete: false,
                showAll: false,
                showDeal: false,
                showComplete: false,
                visAll: false,
                visDeal: false,
                visComplete: false,
                allList: [],
                dealList: [],
                completeList: [],
                curAll: 1,
                curDeal: 1,
                curComplete: 1
            }
        },  


        methods: {

            //渲染全部订单列表
            renderAll () {
                let _this = this;
                this.isAll = true;
                this.isDeal = false;
                this.isComplete = false;

                xmy.getData({
                    url: '/url/getOrder',
                    data: {
                        type: 'all'
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.allList = _this.allList.concat(res.list);
                        }
                    }
                });
            },

            //渲染待处理订单列表
            renderDeal () {
                let _this = this;
                this.isAll = false;
                this.isDeal = true;
                this.isComplete = false;

                xmy.getData({
                    url: '/url/getOrder',
                    data: {
                        type: 'deal'
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.dealList = _this.dealList.concat(res.list);
                        }
                    }
                });
            },

            //渲染已完成订单列表
            renderComplete () {
                let _this = this;
                this.isAll = false;
                this.isDeal = false;
                this.isComplete = true;

                xmy.getData({
                    url: '/url/getOrder',
                    data: {
                        type: 'complete'
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.completeList = _this.completeList.concat(res.list);
                        }
                    }
                });
            }
        },

        mounted () {

            this.renderAll();
            this.renderDeal();
            this.renderComplete();

            window.onscroll = function(){
                let scrollTop = xmy.getScrollTop(),
                    clientHeight = xmy.getClientHeight(),
                    scrollHeight = xmy.getScrollHeight();
                
                if(scrollTop + clientHeight + 70 > scrollHeight) {
                    if(this.isAll){
                        this.curAll++;
                        this.renderAll(this.curAll);
                    }

                    if(this.isDeal){
                        this.curDeal++;
                        this.renderDeal
                        (this.curDeal);
                    }

                    if(this.curComplete){
                        this.curComplete++;
                        this.renderComplete(this.curDeal);
                    }
                    
                }
            };

            /*
                layer.open({
                    type: 2,
                    content: '加载中...',
                    shadeClose: false,
                    className: 'layer-loading'
                });

                setTimeout(function(){
                    layer.closeAll();
                },2000);
            */
        }
    }   
</script>

<style lang="less" scoped>
    @import '../../common/css/order.less';
</style>
