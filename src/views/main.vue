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
        float: left;
        display: inline-block;
        height: 60px;
        overflow: hidden;
    }
    .logo img{
        float: left;
        display: block;
        height:60px;
    }
    .logo span{
        line-height:60px;
        font-size:16px;
    }
    .layout-content{
        margin: 20px 0  10px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    }
    .layout-navigate{
        padding: 10px 0;
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
    .layout-content-main{
        padding: 20px;
        min-height: 200px;
    }
    .layout-content-main:after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: -1px;
        display: block;
        width: 1px;
        background: #d7dde4;
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
                <a class="logo clearfix">
                    <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                    <span>iView-Backend</span>
                </a>
                <userAvatar></userAvatar>
            </div>
        </header>
        <div class="layout-wrap">
            <div class="layout-content">
                <Row>
                    <Col span="4">
                        <div class="layout-navigate">
                            <sideMenu></sideMenu>
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
    import sideMenu from './components/sideMenu.vue';
    import userAvatar from './components/userAvatar.vue';
    export default {
        components: {
            sideMenu,
            userAvatar
        }, 
    };
</script>