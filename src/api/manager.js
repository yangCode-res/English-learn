import axios from "~/axios";
export function login(username,password){
return axios.post("login",{
    username: username,
    password: password
})
}
export function register(username,password){
return axios.post("/signup",{
    username: username,
    password: password
})
}
// export function getinfo(){
//     return axios.post("/admin/getinfo")
// }
export function logoutapi(){
    return axios.post("/admin/logout")
}
export function changePassWord(data){
    return axios.post("/admin/updatepassword",data)
}
export function getManagerList(page,query={
}){
    let q=[]
    for (const key in query) {
       if( query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
       }
    }
    let r=q.join("&")
    r=r? ("?"+r):""
    console.log(r);
    return axios.get(`/admin/manager/${page}${r}`)
}
export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{status})
}
export function CreateManager(data){
    return axios.post('admin/manager',data)
}
export function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,data)
}
export function deleteManager(id){
    return axios.post(`/admin/manager/${id}/delete`)
}
export function searchUser(id){
    return axios.get(`/searchUser/${id}`)
}
export function getUserInfo(username){
    return axios.get(`/getinfo/${username}`)
}
export function updateUser(userId,userDetails){
    return axios.put(`/updateUser/${userId}`,userDetails)
    
}
