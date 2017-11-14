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
    	<Dropdown placement="bottom-end">
            <a href="javascript:;">
                <Avatar icon="person" style="vertical-align: middle;" />
                <span class="user-avatar-name">Admin</span>
            </a>
            <DropdownMenu slot="list" style="text-align:center">
                <DropdownItem><Icon type="person"></Icon> 个人中心</DropdownItem>
                <DropdownItem><Icon type="gear-a"></Icon> 修改密码</DropdownItem>
                <DropdownItem divided><Icon type="log-out"></Icon> 退出登入</DropdownItem>
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
		methods:{

		}
	}
</script>