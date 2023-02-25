import React from 'react'
import Allpost from '../components/allPost/Allpost'

const Allposts = () => {
  return (
    <>
        <React.Suspense>
            <Allpost />
        </React.Suspense>
    </>
  )
}

export default Allposts