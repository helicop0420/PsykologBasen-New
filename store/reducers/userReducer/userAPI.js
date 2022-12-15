import api from "../../../config/api";

export function getPsbUserInfoApi() {
    return api.get(`auth/user`);
}