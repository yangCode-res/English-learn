import axios from "~/axios";
export function addFriends(userId, friendId) {
  return axios.post("/api/friends/add", null, {
    params: {
      userId: userId,
      friendId: friendId,
    },
  });
}

export function requestFriends(requesterId, recipientId) {
  return axios.post("/api/friends/request", null, {
    params: {
      requesterId: requesterId,
      recipientId: recipientId,
    },
  });
}
export function unreadMessages(userId) {
  return axios.get("/api/friends/unread", {
    params: {
      userId: userId,
    },
  });
}
export function markMessageRead(referenceId,userId,notificationType) {
    return axios.post("/api/friends/markAsRead",null,{
        params:{
            referenceId:referenceId,
            userId:userId,
            notificationType:notificationType
        }
    })

}

export function getAllFriends(userId) {
  return axios.get(`/api/friends/${userId}/friends`)
}
//存储消息记录
export function saveMessageRecord(senderUserId,receiverUserId,message){
  return axios.post('/api/chat/store',{
    senderUserId:senderUserId,
    receiverUserId:receiverUserId,
    message:message
  })

}
//查询与当前用户的聊天记录
export function queryChatRecords(user1Id,user2Id){
  return axios.get('/api/chat/history',{
    params:{
      user1Id:user1Id,
      user2Id:user2Id
    }
  })
}