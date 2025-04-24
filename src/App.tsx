import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

import './App.css'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/about" element={<div>About</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
      <Route path="/menu" element={<div>Menu</div>} />
      <Route path="/menu/:id" element={<div>Menu Item</div>} /> */}
    </Routes>
    </>
  )
}

export default App
