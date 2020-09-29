<template>
  <div>
    <h3 class="logo">小U商城后台</h3>
    <!-- 菜单组件！！！ -->
    <el-menu
      class="page-menu"
      background-color="#444"
      text-color="#fff"
      router
      :default-active="$route.path"
      :collapse="iscollapse"
    >
      <el-menu-item index="/index">
        <i class="el-icon-house"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 动态渲染左边的权限栏目 -->
      <template v-for="(item,index) in menus">
        <el-menu-item :index="item.url" v-if="item.type==2">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>

        <el-submenu :index="index+''" v-else>
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item v-for="(val,idx) in item.children" :index="val.url" :key="idx">{{val.title}}</el-menu-item>
        </el-submenu>
      </template>
      <!-- <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统设置</span></template>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-goods"></i><span slot="title">商城管理</span></template>
          <el-menu-item index="/category">分类管理</el-menu-item>
          <el-menu-item index="/specs">规格管理</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀管理</el-menu-item>
      </el-submenu>-->
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      menus: "user/menus"
    })
  },
  methods: {},
  components: {}
};
</script>
<style scoped>
.logo {
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: cyan;
  white-space: nowrap;
  overflow: hidden;
}
.page-menu {
  border-right: none;
}
</style>