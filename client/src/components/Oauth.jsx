import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


export default function OAuth() {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      nevigate('/')
      dispatch(signInSuccess(data))
      console.log(result);
    } catch (error) {
      console.log("could not signin with google", error);
    }
  }
  return (
    <div>
      <button onClick={handleGoogleClick} type='button' className='bg-green-500 text-white p-3 rounded-lg hover:opacity-90 w-full'>
        CONTINUE WITH GOOGLE
      </button>
    </div>
  )
}
