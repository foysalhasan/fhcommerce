export const Temp1 = ({ press }) => {
  const { title, content, templatePhoto } = press
  return (
    <div className="w-100">
      <div className="h-[600px] relative overflow-hidden">
        <div className="inset-0 absolute bg-black/50 rounded-t-md flex flex-col justify-end">
          <h4 className="text-white uppercase font-semibold font-josefin text-3xl px-4 pb-2">{title}</h4>
        </div>
        <img src={templatePhoto} alt="" className="w-full object-top h-full object-cover block " />
      </div>

      <div className="p-4 bg-white">
        <p className="text-xl font-josefin text-gray-700">{content}</p>
      </div>
    </div>
  )
}
