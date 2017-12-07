<template>
    <Form ref="passwordForm" :model="form" :rules="rules" :label-width="100" style="padding-top: 20px" >
        <FormItem label="旧密码" prop="password">
            <Input type="password" v-model="form.password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model="form.newPassword" style="width:300px"></Input>
        </FormItem>
        <FormItem label="确认输入" prop="repeatPassword">
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
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if(value.length < 6  || value.length > 30){
                    callback(new Error('密码长度必须为4-30位'));
                }else{
                    if (value === this.form.repeatPassword) {
                        if (this.form.newPassword !== this.form.repeatPassword) {
                            callback(new Error('两次输入的密码不一致'));
                        }
                    }
                    callback();
                }
            };
            return {
                loading: false,
                form: {
                    password: '',
                    newPassword: '',
                    repeatPassword: '',
                },
                rules: {
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePassword, trigger: 'blur'  }
                    ],
                    repeatPassword:[
                        { validator: validatePassword, trigger: 'blur'  }
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
                            this.$router.push({ name: 'user' });
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