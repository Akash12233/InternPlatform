
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Program from './pages/Program'

import Error from './pages/Error'
import PageLayout from './pages/PageLayout'

function App() {
 

  return (
    <>
      <meta name="theme-color" content="black"></meta>
    <BrowserRouter>
   
      <Routes>
        <Route element={<PageLayout />} >

       
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Program />} />
        </Route>
    <Route path="*" element={<Error />} />
      </Routes>
   
    </BrowserRouter>
    </>
  )
}

export default App
