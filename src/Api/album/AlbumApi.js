import axios from 'axios'
import VueCookies from 'vue-cookies'
import store from '../../store'

const HTTP = axios.create({
     baseURL: process.env.VUE_APP_BASE_URL + '/api'
  })

export default {
    selectAlbum(){
        return HTTP.get('/album')
    },

    imageUpload(imgData){
        
        return HTTP.post('/imgUpload', imgData, {
            header : {
                    'Content-Type' : 'multipart/form-data'
            }
        }).catch((ex)=> {
            console.log("ERR!!!!! : ", ex)
        });
    },

    insertAlbum(name, memo, filePath){
      console.log(store)

      var params = new URLSearchParams();
      params.append('name', name);
      params.append('memo', memo);
      params.append('filePath', filePath);
      params.append('nickName', store.getters['user/getNickName']);
      params.append('userId', store.getters['user/getUserCode']);
      return HTTP.post('/albumInsert', params).then((response)=>{
          this.posts = response.data
          if(this.posts === 1){
              alert('등록되었습니다.');
              location.href = "/#/album/main";
          }else{
              alert('처리중 에러가 발생하였습니다.');
          }
  }).catch((ex)=> {
          console.log("ERR!!!!! : ", ex)
      });
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


