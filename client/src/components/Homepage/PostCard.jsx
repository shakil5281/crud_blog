import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PostCard({post}) {
    return (
        <>
            <Box sx={{marginTop: 5}}>
                <Typography sx={{padding: 3}} variant='h5' color= 'primary' >
                    {post._id} -
                    <Box sx={{float: 'right', marginRight: 8}}>
                        <Button component={Link} to={`/category/${post.category}`} variant='contained'>All Post</Button>
                    </Box>
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        
                        post.products.slice(0, 4).map((item, i) => (
                            <Card key={i.toString()} sx={{ maxWidth: 345, marginLeft: 4, marginTop: 4 }}>
                                 <Link to={'/'}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`/uploads/${item.photo}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
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
    );
}