import axios from 'axios'
import VueCookies from 'vue-cookies'

const HTTP = axios.create({
    //baseURL: 'http://125.141.123.115:18004/'
     baseURL: process.env.VUE_APP_BASE_URL
  })

export default {
    test(){
        return HTTP.post('/')
    },

    cookie(){
        return HTTP.get('/cookie')
    }
}

// Add a request interceptor
HTTP.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers.token = VueCookies.get('test')
 //   config.headers.refresh_token = VueCookies.get('refresh_token');
  
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//HTTP.defaults.headers.common['test'] = getCookieValue('test');



