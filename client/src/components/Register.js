import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

import styles from '../styles/Username.module.css';

function Register() {

  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues : {
      email : 'doyol56239@cnogs.com', // demo email
      username : 'example123',
      password : 'admin@123'
    },
    validate : registerValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      // adding oneMore prop. to the values object which is 'profile'
      values = await Object.assign(values, { profile : file || '' });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully..!</b>,
        error: <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/') })
    }
  })

  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width : "45%" }}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* above -> className="py-1" , below -> className="py-4" no pb-4 */}
            <div className="profile flex justify-center pb-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} type="text" className={styles.textbox} placeholder='Email*' />
              <input {...formik.getFieldProps('username')} type="text" className={styles.textbox} placeholder='Username*' />
              <input {...formik.getFieldProps('password')} type="text" className={styles.textbox} placeholder='Password*' />
              <button type="submit" className={styles.btn}>Register</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>
                Already Register? <Link className='text-red-500' to="/">Login Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;