import React from "react";
import { WelcomeContainer } from "../styles/WelcomeContainer";

import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <WelcomeContainer>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser?currentUser.username:''}!</span>
      </h1>
      <h3>Please Select Chat to start Communication</h3>
    </WelcomeContainer>
  );
};

export default Welcome;


