const jwt = require('jsonwebtoken');

const { Products, Users } = require('../model');



  module.exports.likeProduct = (req,res)=>{
    let productId = req.body.productId;
    let userId = req.body.userId;
    // console.log(req);
  
    Users.updateOne({_id: userId},{$addToSet : {likedProducts : productId }}) 
    // $addToSet--this is used bec user can like multiple products & we will get it in the form of array so to puch array value into model/table we need to use this
  
    .then(() => {
      res.send({message: 'Product Liked Sucessfully ! '})
      
    }).catch(() => {
      res.send({message: 'Product  Not Liked'})
      
    });
  }


 module.exports.signup = (req,res)=>{
    // console.log(req.body);
    // return;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
  
    const user = new Users({ username: username,password: password ,email : email,mobile : mobile});
  
    user.save()
    .then(() => {
      res.send({message: 'Data Saved Sucessfully ! '})
      
    }).catch(() => {
      res.send({message: 'Data Not Saved'})
      
    });
  } 




 module.exports.getUserById = (req,res)=>{
  
    const userId = req.params.uId;
  
      Users.findOne({ _id: userId })
      .then((result) => {
       
        res.send({message : "Sucess", user: {email: result.email,mobile :result.mobile ,username : result.username}})
        
      }).catch((err) => {
        // console.log(err);
        res.send({message : err})
        
      });
      
  
  }



 module.exports.login = (req,res)=>{
    // console.log(req.body);
    // return;
    const username = req.body.username;
      const password = req.body.password;
  
      Users.findOne({ username: username })
          .then((result) => {
              if (!result) {
                  res.send({ message: 'user not found.' })
              } else {
                  if (result.password == password) {
                      const token = jwt.sign({
                          data: result
                      }, 'MYKEY', { expiresIn: '1h' });
                      res.send({ message: 'find success.', token: token, userId: result._id ,username :result.username })
                  }
                  if (result.password != password) {
                      res.send({ message: 'password wrong.' })
                  }
  
              }
  
          })
          .catch(() => {
              res.send({ message: 'server err' })
          })
  
  } 


  module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId })
      .populate('likedProducts')
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Assuming that 'likedProducts' is an array of populated products
        const likedProducts = user.likedProducts;
  
        // Loop through the liked products and extract pname and pdesc
        const productInfo = likedProducts.map(product => {
          return {
            pname: product.pname,
            pdesc: product.pdesc,
            pprice: product.pprice,
            pcategory: product.pcategory,
            pimage: product.pimage
  
            
  
          };
        });
  // console.log(productInfo);
        res.status(200).json({ message: 'success', likedProducts: productInfo });
      })
      .catch(err => {
        // console.error(err);
        res.status(500).json({ message: 'Server error' });
      });
  }    