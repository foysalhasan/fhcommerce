import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useStorage } from '../hooks/useStorage'
import { createAuthUserByEmailPass, createUserDocFromAuth } from '../utils/firebase/firebase.utils'
import FormInput from './FormInput'

const defaultFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
}

const SignUpForm = () => {
  const { fileUploader } = useStorage()
  const [img, setImg] = useState(null)
  const [formFields, setFormFields] = useState(defaultFields)
  const { displayName, email, password, confirmPassword, phone } = formFields

  const handleInput = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const clearField = () => setFormFields(defaultFields)

  const handleSignUp = async (e) => {
    e.preventDefault()
    const imageURL = await fileUploader(img)
    console.log(imageURL)
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Password Not Matched !',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }

    try {
      const { user } = await createAuthUserByEmailPass(email, password)
      await createUserDocFromAuth(user, { displayName, phone, imageURL })
      Swal.fire({
        title: 'Good Job !',
        text: 'You Have Registered Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      clearField()
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <form className="mb-3 w-full" onSubmit={handleSignUp}>
      <h3 className="font-bold text-base lg:text-3xl text-gray-700 uppercase mb-3">Sign Up</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <FormInput name="displayName" value={displayName} onChange={handleInput} type="text" placeholder="Display Name" />
        <FormInput name="email" value={email} onChange={handleInput} type="email" placeholder="Email Address" />
        <FormInput name="password" value={password} onChange={handleInput} type="password" placeholder="Password" />
        <FormInput name="confirmPassword" value={confirmPassword} onChange={handleInput} type="password" placeholder="Confirm Password" />
        <FormInput name="phone" value={phone} onChange={handleInput} type="text" placeholder="Phone Number" />
        <input
          required
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          className="file:border-0 file:px-5 file:cursor-pointer file:text-sm file:font-bold file:text-white file:bg-gradient-to-br file:from-orange-500 file:to-red-600 file:py-3 file:rounded-full"
        />
      </div>
      <div className="mt-3">
        <button type="submit" className="text-white uppercase hover:bg-indigo-900 text-sm font-semibold px-5 py-3 rounded transition bg-pink-700 w-full">
          sign up
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
