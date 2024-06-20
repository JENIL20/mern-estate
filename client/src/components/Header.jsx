import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <header className='bg-slate-200 shadow-md' >
      {/* {console.log(currentUser)} */}
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500 '>Jenil</span>
            <span className='text-slate-900'>E-state</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-xl flex items-center'>
          <input type='text' placeholder='search' className='bg-transparent focus:outline-none p-1 w-24 sm:w-64' />
          <FaSearch className='text-slate-500 ' />
        </form>
        <ul className='flex gap-6'>
          <Link to='/'>
            <li className='  hidden sm:inline  text-slate-700 hover:text-blue-600 hover:cursor-pointer'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='  hidden sm:inline  text-slate-700 hover:text-blue-600 hover:cursor-pointer' >About</li>
          </Link>
          {
            currentUser ?
              <Link to='/profile'>
                <img className='rounded-full h-10 w-10 ' src={currentUser.avatar} alt='profile' />
              </Link>

              :
              <Link to='/signin'>
                <li className='inline text-slate-700 hover:text-blue-600 hover:cursor-pointer'>Sign in</li>
              </Link>
          }
        </ul>
      </div>
    </header>
  )
}
