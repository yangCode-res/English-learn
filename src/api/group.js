import axios from "~/axios";
export function createGroup(data){
    return axios.post('/api/groups/create', data);
}
export function getGroups(userId){
    return axios.get(`/api/groups/get/${userId}`)
}
//获取群聊的所有用户
export function getUserByGroupId(groupId,){
    return axios.get(`/api/groups/${groupId}/users`)
}
//查询群聊记录
export function getChatHistory(groupId){
    return axios.get(`/api/messages/get/${groupId}`)
}
//发送消息
export function sendMessage(messageData){
    return axios.post("/api/messages/send", messageData)
}