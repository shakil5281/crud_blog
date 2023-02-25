import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Summary from '../../Hooks/Summary'


const AdminDashboard = () => {
  const summary = Summary()

  return (
    <>
      <Box component={'div'}>
        <Typography color='primary' variant='h4'>
          Admin Dashboard
        </Typography>
        <Box sx={{ marginTop: 10, display: 'flex' }} component={'div'}>
          {
            Array.from(summary).map((item, i) => (
              <Box key={i.toString()} component={'div'} sx={{ padding: 2, boxShadow: '2px 12px 15px 0px #46464612', margin: 2, background: 'white', width: { xs: '100%', lg: '20%' }, borderRadius: '10px' }}>
                <Typography sx={{ color: 'gray', textAlign: 'center', marginTop: 1, fontWeight: '600' }} variant='body2'>Total {item._id}</Typography>
                <Typography sx={{ color: 'gray', textAlign: 'center', marginTop: 1, fontWeight: '600', fontSize: '2.3rem' }} variant='h4'>
                  {item.sum}
                </Typography>
              </Box>
            ))
          }
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboard