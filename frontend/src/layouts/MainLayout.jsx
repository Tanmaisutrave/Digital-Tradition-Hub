import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ChatButton from '../components/chatbot/ChatButton'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}

export default MainLayout
