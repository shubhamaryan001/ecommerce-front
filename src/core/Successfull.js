import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Animated } from "react-animated-css";

import "../index.css";

const Successfull = () => {
  return (
    <div className="container-fluid standard-height  ">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 " style={{ width: "100%" }}>
          <div className="card text-center ">
            <Animated
              animationIn="zoomIn"
              animationOut="zoomOut"
              animationInDuration={2000}
              animationInDelay={200}
              isVisible={true}
            >
              <FaRegCheckCircle
                className="mt-2"
                style={{ width: "100%", fontSize: "10rem", color: "green" }}
              />
            </Animated>
            <div class="card-body">
              <h1 class="card-title text-uppercase font-weight-bold">
                thanks for purchasing with us
              </h1>
              <p class="card-text">
                Your Order is Placed.Please go and track your order in{" "}
                <b>ALL ORDERS SECTIONS.</b>
              </p>
            </div>

            <div class="card-body">
              <a href="/shop" class="btn btn-success btn-raised ">
                Continue shopping
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Successfull;
