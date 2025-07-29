import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import UserDataProvider from "./context/UserDataContext.jsx";
import Signup_dataProvider from "./context/UserSignUpContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserDataProvider>
    <Signup_dataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Signup_dataProvider>
  </UserDataProvider>
);
