/** @format */

import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export const routers = [
  {
    path: "/login",
    page: LoginPage,
    isShowNav: false,
  },

  {
    path: "/cart",
    page: CartPage,
    isShowNav: true,
  },

  {
    path: "/product/:id",
    page: ProductDetailPage,
    isShowNav: true,
  },

  {
    path: "/",
    page: HomePage,
    isShowNav: true,
  },
];
