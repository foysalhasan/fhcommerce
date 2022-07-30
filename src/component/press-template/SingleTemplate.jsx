import { useParams, Navigate } from 'react-router-dom'
import { useTemplate } from '../../contexts/TemplateContext'
import { TemplateIndex } from './TemplateIndex'

export const SingleTemplate = () => {
  const { id } = useParams()
  const { templates } = useTemplate()
  const data = templates.find((el) => el.id === +id)

  if (!data) {
    return <Navigate to="/press" />
  }
  return (
    <div className="bg-gray-200 h-screen container py-8 relative mx-auto px-4 lg:px-10">
      <TemplateIndex data={data} />
    </div>
  )
}
