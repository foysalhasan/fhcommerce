import Swal from 'sweetalert2'
import { Temp1 } from './Temp1'
import { Temp2 } from './Temp2'
import { Temp3 } from './Temp3'

export const TemplateIndex = ({ data }) => {
  const { activeTemp } = data
  if (!activeTemp) {
    Swal.fire({
      icon: 'error',
      title: 'ERROR !',
      text: 'Error Loading Press',
    })
    return
  }

  switch (activeTemp) {
    case 'temp1':
      return <Temp1 press={data} />
    case 'temp2':
      return <Temp2 press={data} />
    case 'temp3':
      return <Temp3 press={data} />
    default:
      return <Temp1 press={data} />
  }
}
