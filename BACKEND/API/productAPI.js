//Create router to handle user API requests
const express = require("express");
const productApp = express.Router();

// importing express-async-handler
const expressAsyncHandler=require('express-async-handler')

productApp.use(express.json());


// Route to create product
productApp.post("/createProduct", expressAsyncHandler(async (request, response) => {

    let newproduct = request.body;

  // get productCollectionObj
  let productCollectionObj = request.app.get("productCollectionObj");

  // Inserting data using async & await
  let result = await productCollectionObj.insertOne(newproduct)

      response.send({ message: "product created successfully" })

}))


// Route to get all products
productApp.get("/getProducts", expressAsyncHandler(async(request, response) => {
  // get productCollectionObj
  let productCollectionObj = request.app.get("productCollectionObj");

  // Get all products 
  let result = await productCollectionObj.find().toArray();

  response.send({ message: "All products", products: result });
}));



// Route to get product by id
productApp.get("/getProduct/:id", expressAsyncHandler(async(request, response) => {

  let productId =(+request.params.id);

   // get productCollectionObj
  let productCollectionObj = request.app.get("productCollectionObj");

  // Get all products 
  let result = await productCollectionObj.findOne({productId: productId})

  
  response.send({ message: "product Found", products: result });

}));



// Route to Update product
productApp.put("/updateProduct", expressAsyncHandler(async(request, response) => {

  let updatedproduct = request.body;

  let productCollectionObj = request.app.get("productCollectionObj");

  // Get all products 
  let result = await productCollectionObj.updateOne({productId:updatedproduct.productId},{$set:{...updatedproduct}})

  
  response.send({ message: "product Updated", products: result });

}));


// Route to remove product by id
productApp.delete("/removeProduct/:id", expressAsyncHandler(async(request, response) => {

  let productId = +request.params.id;

  // get productCollectionObj
  let productCollectionObj = request.app.get("productCollectionObj");

  // Get all products
  let result = await productCollectionObj.deleteOne({ productId: productId });

  response.send({ message: "product Removed", products: result });
}));



//Exporting product API
module.exports=productApp




