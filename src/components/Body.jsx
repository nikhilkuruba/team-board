import React from 'react'
import Header from './Header'
import MainLayout from './MainLayout'

const Body = () => {
  return (
    <>
      <div className='bg-gray-100 h-screen w-full'>
      <Header />
      <MainLayout />
      </div>
    </>
  )
}

export default Body