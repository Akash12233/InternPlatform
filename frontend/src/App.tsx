
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Program from './pages/Program'

import Error from './pages/Error'
import PageLayout from './pages/PageLayout'
import Login from './pages/student/Login'
import Register from './pages/student/register'
import ProgramItem from './pages/ProgramItem'
import Dashboard from './pages/student/Dashboard'
import StudentPageLayout from './pages/student/StudentPageLayout'

function App() {
 

  return (
    <>

    <BrowserRouter>
   
      <Routes>
        <Route element={<PageLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Program />} />
          <Route path='/programs/:id' element={<ProgramItem />} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        
        <Route element={<StudentPageLayout />} >
          <Route path='/student/dashboard' element={<Dashboard/>}/>
        </Route>
    <Route path="*" element={<Error />} />
      </Routes>
   
    </BrowserRouter>
    </>
  )
}

export default App
