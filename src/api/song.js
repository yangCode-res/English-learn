import axios from "~/axios";
export function getAllSongs() {
        return axios.get("/api/songs/getAll");
}
export function getSongLyric(songId){
        return axios.get(`/api/songs/getById/${songId}`)
}