import axios from 'axios';


export const fetchAuthentication = axios.create();

fetchAuthentication.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return config;
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
  },
  (error) => Promise.reject(error)
);


fetchAuthentication.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 403) {
      return Promise.reject(error)
    }

    const originalRequest = error.config;
    if (originalRequest.isRetry) {
      return Promise.reject(error)
    }


    originalRequest.isRetry = true


    return axios
      .get("/admin/token", {
        withCredentials: true,
      })
      .then((res) => {
        let accessToken = res.data.accessToken;
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', accessToken);
      })
      .then(() => fetchAuthentication(originalRequest));
  }
);