<style>
	.user-info li{display: block;padding: 20px 0;font-size: 14px;}
	.user-info span{display: inline-block;vertical-align: middle;}
	.user-info .user-info-key{width: 100px;padding-right: 35px;text-align: right}
	.user-info .user-info-value{padding-right: 10px;}
	.user-info .user-info-edit span{font-size: 12px;}
</style>
<template>
	<ul class="user-info">
		<li>
			<span class="user-info-key">头像</span>
			<span class="user-info-value"><img src="http://www.qqzhi.com/uploadpic/2014-05-14/120216177.jpg" style="width:80px;height:80px;border-radius:100%"></span>
		</li>
		<li>
			<span class="user-info-key">用户名</span>
			<span class="user-info-value">{{user.username}}</span>
		</li>
		<li>
			<span class="user-info-key">邮箱</span>
			<span class="user-info-value">{{user.email}}</span> 
			<a href="javascript:;" class="user-info-edit" @click="handleEditEmail">
				<Icon type="edit" class="user-edit"></Icon> <span> 修改</span>
			</a>
		</li>
		<li>
			<span class="user-info-key">注册时间</span>
			<span class="user-info-value">{{user.created_at | formatDate}}</span>
		</li>
	</ul>
</template>
<script>
	import util from './../../libs/util';
    export default {
        data() {
            return {
            };
        },
        computed:{
        	user() {
                return this.$store.state.user || {};
            }
		},
		methods:{
			handleEditEmail()
			{
				this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.user.email,
                                autofocus: true,
                                placeholder: '请输入您的新邮箱！'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    },
                    title: 'Title',
                    loading : true,
                    onOk: () => {
                        this.$http.put('user/' + this.user.id,{
							email : this.value
						}).then((res)=>{
							this.user.email = this.value;
						    this.$Modal.remove();
						    this.$Message.success('修改成功！');
						}).catch((err)=>{
						    this.$Modal.remove();
						    this.$Message.error('修改失败！');
						});
                    },
                })
			}
		},
		filters:{
	        formatDate(time){
	            return util.formatDate(time,'yyyy-MM-dd');
	        }
	    }
    };
</script>