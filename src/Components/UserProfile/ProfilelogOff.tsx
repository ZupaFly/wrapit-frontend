import { useNavigate, useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";

/* eslint-disable react/react-in-jsx-scope */
type ContextType = {
  idCheck: boolean;
  linkCheck: number;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileLogOf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idCheck, linkCheck } = useOutletContext<ContextType>();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(clearUser())
    navigate('/', { replace:true })
  }

  return idCheck && linkCheck === 4
  ? (
    <div className="">
      <h2 className="text-gray-100 text-[20px] font-bold mb-4">
        Вийти дійсно хочете вийти з кабінету?
      </h2>
      <div className="flex gap-4">
        <button
            onClick={handleLogOut}
            className="w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium bg-primary cursor-pointer">
              Так
          </button>
          <button
            onClick={() => navigate('../../shop')}
            className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 bg-primary cursor-pointer'>
            Ні, до магазину
          </button>
      </div>
    </div>
  )
  : (<ProfileNoLogin />);
}