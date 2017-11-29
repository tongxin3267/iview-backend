<template>
    <Form :label-width="100">
        <FormItem label="原密码">
            <Input v-model="password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="新密码">
            <Input v-model="password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="重复密码">
            <Input v-model="password" style="width:300px"></Input>
        </FormItem>
        <FormItem label="">
            <Button type="primary" :loading="loading" @click="handleOk">提交</Button>
            <Button type="text" @click="handleCancel">取消</Button>
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
            },
            handleCancel(){
                this.$router.go(-1);
            },
        }
    };
</script>