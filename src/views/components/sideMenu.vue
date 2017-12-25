<template>
	<div class="layout-navigate"> 
        <Menu ref="sideMenu" :active-name="active"  :open-names="openSubmenu" width="auto" @on-select="toRouter">
            <template v-for="item in sideMenu">
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
	export default {
        data () {
            return {
            };
        },
        computed:{
            active(){
                let len = this.$route.matched.length
                return (this.$route.matched.length > 1) ? this.$route.matched[1].name : this.$route.name
            }
        },
        props: {
            openSubmenu: Array,
            sideMenu: Array,
            iconSize: Number
        },
		methods:{
			toRouter(name){
				this.$router.push({
                    name: name
                });
			}
		},
        created() { 
            this.$nextTick(() => {
                this.$refs.sideMenu.updateOpened();
                this.$refs.sideMenu.updateActiveName();
            });
        }
	}
</script>