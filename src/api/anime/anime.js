import axios from 'axios';


async function getAnime(query) {
    const queryParams = new URLSearchParams(query);
    const animeResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL2}anime?${queryParams}`);
    return animeResponse;
}

async function getAnimeById(id) {
    const animeResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL2}anime/${id}`);
    return animeResponse;
}
export default {
    getAnime,
    getAnimeById
}