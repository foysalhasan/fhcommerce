import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import slider1 from '../assets/slider1.webp'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import { useTemplate } from '../contexts/TemplateContext'
import { getUserData } from '../utils/firebase/firebase.utils'
import { useQuery } from 'react-query'
import { Template } from './Template'
import Swal from 'sweetalert2'

const arr = [
  {
    title: 'temp1',
    img: slider1,
  },
  {
    title: 'temp2',
    img: slider2,
  },
  {
    title: 'temp3',
    img: slider3,
  },
]

const SubmitPress = () => {
  const { currentUser } = useAuth()
  const { data: profile } = useQuery(['profileData', currentUser], () => getUserData(currentUser?.uid))
  const { addTemplate } = useTemplate()
  const { handleSubmit, register, reset } = useForm()
  const [activeTemp, setActiveTemp] = useState('temp1')
  const [templatePhoto, setTemplatePhoto] = useState(slider1)
  const handleTemplate = (template, img) => {
    setActiveTemp(template)
    setTemplatePhoto(img)
  }

  const handlePress = (data) => {
    if (!data || !activeTemp || !profile) {
      Swal.fire({
        icon: 'error',
        color: '#ff4646',
        title: 'Something Went Wrong !',
      })
      return
    } else {
      const createdAt = new Date()
      const pressData = { ...data, createdAt, activeTemp, templatePhoto, user: profile.displayName, email: profile.email }
      addTemplate(pressData)
      Swal.fire({
        icon: 'success',
        title: 'SUCCESS !',
        text: 'Press Posted !',
      })
      reset()
    }
  }

  return (
    <div className="bg-gray-200 h-screen container relative mx-auto flex flex-col items-center justify-center px-4 lg:px-10">
      <div className=" rounded p-8  mx-auto">
        <h3 className="text-2xl text-gray-700 font-bold font-josefin inline-block border-b-2 border-gray-500 pb-1 mb-4 uppercase">Choose Press Template</h3>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {arr.map((el, index) => (
            <Template key={index} temp={el} activeTemp={activeTemp} handleTemplate={handleTemplate} />
          ))}
        </div>
        <form onSubmit={handleSubmit(handlePress)} className="bg-white p-4 w-1/2 mx-auto rounded shadow-sm border">
          <h3 className="text-2xl text-gray-700 font-bold font-josefin inline-block border-b-2 border-gray-500 pb-1 mb-4 uppercase">Write Post</h3>
          <div className="mb-3">
            <input
              {...register('title')}
              required
              type="text"
              placeholder="Press Title"
              className="border w-full rounded px-3 py-3 font-josefin bg-gray-200 outline-none"
            />
          </div>
          <div className="mb-3">
            <textarea
              {...register('content')}
              required
              rows={5}
              type="text"
              placeholder="Press Content"
              className="border w-full rounded px-3 font-josefin bg-gray-200 outline-none"
            />
          </div>
          <button type="submit" className="uppercase px-5 font-bold text-sm transition bg-fuchsia-800 py-3 rounded text-white hover:bg-orange-600">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubmitPress
