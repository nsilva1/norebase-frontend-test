// Config imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


// Component/Screen imports
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { HomePage } from './screens/home/HomePage'

// CSS imports
import 'react-toastify/dist/ReactToastify.css'

function App() {
  

  return (
    <main>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
