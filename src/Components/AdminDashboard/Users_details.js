import React from 'react';
import { fetchusers, deleteUser } from '../../Slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect ,useState} from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

function Users_details() {
  const dispatch = useDispatch();
  const { user_details } = useSelector(state => state.user);

  // Initializing useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm();

   let [Img,setImg]=useState(null)

   const onImageSelect=(event)=>{

    let file = event.target.files[0]
    setImg(file)
    console.log(file)

   }


  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  // Check if user_details is an array and has users
  const hasUsers = Array.isArray(user_details) && user_details.length > 0;

  const handleDelete = async (user) => {
    await dispatch(deleteUser(user._id))
    dispatch(fetchusers())
  };

  const onFormSubmit=(userObj)=>{

         let formData= new FormData()

      formData.append('userObj',JSON.stringify(userObj))
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


  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex flex-row justify-content-between">
                <h5 className="Add-Products-button">All Users</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add New User
                </button>
              </div>
            </div>

            <div className="card-body">
              {hasUsers ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user_details.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <img src={user.profileimage} width={100} />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No users available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="signup-form"
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <div className="row">
                  <div className="col-12">
                    <label className="signup-form-label">USER NAME</label>
                    <input
                      type="text"
                      className="signup-form-controls"
                      {...register("username", {
                        required: true,
                        minLength: 4,
                      })}
                    />
                    {errors.username?.type === "required" && (
                      <p className="text-danger error-message">
                        User name required!
                      </p>
                    )}
                    {errors.username?.type === "minLength" && (
                      <p className="text-danger error-message">
                        User name must have at least 4 characters!
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="signup-form-label">PASSWORD</label>
                    <input
                      type="password"
                      className="signup-form-controls"
                      {...register("password", {
                        required: true,
                        minLength: 4,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-danger error-message">
                        Password required!
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-danger error-message">
                        Password must have at least 4 characters!
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="signup-form-label">EMAIL ID</label>
                    <input
                      type="email"
                      className="signup-form-controls"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-danger error-message">
                        Password required!
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="signup-form-label">Profile Photo</label>
                    <input
                      type="file"
                      className="signup-form-controls"
                      {...register("file", { required: true })}
                      onChange={(event) => onImageSelect(event)}
                    />
                  </div>

                  <div className="col-12 text-center">
                    <input
                      type="submit"
                      className="signup-button"
                      value="Add"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Users_details;
