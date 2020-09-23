import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取规格列表
 */
export async function getseck() {
    let res = await $axios.get("/secklist", {})
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加规格
 * @param {*} data  添加的数据
 */
export function addseck(data) {
    return $axios.post("/seckadd", data)
}
/**
 * 修改规格
 * @param {*} data  修改的数据
 */
export function editseck(data) {
    return $axios.post("/seckedit", data)
}
/**
 * 删除规格
 * @param {*} uid  删除的id
 */
export function delseck(id) {
    return $axios.post("/seckdelete", { id })
}

