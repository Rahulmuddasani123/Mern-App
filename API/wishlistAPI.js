const express=require('express')
const wishlistApp= express.Router()
const expressAsyncHandler=require('express-async-handler')

wishlistApp.use(express.json());

//Route to add  items from wishlist
wishlistApp.post('/addtowishlist',expressAsyncHandler(async(request,response)=>{
 
     let wishlistProduct = request.body
     let wishlistCollectionObj = request.app.get("wishlistCollectionObj");

     // checking for the user existance in database collection
    let iteminwishlist=await wishlistCollectionObj.findOne({_id:wishlistProduct._id })

  // If item already exists in database collection
  if (iteminwishlist !== null) {
    response.send({ Message: "Product Already Exists" });
  }
  else{
    await wishlistCollectionObj.insertOne(wishlistProduct)
     response.send({Message:' Product Added to wishlist'}) 

  } 
     
}))


// Route to remove items from wishlist
wishlistApp.delete('/removefromwishlist',expressAsyncHandler(async(request,response)=>{
 
     let wishlistProduct = request.body
     let wishlistCollectionObj = request.app.get("wishlistCollectionObj");

     const result = await wishlistCollectionObj.findOne({_id:wishlistProduct._id})

     await wishlistCollectionObj.deleteOne(result)
     response.send({Message:' Product Removed From wishlist'}) 
}))

// Route to fetch items from wishlist
wishlistApp.get('/getfromwishlist',expressAsyncHandler(async(request,response)=>{
 
     let wishlistCollectionObj = request.app.get("wishlistCollectionObj");
     let result= await wishlistCollectionObj.find().toArray()

     response.send({ message: "All products", wishlistitems: result });
     
}))



module.exports=wishlistApp

