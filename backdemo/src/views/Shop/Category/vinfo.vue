<template>
  <el-dialog
    :title="info.isAdd ? '添加分类':'修改分类'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" label-width="140px" ref="form" :rules="rules">
      <el-form-item label="上级分类">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in catelist"
            :label="item.catename"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称">
        <el-input v-model="forminfo.catename" placeholder="请输入分类名"></el-input>
      </el-form-item>

      <el-form-item label="分类图片">
        <el-upload
          action
          :auto-upload="false"
          list-type="picture-card"
          :limit="1"
          :on-preview="see"
          :on-change="change"
          :on-remove="remove"
          :file-list="filelist"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
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
import { addCategory, editCategory } from "@/request/category";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  catename: "",
  img: "",
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
      dialogVisible: false,
      dialogImageUrl: "",
      filelist: [],

      forminfo: { ...defaultItem },
      rules: {
        rules: {
          catename: [{ required: true, message: "必填！", trigger: "blur" }]
        }
      }
    };
  },
  methods: {
    //图片相关
    see(file) {
      //预览
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    change(file, fileList) {
      //原生文件信息
      this.forminfo.img = file.raw;
    },
    remove(file) {
      //删除文件时候清除
      this.forminfo.img = "";
    },

    //表单提交
    async submit() {
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          //formData文件提交
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            res = await addCategory(fd);
          } else {
            res = await editCategory(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_cate_list();
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
      this.filelist = [];
    },
    //用于赋值给修改页面的数据
    setInfo(val) {
      //
    if(val.img){
        this.filelist=[{
            name:val.catename,
            url:this.$host+val.img
        }]
    }
    val.children ? delete val.children:''

      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    ...mapActions({
      get_cate_list: "category/get_cate_list"
    })
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist"
    })
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_cate_list();
    }
    this.forminfo = { ...resetItem };
  }
};
</script>

<style lang="" scoped>
</style>
