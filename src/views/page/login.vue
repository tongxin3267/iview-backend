<template>
    <div class="login-wrap">
        <div class="login-main">
            <a class="login-header">
                <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
                <span>一个 UI 设计语言</span>
            </a>
            <Card style="padding:20px 20px 0" :padding="0" :dis-hover="true">
                <Form ref="loginForm" :model="form" :rules="rules" :show-message="false">
                    <FormItem prop="userName" label="用户名" style="margin-bottom:10px;">
                        <Input v-model="form.userName">

                        </Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input type="password" v-model="form.password">
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="handleSubmit" type="primary" long>登 录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
        <div class="login-footer">Copyright  2017 蚂蚁金服体验技术部出品</div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
           
        }
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
