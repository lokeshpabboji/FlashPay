import { atom } from "recoil";

export const userInfoAtom = atom({
    key: "userInfo",
    default : {
        id : -1,
        name : '',
        phone : '',
        email : ''
    }
})