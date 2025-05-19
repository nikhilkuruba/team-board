import logo from "@/assets/logo.png";

const Header: React.FC = () => {
  return (
    <div className='header bg-[var(--color-bg-sidebar)] text-[var(--color-header-text)] w-full border-b-1 border-[var(--color-black)] shadow-md '>
      <div className='h-full flex items-center gap-4 mx-12'>
        <img src={logo} alt="team board logo" className='h-8 w-8' />
        <h1 className='font-[600] tracking-[3px] uppercase text-3xl'>Team Board</h1>
      </div>
    </div>
  )
}

export default Header