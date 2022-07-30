import React from 'react'
import { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import { getRedirectResult } from 'firebase/auth'
import { googleSignInPopup, googleSignInRedirect, signInAuthUserByEmailPass, createUserDocFromAuth, auth } from '../utils/firebase/firebase.utils'
import FormInput from './FormInput'
import google from '../assets/google.png'

const defaultFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFields)
  const { email, password } = formFields

  const handleInput = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const clearField = () => setFormFields(defaultFields)

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const { user } = await signInAuthUserByEmailPass(email, password)
      await createUserDocFromAuth(user)
      Swal.fire({
        title: 'Good Job !',
        text: 'Login Successful !',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      clearField()
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          Swal.fire({
            title: 'Error!',
            text: 'User Not Found !',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          break
        case 'auth/wrong-password':
          Swal.fire({
            title: 'Error!',
            text: 'Password Wrong !',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          break
        default:
          console.log(error)
      }
    }
  }

  useEffect(() => {
    const getRedirect = async () => {
      await getRedirectResult(auth)
    }
    getRedirect()
  }, [])

  const googleLogin = async () => {
    const { user } = await googleSignInPopup()
    if (user) {
      await createUserDocFromAuth(user)
    }
  }

  return (
    <div className="">
      <form className="mb-4 w-full" onSubmit={handleSignIn}>
        <h3 className="font-bold text-base lg:text-3xl text-gray-700 uppercase mb-3">Sign In</h3>
        <div className="grid grid-cols-1 gap-4">
          <FormInput name="email" value={email} onChange={handleInput} type="email" placeholder="Email Address" />
          <FormInput name="password" value={password} onChange={handleInput} type="password" placeholder="Password" />
        </div>
        <div className="mt-3">
          <button type="submit" className="text-white uppercase bg-cyan-600 text-sm font-semibold px-5 py-3 rounded transition hover:bg-indigo-700 w-full">
            sign in
          </button>
        </div>
      </form>
      <div className="text-center flex gap-3 justify-center">
        <button
          type="button"
          className="text-gray-700 uppercase bg-slate-300 text-sm font-semibold px-4 py-3 rounded transition hover:bg-indigo-700 hover:text-white flex items-center justify-between"
          onClick={googleLogin}
        >
          <img src={google} alt="google icon" className="w-8 h-8 block object-cover mr-2" />
          <span>Sign in with Google</span>
        </button>
        <button
          type="button"
          className="text-white uppercase bg-gray-900 text-sm font-semibold px-5 py-3 rounded transition hover:bg-indigo-700"
          onClick={googleSignInRedirect}
        >
          Sign in with Google Redirect
        </button>
      </div>
    </div>
  )
}

export default SignInForm
