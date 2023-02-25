import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
const MainImg = 'https://images.unsplash.com/photo-1675711042976-495ee2e7f803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
const SecendImg = 'https://plus.unsplash.com/premium_photo-1674940863690-4b4577686c3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80'
const ThiredImg = 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <>
      <Box component={'div'} sx={{display: 'flex'}}>
      <ImageList
      sx={{ width: '65%', height: 500 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item, i) => (
        <ImageListItem key={i.toString()} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Box>
    </>
  );
}

const itemData = [
  {
    img: MainImg,
    title: 'Breakfast',
    rows: 2,
    cols: 4,
  },
  {
    img:SecendImg,
    title: 'Burger',
    cols: 2,
    rows: 2,
  },
  {
    img: ThiredImg,
    title: 'Camera',
    cols: 2,
    rows: 2,
  }
 
];