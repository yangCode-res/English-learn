import axios from "~/axios";
export function getSentensByAudioID(id){
return axios.get(`/sentences/${id}`)
}
export function getSentensByAudioIDandUserId(user_id,audio_id){
    return axios.get(`/sentences/user/${user_id}/audio/${audio_id}`)
    }
export function getMenuList(){
       return axios.get(`/api/listening-books/parents`)
}
export function getAudioList(books_id){
    return axios.get(`/api/audio/by-listening-book/${books_id}`)

}