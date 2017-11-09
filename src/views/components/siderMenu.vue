<template>
	<div class="layout-navigate">
        <Menu active-name="$route.name" @on-select="toRouter" width="auto">
            <Submenu name="1"> 
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                </template> 
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
                <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
        </Menu>
    </div>	
</template>
<script type="text/javascript">
	import Vue from 'vue';
	export default {
		name: 'siderMenu',
		methods: {
			toRouter(name){
				this.$router.push({
                    name: name
                });
			}
		}
	}
</script>