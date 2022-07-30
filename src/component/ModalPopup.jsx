import phone from '../assets/phone.png'

const ModalPopUp = ({ pd, toggleModal }) => {
  return (
    <div className="w-1/2 fixed z-50 transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 max-w-full h-96 flex flex-col justify-center items-center space-y-4 bg-white/50 backdrop-blur-md p-8 rounded-lg shadow-md text-center uppercase ">
      <div className="h-16 w-16 rounded-full flex items-center justify-center font-bold text-gray-900 bg-white shadow mb-3 text-xl ring-4 ring-offset-2 ring-indigo-700 overflow-hidden">
        <img src={phone} alt="phone-icon" />
      </div>
      <h2 className="font-bold text-xl text-orange-500">{pd.name}</h2>
      <div className="space-x-1">
        <a href={`${pd.permalink}?add-to-cart=${pd.id}`} target="_blank" className="px-5 inline-block py-2 rounded bg-pink-700 text-white font-bold">
          Buy Now
        </a>
        <button className="px-5 py-2 rounded bg-indigo-700 text-white font-bold" onClick={toggleModal}>
          Close
        </button>
      </div>
    </div>
  )
}

export default ModalPopUp
