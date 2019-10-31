import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { isAuthenticated } from "../auth";

import { addItem, updateItem, removeItem } from "./cartHelpers";

import "../index.css";

const Card = ({
  product,
  showViewProductDescription = true,
  showAddToCartButton = true,
  cartUpdate = false,

  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  let { user } = isAuthenticated();
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showViewDescription = showViewProductDescription => {
    return (
      showViewProductDescription && (
        <p class="card-text">
          {product.description.substring(0, 100)}
          <Link to={`/product/${product._id}`}>Read More</Link>
        </p>
      )
    );
  };

  // const showCheckout = () => {
  //   return isAuthenticated() ? (
  //     <div>
  //       <FiChevronsRight className="FiChevronsRight" />

  //       <button
  //         onClick={openRzrPay}
  //         className="btn btn-raised btn-success"
  //         id="rzp-button1"
  //       >
  //         Pay Now Using Razorpay
  //       </button>
  //       {currentWalletBalance >
  //       (applied ? getTotal() + productTax - discount : getTotal() + productTax)
  //         ? walletCheckout()
  //         : ""}
  //     </div>
  //   ) : (
  //     // <button className="btn btn-raised btn-success">Pay Now</button>
  //     <Link to="/signin">
  //       <button className="btn btn-raised btn-warning">
  //         Sign in to checkout
  //       </button>
  //     </Link>
  //   );
  // };

  const showAddToCart = showAddToCartButton => {
    return isAuthenticated() ? (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-raised btn-success float-right"
        >
          Add to cart
        </button>
      )
    ) : (
      // <button className="btn btn-raised btn-success">Pay Now</button>
      <Link to="/signin">
        <button className="btn btn-raised float-right btn-warning">
          Sign in to Buy
        </button>
      </Link>
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <div>
        <span className="badge badge-success badge-pill mb-2">
          In Stock {product.quantity}
        </span>
      </div>
    ) : (
      <div>
        <span className="badge badge-danger badge-pill mb-2">Out of Stock</span>
      </div>
    );
  };

  const showStockHurry = quantity => {
    if (quantity > 1 && quantity < 25) {
      return (
        <span className="badge badge-info badge-pill">
          Limited Stock Hurry Up
        </span>
      );
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-raised btn-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <figure class="card card-product" style={{ width: "22rem" }}>
      {shouldRedirect(redirect)}
      <div class="img-wrap">
        <Link to={`/product/${product._id}`}>
          <ShowImage class="card-img-top" item={product} url="product" />
        </Link>
      </div>
      <figcaption class="info-wrap">
        <Link to={`/product/${product._id}`}>
          <h4 class="title">{product.name}</h4>
          <p class="desc"> {showViewDescription(showViewProductDescription)}</p>
          <div class="rating-wrap">
            <div class="label-rating">{showStockHurry(product.quantity)}</div>
            <div class="label-rating">{showStock(product.quantity)} </div>
          </div>
        </Link>
      </figcaption>
      <div class="bottom-wrap">
        {showAddToCart(showAddToCartButton)}

        <div class="price-wrap h5">
          <span class="price-new">₹ {product.price}</span>

          <span class="price-old">{showCartUpdateOptions(cartUpdate)}</span>
          <span class="price-old">
            {showRemoveButton(showRemoveProductButton)}
          </span>
        </div>
      </div>
    </figure>
  );
};

export default Card;
