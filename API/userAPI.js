
//Create router to handle user API requests
const express=require('express')
const userApp= express.Router()
const { ObjectId } = require('mongodb');


const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


// importing cloudinary related things
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')

 // Configure Cloudinary
    cloudinary.config({ 
        cloud_name: 'dgxzmmhvu', 
        api_key: '962446269255832', 
        api_secret: '72Q7LH2cMgdjEY3qXQmB8hvetVA' // Click 'View API Keys' above to copy your API secret
    });

  // Configure Cloudinary storage

  const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async(req,file)=>{
      return{
        folder:'Rivv-Rivv Profiles',
        public_id: file.fieldname + "-"+ Date.now(),
      };
    },
  })


  //confiure multer

  const upload=multer({storage:storage})



userApp.use(express.json());


// Route to create user
userApp.post("/createUser", upload.single('photo'), expressAsyncHandler(async(request, response) => {

  console.log(request.file.path)

  // Getting collection object
  const userCollectionObj=request.app.get("userCollectionObj")

  // Getting userObj from client
  let newUserObj = JSON.parse(request.body.userObj);

  // checking for the user existance in database collection
  let UserinDB=await userCollectionObj.findOne({username:newUserObj.username })

  // If user already exists in database collection
  if (UserinDB !== null) {
    response.send({ Message: "User Name Already Exists" });
  }

  // If user not exists in database collection
  else {

    // Hashing the password
    let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);

    //replacing the plain password with hashedpassword in newuserobj
    newUserObj.password = hashedPassword;

     newUserObj.profileimage = request.file.path;

     delete newUserObj.file;

    //Insert newUser
    await userCollectionObj.insertOne(newUserObj);

    //Send Response
    response.send({ Message: "Signup successful, Please login." });
  }

}));





// Route to login
userApp.post("/login", expressAsyncHandler(async(request, response) => {

  // Getting collection object
  const userCollectionObj=request.app.get("userCollectionObj")

  // Getting userObj from client
  let UserObj = request.body;

  // checking for the user existance in database collection
  let UserinDB=await userCollectionObj.findOne({username:UserObj.username })

  // If user not exists in database collection
  if (UserinDB == null) {
    response.send({ Message: "Invalid User" });
  }

  // If user exists in database collection
  else {

    // Comparing the client password and database password
    let status=await bcryptjs.compare(UserObj.password,UserinDB.password)

    // If passwords dont match
    if (status == false) {
      response.send({ Message: "Invalid Password" });
    }

    // If passwords match
    else {
      // Create a token
      const token = jwt.sign({ username: UserinDB.username},process.env.SECRET_KEY , {expiresIn:60});

      // Send token as response
      response.send({Message:'success',payload:token,userObj:UserinDB})

    }
  }
}));




// Route to get all users
userApp.get("/getUsers", async (request, response) => {
  try {
    // Getting collection object
    const userCollectionObj = request.app.get("userCollectionObj");

    // Fetching all users
    const result = await userCollectionObj.find().toArray();

    // Sending response
    response.send({ message: "All users", users: result });
  } catch (error) {
    // Handling errors
    console.error("Error fetching users:", error);
    response.status(500).send({ message: "Failed to fetch users" });
  }
});




// Route to Update user

userApp.put('/updateUser', upload.single('profileImage'), expressAsyncHandler(async (request, response) => {

  const updatedUser = JSON.parse(request.body.userObj);

  const profileImage = request.file ? request.file.path : null;

  if (profileImage) {
    updatedUser.profileimage = profileImage;
  }

  const userCollectionObj = req.app.get('userCollectionObj');
  const result = await userCollectionObj.updateOne(
    { _id: updatedUser._id },
    { $set: { ...updatedUser } }
  );

  if (result.matchedCount === 1) {
    response.send({ message: 'Product updated successfully', updatedUser: updatedUser });
  } else {
    response.status(404).send({ message: 'Product not found' });
  }
}));





userApp.delete('/removeUser/:id', expressAsyncHandler(async (request, response) => {

    const userId = request.params.id;

    // Convert string ID to ObjectId
    const objectId = new ObjectId(userId);

    const userCollectionObj = request.app.get('userCollectionObj');
    const result = await userCollectionObj.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
        response.send({ message: 'Product removed successfully' });
    } else {
        response.status(404).send({ message: 'Product not found' });
    }
}));



//exporting the userAPI
module.exports=userApp




