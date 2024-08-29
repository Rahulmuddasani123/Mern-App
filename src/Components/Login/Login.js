import React from "react";
import login_vector from "../../Images/login_vector.png";
import LogoSymbol from "../../Images/Logo_Symbol.png";
import "./Login.css";
import {useForm} from 'react-hook-form'
import {useSelector,useDispatch} from'react-redux'
import { userLogin } from "../../Slices/userSlice";
import { useNavigate } from "react-router";
import { useEffect,useState } from "react";

function Login() {
  const [userType, setUserType] = useState('');

  let {userObj,isPending,isRejected,isSuccess,errmsg} =useSelector(state=>state.user)
  let Dispatch=useDispatch()
  let navigate=useNavigate()


  const {register,handleSubmit,formState:{errors}}=useForm()


  const onFormSubmit=(userCredentialsObj)=>{
    Dispatch(userLogin(userCredentialsObj))
    setUserType(userCredentialsObj.usertype)
    
   
  }

   // Navigate to /Products if login is successful
   useEffect(() => {
    if (isSuccess) {
      if (userType === 'admin') {
        navigate('/AdminDashboard');
      } else if (userType === 'user') {
        navigate('/UserDashboard');
      }
    }
  }, [isSuccess, userType, navigate]);
 

  return (
    <div>
      <div className="container">
        <div className="row p-2">
          <div className="col-lg-6 col-xs-12 d-none d-lg-block">
            <div className="login-form-containe">
              <img src={login_vector} width={520} className="ss" />
            </div>
          </div>

          <div className="col-lg-6 col-xs-12 ">
            <div className="login-form-container">
              <div className="text-center">
                <img src={LogoSymbol} width={55} />
                <h1 className="login-header-text"> Login</h1>
              </div>

              <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <label className="login-form-label">USER NAME</label>
                    <input type="text" className="form-controls" {...register("username", { required: true})} />
                     {errors.username?.type === 'required' && <p className='text-danger error-message'>User name required!</p>}
                     
                  </div>
                  <div className="col-12">
                    <label className="login-form-label">PASSWORD</label>
                     <input type="password" className="form-controls" {...register("password", { required: true, minLength: 4 })} />
                      {errors.password?.type === 'required' && <p className='text-danger error-message'>Password required!</p>}
                    
                  </div>

                  <div>
                    <label className="login-form-label">LOGIN AS</label>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="user" name="usertype" value="user" {...register("usertype", { required: true })} />
                      <label className="form-check-label"  htmlFor="user" >User </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio"  id="admin" name="usertype"  value="admin" {...register("usertype", { required: true })} />
                      <label className="form-check-label"  htmlFor="flexRadioDefault2" > Admin </label>
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <input type="submit" class="login-button" value="Log In" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
