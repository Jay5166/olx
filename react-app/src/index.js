import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import EditProduct from './components/EditProduct';

const route = createBrowserRouter([
  {
    path: "/",
    element: (<App />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/login/jay",
    element: (<Login />),
  },{
    path: "/signup",
    element: (<Signup />),
  },{
    path: "/add-product",
    element: (<AddProduct />),
  },{
    path: "/liked-products",
    element: (<LikedProducts />),
  },{
    path: "/product/:productId",
    element: (<ProductDetail />)
  },{
    path: "/category/:CatName",
    element: (<CategoryPage />)
  },{
    path: "/edit-product/:productId",
    element: (<EditProduct />)
  },{
    path: "/my-products",
    element: (<MyProducts />)
  }
  ])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  <RouterProvider router={route}>
    <Header />
  <React.StrictMode>
    <App />
    </React.StrictMode>
  </RouterProvider>
 
);


