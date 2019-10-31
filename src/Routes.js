import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

import Menu from "./core/Menu";
import Footer from "./core/Footer";
import AboutUs from "./core/AboutUs";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddCoupon from "./admin/AddCoupon";
import AddProduct from "./admin/AddProduct";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Profile from "./user/Profile";

import MyOrders from "./user/MyOrders";
import Successfull from "./core/Successfull";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />

        <PrivateRoute
          path="/user/dashboard/orders"
          exact
          component={MyOrders}
        />
        <PrivateRoute path="/order/successfull" exact component={Successfull} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/coupon" exact component={AddCoupon} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <PrivateRoute path="/cart" exact component={Cart} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
