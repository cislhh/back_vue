//获取菜单列表
import{getCategory}from "@/request/category"
export default {
    namespaced:true,
    state:{
        catelist:[]
    },
    getters:{
        catelist:state=>state.catelist 
    },
    mutations:{
        SET_LIST(state,data){
            state.catelist = data
        }
    },
    actions:{
        async get_cate_list({commit}){
            let res = await getCategory();
            // console.log(res);
            commit("SET_LIST",res)
        }
    }
}