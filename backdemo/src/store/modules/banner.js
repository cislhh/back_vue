//获取菜单列表
import{getBanner}from "@/request/banner"
export default {
    namespaced:true,
    state:{
        bannerlist:[]
    },
    getters:{
        bannerlist:state=>state.bannerlist 
    },
    mutations:{
        SET_LIST(state,data){
            state.bannerlist = data
        }
    },
    actions:{
        async get_banner_list({commit}){
            let res = await getBanner();
            commit("SET_LIST",res)
        }
    }
}