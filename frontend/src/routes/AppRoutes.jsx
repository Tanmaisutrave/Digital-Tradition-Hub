import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Festivals from '../pages/Festivals'
import FestivalDetail from '../pages/FestivalDetail'
import CultureMap from '../pages/CultureMap'
import Contribute from '../pages/Contribute'
import AdminDashboard from '../pages/AdminDashboard'
import Reminders from '../pages/Reminders'
import Traditions from '../pages/Traditions'
import ProtectedRoute from '../components/ProtectedRoute'
import About from '../pages/About'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/festivals" element={<Festivals />} />
      <Route path="/festivals/:id" element={<FestivalDetail />} />
      <Route path="/culture-map" element={<CultureMap />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/traditions" element={<Traditions />} />

      {/* Protected */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/contribute" element={<ProtectedRoute><Contribute /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes
