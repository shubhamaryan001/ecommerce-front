import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "../index.css";
import { razorPayOptions } from "../core/checkout.helper";
import { getUserBalance } from "../admin/apiAdmin";
import { getOrdersHistory } from "./apiUser";
import moment from "moment";

const Razorpay = window.Razorpay;
const Dashboard = () => {
  const [order, setOrder] = useState([]);

  let {
    user: { _id, name, email, role, wallet_balance },
    token
  } = isAuthenticated();

  const [values, setValues] = useState({
    amount: 0,
    currentWalletBalance: wallet_balance
  });

  const { amount, currentWalletBalance } = values;

  // Razorpay
  const rzp1 = new Razorpay(
    razorPayOptions(
      amount,
      { name: name ? name : "", email: email ? email : "", _id, token },
      true
    )
  );

  const openRzrPay = event => {
    rzp1.open();
    event.preventDefault();
    getBalance();
  };

  const handleChange = name => event => {
    setValues({ ...values, ["amount"]: event.target.value });
  };

  const getBalance = async event => {
    const currentBalance = await getUserBalance({ userId: _id });
    setValues({
      ...values,
      ["currentWalletBalance"]: currentBalance.user.wallet_balance
    });
  };

  useEffect(() => {
    getBalance();
  }, []);

  const userLinks = () => {
    //
    return (
      <div className="card profile-card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-success active" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>

          <li className="list-group-item">
            <Link
              className="btn btn-raised btn-info"
              to="/user/dashboard/orders"
            >
              View All Orders
            </Link>
          </li>
          {/* Wallet money */}
          <li className="list-group-item">
            <h5>Add Money to wallet</h5>
            <form>
              <div className="form-group">
                <label className="text-muted">Amount</label>
                <input
                  onChange={handleChange("amount")}
                  type="number"
                  className="form-control"
                  value={amount}
                />
              </div>
              <button
                onClick={openRzrPay}
                className="btn btn-raised btn-success"
                id="rzp-button1"
              >
                Add Money
              </button>
            </form>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card profile-card-2">
        <h3 className="card-header"> Your Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Name:</b>
            {name}
          </li>
          <li className="list-group-item">
            <b>Email:</b>
            {email}
          </li>
          <li className="list-group-item">
            <b>Role:</b>
            {role === 1 ? "Admin" : "Customer Account"}
          </li>
          <li className="list-group-item">
            <b>Wallet Balance:</b>
            {currentWalletBalance ? `Rs. ${currentWalletBalance}` : "Rs. 0"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="container-fluid standard-height ">
      <div className="row ">
        <div className="col-md-4 col-sm-12 ">{userInfo()}</div>
        <div className="col-md-4 col-sm-12">
          <p>{userLinks()}</p>
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default Dashboard;
