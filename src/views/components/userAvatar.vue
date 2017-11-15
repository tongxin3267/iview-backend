<style>
.user-avatar{
    float: right;
    height: 32px;
    padding-top: 14px;
}
.user-avatar-name{
    display: inline-block;
    height: 32px;
    padding: 0 6px;
    font-size: 14px;
    line-height: 32px;
    vertical-align: middle;
}
</style>
<template>
    <div class="user-avatar">
    	<Dropdown placement="bottom-end" @on-click="toRouter">
            <a href="javascript:;">
                <Avatar icon="person" style="vertical-align: middle;" />
                <span class="user-avatar-name">{{userName}}</span>
            </a>
            <DropdownMenu slot="list" style="text-align:center">
                <template v-for="item in userMenu"> 
                    <DropdownItem :name="item.name"><Icon :type="item.meta.icon" style="padding-right: 4px;"></Icon>{{item.meta.title}}</DropdownItem>
                </template>
                <DropdownItem divided name="logout"><Icon type="log-out"></Icon> 退出登入</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	export default {
        data () {
            return {

            };
        },
        computed: {
            userMenu() {
                return this.$store.state.userMenu;
            },
            userName(){
                return this.$store.state.user.userName;
            }
        },
		methods:{
            toRouter(name){
                if (name === 'user') {
                    const userName =  this.userName;
                    this.$router.push({
                        name: 'user',
                        params: { username: userName }
                    });
                }
                if (name === 'logout') {
                    this.$store.commit('logout');
                    this.$router.replace({ 
                        name:'login' 
                    });
                }
                this.$router.push({
                    name: name
                });
                
            }
		}
	}
</script>