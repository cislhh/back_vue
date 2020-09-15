<template>
  <div class="table-bg">
    <el-table :data="userlist" row-key="id">
      <el-table-column prop="uid" label="UID" align="center"></el-table-column>
      <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改">
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
    <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delUser } from "@/request/user";
export default {
  data() {
    return {
    };
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      userlist: "user/userlist",
      page: "user/page",
      size: "user/size",
      total: "user/total"
    })
  },
  mounted() {
    //当前菜单列表没有值，调用获取列表函数
    if (!this.userlist.length) {
      this.get_user_list();
    }
  },
  methods: {
    set_size(val) {
      console.log(`每页 ${val} 条`);
    },
    set_page(val) {
      console.log(`当前页: ${val}`);
    },
    ...mapActions({
      get_user_list: "user/get_user_list",
      set_size:"user/set_size",
      set_page:"user/set_page",
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
        let res = await delUser(id);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.get_user_list(); // 重新获取列表！
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
