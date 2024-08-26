import { atom } from "recoil";

export const amountAtom = atom<number>({
    key: "amount",
    default: 0,
})