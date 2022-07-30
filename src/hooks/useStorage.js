import { v4 } from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../utils/firebase/firebase.utils'
import Swal from 'sweetalert2'
import { useState } from 'react'

export const useStorage = () => {
  const [loader, setLoader] = useState(false)
  const fileUploader = async (img) => {
    if (img === null) return
    const imgRef = ref(storage, `/${img.name + v4()}`)
    try {
      setLoader(true)
      await uploadBytes(imgRef, img)
      const url = await getDownloadURL(imgRef)
      setLoader(false)
      return url ? url : ''
    } catch (error) {
      Swal.fire({
        icon: 'error',
        color: '#F43F5E',
        title: error.code,
        text: error.message,
      })
    }
  }

  return { fileUploader, loader }
}
