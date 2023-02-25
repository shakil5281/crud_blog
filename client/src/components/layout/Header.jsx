import { AppBar, Typography, Toolbar } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <>
        <AppBar color='secondary' position='static'>
            <Toolbar>
                <Typography variant='h5'>
                    CodeCamp
                </Typography>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header