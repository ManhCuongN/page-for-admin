import axios from 'axios';

const MyAxios = axios.create();

// Thêm một interceptor request
MyAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const shopId = localStorage.getItem("shopId");
    if (accessToken && refreshToken && shopId) {
      config.headers["x-client-id"] = shopId;
      config.headers["authorization"] = accessToken;
      config.headers["x-rtoken-id"] = refreshToken;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default MyAxios;
