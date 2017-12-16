 <template>
    <Form ref="formItem" :model="formItem" :rules="rules" :label-width="100" class="auto-form-wrap">
        <FormItem label="权限标识" prop="name">
            <Input v-model="formItem.name"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="description">
            <Input v-model="formItem.description"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit" :loading="loading">添加权限</Button>
        </FormItem> 
    </Form>
</template>
<script>
    import permission from '../../api/permission'
    export default {
        data(){
            return {
                loading:false,
                formItem:{
                	name:'',
                	description:''
                },
                rules:{
                   	name:[
	            		{ required: true, message: '权限标识不能为空', trigger: 'blur' },
	            	],
	            	description:[
	            		{ required: true, message: '权限描述不能为空', trigger: 'blur' },
	            	]
                },
            }
        },
        methods:{
            handleSubmit(){
                this.$refs.formItem.validate((valid) => {
                    if (valid) {
                        permission.create(this.formItem).then(response =>{
                            this.$Message.success('添加成功')   
                            this.loading = false    
                            this.$router.push({name:'permission-index'})         
                        }).catch(error =>{
                            this.$Message.error(error)
                            this.loading = false
                        })
                    }else{
                        this.loading = false
                    }
                })

            }
        },
    }
</script>