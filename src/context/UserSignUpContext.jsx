import { createContext, useState } from "react";

export const signup_dataContext = createContext();

function Signup_dataProvider({ children }) {
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

  return (
    <signup_dataContext.Provider value={{ userData, setUserData, handleChange }}>
      {children}
    </signup_dataContext.Provider>
  );
}

export default Signup_dataProvider;
