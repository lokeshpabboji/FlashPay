import { useRecoilState } from "recoil"
import { amountAtom } from "../atoms/balance"

export const useAmount = () => {
    const value = useRecoilState(amountAtom);
    return value;
}   