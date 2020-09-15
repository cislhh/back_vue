<template>
  <div class="table-bg">
    <el-table :data="catelist" row-key="id" :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
      <el-table-column label="分类图片">
        <template slot-scope="scope">
          <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | imgUrl" alt />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delCategory } from "@/request/category";
export default {
  data() {
    return {};
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      catelist: "category/catelist"
    })
  },
  mounted() {
    //当前菜单列表没有值，调用获取列表函数
    if (!this.catelist.length) {
      this.get_cate_list();
    }
  },
  methods: {
    ...mapActions({
      get_cate_list: "category/get_cate_list",
    }),
    //修改
    edit(val) {
      this.$emit("edit", { ...val });
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await delCategory(id);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.get_cate_list(); // 重新获取列表！
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>
