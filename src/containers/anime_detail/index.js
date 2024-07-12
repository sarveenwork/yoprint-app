import React from 'react';
import AnimeDetail from './components/anime_detail';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';


const AnimeDetailIndex = () => {
    const { id } = useParams();

    return (
        <Box sx={{ padding: 4 }}>
            <AnimeDetail id={id}/>
         </Box>    
    );
}

export default AnimeDetailIndex;