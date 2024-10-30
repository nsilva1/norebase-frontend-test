// Config imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


// Component/Screen imports
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'

// CSS imports
import 'react-toastify/dist/ReactToastify.css'

function App() {
  

  return (
    <main>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes></Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
