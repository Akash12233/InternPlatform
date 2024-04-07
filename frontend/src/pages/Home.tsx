/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import Choose from "../components/Choose"
import Contact from "../components/Contact"
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
        <Contact />
    </div>
  )
}

export default Home