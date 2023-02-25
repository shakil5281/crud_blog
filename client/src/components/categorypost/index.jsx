import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryPost = () => {

    const param = useParams()

const CategoriesPost = async() =>{
    try{
        const {data} = await axios.get(`/categorypost/${param.category}`)
        console.log(data)

    }catch(err){
        console.log(err)
    }
}


    React.useEffect(()=>{
        CategoriesPost()
    }, [])
  return (
    <>
    <Box sx={{marginTop: 5}}>
        <Typography sx={{marginLeft: 2}} variant='h5' color= 'primary' >
        {param.category} -
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            {
                [1, 2, 3, 4,5,6].map(() => (
                    <Card sx={{ maxWidth: 345, marginLeft:4, marginTop: 4 }}>
                        <Link to={'/'}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                    </Card>
                ))
            }
        </Box>
    </Box>
</>
  )
}

export default CategoryPost