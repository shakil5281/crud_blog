import React from 'react'
import { Box, IconButton } from '@mui/material'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';



const AdminSideber = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <Box component={'div'} sx={{ border: 1, width: '15%', position: 'fixed', height: '100%', top: 0, zIndex: 1, backgroundColor: '#000' }} >
        <Box component={'div'} sx={{ paddingTop: 25 }}>
          <MenuList>
            <MenuItem
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/admin/summary'>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
            <MenuItem
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/admin/posts'>
              <ListItemText>Create Post</ListItemText>
            </MenuItem>
            <MenuItem
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/admin/category'>
              <ListItemText>Category</ListItemText>
            </MenuItem>
            <MenuItem
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/admin/category'>
              <ListItemText>Users</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
        <MenuList sx={{ position: 'absolute', display: 'block', width: '100%', top: '90vh', borderTop: '1px solid yellow' }}>
          <MenuItem sx={{ color: 'yellow', padding: 1 }} component={Link} to='/'>
            <IconButton sx={{ color: 'yellow' }}>
              <HomeIcon />
            </IconButton>
            <ListItemText>Home Page</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box component={'div'}>
        <Box component={'div'} sx={{ paddingTop: 2, paddingLeft: '18%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default AdminSideber