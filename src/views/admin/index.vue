<template>
    <div class="content-wrap">
        <div class="content-list">
            <Button type="primary" style="margin-bottom: 20px" @click="create">
                <Icon type="plus-round"></Icon> 添加管理员
            </Button>
            <Table 
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
                    <Dropdown @on-click="batchAction"  trigger="click" placement="bottom-start" style="margin-left: 20px">
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
        </div>
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
                columns: [
                    {
                        type: 'selection',
                        width: 60,
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
                        title: '角色',
                        key: 'roles',
                        sortable:true,
                        render: (h, {row}) => {
                            let arr = []
                            row.roles.forEach((item)=>{
                                arr.push(h('Tag', {
                                    props: {
                                        color: 'blue'
                                    },
                                }, item.name))
                            })
                            if (arr.length) {
                                return h('div', arr)
                            }else{
                                return h('Tag', {
                                    props: {
                                        color: 'blue'
                                    },
                                }, '未分配')
                            }
                        },
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:100,
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
                if (action === 'deleteAll') {
                    let data = []
                    this.selectionItems.forEach((item,index)=>{
                        data.push(item.id)
                    })
                    this.$Modal.confirm({
                        title: '确认删除',
                        content: `您确定要批量删除${data.length}条数据吗?`,
                        onOk: () => {
                            admin.batch({delete:data}).then(response=>{
                                this.$Message.success(response.data + '条数据删除成功！')
                                this.getItems()
                            }).catch(error=>{
                                this.$Message.success(error)
                            })
                        },
                    })
                }
            },
            create(){
                this.$router.push({name:'admin-create'})
            },
            update(row){
                this.$router.push({name:'admin-update',params:{id:row.id}})
            },
            delete(row) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要删除管理员:${row.nickname} ?`,
                    onOk: () => {
                        admin.delete(row.id).then(res => {
                            this.$Message.success('删除成功')
                            this.getItems()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                })
            }
        },
        created() {
            this.getItems()
        },
    };
</script>