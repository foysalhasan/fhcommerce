import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SignUpForm from '../component/SignUpForm'
import SignInForm from '../component/SignInForm'
import { useAuth } from '../contexts/AuthContext'
import { useQuery } from 'react-query'
import { getUserData } from '../utils/firebase/firebase.utils'

const UserAuth = () => {
  const [toggle, setToggle] = useState(true)
  const { currentUser } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true })
    }
  }, [currentUser])

  return (
    <div className="container h-screen mx-auto lg:px-10 px-4 py-8 bg-slate-100">
      <div className="bg-blue-100 rounded-full w-80 max-w-full mx-auto mb-8 shadow-md h-12 flex overflow-hidden">
        <button
          type="button"
          onClick={() => setToggle(true)}
          className={`text-sm lg:text-xl font-bold px-4 transition rounded-full w-1/2 ${toggle && 'bg-cyan-600 text-white'}`}
        >
          SIGN IN
        </button>
        <button
          type="button"
          onClick={() => setToggle(false)}
          className={`text-sm lg:text-xl font-bold px-4 transition rounded-full w-1/2 ${!toggle && 'bg-pink-600 text-white'}`}
        >
          SIGN UP
        </button>
      </div>
      <div className="lg:w-1/2 mx-auto bg-white rounded px-2 lg:px-8 py-4 lg:py-12 shadow-md">{toggle ? <SignInForm /> : <SignUpForm />}</div>
    </div>
  )
}

export default UserAuth
