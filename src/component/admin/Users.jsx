import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getUserData } from '../../utils/firebase/firebase.utils'
import phone from '../../assets/phone.png'
import msg from '../../assets/message.png'
import { useQuery } from 'react-query'

const Users = () => {
  const { currentUser } = useAuth()
  const { data: profile } = useQuery(['profileData', currentUser], async () => await getUserData(currentUser.uid))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 p-2 lg:p-4 relative z-30">
      <div className="border-2 bg-stone-100 bg-opacity-10 shadow rounded-md backdrop-blur-sm border-gray-100  lg:px-4 lg:py-8 px-3 py-4 text-center">
        <img
          src={profile?.photoURL ? profile?.photoURL : profile?.imageURL}
          alt=""
          className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200"
        />
        <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.displayName}</span>
      </div>
      <div className="border-2 bg-stone-100 bg-opacity-10 shadow rounded-md backdrop-blur-sm border-gray-100 lg:px-4 lg:py-8 px-3 py-4 text-center ">
        <img src={phone} alt="Phone" className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200" />
        <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.phone ? profile?.phone : 'xx-xxx-xxxx'}</span>
      </div>
      <div className="border-2 bg-stone-100 bg-opacity-10 shadow rounded-md backdrop-blur-sm border-gray-100 lg:px-4 lg:py-8 px-3 py-4 text-center ">
        <img src={msg} alt="Phone" className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200" />
        <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.email}</span>
      </div>
    </div>
  )
}

export default Users
