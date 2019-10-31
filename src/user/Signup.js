import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import "../index.css";

import { FiChevronsDown } from "react-icons/fi";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    error: "",
    success: false
  });
  const { name, email, mobile, password, success, loading, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, mobile, password }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          mobile: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const showLoading = () =>
    loading && (
      <div>
        <div class="loader"></div>
        <div className="Back"></div>
      </div>
    );

  const signUpForm = () => (
    <form className="card p-3">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      {showLoading()}
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Mobile Number</label>
        <input
          onChange={handleChange("mobile")}
          type="mobile"
          className="form-control"
          value={mobile}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <div className="container-fluid standard-height ">
      <div className="row ">
        <div className=" col-md-10 offset=md-1">
          <div className="row signup-body">
            <div className="col-md-5 register-left">
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
              <h2>Register Here</h2>

              {showSuccess()}
              {showLoading()}
              {showError()}
              <div className="register-form text-center">
                <div className="form-group">
                  <input
                    onChange={handleChange("name")}
                    type="name"
                    className="form-control mb-2  badge-pill"
                    placeholder="Name"
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control  mb-2 badge-pill"
                    placeholder="Email"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange("mobile")}
                    type="tel"
                    className="form-control mb-2 badge-pill"
                    placeholder="Mobile Number"
                    value={mobile}
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

                <button
                  onClick={clickSubmit}
                  type="button"
                  className="btn btn-raised btn-primary"
                >
                  Signup
                </button>
              </div>
              <div className="text-center">
                <p class="mt-5 font-weight-normal">
                  Already have an account?{" "}
                  <Link to="/signin">
                    <strong>Login Now</strong>
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
export default Signup;
