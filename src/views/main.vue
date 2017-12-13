<template>
    <div class="layout">
        <header class="layout-header">
            <div class="layout-wrap">
                <a class="logo clearfix">
                    <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                    <span>iView-Backend</span>
                </a>
                <userDropdown :user="user" :dropdownItem="dropdownItem"></userDropdown>
            </div>
        </header>
        <div class="layout-wrap">
            <div class="layout-content">
                <Row>
                    <Col span="4">
                        <div class="layout-navigate">
                            <sideMenu :sideMenu="sideMenu" :openSubmenu="openSubmenu" :iconSize="14"></sideMenu>
                        </div>
                    </Col>
                    <Col span="20">
                        <div class="layout-content-main">
                            <h2>{{$route.meta.title}}</h2>
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
    import userDropdown from './components/userDropdown.vue';
    import {appRouter,userRouter} from '../router';
    import {mapState,mapActions} from 'vuex';
    export default {
        components: {
            sideMenu,
            userDropdown
        }, 
        computed: {
            ...mapState({
                dropdownItem:state => state.app.dropdownItem,
                sideMenu:state => state.app.sideMenu,
                openSubmenu:state => state.app.openSubmenu,
                user:state => state.auth.identity,
            }),
        },
        methods: {
            ...mapActions([
                'menuInit',
                'getIdentity',
                'getUploadConfig'
            ]),
        },
        created () {
            this.getIdentity().then(()=>{
                //成功拉取身份信息
            }).catch(error=> {
                this.$Message.error(error.message)
                this.$store.dispatch('logout')
                this.$router.replace({name:'login'})
            }) 
            this.menuInit({dropdownItem:userRouter.children,sideMenu:appRouter,openSubmenu:null})
            this.getUploadConfig()
        }
    };
</script>