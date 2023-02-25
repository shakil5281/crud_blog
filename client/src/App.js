import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loding from './components/admin/Loding';
import Navber from './components/layout/Navber';


const App = () => {
  return (
   <>
      <Navber />
   </>
  )
}

export default App