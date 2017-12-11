<style>
	.user-info{display: block;}
	.user-info li{display: block;padding: 20px 0;font-size: 14px;}
	.user-info span{display: inline-block;vertical-align: middle;}
	.user-info .user-info-key{width: 160px;padding-right: 35px;text-align: right}
	.user-info .user-info-value{padding-right: 10px;}
	.user-info .user-info-edit span{font-size: 12px;}

	.upload-avatar-box{position:relative;width: 64px;height:64px;overflow: hidden;border-radius: 4px;}
	.upload-avatar-img{width: 64px;height:64px;}
	.upload-avatar-cover{display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.5);line-height: 64px;text-align: center; } 
	.upload-avatar-box:hover .upload-avatar-cover{
        display: block;
    }
    .user-upload-label{display: block;position: absolute;left:0;top:0;width: 100%;height:100%;}
</style>
<template>
	<ul class="user-info">
		<li>
			<span class="user-info-key">头像</span>
			<span class="user-info-value">
				<div class="upload-avatar-box">
					<img class="upload-avatar-img" :src="user.avatar">
					<div class="upload-avatar-cover">
						<label class="user-upload-label" for="user-upload"></label>
						<input style="display:none" type="file" accept="image/jpeg,image/jpg,image/png,image/gif" ref="pick" @change="handleUploadAvatar" id="user-upload">
						<Icon type="camera" size="20" color="#fff"></Icon>
					</div>
				</div>
			</span>
		</li>
		<li>
			<span class="user-info-key">ID</span>
			<span class="user-info-value">{{user.id}}</span> 
		</li>
		<li>
			<span class="user-info-key">登入邮箱</span>
			<span class="user-info-value">{{user.email}}</span> 
		</li>
		<li>
			<span class="user-info-key">昵称</span>
			<span class="user-info-value">{{user.nickname}}</span>
			<a href="javascript:;" class="user-info-edit" @click="handleNickname">
				<Icon type="edit" class="user-edit"></Icon> <span> 修改</span>
			</a>
		</li>
		<li>
			<span class="user-info-key">注册时间</span>
			<span class="user-info-value">{{user.created_at | formatDate}}</span>
		</li>
		<li>
			<span class="user-info-key">登入时间</span>
			<span class="user-info-value">{{user.login_time | formatDate}}</span>
		</li>
		<li>
			<span class="user-info-key">登入IP地址</span>
			<span class="user-info-value">{{user.login_ip}}</span>
		</li>
	</ul>
</template>
<script>
	import util from './../../libs/util';
    export default {
        computed:{
        	user(){
        		return this.$store.state.profile;
        	},
        },
		methods:{
			handleUploadAvatar(event)
			{
				let file = event.target.files[0];
				if (file) {
                    this.$upload(file,{maxSize:this.maxSize,accepts:this.accepts}).then( res => {
                    	res += '?imageView2/1/w/100/h/100/'
                    	this.$http.put('user/' + this.user.id,{
                    		avatar:res
                    	}).then(() =>{
                    		this.user.avatar = res;
                    		this.$Message.success('上传成功');
                    	}).catch(e=>{
                    		this.$Message.error('保存失败');
                    	})	
                    }).catch(msg=>{
                    	this.$Message.error(msg);
                    })
                }
			},
			handleNickname()
			{
				let _val = this.user.nickname;
				this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: _val,
                                autofocus: true,
                                placeholder: '请输入您的新昵称！'
                            },
                            style: {
							    paddingTop:'30px'
							},
                            on: {
                                input: (val) => {
                                    _val = val;
                                }
                            }
                        })
                    },
                    title: '修改昵称', 
                    loading : true,
                    onOk: () => {
                    	if (_val == this.user.nickname) {
                    		this.$Modal.remove();
                    		return;
                    	}
                        this.$http.put('user/' + this.user.id,{
							nickname : _val
						}).then((res)=>{
							this.user.nickname = _val;
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
	        formatDate(timestamp){
	            return util.formatDate(timestamp,'yyyy-MM-dd h:m');
	        }
	    }
    };
</script>