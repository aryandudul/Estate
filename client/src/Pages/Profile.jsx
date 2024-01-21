import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { app } from '../firebase';

export default function UserProfile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);

  // firebase Storage
  // allow read;
  // allow write: if
  // request.resource.size < 5 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storageInstance = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storageInstance, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className='min-h-screen bg-slate-700 py-6 flex flex-col justify-center sm:py-12' style={{ backgroundColor: 'rgb(241, 245, 241)' }}>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto'>
            <div>
              <h1 className='text-2xl font-semibold mb-6 text-center'>User Profile</h1>
            </div>
            <form className='flex flex-col gap-4'>
              <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image*' />
              <div className='relative space-y-4 mx-auto'>
                <div className='relative mx-auto w-24 h-24'>
                <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
                </div>
                <p className='text-sm self-center'>
                  {fileUploadError ? (
                    <span className='text-red-700'>Error Image upload</span>
                  ) : (
                    <>
                      {filePerc > 0 && filePerc < 100 && (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                      )}
                      {filePerc === 100 && <span className='text-green-500'>Successfully uploaded</span>}
                    </>
                  )}
                </p>
              </div>
              <input type='text' placeholder='Username' id='username' className='border p-3 rounded-lg w-full' />
              <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg w-full' />
              <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg w-full' />
              <button className='bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                Update
              </button>
            </form>

            <div className='flex justify-between'>
              <span className='text-red-700 cursor-pointer'>Delete Account</span>
              <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
