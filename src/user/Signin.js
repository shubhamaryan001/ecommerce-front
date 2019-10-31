import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";
import "../index.css";
import { FiChevronsDown } from "react-icons/fi";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    redirectToReferrer: false
  });
  const { email, password, loading, redirectToReferrer, error } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false
        });
      } else {
        console.log(data);
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div>
        <div class="loader"></div>
        <div className="Back"></div>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="container-fluid standard-height  ">
      <div className="row ">
        <div className=" col-md-10  offset=md-1">
          <div className="row signup-body">
            <div className="col-md-5  register-left">
              <FiChevronsDown className="FiChevronsDown" />
              <h3>Join Us</h3>
              <p>
                Welcome to CodingHeroes BootCamp to get Information about world
              </p>
              <button type="button" className="btn btn-raised btn-primary">
                about Us
              </button>
            </div>

            <div className="col-md-7 register-right">
              <h2>Sign-In Here</h2>

              {showError()}
              {showLoading()}
              {redirectUser()}
              <div className="register-form text-center">
                <div className="form-group">
                  <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control mb-3 badge-pill"
                    placeholder="Email"
                    value={email}
                  />
                </div>
                <div className="form-group ">
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control badge-pill "
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <div class="forgot-link form-group d-flex justify-content-between align-items-center">
                  <Link to="/forgot-password" className="text-danger">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  onClick={clickSubmit}
                  type="button"
                  className="btn btn-raised btn-primary"
                >
                  SignIn
                </button>
              </div>
              <div className="text-center">
                <p class="mt-5 font-weight-normal">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <strong>Register Now</strong>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
