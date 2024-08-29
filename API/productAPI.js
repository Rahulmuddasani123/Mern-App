const express = require("express");
const productApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const { API_URL }= require("../Constants");

productApp.use(express.json());

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dgxzmmhvu', 
    api_key: '962446269255832', 
    api_secret: '72Q7LH2cMgdjEY3qXQmB8hvetVA' 
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'Rivv Rivv Products',
        public_id: file.fieldname + "-" + Date.now(),
    }),
});

// Configure multer
const upload = multer({ storage: storage });


// Route to create product
    productApp.post(`${API_URL}/createProduct`, upload.single('ProductImage'), expressAsyncHandler(async (request, response) => {
    let newProduct = JSON.parse(request.body.productObj);

    newProduct.productImage = request.file.path;

    let productCollectionObj = request.app.get("productCollectionObj");
    await productCollectionObj.insertOne(newProduct);

    response.send({ message: "Product created successfully" });
}));


// Route to get all products
productApp.get(`${API_URL}/getProducts`, expressAsyncHandler(async (request, response) => {
    let productCollectionObj = request.app.get("productCollectionObj");
    let result = await productCollectionObj.find().toArray();

    response.send({ message: "All products", products: result });
}));

// Route to get product by id
productApp.get(`${API_URL}/getProduct/:id`, expressAsyncHandler(async (request, response) => {
    let productId = ObjectId(request.params.id);

    let productCollectionObj = request.app.get("productCollectionObj");
    let result = await productCollectionObj.findOne({ _id: productId });

    if (result) {
        response.send({ message: "Product found", product: result });
    } else {
        response.status(404).send({ message: "Product not found" });
    }
}));

// Route to update product
productApp.put(`${API_URL}/updateProduct`, expressAsyncHandler(async (req, res) => {
  const updatedProduct = JSON.parse(req.body.productObj);
  const productImage = req.file ? req.file.path : null;

  if (productImage) {
    updatedProduct.productImage = productImage;
  }

  const productCollectionObj = req.app.get('productCollectionObj');
  const result = await productCollectionObj.updateOne(
    { _id: updatedProduct._id },
    { $set: { ...updatedProduct } }
  );

  if (result.matchedCount === 1) {
    res.send({ message: 'Product updated successfully', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
}));



productApp.delete(`${API_URL}/removeProduct/:id`, expressAsyncHandler(async (request, response) => {
    const productId = request.params.id;

    // Convert string ID to ObjectId
    const objectId = new ObjectId(productId);

    const productCollectionObj = request.app.get('productCollectionObj');
    const result = await productCollectionObj.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
        response.send({ message: 'Product removed successfully' });
    } else {
        response.status(404).send({ message: 'Product not found' });
    }
}));

module.exports = productApp;


// Exporting product API
module.exports = productApp;
