import { useState } from "react";
import InputComponent from "../Component/InputComponent";
import ButtonComponent from "../Component/ButtonComponent";
import HideShowValue from "../Component/show_hide_value";
import {
  LoadingIndicator1,
  InteractionBlocker,
} from "../Component/Loading indicator";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (userData.email.trim() === "" || userData.password.trim() === "")
      return toast.error("Email and Password required");

    setIsloading(true);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((usercredential) => {
        const user = usercredential.user;

        localStorage.setItem("Prestige-login", user.uid);

        console.log(user.uid);
        navigate("/home/dashboard");
        toast.success("login successfull");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("this user does not exist");
            break;
          case "auth/invalid-email":
            toast.error("invalid email");
            break;
          case "auth/wrong-password":
            toast.error("incorrect password");
            break;
          case "auth/network-request-failed":
            toast.error("network error");
            break;
        }
        setIsloading(false);
        console.log(error.code);
      })
      .finally(() => setIsloading(false));
  }

  return (
    <form action="" className="p-4 space-y-4 mt-4">
      <ToastContainer />

      {isloading && (
        <InteractionBlocker>
          <LoadingIndicator1 className={"ml-[42%] mt-[57%]"} />
        </InteractionBlocker>
      )}

      <h1 className="text-2xl font-bold font-serif text-white">
        Welcome Back &#128079;
      </h1>

      <p className="text-white">Please login to continue</p>

      <InputComponent
        value={userData.email}
        onChange={(e) => handleChange(e)}
        name="email"
        placeholder="input email"
        className="p-2 w-full border border-gray-200 rounded-sm text-white"
      />

      <HideShowValue
        showPassword={showPassword}
        onClick={() => setShowPassword(!showPassword)}
        className={
          "right-8 mt-1 md:right-47 lg:right-57 xl:right-105 2xl:right-208"
        }
      />

      <InputComponent
        value={userData.password}
        onChange={(e) => handleChange(e)}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="input password"
        className="py-2 pl-2 pr-11 w-full border border-gray-200 rounded-sm text-white"
      />

      <ButtonComponent
        className="w-full bg-white text-green-500 font-bold p-3 rounded-lg"
        onClick={(e) => handleSubmit(e)}
      >
        Login
      </ButtonComponent>

      <ButtonComponent
        className="w-full text-white font-bold p-3 rounded-lg"
        onClick={(e) => (e.preventDefault(), navigate("/registration/resetpassword"))}
      >
        Forgotten Password
      </ButtonComponent>
    </form>
  );
}
