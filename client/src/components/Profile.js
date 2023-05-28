import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { updateUser } from '../helper/helper';
import useFetch from '../hooks/fetch.hook';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

function Profile() {

  const [file, setFile] = useState();
  // const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError}] = useFetch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName : apiData?.lastName || '',
      email : apiData?.email || '',
      mobile : apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      // adding oneMore prop. to the values object which is 'profile'
      values = await Object.assign(values, { profile : file || apiData?.profile || '' });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully..!</b>,
        error: <b>Could not Update!</b>
      });
      
      // console.log(values);
    }
  })

  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{ width : "45%" }}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details!
            </span>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* above -> className="py-1" , below -> className="py-4" no pb-4 */}
            <div className="profile flex justify-center pb-4">
              <label htmlFor="profile">
                <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Firstname' />
                <input {...formik.getFieldProps('lastName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Lastname' />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Email*' />
              </div>

              <input {...formik.getFieldProps('address')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder='Address' />
              <button type="submit" className={styles.btn}>Register</button>

            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>
                Come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;