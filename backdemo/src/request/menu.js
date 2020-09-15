import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getMenu() {
    let res = await $axios.get("/menulist?istree=1")
    if(res.code==200){
        return res.list
    }else{
        return []
    }
    // console.log(res);
}
/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export  function addMenu(data){
    return  $axios.post("/menuadd",data)
    // console.log(res);
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editMenu(data) {
    return $axios.post("/menuedit",data)
    console.log(res);
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delMenu(id) {
    return $axios.post("/menudelete",{id})
}