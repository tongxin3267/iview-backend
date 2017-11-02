<style scoped>
    .layout{
        background: #f5f7f9;
    }
    .layout-wrap{
        position: relative;
        width:92%;
        margin:0 auto;
    }
    .layout-hender{
        position: relative;
        height:60px;
        background: #fff;
    }
    .layout-hender:after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #dddee1;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-logo img{
        height: 30px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-content{
        min-height: 200px;
        margin: 20px 0  10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-footer{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>
<template>
    <div class="layout">
        <hender class="layout-hender">
            <div class="layout-wrap">
                <a class="logo">
                    <img src="https://file.iviewui.com/dist/fe8d29da1225d943e30f9ee1bddce78f.png">
                    <span>Ant Design</span>
                </a>
            </div>
        </hender>
        <div class="layout-content">
            <div class="layout-wrap">
                <Row>
                    <Col span="4">
                        <Menu active-name="1-2" width="auto" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                </template>
                                <MenuItem name="1-1">Option 1</MenuItem>
                                <MenuItem name="1-2">Option 2</MenuItem>
                                <MenuItem name="1-3">Option 3</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                </template>
                                <MenuItem name="2-1">Option 1</MenuItem>
                                <MenuItem name="2-2">Option 2</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                </template>
                                <MenuItem name="3-1">Option 1</MenuItem>
                                <MenuItem name="3-2">Option 2</MenuItem>
                            </Submenu>
                        </Menu>
                    </Col>
                    <Col span="20">
                        <div class="layout-content-main">
                            <router-view></router-view>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <footer class="layout-footer">
            2011-2016 &copy; TalkingData
        </footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>