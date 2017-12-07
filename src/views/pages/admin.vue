<template>
    <div>
        <Button type="primary" style="margin-bottom: 20px">+ 添加管理员</Button>
        <Table :columns="columns" :data="data" style="border-width: 0"></Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        type: 'selection'
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        sortable: true
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
                        key: 'status'
                    },
                    {
                        title: '注册时间',
                        key: 'created_at'
                    },
                    {
                        title: '操作',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data: [ ]
            };
        },
        mounted() {
            this.$http.get('user').then(res =>{
                this.data = res.data;
            })
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data[index].nickname}`
                })
            },
            remove (index) {
                this.data.splice(index, 1);
            }


        }
    };
</script>