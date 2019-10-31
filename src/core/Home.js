import React, { useState, useEffect, lazy, Suspense } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { Link, Redirect } from "react-router-dom";
import Search from "./Search";
import "../index.css";
import MainSection from "./MainSection";
import ShowImage from "./ShowImage";
import NewlyAdded from "./NewlyAdded";
import MostSell from "./MostSell";

const Home = () => {
  return (
    <>
      <div className="container-fluid p-0 mb-0 ">
        <MainSection />
        <Search />
      </div>
      <NewlyAdded />
      <MostSell />
    </>
  );
};

export default Home;
