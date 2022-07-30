import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useGetPosts, useSendEmail, useGetEmail, useDeleteEmail } from '../services'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import msg from '../assets/message.png'
import Swal from 'sweetalert2'

export const PaginateRoute = () => {
  const [value, setValue] = useState('')
  const { data: items } = useGetPosts()
  const { data: emails, refetch } = useGetEmail()
  const [posts, setPosts] = useState([])
  const postPerPage = 8
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    ;(async () => {
      setPageCount(Math.ceil(items?.length / postPerPage))
      const endOffset = itemOffset + postPerPage
      setPosts(items?.slice(itemOffset, endOffset))
    })()
  }, [items, itemOffset])

  const handlePageClick = (event) => {
    const newOffset = event.selected * postPerPage
    setItemOffset(newOffset)
  }

  // FOR COMMENTING
  const { handleSubmit, register, reset } = useForm()
  const resetForm = () => {
    reset()
    setValue('')
    refetch()
  }

  const { mutate } = useSendEmail(resetForm)

  // FOR DELETE COMMENTS
  const onSuccess = () => {
    refetch()
  }
  const { mutate: removeEmail } = useDeleteEmail(onSuccess)

  const handleForm = (data) => {
    data = { ...data, comment: value }
    if (!data) return
    mutate(data)
  }

  const handleDelete = (id) => {
    if (!id) return
    Swal.fire({
      title: 'ARE YOU SURE?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DELETE',
    }).then((result) => {
      if (result.isConfirmed) {
        removeEmail(id)
      }
    })
  }
  // COMMENT PAGINATION
  const [prev, setPrev] = useState(0)
  const [next, setNext] = useState(4)

  const handleNextPage = () => {
    setPrev(prev + 4)
    setNext(next + 4)
  }

  const handlePrevPage = () => {
    setPrev(prev - 4)
    setNext(next - 4)
  }

  return (
    <div className="container mx-auto bg-slate-100 px-10 min-h-screen py-20">
      <div className="grid gap-4 grid-cols-4">
        {posts &&
          posts.map((post) => (
            <div className="p-4 bg-white rounded shadow-sm space-y-2 h-32" key={post.id}>
              <h4 className="capitalize text-emerald-700 font-medium text-lg">{post.title.slice(0, 30)}</h4>
              <p className="text-gray-500">{post.body.slice(0, 60)}</p>
            </div>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          className="flex justify-center gap-x-2 select-none items-center"
          pageLinkClassName="w-10 h-10 bg-white font-semibold rounded-full border flex justify-center items-center shadow-sm"
          activeLinkClassName="text-white font-bold bg-rose-600 border-rose-600"
          previousLinkClassName="font-semibold text-rose-600"
          nextLinkClassName="font-semibold text-rose-600"
          disabledLinkClassName="text-gray-400"
          pageCount={pageCount || 0}
          breakLabel="🟢"
          nextLabel="NEXT"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          previousLabel="PREV"
          renderOnZeroPageCount={null}
        />
      </div>
      <div className="grid grid-cols-12 gap-5 items-center">
        <div className="my-20 bg-white border shadow-sm rounded p-6 col-span-5">
          <form onSubmit={handleSubmit(handleForm)}>
            <div className="flex gap-x-3 mb-3 flex-wrap">
              <input {...register('name')} type="text" className="block border  flex-1 px-3 py-2 rounded outline-purple-500" placeholder="Name" required />
              <input {...register('email')} type="email" className="block border flex-1  px-3 py-2 rounded outline-purple-500" placeholder="Email" required />
            </div>
            {/* <textarea
              required
              {...register('comment')}
              placeholder="Comments"
              className="block w-full border px-3 py-2 mb-3 rounded outline-purple-500"
              rows="5"
            ></textarea> */}

            <ReactQuill
              placeholder="COMMENTS"
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }],
                  ['bold', 'italic', 'underline', { color: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
                  ['image', 'link', 'clean'],
                ],
              }}
              formats={['header', 'bold', 'italic', 'underline', 'color', 'list', 'bullet', 'link', 'image', 'align']}
              style={{ height: '300px' }}
              theme="snow"
              value={value}
              onChange={setValue}
            />

            <div className="mt-0">
              <button type="submit" className="bg-purple-700 overflow-hidden text-white font-semibold text-sm uppercase px-5 py-3 hover:bg-rose-600 rounded">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        {emails && emails.length > 0 && (
          <div className="my-20 relative bg-white border shadow-sm rounded p-6 col-span-7 h-80">
            <div className="absolute top-1 right-3 w-12 h-12">
              <img src={msg} alt="email-icon" className="w-full object-cover" />
              <span className="absolute flex items-center ring-1 ring-rose-500 shadow bg-white w-4 h-4 rounded-full justify-center text-center font-bold text-xs text-red-500 top-[32%] right-[32%]">
                {emails.length}
              </span>
            </div>
            <div className="grid gap-3 grid-cols-2 mt-10">
              {emails.slice(prev, next).map((email) => (
                <div key={email._id} className="p-3 bg-rose-50 rounded group border-gray-300 relative">
                  <h3 className="uppercase text-rose-500 font-bold text-sm leading-none">{email.name}</h3>
                  <span className="text-gray-900 font-bold text-xs">{email.email}</span>
                  <div dangerouslySetInnerHTML={{ __html: email?.comment }}></div>
                  <button
                    onClick={() => handleDelete(email?._id)}
                    className="text-5xl transition absolute top-0 right-2 text-red-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {emails.length > 4 && (
              <div className="absolute right-6 bottom-6 flex justify-end gap-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={prev === 0}
                  className="bg-rose-700 disabled:bg-gray-300 disabled:text-gray-700 text-white rounded font-semibold text-sm px-4 py-2"
                >
                  PREV
                </button>
                <button
                  disabled={next >= emails?.length}
                  onClick={handleNextPage}
                  className="bg-rose-700 disabled:bg-gray-300 disabled:text-gray-700 text-white rounded font-semibold text-sm px-4 py-2"
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
