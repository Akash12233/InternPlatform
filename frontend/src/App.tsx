
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Program from './pages/Program'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Program />} />
        <Route path="*" element={<Home />} />
      </Routes>
    <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default App
