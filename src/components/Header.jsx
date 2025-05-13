const Header = () => {
  return (
    <div className='header bg-[#374151] text-[#faf2f2] w-full border-b-1 border-[#000] shadow-md '>
      <div className='h-full flex items-center gap-4 mx-12'>
        <img src="src/assets/logo.png" alt="team board logo" className='h-8 w-8' />
        <h1 className='font-[600] tracking-[3px] uppercase text-3xl'>Team Board</h1>
      </div>
    </div>
  )
}

export default Header