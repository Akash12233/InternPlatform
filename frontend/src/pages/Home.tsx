
import Choose from "../components/Choose"
import Hero from "../components/Hero"
import Partners from "../components/Partners"
import PopularPrograms from "../components/PopularPrograms"
import Testimonials from "../components/Testimonials"




const Home = () => {
  return (
    <div>
        <Hero/>
        <Partners />
        <PopularPrograms />
        <Choose />
        <Testimonials/>
    </div>
  )
}

export default Home