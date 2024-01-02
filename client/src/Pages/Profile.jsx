import React from 'react';
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='min-h-screen bg-slate-700 py-6 flex flex-col justify-center sm:py-12' style={{ backgroundColor: 'rgb(241, 245, 241)' }}>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto'>
            <div>
              <h1 className='text-2xl font-semibold mb-6 text-center'>User Profile</h1>
            </div>
            <div className='divide-y divide-gray-200 space-y-6 text-center'>
              <div className='relative space-y-4 mx-auto'>
                <div className='relative mx-auto w-24 h-24'>
                  <img
                    src={currentUser.avatar}
                    alt='profile'
                    className='rounded-full object-cover w-full h-full cursor-pointer'
                  />
                </div>
                <input
                  type='text'
                  placeholder='Username'
                  id='username'
                  className='border p-3 rounded-lg w-full'
                />
                <input
                  type='email'
                  placeholder='Email'
                  id='email'
                  className='border p-3 rounded-lg w-full'
                />
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  className='border p-3 rounded-lg w-full'
                />
                <button className='bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                  Update
                </button>
              </div>
              <div className='flex justify-between'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
