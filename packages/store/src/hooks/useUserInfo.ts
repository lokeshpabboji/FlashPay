import { useRecoilState } from 'recoil';
import { userInfoAtom } from './../atoms/userInfo';

export const useUserData = () => {
  const [userData, setUserData] = useRecoilState(userInfoAtom);
  return { userData, setUserData };
};