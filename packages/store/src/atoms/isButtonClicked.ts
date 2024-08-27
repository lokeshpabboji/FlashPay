import { atom } from "recoil";

export const isButtonClicked = atom<boolean>({
    key: "isButtonClicked",
    default: false,
})