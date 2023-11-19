import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import { Modal, Button } from 'react-bootstrap';
import API_URL from '../constants';
import io from 'socket.io-client'
let socket;

const ProductDetail = () => {
  const [product, setproduct] = useState();
  const [msg, setmsg] = useState('')
  const [msgs, setmsgs] = useState([])
  const p = useParams();

  useEffect(() => {
    socket = io(API_URL)

    socket.on('connect', () => {
        console.log('con')
    })
    return () => {
        socket.off()
    }

}, [])
useEffect(() => {

  socket.on('getMsg', (data) => {

      const _data = data.filter((item, index) => {
          return item.productId == p.productId
      })
      console.log(_data, "_data")
      setmsgs(_data)
  })
}, [p.productId])


const handleSend = () => {

  const data = { username: localStorage.getItem('userName'), msg, productId: localStorage.getItem('productId') }
  console.log(data, "data send")
  socket.emit('sendMsg', data)
  setmsg('')
}


  const det = localStorage.getItem('token');
  // console.log(p.productId);

  const [user, setuser] = useState();
  const [showModal, setShowModal] = useState(false);
  // console.log(user);



  useEffect(() => {
    const url = API_URL + '/get-product/' + p.productId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product);
          localStorage.setItem('productId',res.data.product._id);
        }
      })
      .catch((err) => {
        // console.log(err);
        alert('Server Error');
      });
  }, []);
  const handleContact = (addedBy) => {
    if (!det) {
      setShowModal(true);
      return;
    }
    // console.log(addedBy);
    const url = API_URL + '/get-user/' + addedBy;
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


          <h3 className="m-2 price-text"><b>Price:-</b> Rs. {product.pprice} /- </h3>
          <p className="m-2"><b>Category:-- </b> {product.pcategory}  </p>
          {product.addedBy &&
            <button onClick={() => handleContact(product.addedBy)}>
              Click For Contact
            </button>}
          {/* Modal for alert with clickable link */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Body>
              Please SignUp to see contact details. You can <a href={`${API_URL}/signup`}>sign up here</a>.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
          {user && user.username && det && <h3>Name:-{user.username}</h3>}
          {user && user.mobile && det && <h4>Mob:-{user.mobile}</h4>}
          {user && user.email && det && <h5>Email:-{user.email}</h5>}

        </div>
        <div className='mt-5'>
          <h2>Chat</h2>
          {
                        msgs && msgs.length > 0 &&
                        msgs.map((item, index) => {
                            if (item.username === localStorage.getItem('userName')) {
                                return (
                                    <p key={item._id} style={{ color: '#fff', background: 'blue', marginLeft: '100px' }}>
                                        {item.username} : {item.msg} </p>
                                )
                            }
                            if (item.username !== localStorage.getItem('userName')) {
                                return (
                                    <p key={item._id} style={{ color: '#fff', background: '#282c34',marginRight: '100px' }}>
                                        {item.username} : {item.msg} </p>
                                )
                            }
                        })
                    }
          <input value={msg} onChange={(e) => setmsg(e.target.value)} className='form-control' />
          <button onClick={handleSend} className='btn btn-primary'>Send</button>



        </div>
      </div>}
    </div>
  </>

  )
}

export default ProductDetail