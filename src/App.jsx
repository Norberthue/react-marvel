import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AllCharacters from './components/AllCharacters'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<div className='flex flex-col justify-between align-middle items-center  text-white rounded-xl text-6xl max-w-[400px] w-full p-3  bg-error-loading'><div className='max-w-[400px] w-full mx-auto'>Loading...</div></div>}>
      <AllCharacters/> 
    </Suspense>
  )
}

export default App
