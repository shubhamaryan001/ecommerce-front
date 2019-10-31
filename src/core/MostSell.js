import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../index.css";

const MostSell = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [error, setError] = useState(false);

  const [values, setValues] = useState({});
  const { loading } = values;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const loadProductsBySell = () => {
    setValues({ loading: true });
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
        setValues({
          loading: false
        });
      } else {
        setProductsBySell(data);
        setValues({
          loading: false
        });
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
  }, []);

  const showLoading = () =>
    loading && (
      <div className="loading-screen">
        <div class="loader">
          <h3 className="Loading mt-5">PLEASE WAIT ..</h3>
        </div>

        <div className="Back-1"></div>
      </div>
    );
  return (
    <>
      <div className="container-fluid  products-by-arrival pl-5 pr-5">
        <div className="row">
          <h2 className="  products-Heading mb-4 text-uppercase">
            Best Sellers
          </h2>
          <div className="col-12">
            <Carousel
              swipeable={true}
              draggable={false}
              infinite={true}
              ssr={true}
              autoPlay={true}
              autoPlaySpeed={750}
              responsive={responsive}
            >
              {showLoading()}
              {productsBySell.map((product, i) => (
                <div key={i}>
                  <Card product={product} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default MostSell;
