<template>
  <el-dialog
    :title="info.isAdd ? '添加规格':'修改规格'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" label-width="140px" ref="form" :rules="rules">
      <el-form-item label="属性名" prop="roleid">
        <el-input v-model="forminfo.specsname" placeholder="请输入属性名"></el-input>
      </el-form-item>

      <el-form-item label="属性值" prop="username">
        <label v-for="(item, index) in list" :key="index">
          <el-input
            style="display:inline-block;width:160px;margin-bottom:10px;"
            v-model="item.value"
            placeholder="请输入属性值"
          ></el-input>

          <el-button v-if="index==0" type="primary" @click="addAttrs">添加属性</el-button>
          <el-button v-else type="dager" @click="delAttrs(index)">删除属性</el-button>
        </label>
      </el-form-item>

      <el-form-item label="状态">
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
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  specsname: "",
  attrs: "",
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
      list: [
        {
          value: ""
        }
      ],
      rules: {
        rules: {
          specsname: [{ required: true, message: "必填！", trigger: "blur" }]
        }
      }
    };
  },
  methods: {
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(idx) {
      this.list.splice(idx, 1);
    },
    //表单提交
    async submit() {
      if (!this.list.every(val => val.value)) {
        this.$message.warning("请输入规格值");
        return;
      }
      this.forminfo.attrs = this.list.map(val => val.value);
      this.forminfo.attrs = this.forminfo.attrs.join(",");
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_specs_list();
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    //重置
    reset() {
      this.forminfo = { ...defaultItem };
    },
    cancel() {
      this.forminfo = { ...resetItem };
      this.list = [{ value: "" }];
    },
    //用于赋值给修改页面的数据
    setInfo(val) {
      this.list = val.attrs.map(v => ({
        value: v
      }));

      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    ...mapActions({
      get_specs_list: "specs/get_specs_list"
    })
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist"
    })
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_specs_list();
    }
    this.forminfo = { ...resetItem };
  }
};
</script>

<style lang="" scoped>
</style>
