
//Create router to handle user API requests
const express=require('express')
const userApp= express.Router()



const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

userApp.use(express.json());


// Route to create user
userApp.post("/createUser", expressAsyncHandler(async(request, response) => {

  // Getting collection object
  const userCollectionObj=request.app.get("userCollectionObj")

  // Getting userObj from client
  let newUserObj = request.body;

  // checking for the user existance in database collection
  let UserinDB=await userCollectionObj.findOne({username:newUserObj.username })

  // If user already exists in database collection
  if (UserinDB !== null) {
    response.send({ Message: "User Already Exists" });
  }

  // If user not exists in database collection
  else {

    // Hashing the password
    let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);

    //replacing the plain password with hashedpassword in newuserobj
    newUserObj.password = hashedPassword;

    //Insert newUser
    await userCollectionObj.insertOne(newUserObj);

    //Send Response
    response.send({ Message: "User created" });
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
      const token = jwt.sign({ username: UserinDB.username},'abcdef' , {expiresIn:60});

      // Send token as response
      response.send({Message:'Login Successful',data:token})

    }
  }
}));

// Route to get user by id
userApp.get("/getUser/:id", (request, response) => {
  let userId = +request.params.id;

  let user = users.find((userObj) => userObj.id == userId);

  response.send({ message: "User Found", users: user });
});


// Route to Update user
userApp.put("/updateUser", (request, response) => {
  let updatedUser = request.body;

  let user = users.findIndex((userObj) => userObj.id == updatedUser.id);

  if (user !== -1) {
    users[user] = updatedUser;
    response.send({ message: "User Updated", users: users });
  }
});

// Route to remove user by id
userApp.delete("/removeUser/:id", (request, response) => {
  let userId = +request.params.id;

  let user = users.findIndex((userObj) => userObj.id == userId);

  if (user !== -1) {
    users.splice(user, 1);
    response.send({ message: "User Removed", users: users });
  }
});

//exporting the userAPI
module.exports=userApp




