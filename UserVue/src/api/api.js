import request, { post, get } from "@/utils/request";

// export function products(params) {
//     return request({
//       url: "/api/v1/products",  //接口路径
//       method: "get",  //接口方法
//       headers: { 'Content-Type': 'multipart/form-data' }, //给接口添加请求头
//       params  //接口参数
//     });
// }

// 登陆
export const login = (params) => post("/login",params)
//登出
export const logout = () => get("/login/logout")
//获取登陆用户信息
export const getUser = () => get("/user/getUserInfo")
//保存用户
export const saveUser = (params) => post("/user/saveUser",params)
//获取邮箱验证码
export const getEmailReg = (params) => get("/user/getEmailReg",params)
//忘记密码
export const forgetPassword = (params) => post("/user/forgetPassword",params)
//更新用户
export const editUser = (params) => post("/user/editUser",params)
//修改密码
export const changePassword = (params) => post("/user/changePassword",params)
//获取首页公告
export const getCarAnnouncementFive = (params) => get("/announcement/getCarAnnouncementFive",params)
//获取首页汽车
export const getCarListThree = (params) => get("/list/getCarListThree",params)
//获取车辆类型 
export const getCarTypeList = (params) => get("/type/getCarTypeList",params)
//查询汽车信息
export const getCarListPage = (params) => post("/list/getCarListPage",params)
//查询论坛
export const getCarForumPage = (params) => post("/forum/getCarForumPage",params)
//保存论坛
export const saveCarForum = (params) => post("/forum/saveCarForum",params)
//查询公告
export const getCarAnnouncementPage = (params) => post("/announcement/getCarAnnouncementPage",params)
//查询咨询
export const getCarSeekPage = (params) => get("/seek/getCarSeekList",params)
//保存咨询
export const saveCarSeek = (params) => post("/seek/saveCarSeek",params)
//根据id查询汽车信息
export const getCarListById = (params) => get("/list/getCarListById",params)
//保存租赁订单
export const saveCarOrder = (params) => post("/order/saveCarOrder",params)
//根据id查询论坛
export const getCarForumById = (params) => get("/forum/getCarForumById",params)
//查询论坛评论
export const getCarForumItemPage = (params) => post("/item/getCarForumItemPage",params)
//保存论坛评论
export const saveCarForumItem = (params) => post("/item/saveCarForumItem",params)
//论坛点赞
export const addLiked = (params) => get("/forum/addLiked",params)
//根据id查询公告
export const getCarAnnouncementById = (params) => get("/announcement/getCarAnnouncementById",params)
//公告点赞
export const addAnnLiked = (params) => get("/announcement/addLiked",params)
//查询租赁订单
export const getCarOrderPage = (params) => post("/order/getCarOrderPage",params)
//保存车辆故障
export const saveCarFault = (params) => post("/fault/saveCarFault",params)
//查询还车记录
export const getCarReturnByOrder = (params) => get("/return/getCarReturnByOrder",params)
//更新汽车归还
export const editCarReturn = (params) => post("/return/editCarReturn",params)
//查询车辆故障
export const getCarFaultPage = (params) => post("/fault/getCarFaultPage",params)
//查询罚款
export const getCarFinePage = (params) => post("/fine/getCarFinePage",params)
//更新罚款
export const editCarFine = (params) => post("/fine/editCarFine",params)
//删除CarForum
export const removeCarForum = (params) => get("/forum/removeCarForum",params)

//-------------------------------收藏---------------------------------------
//查询收藏
export const getCarFavorPage = (params) => post("/favor/getCarFavorPage",params)
//根据id查询收藏
export const getCarFavorById = (params) => get("/favor/getCarFavorById",params)
//保存收藏
export const saveCarFavor = (params) => post("/favor/saveCarFavor",params)
//更新收藏
export const editCarFavor = (params) => post("/favor/editCarFavor",params)
//删除CarFavor
export const removeCarFavor = (params) => get("/favor/removeCarFavor",params)
//获取收藏
export const getFavor = (params) => get("/favor/getFavor",params)
