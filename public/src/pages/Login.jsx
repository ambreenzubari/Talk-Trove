import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import { FormContainer } from "../styles/formContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginRoute } from "../utils/APIRoutes";
import Loader from "react-js-loader";
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      setLoading(true);
      const { data } = await axios.post(LoginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        setLoading(false);
        toast.error(data.msg, toastOptions);
      } else {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
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
      toast.error("Password is required", toastOptions);
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
              "Login"
            )}
          </button>
          <span>
            Don't have an Account? <Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
}

export default Login;
