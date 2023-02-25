import React from 'react'
import { Box,  Paper,  Typography } from '@mui/material'
import Summary from '../../Hooks/Summary'


const AdminDashboard = () => {
  const summary = Summary()

  return (
    <>
      <Box component={'div'}>
        <Typography color='primary' variant='h4'>
          Admin Dashboard
        </Typography>
        <Box sx={{marginTop: 10, display: 'flex'}} component={'div'}>
          {
            [1].map((item, i)=>(
              <Paper key={i.toString()}  sx={{padding: 2, backgroundColor: '#d321d3', color: 'white', width: 300, margin: 4}} elevation={0}>
              <Typography sx={{display: 'flex', justifyContent: 'center'}} variant='h6'>Total Post</Typography>
              <Typography sx={{display: 'flex', justifyContent: 'center'}} variant='h5'>{summary}</Typography>
            </Paper>
            ))  
          }
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboard