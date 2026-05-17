import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import FestivalsSection from '../components/home/FestivalsSection'
import WhySection from '../components/home/WhySection'

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <FestivalsSection />
      <WhySection />
    </div>
  )
}

export default Home
