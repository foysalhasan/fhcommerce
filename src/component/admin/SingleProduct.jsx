import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FiLoader } from 'react-icons/fi'
import { FaRegEdit } from 'react-icons/fa'
import back from '../../assets/back.png'
import { useGetSingleQuery } from './Service'
import pd6 from '../../assets/spinner.png'

export const SingleProduct = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleQuery(id)
  const navigate = useNavigate()
  const goback = () => {
    navigate('/admin/product')
  }
  const editProduct = (id) => {
    if (!id) return
    navigate(`/admin/product/edit/${id}`)
  }
  return (
    <div className="relative z-50 p-4 h-full">
      {isLoading ? (
        <div className="inset-0 transition backdrop-blur-md flex justify-center items-center absolute">
          <FiLoader alt="loader" className="animate-spin w-20 h-20 object-cover text-rose-500" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            onClick={() => editProduct(data?.id)}
            className="absolute right-10 top-10  flex justify-center items-center text-center bg-violet-600 p-2 rounded-md shadow text-white cursor-pointer hover:bg-indigo-700"
          >
            <FaRegEdit className="text-2xl inline-block" />
            <span className="font-semibold uppercase inline-block -mb-1">Edit</span>
          </div>
          <div className="w-28 h-28 rounded-full bg-wgite p-4 bg-opacity-80 ring-4 ring-offset-2 ring-sky-400 mb-4 shadow backdrop-blur-sm overflow-hidden">
            <img src={data?.imgUrl} alt="product image" className="w-full block object-cover" />
          </div>
          <h2 className="text-sky-500 font-bold uppercase border-dashed w-1/2 mx-auto text-center block border-b-4 pb-1 border-gray-300 text-3xl">
            {data?.name}
          </h2>
          <div className="flex justify-center my-3 gap-2">
            <div className="px-5 py-2 bg-rose-500 rounded-md text-white font-semibold text-sm">{data?.price} USD</div>
            <div className="px-5 py-2 bg-orange-600 rounded-md text-white font-semibold uppercase text-sm">{data?.category}</div>
          </div>
          <div className="space-y-4">
            <p className="font-normal text-xl text-gray-600 first-letter:font-bold first-letter:text-2xl first-letter:text-rose-600 font-josefin">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum temporibus inventore, saepe voluptate non suscipit! Temporibus similique sit ab
              est atque in labore dolorem asperiores obcaecati quaerat. Quisquam, enim aperiam.
            </p>
            <p className="font-normal text-xl text-gray-600 font-josefin">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum temporibus inventore, saepe voluptate non suscipit! Temporibus similique sit ab
              est.
            </p>
          </div>
        </div>
      )}
      <div
        className="bg-white h-1w-14 w-14 rounded-full justify-center items-start flex shadow-sm border ring-2 ring-sky-400 absolute right-4 transform bottom-4 p-2 animate-pulse overflow-hidden cursor-pointer"
        onClick={goback}
      >
        <img src={back} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
