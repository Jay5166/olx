import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from './Categories';
import { FaHeart } from "react-icons/fa";
import API_URL from '../constants';

function LikedProducts() {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  
  const navigate = useNavigate();
  
  const [likedProducts, setLikedProducts] = useState([]); //---main

  const [allProducts, setAllProducts] = useState([]); // All products---
  const [currentCategory, setCurrentCategory] = useState(null); // Selected category
  const [currentProducts, setCurrentProducts] = useState([]); // Products of the selected category ---
  const [search, setSearch] = useState('');

  useEffect(() => {
    const url =API_URL + '/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message === 'success') {
                  setLikedProducts(res.data.likedProducts);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
  }, [userId]);

    // Fetch all products and initialize both lists
    // useEffect(() => {
    //   const url = 'http://localhost:5000/get-products';
    //   axios
    //     .get(url)
    //     .then((res) => {
    //       if (res.data.products) {
    //         const allProductsData = res.data.products;
    //         setAllProducts(allProductsData);
    //         // setCurrentProducts(allProductsData);
    //       }
    //     })
    //     .catch((err) => {
    //       // console.log(err);
    //       alert('Server Error');
    //     });
    // }, []);

  const linkval = 'https://www.youtube.com/watch?v=kgzdJ_CeJAQ&list=PLRzDZcVlPhe13e6QZlIwT2zGe4DXyebgG&index=5';

  const handleSearch = (value) => {
    setSearch(value);
    // console.log(search);
  }

  const handleClick = () => {
    // console.log(allProducts);
    const filterProducts = allProducts.filter((item) =>
      item.pname.toLowerCase().includes(search.toLowerCase()) ||
      item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
      item.pcategory.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setCurrentProducts(filterProducts);
  }

  const handleCategory = (value) => {
    setCurrentCategory(value);

    if (value) {
      const filterProducts = allProducts.filter((item) => item.pcategory === value);
      setCurrentProducts(filterProducts);
    }
  }

  // Clear the selected category and reset to all products when the page is refreshed
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      // Check if the page was refreshed
      if (!performance.navigation.type || performance.navigation.type === 1) {
        // Page was refreshed or loaded for the first time
        setCurrentCategory(null);
        setCurrentProducts(allProducts);
      }
    }
  }, [navigate, allProducts]);

  const handleLike = (productId) => {
    let userId = localStorage.getItem('userId');
    // console.log(userId);

    // console.log("productId", "userId","userName", productId, userId, userName);
    const url = API_URL + '/like-product';
    const data = {productId,userId}
    axios
      .post(url,data)
      .then((res) => {
      //  console.log(res);
      if(res.data.message){
        alert(res.data.message);
      }
      })
      .catch((err) => {
        // console.log(err);
        alert('Server Error');
      });
  }
  

  return (

    <>
    <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      {/* <div>
          <b>Home</b> --- Watched till 1hr 12 min & will continue from 4th part url is:--
          <Link to={linkval} target="_blank">
            Click Me
          </Link>
          <br />
          {!!localStorage.getItem('token') && <Link to="/add-product">Add Product</Link>}
        </div> */}

      {/* <h2>All Products</h2> */}
    


      <h2>Liked Products</h2>
    <div className='d-flex justify-content-center flex-wrap'>
        {likedProducts && likedProducts.length > 0 ? (
          likedProducts.map((item, index) => (
            <div key={item._id} className='card m-3'>
              <img src={API_URL + '/' + item.pimage} height='200px' width='400px' alt='dummy' />
              <p className='p-2 text-success'>{item.pname} Cat:- {item.pcategory}</p>
              <p className='p-2 text-danger'>{item.pdesc}</p>
              <p className='p-2 '>{item.pprice}</p>
            </div>
          ))
        ) : (
          <p>You Have Not Liked Any Product Please Like.</p>
        )}
      </div>
    </>
  );
}

export default LikedProducts;
