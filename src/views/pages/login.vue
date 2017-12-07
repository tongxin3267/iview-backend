<template>
    <div class="login-wrap">
        <div class="login-main">
            <a class="login-header">
                <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                <span>一个 UI 设计语言</span> 
            </a>
            <Card  :padding="0" :dis-hover="true">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="login-content">
                   <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="email">
                            <Input v-model="form.email" placeholder="请输入邮箱" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码" size="large">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" size="large" long >登 录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
        <div class="login-footer">Copyright  2017 蚂蚁金服体验技术部出品</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$http.post('user/connect',this.form).then(res => {
                        this.$store.dispatch('login',res.data);
                        let _path = this.$route.query.redirect || '/home' ;
                        this.$router.replace({ path: _path });
                        this.$Message.success('登入成功');
                    })
                }
            });
        }
    },
    mounted() {
        
    }
};
</script>

<style>
.login-wrap{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    text-align: center;
}
.login-wrap:after{
    content: "";
    display: inline-block;
    height: 100%;
    margin-right: -.25em;
    vertical-align: middle;
}
.login-main{
    width: 320px;
    min-height: 580px;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
}
.login-header{
    display: block;
    margin-bottom: 20px;
    text-align: center;
}
.login-header img{
    display: block;
    height:90px;
    margin:0 auto;
}
.login-header span{
    color: #464c5b;
    font-size:16px;
}
.login-content{
    padding:30px 20px 10px;
}

.login-footer{
    position: absolute;
    left:0;
    bottom:0;
    padding:0 0 30px;
    width: 100%; 
    text-align: center;
    color: #80848f
}
</style>
