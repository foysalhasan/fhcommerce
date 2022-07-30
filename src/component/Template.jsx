import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { Modal } from './press-template/Modal'
export const Template = ({ temp, activeTemp, handleTemplate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImg, setModalImg] = useState(null)
  const showModal = (img) => {
    setIsModalOpen(true)
    setModalImg(img)
  }
  return (
    <div className="p-4 bg-white relative shadow-sm border rounded-md">
      <div className="relative group">
        <FaEye
          className="text-4xl absolute top-2 right-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 text-gray-900 cursor-pointer z-40"
          onClick={() => showModal(temp?.img)}
        />
        <img
          onClick={() => handleTemplate(temp?.title, temp?.img)}
          src={temp?.img}
          alt="x"
          className={`block object-cover rounded-md cursor-pointer filter ${activeTemp === temp?.title ? 'grayscale-0' : 'grayscale'}`}
        />
      </div>
      <Modal isModalOpen={isModalOpen} img={modalImg} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}
