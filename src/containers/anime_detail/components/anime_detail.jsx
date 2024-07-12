import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Chip, Typography, Rating, Skeleton } from '@mui/material';
import '../../../css/animeDetail.css'
import animeService from '../../../api/anime/anime';
import AnimeDetailLoading from './anime_detail_loading';


const AnimeDetail = ({ id }) => {
    const [state, setState] = useState({
        isLoading: true,
        animeDetail: {},
    });
    const getAnimeDetail = async () => {
        try {
            const response = await animeService.getAnimeById(id);
            const { status, data } = response;
            if (status == 200) {
                setTimeout(() => {
                    setState(state => ({ ...state, animeDetail: data.data, isLoading: false }));
                }, 500);
            }
        } catch (e) {
            setState(state => ({ ...state, isLoading: false }));
        }
    }

    useEffect(() => {
        getAnimeDetail();
    }, [])
    return (
        <div >
            <div style={{ paddingBottom: 20, textAlign: 'left' }}>
                <Typography variant="h5" component="h4">YoPrintAnime</Typography>
            </div>

            {
                state?.isLoading ?
                    (
                        <AnimeDetailLoading />
                    )
                    :
                    (
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <Card className="card">
                                    <CardMedia
                                        className="cardMedia"
                                        image={state.animeDetail?.images?.jpg?.large_image_url}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={8} style={{ textAlign: 'left' }}>
                                <Typography variant="h5" component="h2">
                                    {state.animeDetail?.title} <Chip label={`${state.animeDetail?.type}`} color="primary" />
                                </Typography>
                                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                                    {state.animeDetail?.genres?.map((item, index) => {
                                        return (
                                            <Chip label={`${item?.name}`} style={{ marginRight: 7 }} key={index} />
                                        )
                                    })}
                                </div>
                                <Rating
                                    name="anime-rating"
                                    value={(state.animeDetail?.score / 2) ?? 0}
                                    readOnly
                                    precision={0.5}
                                />
                                <Typography variant="h5" component="h3" style={{ paddingTop: 10, paddingBottom: 10 }}>Synopsis </Typography>

                                <Typography style={{ textAlign: 'justify' }}>{state.animeDetail.synopsis}</Typography>

                            </Grid>
                        </Grid>
                    )
            }

        </div >
    );
};

export default AnimeDetail;
