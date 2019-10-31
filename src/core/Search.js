import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import "../index.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <div className="col-md-4">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div class="row">
        <div class=" form-group col-md-3">
          <select onChange={handleChange("category")} class="custom-select ">
            <option selected>All</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div class="form-group col-md-6">
          <input
            onChange={handleChange("search")}
            id="exampleFormControlInput5"
            type="search"
            placeholder="Search by name"
            class="form-control form-control-underlined"
          />
        </div>
        <div class="form-group mt-4 col-md-3">
          <button
            type="submit"
            class="btn  btn-raised  btn-success  badge-pill btn-block shadow-sm"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid bg-img search-box">
      <div className="container search-bar ">{searchForm()}</div>
      <div className="container">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
