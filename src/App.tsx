import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

import './App.css'

function App() {

  return (
    <>
    <Link to="/">Home</Link> | <Link to="/about">About</Link>
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
