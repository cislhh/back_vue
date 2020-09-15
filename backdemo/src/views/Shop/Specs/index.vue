<template>
  <div>
      <el-button type="primary" @click="add">添加规格</el-button>
      <!-- 列表组件 -->
      <Vlist @edit="edit" ></Vlist>
      <!-- 添加修改组件 -->
      <Vinfo :info="info" ref = "dialog"></Vinfo>
  </div>
</template>
<script>
import Vlist from './vlist'
import Vinfo from './vinfo'
export default {
    data(){
        return{ 
            info:{
                isAdd:false,
                isShow:false
            }
        }
    },
    methods:{
        add(){
            this.info.isShow = this.info.isAdd = true
        },
        edit(val){
            this.info.isShow=true;
            this.info.isAdd = false;
            this.$refs.dialog.setInfo(val)
        }
    },
    components:{Vlist,Vinfo}
}
</script>
<style scoped>
</style>