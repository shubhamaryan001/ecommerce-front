import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "../index.css";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card profile-card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/create/category">
              Create Categorys
            </Link>
          </li>

          <li className="list-group-item">
            <Link className="btn btn-success active" to="/create/coupon">
              Create coupon
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/create/product">
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
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
        </ul>
      </div>
    );
  };

  return (
    <div className="container-fluid standard-height  ">
      <div className="row ">
        <div className="col-md-4 col-sm-12 ">{adminInfo()}</div>
        <div className="col-md-4 col-sm-12">
          <p>{adminLinks()}</p>
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
