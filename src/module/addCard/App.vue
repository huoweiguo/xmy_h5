<template>
    <div>
        <navBar title="信用卡认证"></navBar>
        <div class="card-banner"></div>
        <div class="card-body">
            <ul>
                <li>
                    <label>姓名</label>
                    <div>贾宝玉</div>
                </li>
                <li>
                    <label>身份证号</label>
                    <div>42 2802 2018 0830 3344</div>
                </li>
                <li>
                    <label>信用卡号</label>
                    <div>
                        <input type="text" readonly="readonly" maxlength="16" id="bindcard" class="inp_txt" v-model="cardCode">
                    </div>
                </li>
                <li>
                    <label>预留手机号</label>
                    <div>
                        <input type="text" readonly="readonly" maxlength="11" id="bindTel" class="inp_txt" v-model="telephone">
                    </div>
                </li>
            </ul>
        </div>
        <button class="card-btn1" v-if="!showBtn">确认</button>
        <button class="card-btn1 act-sure" v-if="showBtn" @click="addCard">确认</button>
    </div>
</template>

<script>
    import xmy from '../../../static/js/xmy.js';
    import navBar from '../../components/nav.vue';
    export default {
        components: {
            navBar
        },

        data () {
            return {
                telephone: '',
                cardCode: '',
                showBtn: false
            }
        },

        methods: {
            chkVal () {
                let phone = xmy.trim(this.telephone);
                let code = xmy.trim(this.cardCode);
                if(phone != '' && code != ''){
                    this.showBtn = true;
                } else {
                    this.showBtn = false;
                }
            },

            addCard () {
                let phone = xmy.trim(this.telephone),
                    code = xmy.trim(this.cardCode);
                
                if(!xmy.chkCard(code)){
                    xmy.toast('输入卡号错误');
                    return false;
                }
                
                if(!xmy.chkPhone(phone)){
                    xmy.toast('手机号码格式不正确');
                    return false;
                }


                var layer1 = layer.open({
                    type: 0,
                    content: '认证完成',
                    btn: ['知道了'],
                    anim: 'up',
                    className: 'knowBox',
                    yes: function(){
                        layer.close(layer1);
                    }
                });

                
            }
        },

        mounted () {

            let _this = this;
            //输入卡号弹出数字键盘
            $('#bindcard').on('click', function () {
                $('#bindcard').NumberKeypad({
                    type: 'number',
                    zIndex: 1001,
                    callback: function (elem, number) {
                        _this.cardCode = number;
                        _this.chkVal();
                        elem.close();
                    }
                });
            });

            //输入手机号码弹出数字键盘
            $('#bindTel').on('click', function () {
                $('#bindTel').NumberKeypad({
                    type: 'number',
                    zIndex: 1001,
                    callback: function (elem, number) {
                        _this.telephone = number;
                        _this.chkVal();
                        elem.close();
                    }
                });
            });
        }
    }
</script>

<style lang="less">
    @import '../../common/css/addCard.less';
</style>