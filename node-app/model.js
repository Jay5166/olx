
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root1:root@cluster0.m5mdymd.mongodb.net/olxclone?retryWrites=true&w=majority');

const productsSchema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  pprice: String,
  pcategory: String,
  pimage: String,
  addedBy:  mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number]
    }
}
});
productsSchema.index({ pLoc: '2dsphere' });
const Products = mongoose.model('products', productsSchema);




const usersSchema = new mongoose.Schema({
      username: String,
      mobile: String,
      email : String,
      password: String,
      likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
      role: String
    });
    
    const Users = mongoose.model('userdetails', usersSchema);

    module.exports = { Products, Users };    