import { atom } from "recoil";

export const urlAtom = atom<string>({
    key: "url",
    default: 'https://netbanking.hdfcbank.com',
})