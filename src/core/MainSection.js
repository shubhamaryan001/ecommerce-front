import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Animated } from "react-animated-css";

import "../index.css";

const MainSection = () => {
  return (
    <div className="container-fluid  header-1 ">
      <div className="row main-row">
        <div className="col-md-6" style={{ zIndex: "999" }}>
          <Animated
            animationIn="fadeInLeft"
            animationInDelay={1000}
            isVisible={true}
          >
            <div className="container header-2 ">
              <h1 class="display-4">Hello, Welcome To React-Node Ecommerce</h1>
              <p class="lead">
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <hr class="my-4" />
              <p>
                It uses utility classes for typography and spacing to space
                content out within the larger container.
              </p>
              <p class="lead">
                <a class="btn btn-raised " href="#" role="button">
                  <FiShoppingBag className="FiShoppingBag" />
                  Shop Now
                </a>
              </p>
            </div>
          </Animated>
        </div>

        <div className="col-md-6 " style={{ zIndex: "999" }}>
          <Animated
            animationIn="fadeInRight"
            animationInDelay={1000}
            isVisible={true}
          >
            <img
              src="https://bootstrapmade.com/demo/themes/NewBiz/img/intro-img.svg"
              alt="Smiley face"
              class="img-fluid float-right "
              height="auto"
              width="550"
            />
          </Animated>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
