import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import Swal from 'sweetalert2'

// REST__HELPER__FUNCTIONS
const getData = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/pd')
    return data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: error.message,
    })
  }
}

const getSingleData = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/pd/${id}`)
    return data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: error.message,
    })
  }
}

const postData = async (doc) => {
  try {
    const res = await axios.post('http://localhost:4000/pd', doc)
    if (res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'WOW !',
        text: 'Data Successfully Added !',
      })
      return res.data
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: error.message,
    })
  }
}

const editData = async ({ newProduct, id }) => {
  try {
    const res = await axios.put(`http://localhost:4000/pd/${id}`, newProduct)
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'WOW !',
        text: 'Data Edited Successfully !',
      })
      return res.data
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: error.message,
    })
  }
}

const deleteData = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:4000/pd/${id}`)
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'SUCCESS',
        text: 'Data Deleted Successfully !',
        timer: 2000,
      })
      return res.data
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      color: '#F43F5E',
      title: error.code,
      text: error.message,
    })
  }
}

// CUSTOM HOOKS
export const useGetQuery = (onSuccess) => {
  return useQuery('pd', getData, {
    onSuccess,
  })
}

export const useGetSingleQuery = (id) => {
  return useQuery('pd1', () => getSingleData(id), {})
}

export const usePostQuery = (onSuccess) => {
  return useMutation(postData, {
    onSuccess,
  })
}

export const useDeleteQuery = (onSuccess, onError) => {
  return useMutation(deleteData, {
    onSuccess,
    onError,
  })
}

export const useEditQuery = (onEdited) => {
  return useMutation('pdxx', editData, {
    onSuccess: onEdited,
  })
}
