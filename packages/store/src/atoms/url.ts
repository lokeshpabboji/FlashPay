import { atom } from "recoil";

export const urlAtom = atom<string>({
    key: "url",
    default: "HDFC Bank",
})