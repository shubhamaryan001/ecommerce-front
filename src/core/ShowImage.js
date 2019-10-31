import React from "react";
import { API } from "../config";
import "../index.css";

const ShowImage = ({ item, url }) => (
  <div className="product-img text-center">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="img-fluid "
      // style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "cover" }}
    />
  </div>
);

export default ShowImage;
