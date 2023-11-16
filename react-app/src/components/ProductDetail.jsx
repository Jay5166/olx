import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import { Modal, Button } from 'react-bootstrap';
import API_URL from '../constants';

const ProductDetail = () => {

    const p =useParams();
    const det = localStorage.getItem('token');
    // console.log(p.productId);

    const[product,setproduct]= useState();
    const[user,setuser]= useState();
    const [showModal, setShowModal] = useState(false);
    // console.log(user);



    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId ;
        axios
          .get(url)
          .then((res) => {
            if (res.data.product) {
                setproduct(res.data.product);
            }
          })
          .catch((err) => {
            // console.log(err);
            alert('Server Error');
          });
      }, []);
      const handleContact = (addedBy)=>{
        if (!det) {
            setShowModal(true);
            return;
          }
        // console.log(addedBy);
        const url = API_URL +  '/get-user/' + addedBy ;
        axios
          .get(url)
          .then((res) => {
            if (res.data.user) {
                setuser(res.data.user);
                // console.log(res.data.user);
            }
          })
          .catch((err) => {
            // console.log(err);
            alert('Server Error');
          });
      }
      return (<>
        <Header />
        <div>
     <h2 className='mt-2'>Product Details:- </h2> 
     </div>
        <div >
            {product && <div className="d-flex justify-content-between flex-wrap">
                <div className='mt-5'>
                    <img width="400px" height="200px" src={API_URL + '/' + product.pimage} alt="" />
                    <p className="m-2"><b>Name:-</b> {product.pname}  </p>
                    <p className="m-2"><b>Description:-- </b>{product.pdesc}</p>
                    
                </div>
                <div className='mt-5'>
                    <h3 className="m-2 price-text"><b>Price:-</b> Rs. {product.pprice} /- </h3>
                    <p className="m-2"><b>Category:-- </b> {product.pcategory}  </p>
                    { product.addedBy && 
                        <button onClick={()=>handleContact(product.addedBy)}>
                            Click For Contact
                        </button>}
      {/* Modal for alert with clickable link */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          Please SignUp to see contact details. You can <a href= {`${API_URL}/signup`}>sign up here</a>.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
                        {user && user.username && det && <h3>Name:-{user.username}</h3>}
                        {user && user.mobile && det && <h4>Mob:-{user.mobile}</h4>}
                        {user && user.email && det && <h5>Email:-{user.email}</h5>}



                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetail