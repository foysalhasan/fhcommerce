import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useGetQuery, usePostQuery } from './Service'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { FiLoader } from 'react-icons/fi'
import { useStorage } from '../../hooks/useStorage'

const options = [
  {
    value: 'shoe',
    label: 'Shoe',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'shirt',
    label: 'Shirt',
  },
  {
    value: 'laptop',
    label: 'Laptop',
  },
  {
    value: 'mobile',
    label: 'Mobile',
  },
]

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const [category, setCategory] = useState(null)
  const [img, setImg] = useState(null)
  const { fileUploader, loader } = useStorage()

  const onSuccess = () => {
    refetch()
  }
  const { data, refetch } = useGetQuery()
  const { mutate, isLoading } = usePostQuery(onSuccess)

  const handleForm = async (data) => {
    if (!data || !category) return
    const imgUrl = await fileUploader(img)
    const newProduct = { ...data, category, imgUrl }
    mutate(newProduct)
    reset()
  }

  const arr = [
    { name: 'sagor', add: '39' },
    { name: 'nazmul', add: '26' },
    { name: 'reza', add: '29' },
    { name: 'munim', add: '50' },
  ]

  return (
    <div className="p-4 relative z-30">
      <h2 className="text-gray-600 font-bold mb-4 text-2xl uppercase">ADD PRODUCT</h2>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-slate-300 inline-block py-4 px-8 bg-opacity-50 backdrop-blur-sm rounded border-md shadow relative"
      >
        <input
          required
          type="text"
          {...register('name')}
          className="block bg-white text-lg rounded font-josefin px-4 py-2 outline-none w-full placeholder:font-medium placeholder:capitalize placeholder:text-sm my-2 text-gray-900"
          placeholder="product name"
        />
        <input
          type="text"
          required
          {...register('price')}
          className="block placeholder:capitalize my-2 bg-white rounded font-josefin px-4 py-2 outline-none w-full placeholder:font-medium text-lg placeholder:text-sm text-gray-900"
          placeholder="Price"
        />

        <Select options={options} placeholder="Select Category" onChange={(data) => setCategory(data.value)}></Select>
        <input
          required
          type="file"
          className="file:border-0 file:px-5 file:cursor-pointer file:text-sm file:font-bold file:text-white file:bg-gradient-to-br file:from-orange-500 file:to-red-600 file:py-3 file:rounded-full mt-3"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button type="submit" className="uppercase my-3 block px-5 font-bold text-sm transition bg-indigo-700 py-3 rounded text-white hover:bg-sky-600">
          add product
        </button>
        {(loader || isLoading) && <FiLoader className="absolute animate-spin text-rose-500 text-3xl bottom-9 right-10" />}
      </form>
      <div className="w-40 shadow h-40 rounded-full flex justify-center items-center absolute right-28 top-28 text-7xl font-bold uppercase border-[10px] border-cyan-600 post__border">
        <span className="text-red-500 text__color">{data?.length || 0}</span>
      </div>
    </div>
  )
}

export default AddProduct
