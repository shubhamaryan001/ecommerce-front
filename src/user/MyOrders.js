import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "../index.css";
import { getOrdersHistory } from "./apiUser";
import moment from "moment";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
const Cancelled="";
const MyOrders = () => {
  const [order, setOrder] = useState([]);

  let {
    user: { _id, name, email, role, wallet_balance },
    token
  } = isAuthenticated();

  const initOrder = (userId, token) => {
    getOrdersHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  };


  useEffect(() => {
    initOrder(_id, token);
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );



//   const showOrdersStatus = () => {
//   if (order.status) {
//     return ( <
//     {console.log(order.status)}
//     );
//   } else {
//     return <h1 > No orders < /h1>;
//   }
// };



  const showOrdersLength = () => {
    if (order.length > 0) {
      return (
        <h1 className="text-danger mb-5 display-5 text-center">
          Total orders: {order.length}
        </h1>
      );
    } else {
      return <h1 className="text-danger text-center">No orders</h1>;
    }
  };

  return (
    <div className="container-fluid standard-height">
      <h2> {showOrdersLength()}</h2>
      <div className="row">
        {order.map((o, oIndex) => {
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


                          <div className="row">

<div className="col-12">


< div > {
o.status === 'Cancelled' ? ( <
  p > refund Will Inisitaed Within 24hrs so please be paictence till 24hrs < /p>
) : ""
} <
/div>




</div>


                          </div>

                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul className="list-group mb-2">
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
                          className="col-4"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Product Name</b>
                        </div>
                        <div
                          className="col-4"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Ordered Quantity</b>
                        </div>
                        <div
                          className="col-4"
                          style={{ backgroundColor: "#00ffbb" }}
                        >
                          <b>Product Price</b>
                        </div>
                      </div>
                      {o.products.map((p, pIndex) => (
                        <div key={pIndex} className="row border border-success">
                          <div className="col-md-4">
                            <p>{p.name}</p>
                          </div>
                          <div className="col-md-4">
                            {" "}
                            <p>{p.count}</p>
                          </div>
                          <div className="col-md-4">
                            {" "}
                            <p>₹{p.price}</p>
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

    // <div className="container-fluid  standard-height mt-5 mb-5 pl-3 pr-3">
    // <h5 className="mb-2"> {showOrdersLength()}</h5>
    //   <div className="row">
    //     {order.map((o, oIndex) => {
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
    //               <li className="list-group-item">{o.status}</li>
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

    //           <div className="text-center">
    //             {o.products.map((p, pIndex) => (
    //               <div key={pIndex} className="row">
    //                 <div className="col-md-6">
    //                   <p>{p.name}</p>
    //                 </div>
    //                 <div className="col-md-6">
    //                   {" "}
    //                   <p>{p.count}</p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default MyOrders;
