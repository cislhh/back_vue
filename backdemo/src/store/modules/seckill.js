// 获取菜单列表！
import { getseck } from "@/request/seckill"


export default {
    namespaced: true,
    state: {
        secklist: [],  // 列表
    },
    getters: {
        secklist: state => state.secklist,
    },
    mutations: {
        SET_LIST(state, data) {
            state.secklist = data;
        }
    },
    actions: {
        // 请求菜单列表的数据！
        async get_seck_list({ commit, state, dispatch }) {
            let res = await getseck(state.page, state.size);
            res.forEach(val=>{
                val.specsattr = val.specsattr ? val.specsattr.split(","):[]
            })
            commit('SET_LIST', res)
        }
    }
};