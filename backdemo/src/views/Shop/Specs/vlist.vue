<template>
  <div class="table-bg">
    <el-table :data="specslist" row-key="id">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" align="center"></el-table-column>

        <el-table-column label="规格值" align="center">
            <template slot-scope="scope">
             <el-tag type="success" v-for="(item, index) in scope.row.attrs" :key="index">{{item}}</el-tag>
            </template>
        </el-table-column>
        

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
import { delSpecs } from "@/request/specs";
export default {
  data() {
    return {
    };
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      specslist: "specs/specslist",
      page: "specs/page",
      size: "specs/size",
      total: "specs/total"
    })
  },
  mounted() {
    //当前菜单列表没有值，调用获取列表函数
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },
  methods: {
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      set_size:"specs/set_size",
      set_page:"specs/set_page",
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
        let res = await delSpecs(id);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.get_specs_list(); // 重新获取列表！
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
