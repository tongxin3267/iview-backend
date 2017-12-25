<template>
    <div class="content-wrap">
    	<Form :model="formItem" :label-width="90">
    		<Row>
    			<Col span="8">
		    		<FormItem label="页面标识">
			            <Input v-model="formItem.catname" placeholder="Enter something..."></Input>
			        </FormItem>
		            <FormItem label="页面标题">
			            <Input v-model="formItem.title" placeholder="Enter something..."></Input>
			        </FormItem>
		        </Col>
		        <Col span="24">
		        	<FormItem label="页面内容">
				    	<quill-editor ref="myTextEditor"  v-model="formItem.content" :config="editorOption"></quill-editor>
				    </FormItem>
		        </Col>
		        <Col span="8">
		        	<FormItem label="SEO标题">
			            <Input v-model="formItem.seo_title" placeholder="Enter something..."></Input>
			        </FormItem>

		        	<FormItem label="SEO关键字">
			            <Input v-model="formItem.seo_keywords" placeholder="Enter something..."></Input>
			        </FormItem>
		        	<FormItem label="SEO描述">
			            <Input v-model="formItem.seo_description" placeholder="Enter something..."></Input>
			        </FormItem>
		        </Col>
	        </Row>
	        <FormItem>
	            <Button type="primary" @click="handleSubmit">Submit</Button>
	            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
	        </FormItem>
	    </Form>
    </div>
</template>

<script>
import page from '../../api/page'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor';

export default {
	components: {
		quillEditor
	},
	data(){
		return {
			id:this.$route.params.id,
			formItem:{
				catname: null,
				title: null,
				content: null,
        	},
        	editorOption: {
                    // something config
            }
		}
	},
    computed:{
    	editor() {
            return this.$refs.myTextEditor.quillEditor;
        },

    },
    methods:{
        handleSubmit(){
        	if (this.id) {
        		page.update(this.id,this.formItem).then(()=>{
        			this.$Message.success('修改成功')
        		}).catch(error=>{
        			this.$Message.error('修改失败')
        		})
        	}
        }
    },
    created(){
    	if (this.id) {
    		page.view(this.id).then(response=>{
    			this.formItem = response.data
    		}).catch(error=>{
    			this.$Message.error(error)
    		})
    	}
    }   
}
</script>

<style>
	.quill-editor{border-radius:6px;border:1px solid #eee;}
	.content-wrap .ql-toolbar.ql-snow{border-bottom:solid #eee;border-width: 0 0 1px 0;}
	.content-wrap .ql-container.ql-snow{border-width: 0}
</style>