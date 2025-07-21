import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

export const userDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [referralData, setReferralData] = useState({
    link: "",
    points: 0,
    email: "",
  });
  const [refList, setRefList] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('Prestige-login')
  );

  // if useEffect is used, itll throw an error if the user isnt logged in. check mainpage componenent for more info
  const getUserData = () => {
    //get referral details
    console.log(currentUser);
    onAuthStateChanged(auth, (user) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser);
        getDoc(docRef).then((docsnap) => {
          if (docsnap.exists()) {
            const userData = docsnap.data();
            setReferralData({
              link: `prestige2earn.web.app/registration/signup?ref=${userData.ReferralCode}`,
              points: userData.referralCount,
              email: userData.Email,
            });
          }
        });
      }
    });

    //get referral collection
    const referralRef = collection(db, "users", currentUser, "refs");
    const q = query(referralRef, orderBy("date"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const refs = snapshot.docs.map((docs) => ({
        id: docs.id,
        date: docs.data().date,
        name: docs.data().name,
      }));

      setRefList(refs);
    });

    return () => unsubscribe();
  };

  return (
    <userDataContext.Provider
      value={{ referralData, refList, getUserData, setCurrentUser }}
    >
      {children}
    </userDataContext.Provider>
  );
}
