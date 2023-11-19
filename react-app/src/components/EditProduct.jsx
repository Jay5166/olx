import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Categories from './CategoriesList';
import API_URL from '../constants';
// import Login from './Login';



const EditProduct = () => {
 const reset = ()=>{
  setpimage('')
 }
const navigate = useNavigate();
useEffect(() => {
  if(!localStorage.getItem('token')){
    navigate('/login');
  }

  
}, [])
const p =useParams();
useEffect(() => {
    // console.log(p);
    const url = API_URL + '/get-product/' + p.productId ;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
            // setproduct(res.data.product);
          let product =  res.data.product;
          setpname(product.pname)
          setpdesc(product.pdesc)
          setpprice(product.pprice)
          setpcategory(product.pcategory)
          setpoldimage(product.pimage)


        }
      })
      .catch((err) => {
        // console.log(err);
        alert('Server Error');
      });
  }, []);

const [pname, setpname] = useState('')
const [pdesc, setpdesc] = useState('')
const [pprice, setpprice] = useState('')
const [pcategory, setpcategory] = useState('')
const [pimage, setpimage] = useState('')
const [poldimage, setpoldimage] = useState('')


const handleApi = ()=>{
//   if (!pname || !pdesc || !pprice || !pcategory || !pimage) {
//     alert('Please enter All Field Values.');
//     return;
//   }

//   (navigator.geolocation.getCurrentPosition((position)=>{
//     console.log(position.coords.latitude);
// console.log(position.coords.longitude);

const formData = new FormData();
// formData.append('plat',position.coords.latitude)
// formData.append('plong',position.coords.longitude)
formData.append('pid',p.productId)
formData.append('pname',pname)
formData.append('pdesc',pdesc)
formData.append('pprice',pprice)
formData.append('pcategory',pcategory)
formData.append('pimage',pimage)
formData.append('userId',localStorage.getItem('userId'))


const config = {
  headers: {
    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
  },
};

const url = API_URL + '/edit-product';

axios.post(url,formData)
.then((res) => {
  // console.log(res);
  if(res.data.message){
    alert(res.data.message)
    navigate('/my-products')
  }
  
}).catch((err) => {
  // console.log(err);
  
});

//   }));


}


  
  return (
    <>
    
    <Header />

    <center >
    <div className="p-3">
        <h2>Edit Your Product</h2>
        <label htmlFor="Enter Product Name">Product Name</label><br />
        <input type="text" className='form-control' value={pname} onChange={(e)=>{setpname(e.target.value)}} />
        <br />
        <label htmlFor="Enter Product Name">Product Description</label><br />
        <input type="text" className='form-control' value={pdesc} onChange={(e)=>{setpdesc(e.target.value)}} />
        <br />
        <label htmlFor="Enter Product Name">Product Price</label><br />
        <input type="text" className='form-control' value={pprice} onChange={(e)=>{setpprice(e.target.value)}} />
        <br />
        <label htmlFor="Enter Product Name">Product Category</label><br />
        <select className='form-control' value={pcategory} onChange={(e)=>{setpcategory(e.target.value)}}>
            {/* <option>Select Category</option>
            <option>Bike</option>
            <option>Mobile</option>
            <option>Cloth</option> */}
            {
              Categories && Categories.length >0 && 
              Categories.map((item,index)=>{
                return(
                  <option key={'option' +index }>{item}</option>
                )
              }) 
            }
        </select>
        <label htmlFor="Enter Product Name">Old Product Image</label><br />
        <img src={API_URL + '/' + poldimage}  style={{ marginTop: '10px' , width : 200, height : '50'}} alt="" />
        <br />
        <label htmlFor="Enter Product Name">Select New Product Image Below</label><br />

        <input type="file" className='form-control'   onChange={(e)=>{setpimage(e.target.files[0])}}  />
        <br />
        {pimage && (
        <>
          <label htmlFor="Enter Product Name">New Product Image</label><br />
          <img src={URL.createObjectURL(pimage)} style={{ marginTop: '10px', width: 200, height: '50' }} alt="" />
          <button onClick={reset}>Reset New Image</button>
          <br />
        </>
      )}
        
        <button className='btn btn-primary mt-3' onClick={handleApi}>Submit</button>
        </div>
    </center>
    </>
  )
}

export default EditProduct