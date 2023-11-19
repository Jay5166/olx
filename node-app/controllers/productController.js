const { Products, Users } = require('../model');


  module.exports.search = (req, res) => {
    const search = req.query.search;
    const [latitude, longitude] = req.query.loc.split(',');
  
    // Construct a filter for searching
    const searchFilter = {
      $or: [
        { pname: { $regex: new RegExp(search, 'i') } },
        { pdesc: { $regex: new RegExp(search, 'i') } },
        { pprice: { $regex: new RegExp(search, 'i') } },
        { pcategory: { $regex: new RegExp(search, 'i') } },
      ],
      pLoc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          $maxDistance: 10000, // now it's 10km we define values in metres.
        },
      },
    };
  
    Products.find(searchFilter)
      .then((results) => {
        res.send({ message: 'Success', products: results });
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  }



module.exports.addproduct = (req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    // return;
    
      const plat = req.body.plat;
      const plong = req.body.plong;
      const pname = req.body.pname;
      const pdesc = req.body.pdesc; 
      const pprice = req.body.pprice; 
      const pcategory = req.body.pcategory; 
      const pimage = req.file.path; 
      const addedBy = req.body.userId; 
      
      
      const products = new Products({ pname: pname,pdesc: pdesc ,pprice : pprice,pcategory : pcategory,pimage : pimage,addedBy : addedBy,
      pLoc : {type : 'Point',coordinates : [plat , plong]}
    });
    
      products.save()
      .then(() => {
        res.send({message: 'Data Saved Sucessfully ! '})
        
      }).catch(() => {
        res.send({message: 'Data Not Saved'})
        
      });
    
    
      // get-products Api --------------
    
      
    }

    

module.exports.getProducts = (req,res)=>{

    const CatName = req.query.CatName;
  
    let _p = {};
  
    if(CatName) {
      _p = {pcategory :CatName }
    }
    // console.log(CatName);
  
    Products.find(_p)
    .then((result) => {
      // console.log(result);
      res.send({message : "Sucess",products : result})
      
    }).catch((err) => {
      // console.log(err);
      res.send({message : err})
      
    });
  
  }  
  
  
module.exports.getProductsById = (req,res)=>{

    // console.log(req.params);
  
    Products.findOne({_id: req.params.id })
    .then((result) => {
      // console.log(result);
      res.send({message : "Sucess",product : result})
      
    }).catch((err) => {
      // console.log(err);
      res.send({message : err})
      
    });
  
  } 
  
  
 module.exports.myProducts = (req, res) => {
    const userId =  req.body.userId; 
  
    Products.find({ addedBy : userId })
    .then((results) => {
      res.send({ message: 'Success', products: results });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
     } 
     


module.exports.deleteProduct = (req,res)=>{
// console.log(req.body);
Products.findOne({_id : req.body.pid })
.then((result) => {
  if(result.addedBy == req.body.userId){
    Products.deleteOne({_id : req.body.pid })
    .then((deleteResult)=>{
if(deleteResult.acknowledged){
res.send({message : 'sucess'})
}
    }).catch((err) => {
      res.send({message : 'Error'});
    });
  }
}).catch((err) => {
  res.send({message : 'Error'});
});
}



module.exports.editproduct = (req,res)=>{
  // console.log(req.file);
  // console.log(req.body);
  // return;
  
    // const plat = req.body.plat;
    // const plong = req.body.plong;
    const pid = req.body.pid;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc; 
    const pprice = req.body.pprice; 
    const pcategory = req.body.pcategory; 
    const pimage = req.file?.path; 
    // const addedBy = req.body.userId; 

    let editobj = {}
    if(pname){
      editobj.pname = pname;
    }
    if(pdesc){
      editobj.pdesc = pdesc;
    }
    if(pprice){
      editobj.pprice = pprice;
    }
    if(pcategory){
      editobj.pcategory = pcategory;
    }
    if(pimage){
      editobj.pimage = pimage;
    }
    
    
    Products.updateOne({_id :pid },editobj,{new : true})
    
    .then((result) => {
      res.send({message: 'Data Updated Sucessfully ! ', product : result})
      // console.log(result);
      
    }).catch(() => {
      res.send({message: 'Data Not Updated'})
      
    });
  
  
    // get-products Api --------------
  
    
  }





   
