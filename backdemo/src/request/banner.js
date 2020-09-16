import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取分类列表
 */
export async function getBanner() {
    let res = await $axios.get("/bannerlist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return []
    }
    // console.log(res);
}
/**
 * 添加分类
 * @param {*} data  添加的数据
 */
export  function addBanner(data){
    return  $axios.post("/banneradd",data)
    // console.log(res);
}
/**
 * 修改分类
 * @param {*} data  修改的数据
 */
export function editBanner(data) {
    return $axios.post("/banneredit",data)
    console.log(res);
}
/**
 * 删除分类
 * @param {*} id  删除的ID
 */
export function delBanner(id) {
    return $axios.post("/bannerdelete",{id})
}