import axios from 'axios';

async function uploadFile(data) {
    const uploadFileResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}files`,data,{
    headers: {
        'Content-Type': 'multipart/form-data'
      }})

    return uploadFileResponse?.data;
}

async function getFile() {
    const getFileResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}files`);
    return getFileResponse?.data;
}


export default {
    uploadFile,
    getFile,
}