<template>
	<Form ref="formItem" :model="formItem" :label-width="180">
        <FormItem label="用户名">
            <Input v-model="formItem.nickname"></Input>
        </FormItem>
        <FormItem label="登入邮箱">
            <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="用户名">
            <Input v-model="formItem.id"></Input>
        </FormItem>
        <FormItem label="状态">
            <RadioGroup v-model="formItem.status">
                <Radio label="10">正常</Radio>
                <Radio label="0">禁用</Radio>
            </RadioGroup>
        </FormItem>

        <FormItem>
            <Button type="primary">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
</template>
<script>
    import admin from '../../api/admin'
    export default {
    	computed:{
    		formItem:{}
    	},
    	methods:{

    	},
    	created(){
    		let id = this.$route.query.id
    		if (id) {
    			admin.view(id).then(response=>{
    				this.formItem = response.data
    			}).catch(error=>{
    				this.$Message.error(error)
    			})
    		}else{
    			this.$router.go(-1)
    		}
    	}

    }
</script>