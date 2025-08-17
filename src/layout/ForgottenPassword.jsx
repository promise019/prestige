import { useRef, useState } from "react";
import ButtonComponent from "../Component/ButtonComponent";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const updatePassword = (e) => {
    e.preventDefault();
    if (email.length < 2) {
      inputRef.current.style.borderColor = "red";
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then((s) => (toast.info("Reset Link has been sent to your Email Address"), console.log(s)))
      .catch((e) => toast.error(`Error sending reset link: ${e}`));
  };
  return (
    <div className="w-screen fixed top-0 left-0 bg-white h-screen p-3 md:px-40 space-y-3 lg:px-65 xl:px-[30%]">
      <ToastContainer />
      <h1 className="font-bold text-2xl text-blue-700">Prestige</h1>
      <form className="p-1 space-y-3 md:shadow md:p-3">
        <h1>
          Please Input your gmail that has been registered to Prestige, click
          "send reset link" and a link will be sent to your gmail
        </h1>
        <input
          ref={inputRef}
          value={email}
          placeholder={"input user email"}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-lg border text-black w-full"
        />
        <ButtonComponent
          onClick={(e) => updatePassword(e)}
          className="p-2 text-white bg-blue-700 rounded-xl"
        >
          Send Reset Link
        </ButtonComponent>
      </form>
    </div>
  );
}
