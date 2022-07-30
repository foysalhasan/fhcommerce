import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { useEditQuery, useGetSingleQuery } from './Service'
import { useStorage } from '../../hooks/useStorage'
import { AiOutlineReload } from 'react-icons/ai'
import back from '../../assets/back.png'
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
export const EditProduct = () => {
  const { id } = useParams()
  const { data: pd, refetch } = useGetSingleQuery(id)
  const [uploadBtn, setUploadBtn] = useState(false)
  const defaultCat = pd?.category
  const defaultImg = pd?.imgUrl
  const [category, setCategory] = useState(defaultCat)
  const [img, setImg] = useState(null)
  const { fileUploader, loader } = useStorage()
  const { handleSubmit, register } = useForm()
  const onEdited = (data) => {
    refetch()
  }
  const { mutate, isLoading } = useEditQuery(onEdited)
  const handleForm = async (data) => {
    if (!data || !category) return
    let imgUrl
    if (uploadBtn) {
      imgUrl = await fileUploader(img)
    } else {
      imgUrl = defaultImg
    }
    const newProduct = { ...data, category, imgUrl }
    const editedData = { id, newProduct }
    mutate(editedData)
  }

  const navigate = useNavigate()
  const goback = () => {
    navigate('/admin/product')
  }

  return (
    <div className="relative z-50 p-4 h-full">
      <h2 className="text-gray-600 font-bold mb-4 text-2xl uppercase">EDIT PRODUCT</h2>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-slate-300 inline-block py-4 px-8 bg-opacity-50 backdrop-blur-sm rounded border-md shadow relative lg:w-1/2 w-full"
      >
        <input
          defaultValue={pd?.name}
          required
          type="text"
          {...register('name')}
          className="block bg-white text-lg rounded font-josefin px-4 py-2 outline-none w-full placeholder:font-medium placeholder:capitalize placeholder:text-sm my-2 text-gray-900"
        />
        <input
          defaultValue={pd?.price}
          type="text"
          required
          {...register('price')}
          className="block placeholder:capitalize my-2 bg-white rounded font-josefin px-4 py-2 outline-none w-full placeholder:font-medium text-lg placeholder:text-sm text-gray-900"
          placeholder="Price"
        />

        <Select options={options} placeholder={pd?.category} onChange={(data) => setCategory(data.value)}></Select>
        {uploadBtn && (
          <input
            required
            type="file"
            className="file:border-0 file:px-5 file:cursor-pointer file:text-sm file:font-bold file:text-white file:bg-gradient-to-br file:from-orange-500 file:to-red-600 file:py-3 file:rounded-full mt-3"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button type="submit" className="uppercase my-3 block px-5 font-bold text-sm transition bg-pink-700 py-3 rounded text-white hover:bg-sky-600">
          edit product
        </button>
        {(loader || isLoading) && <AiOutlineReload className="absolute animate-spin text-rose-500 text-3xl bottom-9 right-10" />}
      </form>
      <div className="w-40 shadow p-8 h-40 rounded-full flex justify-center items-center absolute right-28 top-28 text-7xl font-bold uppercase group overflow-hidden border-[10px] border-cyan-600 post__border">
        <div className="inset-0 flex justify-center items-center absolute transition group-hover:bg-black/30">
          <button
            className="opacity-0 invisible transform translate-y-5 group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 uppercase my-3 block px-4 font-bold text-xs transition bg-pink-700 py-3 rounded text-white hover:bg-orange-600"
            onClick={() => setUploadBtn(!uploadBtn)}
          >
            {!uploadBtn ? 'CHANGE' : 'HIDE BTN'}
          </button>
        </div>
        <img src={pd?.imgUrl} className="w-100 block object-cover" alt="Product Image" />
      </div>
      <div
        className="bg-white h-1w-14 w-14 rounded-full justify-center items-start flex shadow-sm border ring-2 ring-sky-400 absolute right-4 transform bottom-4 p-2 animate-pulse overflow-hidden cursor-pointer"
        onClick={goback}
      >
        <img src={back} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
