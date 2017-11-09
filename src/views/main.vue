<style scoped>
    .layout{
        background: #f5f7f9;
    }
    .layout-wrap{
        position: relative;
        width:92%;
        margin:0 auto;
    }
    .layout-header{
        display:block;
        position: relative;
        height:60px;
        background: #fff;
    }
    .layout-header:after{
        content: "";
        display: block;
        width: 100%;
        height:1px;
        background: #e9eaec;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .logo{
        overflow: hidden;
    }
    .logo img{
        float:left;
        height:60px;
    }
    .logo span{
        display:block;
        height:60px;
        line-height:60px;
        font-size:16px;
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
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    }
    .layout-navigate{
        padding: 15px 0;
        font-size: 14px;
    }
    .layout-navigate:after{
        content: "";
        display: block;
        width: 1px;
        background: #d7dde4;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
    }
/*    .ivu-menu-item-selected{
        background: #ecf6fd;
    }*/
    .layout-content-main{
        padding: 20px;
    }
    .layout-content-main:after{
        content: "";
        display: block;
        width: 1px;
        background: #d7dde4;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -1px;
    }
    .layout-footer{
        display:block;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style> 
<template>
    <div class="layout">
        <header class="layout-header">
            <div class="layout-wrap">
                <a class="logo">
                    <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                    <span>Ant Design</span>
                </a>
            </div>
        </header>
        <div class="layout-wrap">
            <div class="layout-content">
                <Row>
                    <Col span="4">
                        <div class="layout-navigate">
            <!--                 <siderMenu :menu="menu" :iconSize="14"/> -->
                        </div>
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
    import siderMenu from './components/siderMenu.vue';
    export default {
        data() {
            return {

            };
        },
        mounted: {
            menu() {
                return this.$store.state.menu;
            },
        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>