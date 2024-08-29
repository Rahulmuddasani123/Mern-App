//Create router to handle user API requests
const express=require('express')
const cartApp= express.Router()
const expressAsyncHandler=require('express-async-handler')

cartApp.use(express.json());


//Route to add  items from cart
cartApp.post('/addtocart',expressAsyncHandler(async(request,response)=>{
 
     let cartProduct = request.body
     let cartCollectionObj = request.app.get("cartCollectionObj");

     // checking for the user existance in database collection
    let itemincart=await cartCollectionObj.findOne({_id:cartProduct._id })

  // If item already exists in database collection
  if (itemincart !== null) {
    response.send({ Message: "Product Already Exists" });
  }
  else{
    await cartCollectionObj.insertOne(cartProduct)
     response.send({Message:' Product Added to Cart'}) 

  }
     
}))

// Route to remove items from cart
cartApp.delete('/removefromcart',expressAsyncHandler(async(request,response)=>{
 
     let cartProduct = request.body
     let cartCollectionObj = request.app.get("cartCollectionObj");

     const result = await cartCollectionObj.findOne({_id:cartProduct._id})

     await cartCollectionObj.deleteOne(result)
     response.send({Message:' Product Removed From Cart'}) 
}))


// Route to fetch items from cart
cartApp.get('/getfromcart',expressAsyncHandler(async(request,response)=>{
 
     let cartCollectionObj = request.app.get("cartCollectionObj");
     let result= await cartCollectionObj.find().toArray()

     response.send({ message: "All products", cartitems: result });
     
}))



// Route to update items from cart
cartApp.put('/updatecartitem',expressAsyncHandler(async(request,response)=>{

  let updatedcartProduct = request.body
 
     let cartCollectionObj = request.app.get("cartCollectionObj");
     const result = await cartCollectionObj.updateOne(
       { _id: updatedcartProduct._id },
       { $set: { ...updatedcartProduct } } );
    
     if (result.modifiedCount > 0) {
        // Fetch the updated document
        const updatedProduct = await cartCollectionObj.findOne({ _id: updatedcartProduct._id });
        response.send({ message: "Product Updated", cartitem: updatedProduct });
    } else {
        response.status(400).send({ message: "Failed to update product" });
    }
}));
     
module.exports=cartApp

