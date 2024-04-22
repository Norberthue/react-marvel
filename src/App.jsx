import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AllCharacters from './components/AllCharacters'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <AllCharacters/> 
   </div>
     
    
  )
}

export default App
