import React, { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Linker from '../component/admin/Linker'
import bg from '../assets/bg1.jpg'
import layer from '../assets/over.webp'

const links = ['user', 'product', 'add-product']

const Admin = () => {
  const { pathname } = useLocation()
  if (pathname === '/admin' || pathname === '/admin/') {
    return <Navigate to="/admin/user" replace></Navigate>
  }
  return (
    <div className="container mx-auto lg:px-10 px-4 relative h-screen pt-20">
      <div
        className="inset-0 absolute -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${bg})`,
        }}
      ></div>
      <div className="bg-white rounded-md border  my-4 lg:w-3/4 w-full mx-auto h-[450px]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-2  bg-indigo-100 border-r-2 border-white/30 ">
            <div className="flex flex-col justify-center items-center">
              {links.map((link, index) => (
                <Linker key={index} link={link} />
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="bg-white h-[450px] select-none overflow-y-auto relative">
              <div className="inset absolute h-[450px] overflow-hidden">
                <img src={layer} alt="layer" className="block object-cover opacity-90 img__anim " />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
