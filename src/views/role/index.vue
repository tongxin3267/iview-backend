<template>
    <div class="content-wrap">
        <Button type="primary" style="margin-bottom: 20px" @click="create">
            <Icon type="plus-round"></Icon> 添加角色
        </Button>
        <Table 
            ref="adminItems"
            :loading="loading"
            :columns="columns" 
            :data="items" 
            @on-sort-change="sort"
            @on-selection-change="selection"
            class="content-table"
            >
        </Table>
        <Row class="content-page">
            <Col span="8">
                <Dropdown @on-click="batchAction"  trigger="click" placement="bottom-start">
                    <Button type="primary">
                        批量操作
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="delete"><Icon type="trash-a"></Icon> 批量删除</DropdownItem>
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
        <Modal
            v-model="modal.show"
            :title="modal.title"
            :loading="modal.loading"
            @on-ok="handleSubmit">
            <Form ref="formItem" :model="modal.formItem" :rules="rules" :label-width="80">
                <br/>
                <FormItem label="角色名称" prop="name">
                    <Input v-model="modal.formItem.name"></Input>
                </FormItem>
                <FormItem label="角色描述" prop="description">
                    <Input v-model="modal.formItem.description"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import role from '../../api/role'
    import util from '../../libs/util'
    export default {
        data() {
            return {
                loading:true,
                data:[],
                meta:{
                    currentPage:1, //当前页面
                    perPage:20, //每页数据
                    totalCount:0, //数据条数
                },
                selection:[],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        sortable:true,
                        width: 100,
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        sortable:true,
                    },
                    {
                        title: '角色描述',
                        key: 'description',
                        sortable:true,
                    },
                    {
                        title: '创建时间',
                        render: (h, {row}) => {
                            return h('span',util.formatDate(row.created_at,'yyyy-mm-dd hh:ii'))
                        },
                        sortable:true,
                    },
                    {
                        title: '更新时间',
                        render: (h, {row}) => {
                            return h('span',util.formatDate(row.updated_at,'yyyy-mm-dd hh:ii'))
                        },
                        sortable:true,
                    },
                    {
                        title: '操作',
                        width:200,
                        render: (h, {row}) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
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
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight: '4px'
                                    },
                                    on: {
                                        click: () => {
                                            this.assign(row)
                                        }
                                    }
                                },'权限'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(row)
                                        }
                                    }
                                },'删除')
                            ]);
                        },
                    }
                ],
                modal:{
                    show:false,
                    loading:true,
                    title:null,
                    formItem:{
                        id:null,
                        name:null,
                        description:null
                    },
                },
                rules:{
                    name:[
                        { required: true, message: '角色名称不能为空', trigger: 'blur' },
                    ],
                    description:[
                        { required: true, message: '角色描述不能为空', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
             getData(page,perPage,sort){
                this.loading = true;
                let params = {
                    "page": page ? page : this.page.currentPage,
                    "per-page": perPage ? perPage : this.page.perPage,
                    "sort": sort ? sort : 'id',
                }
                role.getData(params).then(response=>{
                    this.data = response.data.data
                    this.page = response.data.page
                    this.loading = false
                }).catch(error=>{
                    this.$Message.error(error)
                    this.loading = false
                })
            },
            changePage(page){
                this.getData(page, this.meta.perPage)
            },
            changeSize(perPage){
                this.getData(this.meta.currentPage, perPage)
            },
            sort({key,order}){
                let sort = (order === 'asc') ? key : '-'+ key
                this.getData(null,null,sort)
            },
            selection(items){
                this.selection = items
            },
            batch(action){
                let data = {}, params = [], msg = {delete:'批量删除'}
                if (action === 'delete') {
                    this.selectionItems.forEach((item,index)=>{
                        params.push(item.id)
                    })
                }
                data[action] = params;
                text = msg[action] ? msg[action] : '批量操作'
                this.$Modal.confirm({
                    title: text,
                    content: `您确定要${text}${data.length}条数据?`,
                    onOk: () => {
                        role.batch(data).then(response=>{
                            this.$Message.success(`${text}${response.data}条数据成功`)
                            this.getData()
                        }).catch(error=>{
                            this.$Message.success(error)
                        })
                    },
                })

            },
            create(){
                this.$refs.formItem.resetFields()
                this.modal.title='添加角色'
                this.modal.show = true
            },
            update(row){
                this.$refs.formItem.resetFields()
                this.modal.title='更新角色'
                this.modal.formItem = row
                this.modal.show = true
            },
            assign(row){
                this.$router.push({name:'role-assign',params:{id:row.id}})
            },
            delete(row) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要删除:${row.name} ?`,
                    onOk: () => {
                        role.delete(row.id).then(res => {
                            this.$Message.success('删除成功')
                            this.getData()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                })
            },
            handleSubmit(){
                this.$refs.formItem.validate((valid) => {
                    if (valid) {
                        if (this.formItem.id) {
                            role.update(this.modal.id,this.modal.formItem).then(response=>{
                                this.$Message.success('修改成功')
                                this.modal.show = false
                                this.getData()
                            }).catch(error=>{
                                this.$Message.error(error)
                                this.modal.loading = false
                            })
                        }else{
                            role.create(this.modal.formItem).then(response=>{
                                this.$Message.success('添加成功')
                                this.modal.show = false
                                this.getData()
                            }).catch(error=>{
                                this.$Message.error(error)
                                this.modal.loading = false
                            })
                        }
                    }else{
                        this.modal.loading = false
                    }
                    this.$nextTick(()=> {
                        this.modal.loading = true
                    })
                })
            }
        },
        created() {
            this.getData()
        },
    };
</script>