import React, { useState } from 'react'
import { getWooProducts } from '../servers'
import Select from 'react-select'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import TestItem from './TestItem'

const options = [
  { value: '', label: 'All' },
  { value: '50', label: 'Barisal' },
  { value: '53', label: 'Bagerhat' },
  { value: '46', label: 'Dhaka' },
  { value: '49', label: 'Jessore' },
  { value: '51', label: 'Jhenaidah' },
  { value: '45', label: 'Khulna' },
  { value: '52', label: 'Sylhet' },
]

const Test = () => {
  const [category, setCategory] = useState('')
  const { isLoading, isError, data: products } = useQuery(['wpProduct', category], () => getWooProducts(category))

  if (isError) {
    Swal.fire({
      title: 'Error!',
      text: 'Fetching The Products',
      icon: 'error',
      confirmButtonText: 'OK',
    })
    return
  }

  const showSkeleton = (num) => {
    return (
      <>
        {Array.from(Array(num).keys()).map((el, index) => (
          <Skeleton key={index} className="h-16" inline={true} />
        ))}
      </>
    )
  }

  const handleSelect = ({ value }) => {
    setCategory(value)
  }

  return (
    <div className="bg-gray-200 min-h-screen py-8 container relative mx-auto flex flex-col items-center justify-center px-4 lg:px-10">
      <div className="mb-5 relative z-50">
        <Select isSearchable placeholder="Choode State" options={options} onChange={handleSelect} className="w-80" />
      </div>
      <div className="bg-white rounded shadow-md border-gray-200 px-2 py-8 lg:px-8 w-full mx-auto max-w-full overflow-y-scroll grid lg:grid-cols-3 gap-4 h-[600px] content-start">
        {isLoading && showSkeleton(18)}
        {products?.map((item) => (
          <TestItem key={item.id} item={item} />
        ))}
        {isLoading || (products?.length === 0 && <span className="text-xl font-bold text-red-500">NO NUMBER IN THE STOOCK !</span>)}
      </div>
    </div>
  )
}

export default Test
