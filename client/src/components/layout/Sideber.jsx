import React from 'react'
import { Box } from '@mui/material'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';



const Sideber = () => {


  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  React.useEffect(()=>{
    if(window.location.pathname === '/'){
      setSelectedIndex(0);
    }else if(window.location.pathname === '/allposts'){
      setSelectedIndex(1);
    }else if(window.location.pathname === '/allcategoryposts'){
      setSelectedIndex(2);
    }
  }, [])


  return (
    <>
      <Box component={'div'} sx={{ border: 1, width: '15%', position: 'fixed', height: '100%', top: 0, zIndex: 1, backgroundColor: '#000', display: {xs: 'none', lg: 'block'} }} >
        <Box component={'div'} sx={{ paddingTop: 25 }}>
          <MenuList>
            <MenuItem
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/'>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/allposts'>
              <ListItemText>All Posts</ListItemText>
            </MenuItem>
            <MenuItem
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              sx={{ color: '#fff', padding: 2 }} component={Link} to='/category'>
              <ListItemText>Category Posts</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Box>
      <Box component={'div'}>
        <Box component={'div'} sx={{ paddingTop: 2, paddingLeft: {xs: 0, lg: '18%'} }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default Sideber