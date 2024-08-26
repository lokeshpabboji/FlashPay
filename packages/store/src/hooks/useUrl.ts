import { useRecoilState } from "recoil"
import { urlAtom } from "../atoms/url"

export const useUrl = () => {
    const value = useRecoilState(urlAtom);
    return value;
}   