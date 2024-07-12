import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';

import fileService from '../../../api/file/file.js';
import { set_refresh } from '../../../actions/files.action';
import { useDispatch,useSelector } from 'react-redux';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const files_redux = useSelector(state => state.files);
  const dispatch = useDispatch();

  const handleFileInput = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        const res = await fileService.uploadFile(formData);
        if(res.status=='Success'){
          dispatch(set_refresh(files_redux.refresh+1));
        }
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload File
      </Typography>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <TextField
          type="file"
          id="fileInput"
          onChange={handleFileInput}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} disabled={isLoading}>
          {isLoading?'Uploading':'Upload'}
        </Button>
        
      </form>
    </Box>
  );
};

export default Upload;
