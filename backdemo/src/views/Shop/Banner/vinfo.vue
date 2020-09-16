<template>
  <el-dialog
    :title="info.isAdd ? '添加分类':'修改分类'"
    :visible.sync="info.isShow"
    width="40%"
    @close="cancel"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" label-width="140px" ref="form" :rules="rules">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入轮播图名称"></el-input>
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
import { addBanner, editBanner } from "@/request/banner";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  title: '',
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
        title: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  methods: {
    //图片相关
    see(file) {
        console.log(file);
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
            res = await addBanner(fd);
          } else {
            res = await editBanner(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_banner_list();
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
      if (val.img) {
        this.filelist = [
          {
            name: val.title,
            url: this.$host + val.img
          }
        ];
      }
      val.children ? delete val.children : "";

      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    ...mapActions({
      get_banner_list: "banner/get_banner_list"
    })
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/bannerlist"
    })
  },
  mounted() {
    if (!this.bannerlist.length) {
      this.get_banner_list();
    }
    this.forminfo = { ...resetItem };
  }
};
</script>

<style lang="" scoped>
</style>
