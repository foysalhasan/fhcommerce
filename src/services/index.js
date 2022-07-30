import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import Swal from 'sweetalert2'

const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}
export const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
  },
]

const sendEmail = async (data) => {
  try {
    const res = await axios.post('http://localhost:4444/api/v1/new-email', { data })
    if (res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'WOW !',
        text: 'Comment Submitted !',
      })
      return res.data
    }
  } catch (error) {
    const { message } = error.response.data
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: message,
    })
  }
}

const getEmails = async () => {
  try {
    const { data } = await axios.get('http://localhost:4444/api/v1/emails')
    return data.emails
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.status,
      text: error.message,
    })
  }
}

const deleteEmail = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:4444/api/v1/emails/${id}`)
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'DELETED !',
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.status,
      text: error.message,
    })
  }
}

export const useGetPosts = () => {
  return useQuery('POSTS', getPosts)
}

export const useSendEmail = (resetForm) => {
  return useMutation(sendEmail, {
    onSuccess: resetForm,
  })
}

export const useGetEmail = () => {
  return useQuery('EMAIL', getEmails)
}

export const useDeleteEmail = (onSuccess) => {
  return useMutation(deleteEmail, {
    onSuccess,
  })
}
