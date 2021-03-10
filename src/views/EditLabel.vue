<template>
    <Layout>
        <div class="navBar">
            <Icons class="leftIcon" name="lefticon" @click.native="goBack"/>
            <span class="title">编辑标签</span>
            <Icons class="rightIcon" />
        </div>
        <div class="form-wrapper">
            <FormItem 
            :value="tag.name"
            @update:value="update"
            field-name="备注"
           place-holder="在此处输入标签名"/>
        </div>
        <div class="button-wrapper">
            <ButtonCreate @click="remove">删除标签</ButtonCreate>
        </div>
        
        
    </Layout>
</template>
<script lang="ts">
import tagListModel from '@/models/tagListModel';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FormItem from "@/components/Money/FormItem.vue"
import ButtonCreate from '@/components/ButtonCreate.vue';
import Tags from '@/components/Money/Tags.vue';
import oldstore from '@/store/index2'
// import { component } from 'vue/types/umd';

@Component({
    components:{FormItem,ButtonCreate},
    // computed:{
    //     tag(){
    //         return this.$store.state.currentTag
    //     }
    // }
})
export default class EditLabel extends Vue{
    // tag?: Tag = undefined;
    get tag(){
        return this.$store.state.currentTag
    }
    created(){
        
        const id =this.$route.params.id;
        this.$store.commit('fetchTags')
        this.$store.commit('setCurrentTag',id)//
        if(!this.tag){
            this.$router.replace('/404')
        }
        //x
        // const id = this.$route.params.id
        // console.log(id)
        // // tagListModel.fetch()
        // // window.tagList
        // // const tags = tagListModel.data
        // const tag =window.findTag(id)
        // if(tag){
        //     this.tag = tag
        //     console.log(tag)
        // }else{
        //     this.$router.replace('/404')
        // }
    }
    update(name: string){
        console.log(name)
        // console.log(this.tag)
        // if(this.tag){tagListModel.update(this.tag.id,name)}
        //转移到main。ts中
        if(this.tag){
            this.$store.commit('updateTag', {id:this.tag.id,name})
            // oldstore.updateTag(this.tag.id,name)
            //todo
        }
    }
    remove(){
        if(this.tag){
            // if(tagListModel.remove(this.tag.id)){
            //     this.$router.replace('/labels')
            // }else{
            //     window.alert('删除失败')
            // }
            //以上已经转入main.ts中
            
            //todo
            this.$store.commit('removeTag',this.tag.id)
            // window.alert('删除成功')
            // this.$router.replace('/labels')
            // if(oldstore.removeTag(this.tag.id)){
            //     this.$router.replace('/labels')
            // }else{
            //     window.alert('删除失败')
            // }//12.28
            
        }
        
    }
    goBack(){
        this.$router.replace('/labels')
    }
}
</script>


<style lang="scss" scoped>
.navBar{
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background:white;
    display: flex;
    // position: relative;
    align-items: center;
    justify-content: space-between;
    >.title{
        // border: 1px solid;
    }
    >.leftIcon{
        width: 24px;
        height: 24px;
        // position: absolute;
        // left: 16px;
        // border: 1px solid;
    }
    >.rightIcon{
        width: 24px;
        height: 24px;
        // border: 1px solid RED ;
    }
}
.form-wrapper{
    background: white;
    margin-top: 8px;
}
.button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 28px;
}
</style>