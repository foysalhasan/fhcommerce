import React from 'react'
import { useDeleteQuery, useGetQuery } from './Service'
import { FaTimes } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const navigate = useNavigate()
  const { data, refetch } = useGetQuery()

  const onSuccess = (data) => {
    refetch()
  }

  const { mutate } = useDeleteQuery(onSuccess)
  const goToSingleProductPage = (id) => {
    navigate(`${id}`)
  }

  const handleRemove = (id) => {
    if (!id) return
    Swal.fire({
      title: 'ARE YOU SURE?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DELETE',
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id)
      }
    })
  }

  return (
    <div className="p-4 relative">
      <h2 className="text-gray-600 font-bold mb-4 text-2xl uppercase">ALL PRODUCTS</h2>
      <div className="">
        <ul className="grid grid-cols-2 gap-2">
          {data?.map((el) => {
            return (
              <li className="border-gray-400 flex flex-row overflow-hidden" key={el.id}>
                <div className="shadow group border select-none bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <span
                      className="block relative cursor-pointer"
                      onClick={() => {
                        goToSingleProductPage(el.id)
                      }}
                    >
                      <img alt="profil" src={el?.imgUrl} className="mx-auto object-cover rounded-full h-10 w-10 " />
                    </span>
                  </div>
                  <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-bold dark:text-white uppercase">{el.name}</div>
                    <div className="text-violet-900 capitalize font-semibold dark:text-gray-200 text-sm">{el.category}</div>
                  </div>

                  <div className="text-violet-800 dark:text-gray-200 font-bold text-lg">{el.price} USD</div>
                  <div className="mx-1">
                    <FaTimes
                      className="text-4xl opacity-0 invisible transform translate-x-20 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible cursor-pointer transition text-red-500 z-50"
                      onClick={() => handleRemove(el.id)}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Products
