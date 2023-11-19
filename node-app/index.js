const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require("socket.io");
const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Products, Users } = require('./model');
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 5000;
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://root1:root@cluster0.m5mdymd.mongodb.net/olxclone?retryWrites=true&w=majority');

// const productsSchema = new mongoose.Schema({
//   pname: String,
//   pdesc: String,
//   pprice: String,
//   pcategory: String,
//   pimage: String,
//   addedBy:  mongoose.Schema.Types.ObjectId,
//   pLoc: {
//     type: {
//         type: String,
//         enum: ['Point'],
//         default: 'Point'
//     },
//     coordinates: {
//         type: [Number]
//     }
// }
// });
// productsSchema.index({ pLoc: '2dsphere' });
// const Products = mongoose.model('products', productsSchema);

// const usersSchema = new mongoose.Schema({
//   username: String,
//   mobile: String,
//   email : String,
//   password: String,
//   likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
// });

// const Users = mongoose.model('userdetails', usersSchema);




app.get('/', (req, res) => {
  res.send('Hello World!')
})




// Signup Api ----------------------------------------
app.post('/signup',userController.signup)

//LoginApi -----------------------------
app.post('/login',userController.login)


// Add-Product Api ------------------------
app.post('/add-product',upload.single('pimage'),productController.addproduct)


app.post('/edit-product',upload.single('pimage'),productController.editproduct)



app.get('/get-products',productController.getProducts)

app.post('/delete-product',productController.deleteProduct)


// Like Api --------------------------
app.post('/like-product',userController.likeProduct);


// ----
// Assuming you have already defined your schemas and models

app.post('/liked-products', userController.likedProducts);




//----------

app.get('/get-product/:id',productController.getProductsById)
// --------------------
app.get('/search', productController.search);


// ------

app.get('/get-user/:uId',userController.getUserById )  




app.post('/my-products', productController.myProducts);

let messages = [];

io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id)

    socket.on('sendMsg', (data) => {
        messages.push(data);
        io.emit('getMsg', messages)
    })

    io.emit('getMsg', messages)
})

httpServer.listen(port, () => {
  console.log(` App listening on port ${port}`)
})