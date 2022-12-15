import { getPsbUserInfoApi } from "./userAPI"

export const getPsbUserInfo = async () => {
    const response = await getPsbUserInfoApi();
    return response.data;
};