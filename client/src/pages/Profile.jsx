import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString
} from 'firebase/storage'
import app from '../firebase.js'
import {
  updateUserStart,
  updatedUserFailure,
  updatedUserSuccess,
  deleteUserStart,
  deletedUserFailure,
  deletedUserSuccess
} from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [file, setfile] = useState(undefined)
  const [fileper, setfileper] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(['access_token'])
  const dispatch = useDispatch()




  console.log("accesstoken", cookies);
  console.log(fileUploadError);
  console.log(fileper);
  console.log("asdfasd", formData);
  // useEffect(() => {
  //   console.log(currentUser);
  //   if (!currentUser) {
  //     navigate('/signin')
  //   }
  // }, [currentUser])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, file)

    // uploadTask.on('state_changed',
    //   (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     setfileper(Math.round(progress));
    //     (error) => {
    //       setfileUploadError(true)
    //     };
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then
    //         ((downloadURL) => setFormData({ ...formData, avatar, downloadURL }))
    //     }
    //   });
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileper(Math.round(progress));
      },

      (Error) => {
        setfileUploadError(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
          console.log("changing")
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json()

      if (data.success === false) {
        dispatch(updatedUserFailure(data.message))
        return;
      }

      dispatch(updatedUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updatedUserFailure(error.message))
    }
  }
  const handleDeletUser = async (e) => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        // body: JSON.stringify(formData),
      });
      const data = await res.json()
      if (data.success === false) {
        dispatch(deletedUserFailure(error.message))
        return
      }
      dispatch(deletedUserSuccess(data))
      navigate('/signin')

    } catch (error) {
      dispatch(deletedUserFailure(error.message))
    }
  }
  useEffect(() => {
    if (!currentUser) {
      console.log("hu nai ");
      navigate('/signin')
    }
    if (file) {
      handleFileUpload(file)
    }
  },)
  return (
    <>
      <Header />



      <div className='p-3 max-w-lg mx-auto '>

        <h1 className='text-3xl font-semibold text-center my-7'>
          Profile
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <input onChange={(e) => setfile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
          <img onChange={handleChange} onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24   cursor-pointer  m-3' src={formData.avatar || currentUser.avatar} alt='profile' />

          <p className='text-sm self-center'>
            {

              fileUploadError ? (
                <span className='text-red-700'>
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : fileper > 0 && fileper < 100 ? (
                <span className='text-slate-700'>{`Uploading ${fileper}%`}</span>
              ) : fileper === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ''
              )}
          </p>

          <input
            defaultValue={currentUser.username}
            id='user'
            type='text'
            placeholder='user'
            className='border p-3 m-2 w-full rounded-lg'
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            id='email'
            type='text'
            placeholder='email'
            className='border p-3 m-2 w-full rounded-lg'
            onChange={handleChange}
          />
          <input
            id='password'
            type='password'
            placeholder='password'
            className='border p-3 m-2 w-full rounded-lg'
            onChange={handleChange}
          />
          <button type='submit' className='border p-3 m-2 w-full rounded-lg bg-gray-600 hover:bg-green-500 text-white'  > {loading ? "Loading..." : 'Update'}</button>
        </form>
        <div className='flex mt-3 justify-between'>
          <span onClick={handleDeletUser} className='cursor-pointer text-red-600'>Delete Account</span>
          <span onClick={handleDeletUser} className='cursor-pointer text-red-600'>Sign Out</span>
        </div>
        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess ? 'User is updated successfully!' : ''}
        </p>
      </div>
    </>
  )
}
