import React from 'react'
import CreateAccount from '../../components/admin/account/CreateAccout'

const UserAccoutCreate = () => {
  return (
    <>
      <React.Suspense>
        <CreateAccount />
      </React.Suspense>
    </>
  )
}

export default UserAccoutCreate