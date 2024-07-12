
import React from 'react';
import { Card, CardContent, CardMedia, Typography, ButtonBase } from '@mui/material';
import '../../../css/anime.css';
import { Link as RouterLink } from 'react-router-dom';


const ItemCard = ({ item }) => {

    return (
        // <ButtonBase component={RouterLink} to={`/anime/${item?.id}`}>

        <Card className='card' component={RouterLink} to={`/anime/${item?.mal_id}`} style={{ textDecoration: 'none' }}>
            <CardMedia
                className='cardMedia'
                image={item.images.jpg.image_url}
                title={item.title}
            />
            <CardContent className='cardContent' spacing={2}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        Episode {item.episodes}
                    </Typography>
                </div>

            </CardContent>
        </Card>
        // </ButtonBase>

    );
}

export default ItemCard;
