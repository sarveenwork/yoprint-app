import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// create an axios instance
const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // url = base url + request url
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})

service.interceptors.response.use(
    response => {
        const { data, status } = response
        if (status !== 200) {
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                {data.message || 'Error'}
                </Alert>
            </Snackbar>
            return Promise.reject(new Error(data.message || 'Error'))
        } else {
            return data
        }
    },
    error => {
        const { response } = error
        const { data } = response
        const { message } = data
        if (message) {
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                {message}
                </Alert>
            </Snackbar>
        }
        return Promise.reject(error)
    }
)

export default service;
