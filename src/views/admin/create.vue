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