import React, { useState, useEffect } from "react";
import { read, listRelated } from "./apiCore";
import { Link, Redirect } from "react-router-dom";
import { API } from "../config";
import { FaTags, FaCartPlus, FaRunning } from "react-icons/fa";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

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

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  const ProductImage = ({ item, url }) => (
    <div className="product-img text-center">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className=" product-image mb-3"
        style={{
          maxHeight: "300px",
          maxWidth: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );

  const RelatedImage = ({ item, url }) => (
    <div className="product-img text-center">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className=" product-image mb-3"
        style={{
          maxHeight: "150px",
          maxWidth: "auto",
          objectFit: "cover"
        }}
      />
    </div>
  );

  const showAddToCartButton = () => {
    return (
      <button
        id="addcart"
        onClick={addToCart}
        className="btn btn-raised btn-warning mt-2 mb-2"
      >
        Add to cart
        <FaCartPlus
          className="ml-1"
          style={{ color: "white", fontSize: "20px" }}
        />
      </button>
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <div>
        <span className="badge badge-success badge-pill">
          {product.quantity} In Stock
        </span>
        <br></br>
        {showAddToCartButton()}
      </div>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  const showStockHurry = quantity => {
    if (quantity > 1 && quantity < 25) {
      return (
        <span className="badge badge-info badge-pill">
          <FaRunning />
          Limited Stock Hurry Up
          <FaRunning />
        </span>
      );
    }
  };

  return (
    <div className="container-fluid standard-height p-5 mt-5">
      <div className="row">
        <div className="col-6">
          {shouldRedirect(redirect)}

          <div className="card  p-5" style={{ backgroundColor: "#edeaec" }}>
            <ProductImage class="card-img-top" item={product} url="product" />
            <h1 className="text-center" style={{ textTransform: "uppercase" }}>
              {product.name}
            </h1>
            <hr />
            <div className="row mt-3">
              <div className="col-6">
                <p className="text-center pt-3" style={{ float: "right" }}>
                  <h3>
                    Price <FaTags style={{ color: "#4CAF50" }} /> : ₹
                    {product.price}
                  </h3>
                  <p className="black-9" style={{ float: "right" }}>
                    <b>Category: {product.category && product.category.name}</b>
                    <br />
                    <b>Sold: {product.sold}</b>
                  </p>
                </p>
              </div>
              <div className="col-6 ">
                <div style={{ margin: "0 auto" }}>
                  {showStockHurry(product.quantity)}
                  {showStock(product.quantity)}
                </div>
              </div>
            </div>
            <hr />
            <h2>Product Description:</h2>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="col-6">
          <h4
            className="text-center mb-4"
            style={{ textTransform: "uppercase" }}
          >
            Related products
          </h4>
          <div className="row">
            {relatedProduct.map((p, i) => (
              <div key={i} className="col-6 mb-3">
                <div className="container-fluid">
                  <div className="card text-center" style={{ width: "20rem" }}>
                    <RelatedImage class="card-img-top" item={p} url="product" />
                    <h3 class="card-title">
                      <b>{p.name}</b>
                    </h3>
                    <p class="card-text">{p.description.substring(0, 100)}</p>
                    <div>
                      {p.quantity > 0 ? (
                        <div>
                          <span className="badge badge-success badge-pill">
                            {p.quantity} In Stock
                          </span>
                          <br></br>
                          {showAddToCartButton()}
                        </div>
                      ) : (
                        <span className="badge badge-danger badge-pill">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div>
                      {25 > p.quantity > 1 ? (
                        <div>
                          <span className="badge badge-info badge-pill">
                            <FaRunning />
                            Limited Stock Hurry Up
                            <FaRunning />
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Link to={`/product/${p._id}`}>
                      <button className="btn btn-raised btn-success mb-2">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
