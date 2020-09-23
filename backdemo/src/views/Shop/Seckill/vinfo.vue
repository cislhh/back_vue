<template>
  <el-dialog
    :title="info.isAdd ? '添加商品':'修改商品'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="68%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="100px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-row>
            <el-col :span="12" :offset="5">
              <el-form-item label="活动名称" prop="title">
                <el-input v-model="forminfo.title" placeholder="请输入活动名称"></el-input>
              </el-form-item>
              <el-form-item label="活动期限：" :label-width="formLabelWidth" prop="title">
                <el-date-picker
                  v-model="dateValue"
                  type="datetimerange"
                  align="right"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                  @change="getTime"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="一级分类">
                <el-select v-model="forminfo.first_cateid" @change="topChange" placeholder="请选择">
                  <el-option
                    v-for="item in catelist"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级分类">
                <el-select v-model="forminfo.second_cateid" placeholder="请选择" @change="secChange">
                  <el-option
                    v-for="item in secondlist"
                    :key="item.id"
                    :label="item.catename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品">
                <el-select @change="aaa" v-model="forminfo.goodsid" placeholder="请选择">
                  <el-option
                    v-for="item in goodlist"
                    :key="item.id"
                    :label="item.goodsname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="8" :offset="7">
          <el-form-item label>
            <el-button type="primary" @click="sumbit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入编辑器
import vueWangeditor from "vue-wangeditor";

// 导入  添加和修改的 请求封装方法！
import { addseck, editseck } from "@/request/seckill";
import { getGoods } from "@/request/goods";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  title: "", //限时秒杀名称
  begintime: "", //开始时间
  endtime: "", //结束时间
  first_cateid: "", //商品一级分类编号
  second_cateid: "", //商品二级分类编号
  goodsid: "", //商品编号
  status: "1"
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
      formLabelWidth: "100px",
      dateValue: [],
      dialogVisible: false,
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
      },
      filelist: [], // [{name:'',url:''}]
      activeName: "first",
      secondlist: [], // 二级分类
      goodlist: [] // 二级分类
    };
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
      goodslist: "goods/goodslist"
    })
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_cate_list();
    }
  },
  methods: {
    aaa(i) {
      console.log(i);
      console.log(this.goodlist);
    },
    ...mapActions({
      get_cate_list: "category/get_cate_list",
      //   get_goods_list: "goods/get_goods_list",
      get_seck_list: "seckill/get_seck_list"
    }),
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; // JS 生成的预览地址！
    },
    change(file, fileList) {
      this.forminfo.img = file.raw; // file.raw 是原生文件信息！
    },
    remove(file, fileList) {
      this.forminfo.img = "";
    },
    topChange(id) {
      // 一级分类变化
      this.secondlist = [];
      this.forminfo.second_cateid = "";
      // id就是选中的ID，根据这个ID遍历一级分类数组，找出其对应的chilren就是二级分类列表！
      this.catelist.forEach(val => {
        if (val.id == id) {
          this.secondlist = val.children;
        }
      });
    },
    async secChange(sid,fid=this.forminfo.first_cateid) {
      this.goodlist = [];
      this.forminfo.goodsid = "";
      let res = await getGoods("", "", fid, sid);
      this.goodlist = res;
    },
    setinfo(val) {
      this.topChange(val.first_cateid);
      this.dateValue = [val.begintime, val.endtime];
      defaultItem = { ...val };
   
      console.log(this.forminfo.first_cateid);//没值
    //   this.secChange(val.second_cateid); //放在forminfo前面可以，放在后面不行
      this.secChange(val.second_cateid,val.first_cateid); //放在forminfo前面可以，放在后面不行
      this.forminfo = { ...val };
      console.log(this.forminfo.first_cateid);//有值
    },
    async sumbit() {
      // 表单验证！
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 如果验证通过！
          let res;
          if (this.info.isAdd) {
            // 添加还是修改！
            res = await addseck(this.forminfo);
          } else {
            res = await editseck(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_seck_list(); // 再次获取列表，让仓库里面的数据是最新的！
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
      this.forminfo = { ...resetItem };
      this.filelist = []; // 设为空，就没有了！
      this.dateValue = [];  
    },
    //获取时间
    getTime(e) {
      this.forminfo.begintime = e[0];
      this.forminfo.endtime = e[1];
    }
  }
};
</script>
<style scoped>
</style>