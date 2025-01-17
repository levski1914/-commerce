import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from'react-router-dom' 
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
