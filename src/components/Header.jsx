const Header = () => {
  return (
    <>
      <div className='header bg-gray-200 w-full border-b-2 border-gray-200 shadow-md '>
        <div className='h-full flex items-center gap-4 mx-12'>
          <img src="src/assets/logo.png" alt="team board logo" className='h-8 w-8' />
          <h1 className='font-[600] tracking-[3px] uppercase text-3xl text-[#222222]'>Team Board</h1>
        </div>
      </div>
    </>
  )
}

export default Header