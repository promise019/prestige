import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("registration/login");
  }, []);
  return <div></div>;
}
