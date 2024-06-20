import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage'
import app from '../firebase.js'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [file, setfile] = useState(undefined)
  const [fileper, setfileper] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(fileUploadError);
  console.log(fileper);
  console.log(formData);
  // useEffect(() => {
  //   console.log(currentUser);
  //   if (!currentUser) {
  //     navigate('/signin')
  //   }
  // }, [currentUser])
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
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
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <>
      <Header />

      <div className='p-3 max-w-lg mx-auto '>

        <h1 className='text-3xl font-semibold text-center my-7'>
          Profile
        </h1>
        <form className='flex flex-col items-center'>
          <input onChange={(e) => setfile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
          <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24   cursor-pointer  m-3' src={formData.avatar || currentUser.avatar} alt='profile' />

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

          <input id='user' type='text' placeholder='user' className='border p-3 m-2 w-full rounded-lg' />
          <input id='email' type='text' placeholder='email' className='border p-3 m-2 w-full rounded-lg' />
          <input id='password' type='text' placeholder='password' className='border p-3 m-2 w-full rounded-lg' />
          <button className='border p-3 m-2 w-full rounded-lg bg-gray-600 hover:bg-green-500 text-white'  > Update</button>
        </form>
        <div className='flex mt-3 justify-between'>
          <span className='cursor-pointer text-red-600'>Delete Account</span>
          <span className='cursor-pointer text-red-600'>Sign Out</span>
        </div>
      </div>
    </>
  )
}
