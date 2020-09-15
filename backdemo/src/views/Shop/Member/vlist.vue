<template>
  <div class="table-bg">
    <el-table :data="memberlist" row-key="id">
      <el-table-column prop="uid" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="addtime" label="注册日期" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      memberlist: "member/memberlist",
    })
  },
  mounted() {
    //当前菜单列表没有值，调用获取列表函数
    if (!this.memberlist.length) {
      this.get_member_list();
    }
  },
  methods: {
    ...mapActions({
      get_member_list: "member/get_member_list",
    }),
    //修改
    edit(val) {
      this.$emit("edit", { ...val });
    },
  }
};
</script>

<style lang="" scoped>
</style>
