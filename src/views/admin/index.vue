<style>
.ivu-table:after{display: none}
</style>
<template>
    <div>
        <Button type="primary" style="margin-bottom: 20px" @click="create">+ 添加管理员</Button>
        <Table :loading="loading":columns="columns" :data="items" style="border: 0"></Table>
        <div class="items-meta">
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
        <Modal v-model="modal.show" title="修改管理员信息" ok-text="确定" cancel-text="取消" :loading="modal.loading" @on-ok="handelSubmit">
            <Form ref="adminForm" :model="modal.form" :rules="rules" :label-width="60">
                <FormItem label="昵称：" prop="nickname">
                    <Input type="text" v-model="modal.form.nickname"></Input>
                </FormItem>
                <FormItem label="邮箱：" prop="email">
                    <Input type="text" v-model="modal.form.email"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input type="password" v-model="modal.form.password"></Input>
                </FormItem>
                <FormItem label="状态">
                    <RadioGroup v-model="modal.form.status">
                        <Radio label="10">启用</Radio>
                        <Radio label="0">禁用</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import  admin from '../../api/admin'

    export default {
        data() {
            return {
                loading:true,
                items:[],
                meta:{
                    currentPage:1, //当前页面
                    perPage:20, //每页数据
                    totalCount:0, //数据条数
                },
                modal: {
                    show: false,
                    loading: true,
                    form:{}
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
                        render: (h, {row}) => {
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
                                            this.update(row)
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
                                            this.remove(row.id)
                                        }
                                    }
                                },'删除')
                            ]);
                        }
                    }
                ],
            };
        },
        methods: {
            getItems(page,perPage){
                this.loading = true;
                let params = {
                    "page": page ? page : this.meta.currentPage,
                    "per-page": perPage ? perPage : this.meta.perPage,
                }
                admin.getItems(params).then(response=>{
                    this.items = response.data.items
                    this.meta = response.data._meta
                    this.loading = false
                }).catch(error=>{
                    this.$Message.error(error.message)
                    this.loading = false
                })
            },
            changePage(page){
                this.getItems(page, this.meta.perPage)
            },
            changeSize(perPage){
                this.getItems(this.meta.currentPage, perPage)
            },
            create(){

            },
            update(row){
                this.modal.form = row;
                this.modal.show = true;
            },
            remove(id) {
                admin.remove(id).then(res => {
                    this.$Message.success('删除成功')
                    this.getItems()
                }).catch(error=>{
                    this.$Message.success(error.message)
                })
            },
            handelSubmit(){
                this.$refs.adminForm.validate((valid) => {
                    if (valid) {
                        admin.update(this.modal.form.id,this.modal.form).then(response =>{
                            this.$Message.success('修改成功')
                            this.modal.show = false
                            this.getItems()
                        }).catch(error =>{
                            this.$Message.error(error.message)
                            this.modal.loading = false
                        })
                    }else{
                        this.modal.loading = false
                    }
                })
            }
        },
        created() {
            this.getItems()
        },
    };
</script>