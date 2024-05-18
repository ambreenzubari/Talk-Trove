import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { LogoutContainer } from "../styles/LogoutContainer";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <LogoutContainer onClick={handleClick}>
      <BiLogOut className="icon"/>
    </LogoutContainer>
  );
};

export default Logout;

