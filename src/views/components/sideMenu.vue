<template>
	<div class="layout-navigate">
        <Menu ref="sideMenu" :active-name="$route.name"  :open-names="open" width="auto" @on-select="toRouter">
            <template v-for="item in menu">
                <Submenu :name="item.name" :key="item.path">
                    <template slot="title">
                        <Icon :type="item.meta.icon" :size="iconSize"></Icon>{{item.meta.title}}
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="child.path">{{child.meta.title}}</MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>	
</template>
<script type="text/javascript">
	import Vue from 'vue';
	export default {
        data () {
            return {
            };
        },
        props: {
            menu: Array,
            open: Array,
            iconSize: Number,
        },
		methods:{
			toRouter(name){
				this.$router.push({
                    name: name
                });
			}
		}
	}
</script>