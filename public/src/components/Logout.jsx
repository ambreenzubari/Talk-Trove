import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <LogoutContainer onClick={handleClick}>
      <BiLogOut className="icon"/>
      <p>Logout</p>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.button`
      background-color: #997af0;
      color: white;
      padding: 0.5rem 1rem;
      display:flex;
      align-items: center;
      border-radius: 0.3rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    .icon{
      font-size: 1rem
    }
      &:hover {
        background-color: #7d5cb3;
      }
    }
`;
