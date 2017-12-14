<style>
.ivu-table:after{display: none}
</style>
<template>
    <div>
        <Button type="primary" style="margin-bottom: 20px">+ 添加管理员</Button>
        <Table 
            ref="adminItems"
            :loading="loading"
            :columns="columns" 
            :data="items" 
            @on-sort-change="sort"
            @on-selection-change="selection"
            style="border: 0"
            >
        </Table>
        <Row class="items-footer">
            <Col span="8">
                <Dropdown style="margin-left: 20px" @on-click="batchAction">
                    <Button type="primary">
                        批量操作
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="deleteAll">批量删除</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
            <Col span="16" style="text-align: right">
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
            </Col>
        </Row>
        <Modal v-model="modal.show" title="修改管理员信息" ok-text="确定" cancel-text="取消" :loading="modal.loading" @on-ok="handelSubmit">
            <Form ref="adminForm" :model="modal.form" :rules="rules" :label-width="100">
                <FormItem label="管理员名称：" prop="nickname">
                    <Input type="text" v-model="modal.form.nickname"></Input>
                </FormItem>
                <FormItem label="登入邮箱：" prop="email">
                    <Input type="text" v-model="modal.form.email"></Input>
                </FormItem>
                <FormItem label="重置密码：" prop="password">
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
    import admin from '../../api/admin'
    import util from '../../libs/util'
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
                    type:'',
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
                        title: 'ID',
                        key: 'id',
                        width: 80,
                        sortable:true,
                    },
                    {
                        title: '管理员昵称',
                        key: 'nickname',
                        sortable:true,
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        sortable:true,
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
                        },
                        sortable:true,
                        filters: [
                            {
                                label: '正常',
                                value: '10'
                            },
                            {
                                label: '禁用',
                                value: '0'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.status == value;
                        },
                        width: 100,
                    },
                    {
                        title: '最后登入时间',
                        render: (h, {row}) => {
                            return h('span',util.formatDate(row.login_time,'yyyy-mm-dd hh:ii'))
                        },
                        sortable:true,
                    },
                    {
                        title: '注册时间',
                        render: (h, {row}) => {
                            return h('span',util.formatDate(row.created_at,'yyyy-mm-dd hh:ii'))
                        },
                        sortable:true,
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
                                            this.remove(row)
                                        }
                                    }
                                },'删除')
                            ]);
                        }
                    }
                ],
                selectionItems:[]
            };
        },
        methods: {
            getItems(page,perPage,sort){
                this.loading = true;
                let params = {
                    "page": page ? page : this.meta.currentPage,
                    "per-page": perPage ? perPage : this.meta.perPage,
                    "sort": sort ? sort : '-id',
                }
                admin.getItems(params).then(response=>{
                    this.items = response.data.items
                    this.meta = response.data._meta
                    this.loading = false
                }).catch(error=>{
                    this.$Message.error(error)
                    this.loading = false
                })
            },
            changePage(page){
                this.getItems(page, this.meta.perPage)
            },
            changeSize(perPage){
                this.getItems(this.meta.currentPage, perPage)
            },
            sort({key,order}){
                let sort = (order === 'asc') ? key : '-'+ key
                this.getItems(null,null,sort)
            },
            selection(items){
                this.selectionItems = items
            },
            batchAction(action){
                let data = ''
                this.selectionItems.forEach((item,index)=>{
                    data += (item.id + ',')
                })
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要批量删除${this.selectionItems.length}个管理员?`,
                    onOk: () => {
                        admin[action]({id:data.substr(0,data.length-1)}).then(response=>{
                            this.$Message.success(response.data + '条数据删除成功！')
                            this.getItems()
                        }).catch(error=>{
                            this.$Message.success(error)
                        })
                    },
                })
            },
            update(row){
                this.$refs.adminForm.resetFields()
                this.modal.form = JSON.parse(JSON.stringify(row))
                this.modal.show = true
            },
            remove(row) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要删除管理员:${row.nickname} ?`,
                    onOk: () => {
                        admin.remove(row.id).then(res => {
                            this.$Message.success('删除成功')
                            this.getItems()
                        }).catch(error=>{
                            this.$Message.success(error)
                        })
                    },
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
                            this.$Message.error(error)
                            this.modal.loading = false
                        })
                    }else{
                        this.modal.loading = false
                    }
                })
                this.$nextTick(() => {this.modal.loading = true})
            }
        },
        created() {
            this.getItems()
        },
    };
</script>