import { useRecoilState } from "recoil"
import { isButtonClicked } from "../atoms/isButtonClicked"

export const useIsButtonClicked = () => {
    const value = useRecoilState(isButtonClicked);
    return value;
}   