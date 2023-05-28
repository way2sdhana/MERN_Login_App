import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from "../store/store";
import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';

function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() =>{
    generateOTP(username).then((OTP) => {
      // console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while gererating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){
    let sendPromise = generateOTP(username)

    toast.promise(sendPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>
    });

    sendPromise.then(OTP => {
      // console.log(OTP)
    })
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-16" onSubmit={onSubmit}>
            {/* className="pt-20" */}

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className='py-4 text-sm text-left text-gray-500'>
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input onChange={(e) => setOTP(e.target.value)} type="text" className={styles.textbox} placeholder='OTP' />
              </div>

              <button type="submit" className={styles.btn}>Recover</button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className='text-gray-500'>
              Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Recovery;
