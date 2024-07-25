import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import { FormContainer } from "../styles/formContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "react-js-loader";

import { RegisterRoute } from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      setLoading(true);
      const { data } = await axios.post(RegisterRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        setLoading(false);
        toast.error(data.msg, toastOptions);
      } else {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token",data.token);
        navigate("/setAvatar");

      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 1) {
      toast.error(
        "Username should be greather than 3 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
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
            <h1>Talk Trove</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">
            {loading ? (
              <div className="loader">
                <Loader
                  type="spinner-default"
                  bgColor={"#fff"}
                  color={"#fff"}
                  size={20}
                />
              </div>
            ) : (
              "Create User"
            )}
          </button>
          <span>
            Already have an Account? <Link to="/login"> login</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer></ToastContainer>
    </>
  );
}

export default Register;
