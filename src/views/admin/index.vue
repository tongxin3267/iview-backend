<template>
    <div class="content-wrap">
        <div class="content-list">
            <Button type="primary" style="margin-bottom: 20px" @click="create">
                <Icon type="plus-round"></Icon> 添加管理员
            </Button>
            <Table 
                :loading="loading"
                :columns="columns" 
                :data="data" 
                @on-sort-change="changeSort"
                @on-selection-change="changeSelection"
                class="content-table"
                >
            </Table>
            <Row class="content-page">
                <Col span="8">
                    <Dropdown @on-click="batch"  trigger="click" placement="bottom-start" style="margin-left: 20px">
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
                        :total="page.totalCount" 
                        :page-size="page.perPage" 
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
                data:[],
                page:{
                    currentPage:1, //当前页面
                    perPage:20, //每页数据
                    totalCount:null, //数据总条数
                },
                sort:null,
                selection:[],
                columns:[
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
                            if (row.roles) {
                                let arr = []
                                row.roles.forEach((item)=>{
                                    arr.push(h('Tag', {
                                        props: {
                                            color: 'blue'
                                        },
                                    }, item.name))
                                })
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
                        key: 'login_time',
                        sortable:true,
                    },
                    {
                        title: '注册时间',
                        key: 'created_at',
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
                ] 
            };
        },
        methods: {
            fetchData(){
                this.loading = true
                let params = {
                    page : this.page.currentPage,
                    per_page : this.page.perPage,
                    sort : this.sort,
                }
                admin.all(params).then(response=>{
                    this.data = response.data.data
                    this.page = response.data.page
                    this.loading = false
                }).catch(error=>{
                    this.$Message.error(error)
                    this.loading = false
                })
            },
            changePage(page){
                this.page.page = page
                this.fetchData()
            },
            changeSize(perPage){
                this.page.perPage = perPage
                this.fetchData()
            },
            changeSort({key,order}){
                this.sort = (order === 'asc') ? key : (order === 'desc') ? '-'+ key : null
                this.fetchData()
            },
            changeSelection(items){
                this.selection = items
            },
            batch(action){
                let data = {}, params = [], text;
                if(action === 'delete'){
                    text = '批量删除'
                    this.selection.forEach((item,index)=>{
                        params.push(item.id)
                    })
                }
                data[action] = params
                this.$Modal.confirm({
                    title: text,
                    content: `您确定要${text}${params.length}条数据?`,
                    onOk: () => {
                        admin.batch(data).then(response=>{
                            this.$Message.success(`${text}${response.data}条数据成功`)
                            this.fetchData()
                        }).catch(error=>{
                            this.$Message.success(error)
                        })
                    },
                })

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
                    content: `您确定要删除:${row.nickname} ?`,
                    onOk: () => {
                        admin.delete(row.id).then(response => {
                            this.$Message.success('删除成功')
                            this.fetchData()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                })
            }
        },
        mounted() {
            this.fetchData()
        },
    };
</script>