import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );
  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const handleStatusChange = (e, orderId,orderEmail,orderMobile) => {
    updateOrderStatus(user._id, token, orderId, e.target.value,orderEmail,orderMobile).then(data => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };
  const showStatus = o => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <h3 className="mark mb-4">Status: {o.user.email}</h3>
      <h3 className="mark mb-4">Status: {o.user.mobile}</h3>

      <select
        className="form-control"
        onChange={e => handleStatusChange(e, o._id,o.user.email,o.user.mobile)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container-fluid standard-height">
      <h2> {showOrdersLength()}</h2>
      <div className="row">
        {orders.map((o, oIndex) => {
          return (
            <div key={oIndex} className="col-6 mb-3">
              <Accordion
                style={{ width: "90%", margin: "0 auto" }}
                allowZeroExpanded={true}
              >
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <div className="container">
                        <div className="row">
                          <div className="col-4">
                            {" "}
                            <h6
                              style={{
                                backgroundColor: "#00FFBB",
                                overflowWrap: "break-word"
                              }}
                            >
                              {" "}
                              Order Id: {o._id}
                            </h6>
                          </div>
                          <div className="col-4">
                            {" "}
                            <p>
                              Order Status:
                              <span class="mt-4 badge badge-info">
                                {o.status}
                              </span>
                            </p>
                          </div>
                          <div className="col-4">
                            {" "}
                            <b>Ordered on: </b> {moment(o.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul className="list-group mb-2">
                      <li className="list-group-item">{showStatus(o)}</li>
                      <li className="list-group-item">
                        <b>Transaction ID: </b> {o.transaction_id}{" "}
                      </li>{" "}
                      <li className="list-group-item ">
                        <b>Payment Mode: </b>
                        {o.payment_mode}{" "}
                      </li>{" "}
                      <li className="list-group-item">
                        <b>Amount:</b>₹ {o.amount}
                      </li>{" "}
                      <li className="list-group-item">
                        <b>Ordered by:</b> {o.user.name}
                      </li>{" "}
                      <li className="list-group-item">
                        <b>Ordered on: </b> {moment(o.createdAt).fromNow()}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Any Note: </b>
                        {o.note}
                      </li>{" "}
                    </ul>

                    <h4 className=" text-center mt-4 mb-4 font-italic">
                      <b>Total products in the order: {o.products.length}</b>
                    </h4>

                    <div className="text-center">
                      <div className="row mb-3">
                        <div
                          className="col-3"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Product Name</b>
                        </div>
                        <div
                          className="col-3"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Ordered Quantity</b>
                        </div>
                        <div
                          className="col-3"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Product Price</b>
                        </div>

                        <div
                          className="col-3"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Product Id</b>
                        </div>
                      </div>
                      {o.products.map((p, pIndex) => (
                        <div key={pIndex} className="row border border-success">
                          <div className="col-md-3">
                            <p>{p.name}</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <p>{p.count}</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <p>₹{p.price}</p>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <p
                              style={{
                                backgroundColor: "#00FFBB",
                                overflowWrap: "break-word"
                              }}
                            >
                              {p._id}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>

    // <div className="container mt-5 mb-5 pl-3 pr-3">
    //   <h5 className="mb-2"> {showOrdersLength()}</h5>
    //   <div className="row">
    //     {orders.map((o, oIndex) => {
    //       return (
    //         <div className="col-md-4 mt-5">
    //           <div
    //             key={oIndex}
    //             className="card"
    //             style={{ borderBottom: "5px solid green", width: "22rem" }}
    //           >
    //             <h4 className="text-center mb-5">
    //               <span className="bg-warning ">Order ID: {o._id}</span>
    //             </h4>

    //             <ul className="list-group mb-2">
    //               <li className="list-group-item">{showStatus(o)}</li>
    //               <li className="list-group-item">
    //                 Transaction ID: {o.transaction_id}
    //               </li>
    //               <li className="list-group-item">
    //                 Payment Mode: {o.payment_mode}
    //               </li>
    //               <li className="list-group-item">Amount: ${o.amount}</li>
    //               <li className="list-group-item">Ordered by: {o.user.name}</li>
    //               <li className="list-group-item">
    //                 Ordered on: {moment(o.createdAt).fromNow()}
    //               </li>
    //               <li className="list-group-item">Any Note: {o.note}</li>
    //             </ul>

    //             <h4 className=" text-center mt-4 mb-4 font-italic">
    //               Total products in the order: {o.products.length}
    //             </h4>
    //           </div>

    //           {o.products.map((p, pIndex) => (
    //             <div
    //               className="mb-4"
    //               key={pIndex}
    //               style={{
    //                 padding: "20px",
    //                 border: "1px solid indigo"
    //               }}
    //             >
    //               {showInput("Product name", p.name)}
    //               {showInput("Product price", p.price)}
    //               {showInput("Product total", p.count)}
    //               {showInput("Product Id", p._id)}
    //             </div>
    //           ))}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};
export default Orders;
