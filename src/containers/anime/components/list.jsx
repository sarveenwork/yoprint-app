import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Typography, TextField, InputAdornment } from '@mui/material';
import animeService from '../../../api/anime/anime';
import ItemCard from './item_card';
import ItemCardLoading from './item_card_loading';
import '../../../css/anime.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const List = () => {

  const [state, setState] = useState({
    isLoading: true,
    anime: [],
    pagination: {}
  });

  const [filter, setFilter] = useState({
    page: 1,
    q: "",
  });

  const [timer, setTimer] = useState(null);


  const getAnime = async () => {
    setState(state => ({ ...state, isLoading: true, anime: [], pagination: {} }));
    try {
      const response = await animeService.getAnime(filter)
      const { status, data } = response;
      if (status == 200) {
        setTimeout(() => {
          setState(state => ({ ...state, anime: data.data, pagination: data.pagination, isLoading: false }));
        }, 500);
      }
    } catch (e) {
      setState(state => ({ ...state, isLoading: false }));
    }
  }

  const handlePageChange = (event, page) => {
    setFilter(filter => ({ ...filter, page: page }));
  }

  const handleSearchChange = (input) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setFilter(filter => ({ ...filter, q: input }));
    }, 250);
    setTimer(newTimer);
  };

  useEffect(() => {
    getAnime();
  }, [filter])

  return (
    <div >
      <div>
        <div style={{ height: 60 }}>
          <div style={{ display: 'flex' }}>
            <div >
              <div style={{ minWidth: 200, textAlign: 'left' }}>
                <Typography variant="h5" component="h4">YoPrintAnime</Typography>
              </div>

            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div>
                <TextField
                  placeholder="Search..."
                  onChange={(e) => handleSearchChange(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Grid container spacing={2}>
        {state?.isLoading ? (
          [...Array(18)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
              <ItemCardLoading />
            </Grid>
          ))
        ) : state?.anime.length > 0 ? (
          state.anime.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
              <ItemCard item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No Anime Found</Typography>
          </Grid>
        )}
      </Grid>
      {!state.isLoading && (
        <div style={{ paddingBottom: 20, paddingRight: 20, paddingTop: 10, float: 'right' }}>
          <Pagination count={state.pagination?.last_visible_page} page={filter.page}
            onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default List;
