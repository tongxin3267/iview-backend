<template>  
    <div style="margin-top: -10px">
        <span style="display: block;margin-bottom:10px;font-size: 14px;">{{role.name}} [ {{role.description}} ]</span>
        <CheckboxGroup v-model="formItem.permissions">
            <template v-for="permission in permissions">
                <Checkbox :label="permission.id" style="padding-bottom:15px">{{route.name}} [ {{route.description}} ]</Checkbox> <br/>
            </template>
        </CheckboxGroup>
        <br/>
        <Button type="primary" @click="handleSubmit" :loading="loading">分配权限</Button>
    </div>
</template>
<script>
    import role from '../../api/role'
    import permission from '../../api/permission'
    export default {
        data(){
            return {
                loading:false,
                role:{},
                formItem:{
                    permissions:[]
                },
                permissions:[],
            }
        },
        methods:{
            handleSubmit(){
                this.loading = true
                role.assign(this.role.id,this.formItem).then(response =>{
                    this.$Message.success('设置成功')   
                    this.$router.push({name:'role-index'})      
                    this.loading = false             
                }).catch(error =>{
                    this.$Message.error(error)
                    this.loading = false
                })
            }
        },
        created(){
            let id = this.$route.params.id
            if (id) {
                role.view(id).then(response=>{
                    this.role = response.data
                    let permissions = []
                    response.data.permissions.forEach(item =>{
                        permissions.push(item.id)
                    })
                    this.formItem.permissions = permissions
                }).catch(error=>{
                    this.$Message.error(error)
                })
                permission.appRoute().then(response=>{
                    this.permissions = response.data
                }).catch(error=>{
                    this.$Message.error(error)
                })
            }
        }
    }
</script>