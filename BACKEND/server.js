const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;

//Database Connection url
const DBurl = "mongodb+srv://rahul:rahul@cluster0.i15gkdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Connect with mongodb server
MongoClient.connect(DBurl)
.then((client)=>{
  
  // Accessing database from the server
  let dbObj = client.db("rahuldb");

  // Accessing collections from the database
  let userCollectionObj = dbObj.collection("usercollection");
  let productCollectionObj = dbObj.collection("productcollection");

  // sharing Collections to API's
  app.set("userCollectionObj", userCollectionObj);
  app.set("productCollectionObj", productCollectionObj);

  console.log("database connected successfully");
})
.catch(err=>console.log('Error in connecting to database',err))




//importing userAPI & productAPI
const userAPI=require('./API/userAPI')
const productAPI = require("./API/productAPI");



// Execute specific middleware based on path
app.use('/users',userAPI)
app.use('/products',productAPI)



// Handling invalid path
app.use((request, response, next) => {
  response.send({message:'Path invalid', Path : request.url});
});

//  Handling Errors
app.use((error,request, response, next) => {
  response.send({message:'Error Occured', Error : error.message});
});


app.listen(4000, () => console.log("Server is running on port 4000"));

















