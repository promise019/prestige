import { Route, Routes } from "react-router";
import "./App.css";
import Registraion from "./pages/Registration";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Mainpage from "./pages/Mainpage";
import Dashboard from "./layout/Dashboard";
import Withdraw from "./layout/Withdraw";
import Invite from "./layout/Invite";
import Checkin from "./layout/Checkins";
import Settings from "./layout/Settings";

export default function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/registration" element={<Registraion />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Mainpage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="invite" element={<Invite />} />
          <Route path="check-in" element={<Checkin />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
