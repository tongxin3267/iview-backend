<template>
    <Form :label-width="100" style="padding-top: 20px">
        <FormItem label="旧密码">
            <Input type="password" v-model="password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="新密码">
            <Input type="password" v-model="newPassword" style="width:300px"></Input>
        </FormItem>
        <FormItem label="再次输入">
            <Input type="password" v-model="repeatPassword" style="width:300px"></Input>
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
                password: '',
                newPassword: '',
                repeatPassword: '',
            };
        },
        methods: {
            handleOk(){
                this.loading = true;
                this.$http.post('user/password',{
                    password:this.password,
                    newPassword:this.newPassword,
                    repeatPassword:this.repeatPassword
                }).then((res)=>{
                    this.loading = false;
                    this.$Message.success('修改成功！');
                    this.$router.push({
                        name: 'user'
                    });
                }).catch((err)=>{
                    this.loading = false;
                });
            },
            handleCancel(){
                this.$router.go(-1);
            },
        }
    };
</script>