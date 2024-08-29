import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router';
import "./Signup.css";
import LogoSymbol from "../../Images/Logo_Symbol.png";
import signup_vector from "../../Images/signup_vector.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

  let [Img,setImg]=useState(null)

   const onImageSelect=(event)=>{

    let file = event.target.files[0]
    setImg(file)
    console.log(file)

   }

  // Declaring useNavigate hook
  const navigate = useNavigate();

  // Initializing useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle form submit.
  const onFormSubmit = (userobj) => {

      let formData= new FormData()

      formData.append('userObj',JSON.stringify(userobj))
      formData.append('photo',Img)



    // Making HTTP post request with axios to create user
    axios.post('/users/createUser', formData)
      .then((response) => {
        console.log(response)
        let msg = response.data.Message;

        // Set the toast based on the response
        if (msg === 'Signup successful, Please login.') {

           toast.success("Signup successful, Please login.", {
             position: "top-center",
             autoClose: 2000, // Auto close after 2 seconds
             onClose: () => navigate('/login'), // Navigate after the toast closes
          });
        }

        if (msg === "User Name Already Exists") {

          toast.error("User Name Already Exists", {
          position: "top-center",
          autoClose: 2000,
           
          });
        }
       
      })
      .catch((error) => {
        toast.error("Something Went Wrong!", {
             position: "top-center",
            autoClose: 2000, 
          });
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row p-2">
        <div className="col-lg-6 col-xs-12 d-none d-lg-block">
          <div>
            <img src={signup_vector} width={520} />
          </div>
        </div>

        <div className="col-lg-6 col-xs-12 ">
          <div className="signup-form-container">
            <div className="text-center">
              <img src={LogoSymbol} width={55} />
              <h1 className="signup-header-text">Sign Up</h1>
            </div>

            <form className="signup-form" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="row">
                <div className="col-12">
                  <label className="signup-form-label">USER NAME</label>
                  <input type="text" className="signup-form-controls" {...register("username", { required: true, minLength: 4 })} />
                  {errors.username?.type === 'required' && <p className='text-danger error-message'>User name required!</p>}
                  {errors.username?.type === 'minLength' && <p className='text-danger error-message'>User name must have at least 4 characters!</p>}
                </div>

                <div className="col-12">
                  <label className="signup-form-label">PASSWORD</label>
                  <input type="password" className="signup-form-controls" {...register("password", { required: true, minLength: 4 })} />
                  {errors.password?.type === 'required' && <p className='text-danger error-message'>Password required!</p>}
                  {errors.password?.type === 'minLength' && <p className='text-danger error-message'>Password must have at least 4 characters!</p>}
                </div>

                <div className="col-12">
                  <label className="signup-form-label">EMAIL ID</label>
                  <input type="email" className="signup-form-controls" {...register("email")} />
                </div>

                <div className="col-12">
                  <label className="signup-form-label">EMAIL ID</label>
                  <input type="file" className="signup-form-controls" {...register("file",{required:true})} onChange={(event)=>onImageSelect(event)} />
                </div>

                

                <div className="col-12 text-center">
                  <input type="submit" className="signup-button" value="Sign Up" />
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
       <ToastContainer />
    </div>
     
  );
}

export default Signup;
