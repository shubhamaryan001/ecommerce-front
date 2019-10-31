import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getCoupon } from "../admin/apiAdmin";
import { FaAmazonPay } from "react-icons/fa";
import { createOrder } from "./apiCore";
import { emptyCart } from "./cartHelpers";
import { FiChevronsRight } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";

import { razorPayOptionsDirt } from "./directpayhelp";
import { getUserBalance, deductUserWallet } from "../admin/apiAdmin";
let { user } = isAuthenticated();

const Razorpay = window.Razorpay;

const productTax = 50;
const Checkout = ({ products }) => {
  const [values, setValues] = useState({
    code: "",
    discount: 0,
    invalidCode: false,
    applied: false,
    redirectToReferrer: false
  });

  const [data, setData] = useState({
    note: ""
  });
  let {
    user: { _id, name, email, role, wallet_balance },
    token
  } = isAuthenticated();

  const [balc, setBalc] = useState({
    currentWalletBalance: wallet_balance
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const { currentWalletBalance } = balc;

  const { code, discount, applied, invalidCode, redirectToReferrer } = values;

  const getBalance = async event => {
    const currentBalance = await getUserBalance({ userId: _id });
    setBalc({
      ...balc,
      ["currentWalletBalance"]: currentBalance.user.wallet_balance
    });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const applyCode = () => {
    getCoupon({ code }).then(data => {
      if (data.success && data.coupon.isActive) {
        setValues({
          ...values,
          ["discount"]: data.coupon.discount,
          ["applied"]: true,
          ["invalidCode"]: false
        });
      } else {
        setValues({ ...values, ["invalidCode"]: true, ["applied"]: false });
      }
    });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const walletDeduct = async event => {
    event.preventDefault();
    // total amount to be paid for order
    let amount = applied ? getTotal() - discount : getTotal() + productTax;
    // deducting balance from user wallet
    const deductUserBalance = await deductUserWallet({
      token,
      userId: user._id,
      wallet: { amount: amount }
    });
    // if dedcuted get the current balance
    if (deductUserBalance.success) {
      const currentBalance = await getUserBalance({ userId: user._id });
      if (currentBalance.success) {
        user.wallet_balance = currentBalance.user.wallet_balance;
      }

      if (deductUserBalance.success) {
        const createOrderData = {
          products: products,
          transaction_id: "Undifine",
          amount: amount,
          payment_mode: "Wallet Payment",
          note: anyNote
        };

        await createOrder(userId, token, createOrderData)
          .then(response => {
            emptyCart(() => {
              setValues({
                redirectToReferrer: true
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/order/successfull" />;
    }
  };

  const redirectSuccess = () => {
    return <Redirect to="/order/successfull" />;
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleNote = event => {
    setData({ ...data, note: event.target.value });
  };
  let amount = applied
    ? getTotal() + productTax - discount
    : getTotal() + productTax;
  const walletCheckout = () => {
    return isAuthenticated() ? (
      <div>
        <FiChevronsRight className="FiChevronsRight" />
        <button onClick={walletDeduct} className="btn btn-raised btn-success">
          Pay using Wallet Money
        </button>
        <br />
        <span className="text-center">
          <p>
            Wallet balance Rs.{" "}
            <b>
              {currentWalletBalance ? `Rs. ${currentWalletBalance}` : "Rs. 0"}
            </b>
          </p>
        </span>
      </div>
    ) : (
      // <button className="btn btn-raised btn-success">Pay Now</button>
      <Link to="/signin">
        <button className="btn btn-raised btn-warning">
          Sign in to checkout
        </button>
      </Link>
    );
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>
        <FiChevronsRight className="FiChevronsRight" />

        <button
          onClick={openRzrPay}
          className="btn btn-raised btn-success"
          id="rzp-button1"
        >
          Pay Now Using Razorpay
        </button>
        {currentWalletBalance >
        (applied ? getTotal() + productTax - discount : getTotal() + productTax)
          ? walletCheckout()
          : ""}
      </div>
    ) : (
      // <button className="btn btn-raised btn-success">Pay Now</button>
      <Link to="/signin">
        <button className="btn btn-raised btn-warning">
          Sign in to checkout
        </button>
      </Link>
    );
  };

  let anyNote = data.note;
  // Razorpay
  const rzp1 = new Razorpay(
    razorPayOptionsDirt(
      applied ? getTotal() + productTax - discount : getTotal() + productTax,
      user && user.name && user.email
        ? { ...user, token }
        : { name: "", email: "" },
      products,
      anyNote
    )
  );
  const openRzrPay = event => {
    rzp1.open();
    event.preventDefault();
  };

  return (
    <div className="container-fluid">
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <a
                  className="btn btn-raised"
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Total Payable Amount: ₹{amount}
                  <FaAmazonPay className="FaAmazonPay" />
                </a>
              </p>

              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <tr>
                    <td>
                      <b>Price Summary</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label className="text-muted">Apply Coupon</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange("code")}
                          value={code}
                          autoFocus
                          required
                        />
                      </div>
                      <button
                        onClick={applyCode}
                        className="btn btn-success active"
                      >
                        Apply Coupon
                      </button>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        {invalidCode
                          ? "Invalid Coupon!"
                          : applied
                          ? `code applied successfully`
                          : ""}{" "}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Product Price- </td>
                    <td>₹{getTotal()}</td>
                  </tr>
                  <tr>
                    <td> GST: </td>
                    <td>₹{productTax} </td>
                  </tr>
                  <tr>
                    <td> Discount: </td>
                    <td>₹{discount} </td>
                  </tr>
                  <tr>
                    <td> Total Amount= ₹ </td>
                    <td>{amount}</td>
                  </tr>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="gorm-group mb-3">
        <label className="text-muted">Any Note:</label>
        <textarea
          onChange={handleNote}
          className="form-control"
          value={data.note}
          placeholder="Type any Note ......"
        />
      </div>
      {redirectUser()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
