import axios from 'axios'
import VueCookies from 'vue-cookies'
import store from '../../store'

const HTTP = axios.create({
     baseURL: process.env.VUE_APP_BASE_URL + '/api/user'
  })

export default {


    join(params){
        return HTTP.post('/join', params)
    },

    logOut(){

      return HTTP.post('/2');
    },

    async getUserData(){
      await HTTP.post('/3').then((user) => {
        store.commit('user/setUserData', {userCode: user.data.id,
                                          nickName: user.data.properties.nickname,
                                          profileImage: user.data.properties.profile_image})
      });
    },

    async refreshToken(){
      await HTTP.post('/4').then((response) => {
        VueCookies.set('access_token', response.data.access_token, response.data.expires_in);
        VueCookies.set('refresh_token', response.data.refresh_token, response.data.refresh_token_expires_in);
      });
    }
}

// Add a request interceptor
HTTP.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers.access_token = VueCookies.get('access_token')
    config.headers.refresh_token = VueCookies.get('refresh_token');
  
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    console.log('error~~~~')
    return Promise.reject(error);
  });

  HTTP.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('다른 기기에서 로그인시 토큰이 새로 갱신되므로 기존 로그인 정보 삭제.');
    VueCookies.remove('access_token');
    VueCookies.remove('refresh_token');

    store.commit('user/setUserData', {});

  //  const errorAPI = error.config;
 //   if(error.response.data.status===401 && errorAPI.retry===undefined){
 //     errorAPI.retry = true;
 //     console.log('토큰이 이상한 오류일 경우');
    //  await refreshToken();
    //  return await axios(errorAPI);
   // }
    return Promise.reject(error);
  });

