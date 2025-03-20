import { useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";

/* eslint-disable react/react-in-jsx-scope */
type ContextType = {
  idCheck: boolean;
  linkCheck: number;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileLogOf = () => {
  const { idCheck, linkCheck } = useOutletContext<ContextType>();

  return idCheck && linkCheck === 4
  ? <div>hello LogOff</div>
  : (<ProfileNoLogin />);
}