<template>
    <Form ref="formItem" :model="formItem" :rules="rules" :label-width="100" class="auto-form-wrap">
        <FormItem label="用户名" prop="nickname">
            <Input v-model="formItem.nickname"></Input>
        </FormItem>
        <FormItem label="登入邮箱" prop="email">
            <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formItem.password"></Input>
        </FormItem>
        <FormItem label="状态">
            <RadioGroup v-model.number="formItem.status">
                <Radio label="10">正常</Radio>
                <Radio label="0">禁用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="分配角色">
            <CheckboxGroup v-model="formItem.roles">
                <template v-for="role in roles">
                    <Checkbox :label="role.id">{{role.name}}</Checkbox>
                </template>
            </CheckboxGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit" :loading="loading">添加管理员</Button>
        </FormItem>
    </Form>
</template>
<script>
    import admin from '../../api/admin'
    import role from '../../api/role'

    export default {
        data(){
            return {
                loading:false,
                formItem:{
                    nickname:'',
                    email:'',
                    password:'',
                    status:10,
                    roles:[]
                },
                roles:[],
                rules:{
                    nickname: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, max:30, message: '昵称必须为2-30个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, max:30, message: '密码必须为2-30个字符', trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            handleSubmit(){
                this.$refs.formItem.validate((valid) => {
                    if (valid) {
                        admin.create(this.formItem).then(response =>{
                            this.$Message.success('添加成功')
                            this.$refs.formItem.resetFields()
                            this.$router.push({name:'admin-index'})                      
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
        created(){
            role.getItems().then(response=>{
                this.roles = response.data.items
            }).catch(error=>{
                this.$Message.error(error)
            })
        }
    }
</script>