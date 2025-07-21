import { useState, useEffect } from "react";
import InputComponent from "../Component/InputComponent";
import ButtonComponent from "../Component/ButtonComponent";
import HideShowValue from "../Component/show_hide_value";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  increment,
  where,
  serverTimestamp,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"
import { toast, ToastContainer } from "react-toastify";
import { db, auth } from "../firebase";
import { useNavigate, useSearchParams } from "react-router";
import {
  InteractionBlocker,
  LoadingIndicator1,
} from "../Component/Loading indicator";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [referrerCode, setReferrerCode] = useState(null);

  // get and set referrer code on-mount
  useEffect(() => {
    const code = searchParams.get("ref");
    if (code) setReferrerCode(code);
  }, [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    refCode: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.email === "" ||
      userData.password === ""
    )
      return toast.error("Please fill every field below");

    setIsloading(true);

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((usercredential) => {
        const user = usercredential.user;
        const docRef = doc(db, "users", user.uid);

        // Check if referral code exists
        if (referrerCode) {
          console.log(referrerCode);
          const refQuery = query(
            collection(db, "users"),
            where("ReferralCode", "==", referrerCode)
          );

          //get corresponding document
          (async () => {
            try {
              const refSnap = await getDocs(refQuery);
              let userDataToSave = {
                Firstname: userData.firstname,
                Lastname: userData.lastname,
                Email: userData.email,
                ReferralCode: user.uid,
                ReferredBy: null,
                createdAt: serverTimestamp(),
                referralCount: 0,
                bonus: 1000,
              };
          
              if (!refSnap.empty) {
                const referrer = refSnap.docs[0];
                const referrerUID = referrer.id;
          
                // ✅ Await these!
                await updateDoc(doc(db, "users", referrerUID), {
                  referralCount: increment(1),
                });
          
                await addDoc(collection(db, "users", referrerUID, "refs"), {
                  date: new Date().toLocaleDateString("default", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                  name: userData.firstname,
                });
          
                userDataToSave.ReferredBy = referrerCode;
              }
          
              await setDoc(docRef, userDataToSave);
              toast.success("Account successfully created");
              navigate("/registration/login");
            } catch (err) {
              console.error("Referral path failed:", err);
              toast.error("Error creating account");
            } finally {
              setIsloading(false);
            }
          })();
        } else {
          // No referral code provided
          setDoc(docRef, {
            Firstname: userData.firstname,
            Lastname: userData.lastname,
            Email: userData.email,
            ReferralCode: user.uid,
            ReferredBy: null,
            createdAt: serverTimestamp(),
            referralCount: 0,
            bonus: 1000,
          })
            .then(() => {
              toast.success("Account successfully created");
              setIsloading(false);
              navigate("/registration/login");
            })
            .catch((err) => {
              console.log(err.code);
              toast.error("Error creating account");
              setIsloading(false);
            });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("email already in use");
            break;
          case "auth/invalid-email":
            toast.error("invalid email");
            break;
          case "auth/weak-password":
            toast.error("weak password");
            break;
          default:
            toast.error(error.code);
            break;
        }
        setIsloading(false);
        console.log(error.code);
      })
      .finally(() => {
        setIsloading(false);
      });
  }

  return (
    <form action="" className="p-4 space-y-4 mt-4">
      <ToastContainer />

      {isloading && (
        <InteractionBlocker>
          <LoadingIndicator1 className={'ml-[42%] mt-[57%]'}/>
        </InteractionBlocker>
      )}

      <h1 className="text-2xl font-bold font-serif text-white">
        Create Account &#128079;
      </h1>

      <p className="text-white">Please create account to continue</p>

      <section className="grid grid-cols-2 space-x-3">
        <InputComponent
          value={userData.firstname}
          onChange={(e) => handleChange(e)}
          name="firstname"
          placeholder="first name"
          className="p-2 w-[98%] border border-gray-200 rounded-sm text-white"
        />

        <InputComponent
          value={userData.lastname}
          onChange={(e) => handleChange(e)}
          name="lastname"
          placeholder="last name"
          className="p-2 w-[98%] border border-gray-200 rounded-sm text-white"
        />
      </section>

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
        className={"right-8 mt-1 md:right-47 lg:right-57 xl:right-105 2xl:right-208"}
      /> 

      <InputComponent
        value={userData.password}
        onChange={(e) => handleChange(e)}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="input password"
        className="py-2 pl-2 pr-11 w-full border border-gray-200 rounded-sm text-white"
      />

      <ButtonComponent
        className="w-full bg-white text-green-500 font-bold p-3 rounded-lg"
        onClick={(e) => handleSubmit(e)}
      >
        Sign Up
      </ButtonComponent>
    </form>
  );
}
