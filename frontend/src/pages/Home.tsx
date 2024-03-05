
import Choose from "../components/Choose"
import Hero from "../components/Hero"
import Partners from "../components/Partners"
import PopularPrograms from "../components/PopularPrograms"



const Home = () => {
  return (
    <div>
        <Hero/>
        <Partners />
        <PopularPrograms />
        <Choose />
    </div>
  )
}

export default Home