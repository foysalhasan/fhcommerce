import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTemplate } from '../contexts/TemplateContext'
import phone from '../assets/phone.png'
import msg from '../assets/message.png'
import { getUserData, signOutUser } from '../utils/firebase/firebase.utils'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton'
const Profile = () => {
  const [template, setTemplate] = useState([])
  const { currentUser, isAdmin } = useAuth()
  const { isLoading, data: profile } = useQuery(['profileData', currentUser], () => getUserData(currentUser?.uid))
  console.log(profile)
  const navigate = useNavigate()
  const { templates, removeTemplate } = useTemplate()

  const handleSignout = () => {
    signOutUser()
    navigate('/')
  }

  const goToAdmin = () => {
    if (isAdmin) {
      navigate('/admin/user')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ERROR !',
        text: 'YOU ARE NOT ADMIN',
      })
    }
  }
  useEffect(() => {
    const userTemplate = templates.filter((item) => item.email === profile?.email)
    setTemplate(userTemplate)
  }, [profile, templates])

  const showSkeleton = (num) => {
    return (
      <div className="grid grid-cols-3 gap-1 w-3/4 mx-auto">
        {Array.from(Array(num).keys()).map((el) => (
          <Skeleton key={el} className="h-40" inline="true" />
        ))}
      </div>
    )
  }

  const handleRemove = (item) => {
    removeTemplate(item)
  }

  return (
    <div className="container mx-auto lg:px-10 px-4 bg-slate-100 h-screen py-5">
      {isLoading || !profile ? (
        showSkeleton(3)
      ) : (
        <>
          <div className="bg-white rounded shadow border my-4 w-3/4 mx-auto">
            <div className="grid grid-cols-3 ">
              <div className="border-r-4 border-pink-200 px-4 py-8 text-center">
                <img
                  src={profile?.photoURL ? profile?.photoURL : profile?.imageURL}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200"
                />
                <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.displayName}</span>
              </div>
              <div className="border-r-4 border-pink-200 px-4 py-8 text-center ">
                <img src={phone} alt="Phone" className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200" />
                <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.phone ? profile?.phone : 'xx-xxx-xxxx'}</span>
              </div>
              <div className="px-4 py-8 text-center ">
                <img src={msg} alt="Phone" className="w-16 h-16 rounded-full object-cover inline-block ring-4 ring-pink-200" />
                <span className="text-xl block mt-2 font-josefin font-semibold text-gray-700">{profile?.email}</span>
              </div>
            </div>
          </div>
          <div className="text-center space-x-1">
            <button className="uppercase px-5 font-bold text-sm transition bg-teal-700 py-3 rounded text-white hover:bg-orange-600" onClick={goToAdmin}>
              ADMIN PANEL
            </button>
            <button className="uppercase px-5 font-bold text-sm transition bg-fuchsia-800 py-3 rounded text-white hover:bg-orange-600" onClick={handleSignout}>
              SIGN OUT
            </button>
          </div>
          {template.length ? (
            <div className="my-5 bg-white p-5 rounded shadow-sm border-gray-300">
              <h2 className="text-gray-800 mb-1 px-1 font-semibold text-lg">SUBMITTED PRESS</h2>
              <div className="grid grid-cols-3 gap-4">
                {template?.map((template) => (
                  <div className="bg-orange-100/70 group p-3 rounded shadow-sm relative" key={template.id}>
                    <h4 className="text-orange-700 text-lg font-bold uppercase mb-1">{template?.title}</h4>
                    <p className="text-sm">{template?.content}</p>
                    <Link to={`/press/${template?.id}`}>
                      <button className="px-3 py-2 mt-2 transition hover:bg-orange-500 rounded text-sm uppercase font-semibold bg-orange-700 text-white">
                        SEE MORE
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 invisible group-hover:visible transition hover:bg-red-700 rounded text-white text-sm font-semibold py-2 px-4 absolute top-5 right-5"
                      onClick={() => handleRemove(template)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  )
}

export default Profile
