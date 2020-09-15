<template>
  <el-dialog
    :title="info.isAdd ? '添加':'修改'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" label-width="140px" ref="form" :rules="rules">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>

      <el-form-item label="权限">
        <el-tree
          :data="menulist"
          node-key="id"
          show-checkbox
          :props="{children:'children',label:'title'}"
          ref="tree"
          :check-strictly="checkStrictly"
        ></el-tree>
      </el-form-item>

      <el-form-item label="角色状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset" v-if="info.isAdd==false">重置</el-button>
        <el-button type="warning" @click="cancel" v-if="info.isAdd==true">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getRole, editRole, addRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
  status: 1 // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false
        };
      }
    }
  },

  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        rules: {
          // 验证规则对象！
          rolename: [{ required: true, message: "必填！", trigger: "blur" }]
        }
      },
      checkStrictly: false
    };
  },
  methods: {
    childrenArr() {
      //   this.$refs.tree.getCheckedKeys()
    },
    //表单提交
    async submit() {
      //节点拼接
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      this.forminfo.menus = idarr;
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list();
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
        console.log(idarr);
      });
    },
    //重置
    reset() {
      this.forminfo = { ...defaultItem };
    },
    cancel() {
      this.$refs.tree.setCheckedKeys([]);
      this.forminfo = { ...resetItem };
    },
    //用于赋值给修改页面的数据
    setInfo(val) {
      let idarr = val.menus.split(",");
      if(idarr[0]){
          this.checkStrictly=true
          this.$nextTick(()=>{
              this.$refs.tree.setCheckedKeys(idarr);
              this.checkStrictly=false;
          })
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list"
    })
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
    this.forminfo = { ...resetItem };
  }
};
</script>

<style lang="" scoped>
</style>
