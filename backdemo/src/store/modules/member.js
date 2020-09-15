// 获取会员管理列表！
import { getMember,getOneMember} from "@/request/member"

export default {
    namespaced:true,
    state: {
        memberlist:[],  // 角色列表
        onememberlist:[],  // 角色列表
    },
    getters: {
        memberlist: state => state.memberlist,
        onememberlist: state => state.onememberlist,
    },
    mutations: {
        SET_LIST(state,data){
            state.memberlist = data;
        },
        SET_ONE_LIST(state,data){
            state.onememberlist = data;
        },
    },
    actions: {
        // 请求会员管理列表的数据！
        async get_member_list({commit,state}){
            let res = await getMember();  
            commit('SET_LIST',res)
        },
        async get_onemember_list({commit,state}){
            let res = await getOneMember(state.pid);  
            commit('SET_ONE_LIST',res)
        }
    }
};