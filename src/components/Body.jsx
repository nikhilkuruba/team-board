import Header from '@/components/Header'
import MainLayout from '@/components/MainLayout'
import NavBar from '@/components/NavBar'
const Body = () => {
  return (
    <>
      <div className='bg-gray-100 app-grid'>
      <Header />
      <NavBar />
      <MainLayout />
      </div>
    </>
  )
}

export default Body