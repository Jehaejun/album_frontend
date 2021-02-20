<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="btn-group">
                  <!-- <button type="button" class="btn btn-sm btn-outline-secondary"  v-on:click.prevent="viewAlbum">View</button> -->
                  <button type="button" class="btn btn-sm btn-outline-secondary"  v-on:click.prevent="kakaoLogin">Edit</button>
                   <button type="button" class="btn btn-sm btn-outline-secondary"  v-on:click.prevent="vuexTest">test</button>
                </div>
  </div>
  
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import userApi from '../Api/user/UserApi.js'
import VueCookies from 'vue-cookies'

const userHelper = createNamespacedHelpers('user')

export default {
  created() { 

  },

  computed: {
    ...userHelper.mapState({
        userCode: state => state.userCode     // -> this.userCode
    }),
    ...userHelper.mapGetters([
       'getUserData'       // -> this.getUserData
    ])
  },

    methods: {
      kakaoLogin(){
        let _this = this;
        window.Kakao.Auth.login({
          scope: 'profile',

          success: function(response) {
            console.log(response);

            window.Kakao.API.request({
              url:'/v2/user/me',
              success : res => {
                console.log(res)
                let user = {
                  userKey:{userCode: res.id ,loginType: 'K'}
                  ,nickName: res.properties.nickname
                  ,profileImage: res.properties.profile_image
                  ,accessToken: response.access_token
                  ,refreshToken: response.refresh_token
                  
                };

               /* var params = new URLSearchParams();
                params.append('USER_CODE', res.id);
                params.append('LOGIN_TYPE','K');
                params.append('NICK_NAME', res.properties.nickname);
                params.append('PROFILE_IMAGE', res.properties.profile_image);
                params.append('ACCESS_TOKEN', response.access_token);
                params.append('REFRESH_TOKEN', response.refresh_token);*/

                userApi.join(user).then(() => {
                    VueCookies.set('access_token', response.access_token, response.expires_in);
                    VueCookies.set('refresh_token', response.refresh_token, response.refresh_token_expires_in);

                    _this.setUserData({userCode: res.id
                                      , nickName: res.properties.nickname
                                      , profileImage: res.properties.profile_image})
                });

                
              }
            });
          },
          fail: function(error) {
            console.log(error);
          },
        });
      },
      ...userHelper.mapMutations([
        'setUserData'     // -> this.changeMessage()
      ]),
      ...userHelper.mapActions([
        'callMutation'      // -> this.callMutation()
      ])
  }
    
}
</script>


