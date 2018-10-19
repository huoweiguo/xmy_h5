<template>
    <div>
        <div class="body-mask"></div>
        <navBar title="订单列表"></navBar>
        <div class="order_menu">
            <span :class="{'active': isAll}" @click="isAll=true, isDeal=false, isComplete=false">全部</span>
            <span :class="{'active': isDeal}" @click="isAll=false, isDeal=true, isComplete=false">待处理</span>
            <span :class="{'active': isComplete}" @click="isAll=false, isDeal=false, isComplete=true">已完成</span>
        </div>

        <!-- 全部 -->
        <div v-show="isAll">
            <ul class="order_list">
                <li v-for="item in allList" @click="goOrderDetail(item.orderId)">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.listAvaterUrl">
                            {{item.listName}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.orderStatus == 'O'" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.orderStatus == 'S'" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.orderStatus == 'P'" src="../../../static/images/icon_lyz@2x.png">
                            <img v-if="item.orderStatus == 'W'" src="../../../static/images/round_blue@2x.png">
                            <template v-if="item.orderStatus == 'O'">已逾期{{item.overdueDay}}天</template>
                            <template v-if="item.orderStatus == 'S'">已还款</template>
                            <template v-if="item.orderStatus == 'P'">处理中</template>
                            <template v-if="item.orderStatus == 'W'">剩余{{item.day}}天还款</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.orderAmt}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.rewardRateDesc}}</p>
                            <p>利率：{{item.interestRateDesc}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.orderTime}}</p>
                            <p>还款日：{{item.repaymentDate}}</p>
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
        <!-- 待还款 -->
        <div v-show="isDeal">
            <ul class="order_list">
                <li v-for="item in dealList" @click="goOrderDetail(item.orderId)">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.listAvaterUrl">
                            {{item.listName}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.orderStatus == 'O'" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.orderStatus == 'S'" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.orderStatus == 'P'" src="../../../static/images/icon_lyz@2x.png">
                            <img v-if="item.orderStatus == 'W'" src="../../../static/images/round_blue@2x.png">
                            <template v-if="item.orderStatus == 'O'">已逾期{{item.overdueDay}}天</template>
                            <template v-if="item.orderStatus == 'S'">已还款</template>
                            <template v-if="item.orderStatus == 'P'">处理中</template>
                            <template v-if="item.orderStatus == 'W'">剩余{{item.day}}天还款</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.orderAmt}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.rewardRateDesc}}</p>
                            <p>利率：{{item.interestRateDesc}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.orderTime}}</p>
                            <p>还款日：{{item.repaymentDate}}</p>
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
        
        <!-- 已还款 -->
        <div v-show="isComplete">
            <ul class="order_list">
                <li v-for="item in completeList" @click="goOrderDetail(item.orderId)">
                    <div class="li_nav">
                        <div class="order_user">
                            <img :src="item.listAvaterUrl">
                            {{item.listName}}
                        </div>

                        <div class="order_status">
                            <img v-if="item.orderStatus == 'O'" src="../../../static/images/icon_yyq@2x.png">
                            <img v-if="item.orderStatus == 'S'" src="../../../static/images/icon_yhk@2x.png">
                            <img v-if="item.orderStatus == 'P'" src="../../../static/images/icon_lyz@2x.png">
                            <img v-if="item.orderStatus == 'W'" src="../../../static/images/round_blue@2x.png">
                            <template v-if="item.orderStatus == 'O'">已逾期{{item.overdueDay}}天</template>
                            <template v-if="item.orderStatus == 'S'">已还款</template>
                            <template v-if="item.orderStatus == 'P'">处理中</template>
                            <template v-if="item.orderStatus == 'W'">剩余{{item.day}}天还款</template>
                        </div>
                    </div>
                    <div class="li_desc">
                        <div class="order_money">
                            <i>&yen;</i>{{item.orderAmt}}
                        </div>
                        <div class="order_rate">
                            <p>酬金：{{item.rewardRateDesc}}</p>
                            <p>利率：{{item.interestRateDesc}}</p>
                        </div>
                        <div class="order_date">
                            <p>借款日：{{item.orderTime}}</p>
                            <p>还款日：{{item.repaymentDate}}</p>
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
                curComplete: 1,
                token: xmy.getQueryString('token'),
                userId: xmy.getQueryString('userId'),
                appVersion: xmy.getQueryString('appVersion'),
                device: xmy.getQueryString('device'),
                channelType: xmy.getQueryString('channelType')
            }
        },  


        methods: {

            //渲染全部订单列表
            renderAll () {
                let _this = this;
                this.isAll = true;
                this.isDeal = false;
                this.isComplete = false;

                $.ajax({
                    url: '/gateway/api/order/billOrder/getOrderListApp',
                    type:"POST",
                    dataType:"json",
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        userType: "B",
                        size: 10,
                        current: _this.curAll,
                        type: 1,
                        orderType: 0
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.allList = _this.allList.concat(res.data);
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

                $.ajax({
                    url: '/gateway/api/order/billOrder/getOrderListApp',
                    type:'POST',
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        userType: "B",
                        size: 10,
                        current: _this.curDeal,
                        type: 3,
                        orderType: 0
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.dealList = _this.dealList.concat(res.data);
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

                $.ajax({
                    url: '/gateway/api/order/billOrder/getOrderListApp',
                    type:'POST',
                    data: {
                        token: _this.token,
                        userId: _this.userId,
                        userType: "B",
                        size: 10,
                        current: _this.curComplete,
                        type: 4,
                        orderType: 0
                    },
                    success: function(res){
                        if(res.respCode === '000000'){
                            _this.completeList = _this.completeList.concat(res.data);
                        }
                    }
                });
            },

            // 进入详情页
            goOrderDetail (orderId) {
                let _this = this;
                window.location.href = "orderDetail.html?token="+_this.token+"&userId="+_this.userId+"&appVersion="+ _this.appVersion+"&device="+_this.device+"&channelType="+_this.channelType+"&orderId="+orderId;
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
                        this.renderDeal(this.curDeal);
                    }

                    if(this.curComplete){
                        this.curComplete++;
                        this.renderComplete(this.curComplete);
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
