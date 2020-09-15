import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取管理员列表
 */
export async function getMember() {
    let res = await $axios.get("/memberlist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 获取管理员列表(一条)
 */
export async function getOneMember(uid) {
    let res = await $axios.get("/memberinfo",{
        params:{
            uid
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export  function addMember(data){
    return  $axios.post("/memberadd",data)
    // console.log(res);
}
/**
 * 修改管理员
 * @param {*} data  修改的数据
 */
export function editMember(data) {
    return $axios.post("/memberedit",data)
    console.log(res);
}