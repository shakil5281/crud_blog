import React from 'react'
import Home from '../components/Homepage/Home'

const Homepage = () => {
  return (
   <>
        <React.Suspense>
            <Home />
        </React.Suspense>
   </>
  )
}

export default Homepage