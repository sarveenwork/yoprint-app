import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import fileService from '../../../api/file/file';
import moment from 'moment';

const List = () => {
  const [files, setFiles] = useState([]);
  const files_redux = useSelector(state => state.files);

  const getFiles = async () => {
    fileService.getFile().then(response => {
      setFiles(response.data);
    })
      .catch(error => {
        console.log(error.message);
      });;
  }

  useEffect(() => {
    getFiles();
    const interval = setInterval(() => {
      getFiles();
    }, 5000);

    return () => clearInterval(interval);
  }, [files_redux.refresh])

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        List of Files
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.length > 0 ? (
              files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{moment(file.updated_at).format("D MMM YYYY, h:mm:ss a")}</TableCell>
                  <TableCell>{file.file_name}</TableCell>
                  <TableCell>{file.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default List;
