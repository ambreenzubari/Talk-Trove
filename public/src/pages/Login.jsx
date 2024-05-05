import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/assets/logo.svg";
import { FormContainer } from "./formContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "react-js-loader";

import { LoginRoute } from "../utils/APIRoutes";
function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }
  },[])
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password,email } = values;
      const { data } = await axios.post(LoginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chat Spark</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">
            {/* <Loader type="spinner-default" bgColor={color} color={color} title={"spinner-default"} size={100} /> */}
            {/* <Loader type="spinner-default" size={20} bgColor={'#fff'} color={'#fff'}  /> */}
            Create User
          </button>
          <span>
            Don't have an Account? <Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer></ToastContainer>
    </>
  );
}

export default Login;
