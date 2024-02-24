import axios from "~/axios";
export function getNovelChapterList(bookId){
    return axios.get(`/api/chapters/book/${bookId}`)

}
//根据Id查找book信息
export function getNovelInfo(bookId){
    return axios.get(`/api/books/info/${bookId}`)
}
export function getNovelContent(chapterId){
    return axios.get(`/api/contents/chapter/${chapterId}`)

}