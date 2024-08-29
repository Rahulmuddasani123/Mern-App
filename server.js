const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//import dotenv
require('dotenv').config()

//import path Module
const path=require('path')

// Connecting build of react with nodejs
app.use(express.static(path.join(__dirname,'./build')))

// Database Connection url replaced with env
const DBurl = process.env.DATABASE_CONNECTION_URL;


// Connect with mongodb server
MongoClient.connect(DBurl)
.then((client)=>{
  
  // Accessing database from the server
  let dbObj = client.db("rahuldb");

  // Accessing collections from the database
  let userCollectionObj = dbObj.collection("usercollection");
  let productCollectionObj = dbObj.collection("productcollection");
  let cartCollectionObj = dbObj.collection("cartCollection");
  let wishlistCollectionObj = dbObj.collection("wishlistCollection");

  // sharing Collections to API's
  app.set("userCollectionObj", userCollectionObj);
  app.set("productCollectionObj", productCollectionObj);
  app.set("cartCollectionObj", cartCollectionObj);
   app.set("wishlistCollectionObj", wishlistCollectionObj);

  console.log("database connected successfully");
})
.catch(err=>console.log('Error in connecting to database',err))



//importing userAPI & productAPI
const userAPI=require('./API/userAPI')
const productAPI = require("./API/productAPI");
const cartAPI=require("./API/cartAPI")
const wishlistAPI=require('./API/wishlistAPI')



// Execute specific middleware based on path
app.use('/users',userAPI)
app.use('/products',productAPI)
app.use('/cart',cartAPI)
app.use('/wishlist',wishlistAPI)




app.use('*',(request,response)=>{
  response.sendFile(path.join(__dirname, "./build/index.html"));
})



// Handling invalid path
app.use((request, response, next) => {
  response.send({message:'Path invalid', Path : request.url});
});

//  Handling Errors
app.use((error,request, response, next) => {
  response.send({message:'Error Occured', Error : error.message});
});

// Replacing port number with env
let port=process.env.PORT
app.listen(port, () => console.log("Server is running on port 4000"));

















