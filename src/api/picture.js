import axios from "~/axios";
export function getAllPictureList() {
    return axios.get('/upload/getAllavatar')
}
export const uploadImageAction="/api/upload/tengxun"