<template>
    <div class="layout">
        <header class="layout-header">
            <div class="layout-wrap">
                <a class="logo clearfix">
                    <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                    <span>iView-Backend</span>
                </a>
                <navDropdown :name="name" :avatar="avatar" :items="dropdownItem"></navDropdown>
            </div>
        </header>
        <div class="layout-wrap">
            <div class="layout-content">
                <Row>
                    <Col span="4">
                        <div class="layout-navigate">
                            <sideMenu v-if="show" :sideMenu="sideMenu" :openSubmenu="openSubmenu" :iconSize="14"></sideMenu>
                        </div>
                    </Col>
                    <Col span="20">
                        <div class="layout-content-main">
                            <h2>{{$route.meta.title}}</h2>
                            <router-view>loading...</router-view>
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
    import navDropdown from './components/navDropdown.vue';
    import {appRouter,commonRouter} from '../router';
    import {mapState,mapActions} from 'vuex';
    export default {
        data(){
            return {
                
            }
        },
        components: {
            sideMenu,
            navDropdown,
        }, 
        computed: {
            ...mapState({
                sideMenu:state => state.app.sideMenu,
                openSubmenu:state => state.app.openSubmenu,
                dropdownItem:state => state.app.dropdownItem,
                show:state => state.app.show,
                name:state => state.auth.adminInfo.nickname,
                avatar:state => state.auth.adminInfo.avatar,
            }),
        },
        methods: {
            ...mapActions([
                'sideMenuInit',
                'openSubmenuInit',
                'dropdownItemInit',
                'filerMenu',
                'getAdminInfo',
                'getUploadConfig'
            ]),
        },
        mounted(){
            this.getAdminInfo().then(response=>{
                //成功拉取身份信息
                this.filerMenu(response.data.route)
                this.getUploadConfig()
            }).catch(error=>{
                this.$Message.error(error.message)
                this.$store.dispatch('logout')
            }) 
            this.sideMenuInit(appRouter)
            let openSubmenu = []
            appRouter.forEach((item)=>{
                openSubmenu.push(item.name)
            })
            this.openSubmenuInit(openSubmenu)
            this.dropdownItemInit(commonRouter.children)
        }
    };
</script>