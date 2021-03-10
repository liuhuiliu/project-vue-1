// export default {
//     createTag() {
//         const name = window.prompt('请输入标签名');
//         if (name) {
//             // const message = tagListModel.create(name);
//             // if(message==='duplicated'){
//             //   window.alert('重复')
//             // }else if(message ==='success'){
//             //   window.alert('添加成功')
//             // }
//             // oldstore.createTag(name);//Todo
//             this.$store.commit('createTag', name)
//         }
//     }
// }12.25
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class TagHelper extends Vue {
    createTag() {
                const name = window.prompt('请输入标签名');
                if (name) {
                    // const message = tagListModel.create(name);
                    // if(message==='duplicated'){
                    //   window.alert('重复')
                    // }else if(message ==='success'){
                    //   window.alert('添加成功')
                    // }
                    // oldstore.createTag(name);//Todo
                    this.$store.commit('createTag', name)
                }
            }
}
