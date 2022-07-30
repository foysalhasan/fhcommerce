import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useTemplate } from '../contexts/TemplateContext'

export const Press = () => {
  const { templates } = useTemplate()
  console.log(templates)
  return (
    <div className="bg-gray-200 h-screen container py-8 relative mx-auto flex flex-col items-center px-4 lg:px-10">
      <div className="bg-white w-full mx-auto rounded-md p-8 shadow-sm border overflow-hidden">
        {!templates.length && <h4 className="font-bold text-rose-700 text-3xl">NO POST FOUND !</h4>}
        <div className="grid grid-cols-3 gap-4">
          {templates?.reverse().map((temp) => (
            <SingleTemplate key={temp.id} temp={temp} />
          ))}
        </div>
      </div>
    </div>
  )
}

const SingleTemplate = ({ temp }) => {
  const navigate = useNavigate()
  const goToTemplate = (id) => {
    navigate(`/press/${id}`)
  }
  return (
    <div className="bg-orange-50  rounded shadow-sm  p-4 border-l-4 border-fuchsia-700">
      <h4 className="text-xl font-semibold capitalize font-josefin text-orange-800">{temp?.title}</h4>
      <div className="text-gray-700 mb-3">
        By <span className="text-indigo-600 font-semibold uppercase text-sm">{temp?.user}</span> at{' '}
        <span className="text-pink-600 font-semibold uppercase text-sm">{moment(temp?.createdAt).format('DD-MMM-YY')}</span>
      </div>
      <button
        className="uppercase px-4 font-bold text-sm transition bg-fuchsia-800 py-2 rounded text-white hover:bg-orange-600"
        onClick={() => goToTemplate(temp?.id)}
      >
        READ MORE
      </button>
    </div>
  )
}
