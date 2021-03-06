import React, { useState, useEffect } from "react";
import "./Register";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  let history = useHistory();



  const user = useSelector(state => ({ ...state }))

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history])

  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent to load

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is send to ${email}. click the link to complete your registration `
    );

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />

      <br />
      <button type="submit" className="btn btn-raised">
        Registration{" "}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
