import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
// import API_URL from "../constants";


function MyProducts() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [refresh, setrefresh] = useState(false);


    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [refresh])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }

    const handleDel = (pid)=>{
        // console.log(pid);

        if(!localStorage.getItem('userId')){
            alert('Please Login First')
            return;
        }
        const data = {
            pid : pid,
            userId : localStorage.getItem('userId')
        }
        const url = API_URL + '/delete-product';
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Deleted Sucessful!.')
                    setrefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }


    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img width="300px" height="200px" src={ API_URL + '/' + item.pimage} />

                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                               

                            </div>
                        )

                    })}
            </div>

            <h5> ALL RESULTS  </h5>

            <div className='d-flex justify-content-center flex-wrap'>
        {products && products.length > 0 ? (
          products.map((item, index) =>{ 
            return(
            <div key={item._id} className='card m-3'>
              <img src={API_URL + '/' + item.pimage} width="300px" height="200px"  alt='dummy' />
              <p className='p-2 text-success'>{item.pname} Cat:- {item.pcategory}</p>
              <p className='p-2 text-danger'>{item.pdesc}</p>
              <p className='p-2 '>{item.pprice}</p>
              <p className='p-2 '><Link to={`/edit-product/${item._id}`}>Edit Product</Link></p>
              <button onClick={()=>handleDel(item._id)}>Delete</button>

            </div>
          )})
        ) : (
          <p>You Have Not Added Any Product Please Add First.</p>
        )}
      </div>



        </div>
    )
}

export default MyProducts;