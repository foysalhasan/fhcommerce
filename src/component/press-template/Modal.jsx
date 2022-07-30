import React from 'react'

export const Modal = ({ img, setIsModalOpen, isModalOpen }) => {
  return (
    <div
      className={`inset-0 fixed transition  ${
        isModalOpen ? 'visible opacity-100 z-40' : 'invisible opacity-0 -z-10'
      } bg-black bg-opacity-50 flex justify-center items-center p-8`}
    >
      <div
        className={`bg-white transition-transform ease-linear duration-200 transform ${
          isModalOpen ? 'scale-100' : 'scale-50'
        } overflow-hidden group z-50 max-w-3xl shadow-md rounded-md p-8 relative`}
      >
        <img src={img} className="w-full select-none object-cover rounded block" />
        <button
          className="px-5 transition group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 py-3 rounded text-sm font-semibold hover:bg-pink-700 bg-gray-900 text-white opacity-0 invisible absolute top-12 right-12 transform translate-x-10"
          onClick={() => setIsModalOpen(false)}
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}
