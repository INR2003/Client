import React from 'react'
import Header from './commonComponent/Header'
import Navbar from './commonComponent/Navbar'

const App = () => {
  return (
    <div className='flex items-start'>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default App