/* eslint-disable react/react-in-jsx-scope */
import { useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";

type ContextType = {
  idCheck: boolean;
  linkCheck: number;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckOrderStatus = () => {
  const { idCheck, linkCheck } = useOutletContext<ContextType>();

  return idCheck && linkCheck === 3
  ? (<div>hello order</div>)
  : (<ProfileNoLogin />);
}