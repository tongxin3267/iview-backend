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
                <Avatar 
                    :src="avatar ? avatar : ''" 
                    :icon="avatar ? '' : 'person'" 
                    style="vertical-align: middle;" 
                />
                <span class="user-avatar-name">{{name ? name : 'loading...'}}</span>
            </a>
            <DropdownMenu slot="list" style="text-align:center">
                <template v-for="item in items">
                    <DropdownItem :name="item.name">
                        <Icon :type="item.meta.icon" style="padding-right: 4px;"></Icon>{{item.meta.title}}
                    </DropdownItem>
                </template>    
                <DropdownItem divided name="logout"><Icon type="log-out" style="padding-right: 4px;"></Icon>退出登入</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script type="text/javascript">
	export default {
        data () {
            return {

            };
        },
        props: {
            name:{
                type:String,
                default:'loading...'
            },
            avatar:{
                type:String,
                default:''
            },
            items:Array
        },
		methods:{
            toRouter(name){
                if (name ==='logout') {
                    this.$store.dispatch('logout');
                    this.$router.replace({ name: 'login' });
                }else{
                    this.$router.push({ name: name }); 
                }
            }
		},
	}
</script>
