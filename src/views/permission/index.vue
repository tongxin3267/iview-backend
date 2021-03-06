<template>
    <div class="content-wrap">
        <Button type="primary" style="margin-bottom: 20px" @click="create">
            <Icon type="plus-round"></Icon> 添加权限
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
                        <DropdownItem name="deleteAll"><Icon type="trash-a"></Icon> 批量删除</DropdownItem>
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
                <FormItem label="权限标识" prop="name">
                    <Input v-model="modal.formItem.name"></Input>
                </FormItem>
                <FormItem label="权限名称" prop="title">
                    <Input v-model="modal.formItem.title"></Input>
                </FormItem>
                <FormItem label="权限描述" prop="description">
                    <Input v-model="modal.formItem.description"></Input>
                </FormItem>
            </Form>
        </Modal> 
    </div>
</template>
<script>
    import permission from '../../api/permission'
    import util from '../../libs/util'
    export default {
        data() {
            return {
                loading:true,
                data:[],
                page:{
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
                        title: '权限标识',
                        key: 'name',
                        sortable:true,
                        width:160
                    },
                    {
                        title: '权限名称',
                        key: 'title',
                        sortable:true,
                    },
                    {
                        title: '权限描述',
                        key: 'description',
                        width:300
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
                        width:150,
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
                    id:null,
                    show:false,
                    loading:true,
                    title:'',
                    formItem:{
                        name:'',
                        title:'',
                        description:''
                    },
                },
                rules:{
                    name:[
                        { required: true, message: '权限标识不能为空', trigger: 'blur' },
                    ],
                    title:[
                        { required: true, message: '权限名称不能为空', trigger: 'blur' },
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
                permission.getData(params).then(response=>{
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
                    this.selection.forEach((item,index)=>{
                        params.push(item.id)
                    })
                }
                data[action] = params;
                text = msg[action] ? msg[action] : '批量操作'
                this.$Modal.confirm({
                    title: text,
                    content: `您确定要${text}${data.length}条数据?`,
                    onOk: () => {
                        permission.batch(data).then(response=>{
                            this.$Message.success(`${text}${response.data}条数据成功`)
                            this.getData()
                        }).catch(error=>{
                            this.$Message.success(error)
                        })
                    },
                })

            },
            batchAction(action){
                if (action === 'deleteAll') {
                    let data = ''
                    this.selectionItems.forEach((item,index)=>{
                        data += (item.id + ',')
                    })
                    this.$Modal.confirm({
                        title: '确认删除',
                        content: `您确定要批量删除${this.selectionItems.length}条数据吗?`,
                        onOk: () => {
                            permission.batch({id:data.substr(0,data.length-1)}).then(response=>{
                                this.$Message.success(response.data + '条数据删除成功！')
                                this.getItems()
                            }).catch(error=>{
                                this.$Message.error(error)
                            })
                        },
                    })
                }
            },
            create(){
                this.$refs.formItem.resetFields();
                this.modal.id = null
                this.modal.title='添加权限'
                this.modal.show = true
            },
            update(row){
                this.$refs.formItem.resetFields();
                this.modal.id = row.id
                this.modal.formItem.name = row.name
                this.modal.formItem.title = row.title
                this.modal.formItem.description = row.description
                this.modal.title='修改权限'
                this.modal.show = true
            },
            delete(row) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要删除:${row.name} ?`,
                    onOk: () => {
                        permission.delete(row.id).then(res => {
                            this.$Message.success('删除成功')
                            this.getItems()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                })
            },
            handleSubmit(){
                this.$refs.formItem.validate((valid) => {
                    if (valid) {
                        if (this.modal.id) {
                            permission.update(this.modal.id,this.modal.formItem).then(response=>{
                                this.$Message.success('修改成功')
                                this.modal.show = false
                                this.getItems()
                            }).catch(error=>{
                                this.$Message.error(error)
                                this.modal.loading = false
                            })
                        }else{
                            permission.create(this.modal.formItem).then(response=>{
                                this.$Message.success('添加成功')
                                this.modal.show = false
                                this.getItems()
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
            this.getItems()
        },
    };
</script>