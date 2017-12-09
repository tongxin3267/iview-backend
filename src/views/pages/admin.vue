<style>
.ivu-table:after{display: none}
.tabel-footer{padding:20px 0 100px;}
</style>
<template>
    <div>
        <Button type="primary" style="margin-bottom: 20px" @click="create">+ 添加管理员</Button>
        <Table :loading="loading":columns="columns" :data="data" style="border: 0"></Table>
        <div class="tabel-footer">
            <Page 
                :total="meta.totalCount" 
                :page-size="meta.perPage" 
                :page-size-opts="[20, 50]"
                show-sizer 
                show-total
                @on-change="changePage" 
                @on-page-size-change="changeSize"
            >
            </Page>
        </div>
        <Modal v-model="modal.show" :title="modal.title" ok-text="确定" cancel-text="取消" :loading="modal.loading" @on-ok="handleSubmit">
            <Form ref="adminForm" :model="form.data" :rules="rules" :label-width="60">
                <FormItem label="昵称：" prop="nickname">
                    <Input type="text" v-model="form.data.nickname"></Input>
                </FormItem>
                <FormItem label="邮箱：" prop="email">
                    <Input type="text" v-model="form.data.email"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input type="password" v-model="form.data.password"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                modal: {
                    show: false,
                    title: '',
                    loading: true,
                },
                form:{
                    index:0,
                    url: '',
                    method: 'put',
                    data:{
                        email : '',
                        nickname : '',
                        password : ''
                    }
                },
                rules: {
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, max:30, message: '昵称必须为2-30个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, max:30, message: '密码必须为2-30个字符', trigger: 'blur' }
                    ]
                },
                columns: [
                    {
                        type: 'selection',
                        width: 80,
                    },
                    {
                        title: '管理员名称',
                        key: 'nickname'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let row = params.row;
                            let color = row.status === 10 ? 'green' : 'red';
                            let text = row.status === 10 ? '正常' :  '禁用';
                            return h('Tag', {
                                props: {
                                    color: color
                                },
                            }, text);
                        }
                    },
                    {
                        title: '最后登入时间',
                        key: 'login_time'
                    },
                    {
                        title: '注册时间',
                        key: 'created_at'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight: '4px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                },'编辑'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },'删除')
                            ]);
                        }
                    }
                ],
                data: [ ],
                meta: {
                    currentPage: 1,
                    pageCount:0,
                    perPage: 20,
                    totalCount:0,
                }
            };
        },
        mounted() {
            this.dataInit();
        },
        methods: {
            dataInit(page,size){
                this.loading = true;
                page = page ? page : this.meta.currentPage ;
                size = size ? size : this.meta.perPage;
                let _url =  'user?page=' + page + '&per-page= ' + size;
                this.$http.get(_url).then(res => {
                    this.data = res.data.items;
                    this.meta = res.data._meta;
                    this.loading = false
                })
            },
            changePage(index){
                this.dataInit(index, this.meta.perPage);
            },
            changeSize(size){
                this.dataInit(this.meta.currentPage, size);
            },
            create(){
                this.$refs.adminForm.resetFields();
                this.form.method = 'post';
                this.form.url = 'user/signup';
                this.$refs.adminForm.resetFields();
                this.modal.title = '添加管理员'
                this.modal.show = true;
            },
            update(index) {
                this.$refs.adminForm.resetFields();
                let field = this.data[index];
                this.form.index = index;
                this.form.method = 'put';
                this.form.url = 'user/modify/' + field.id;
                this.form.data.email = field.email;
                this.form.data.nickname = field.nickname;
                this.form.data.password = '********';
                this.modal.title = '编辑管理员'
                this.modal.show = true;
            },
            remove(index) {
                this.$http.delete('user/' + this.data[index].id).then(res => {
                    this.$Message.success('删除成功');
                    this.dataInit();
                })
            },
            handleSubmit(){
                this.$refs.adminForm.validate((valid) => {
                    if (valid) {
                        this.$http(this.form).then(res =>{
                            let msg = this.form.method == 'post' ? '添加成功' : '修改成功';
                            if (this.form.method == 'post') {
                                this.$Message.success('添加成功');
                                this.data.unshift(res.data);
                            }else{
                                this.$Message.success('修改成功');
                                this.data[this.form.index].email = this.form.data.email;
                                this.data[this.form.index].nickname = this.form.data.nickname;
                            }
                            this.modal.show = false;
                        }).catch(error =>{
                            this.modal.loading = false;
                        })
                    }else{
                        this.modal.loading = false;
                    }
                })
            }
        }
    };
</script>