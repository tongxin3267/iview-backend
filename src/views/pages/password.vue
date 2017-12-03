<template>
    <Form ref="passwordForm" :model="form" :rules="rules" :label-width="100" style="padding-top: 20px" >
        <FormItem label="旧密码" prop="password">
            <Input type="password" v-model="form.password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model="form.newPassword" style="width:300px"></Input>
        </FormItem>
        <FormItem label="再次输入" prop="repeatPassword">
            <Input type="password" v-model="form.repeatPassword" style="width:300px"></Input>
        </FormItem>
        <FormItem label="">
            <Button type="primary" :loading="loading" @click="handleOk" style="margin-right:6px">提交</Button>
            <Button type="ghost" @click="handleCancel">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                form: {
                    password: '',
                    newPassword: '',
                    repeatPassword: '',
                },
                rules: {
                    password: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    repeatPassword:[
                        { required: true, message: '再次输入不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleOk(){
                this.$refs.passwordForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$http.post('user/password',this.form).then((res)=>{
                            this.loading = false;
                            this.$Message.success('修改成功！');
                            this.$router.push({
                                name: 'user'
                            });
                        }).catch((err)=>{
                            this.loading = false;
                        });
                    }
                })
            },
            handleCancel(){
                this.$router.go(-1);
            },
        }
    };
</script>