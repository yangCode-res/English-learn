import axios from "~/axios";
export function words() {
  return axios.get("/words");
}
export function cet4words(page){
    return axios.get(`/cet4words?page=${page}`,)
}
export function recitewords(userid){
  return axios.get(`user/${userid}/review-words`)
}
export function rememberedwords(userid,word_id){
  console.log(word_id);
  return axios.post(`/user/${userid}/words/${word_id}/remember`)
}