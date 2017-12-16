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
</template>
<script>
    import role from '../../api/role'
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
                        width:150,
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
                                            this.delete(row)
                                        }
                                    }
                                },'删除')
                            ]);
                        },
                    }
                ],
            }
        },
        methods: {
            getItems(page,perPage,sort){
                this.loading = true;
                let params = {
                    "page": page ? page : this.meta.currentPage,
                    "per-page": perPage ? perPage : this.meta.perPage,
                    "sort": sort ? sort : 'name',
                }
                role.getItems(params).then(response=>{
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
                    let data = ''
                    this.selectionItems.forEach((item,index)=>{
                        data += (item.id + ',')
                    })
                    this.$Modal.confirm({
                        title: '确认删除',
                        content: `您确定要批量删除${this.selectionItems.length}条数据吗?`,
                        onOk: () => {
                            role.deleteAll({id:data.substr(0,data.length-1)}).then(response=>{
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
                this.$router.push({name:'role-create'})
            },
            update(row){
                this.$router.push({name:'role-update',params:{id:row.id}})
            },
            delete(row) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: `您确定要删除:${row.name} ?`,
                    onOk: () => {
                        role.delete(row.id).then(res => {
                            this.$Message.success('删除成功')
                            this.getItems()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                })
            },
        },
        created() {
            this.getItems()
        },
    };
</script>