import { useAppDispatch } from "../rtk/hooks";
import axios from "axios";
import { setUserName } from "../rtk/userNameSlice";
import { setUserNameInCart } from "../rtk/cartSlice";

const AutomaticLogIn = async () => {
  const dispatch = useAppDispatch();
  const baseURL = import.meta.env.VITE_SERVER_API_OLD;

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email && password) {
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post(`${baseURL}/users/login`, userData);
      if (response.data) {
        const userName = response.data.user;
        dispatch(setUserName(userName));
        dispatch(
          setUserNameInCart(`${userName.firstName} ${userName.lastName}`)
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
};

export default AutomaticLogIn;
