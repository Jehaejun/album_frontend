<template>
<div>
    <add-header></add-header>

    <div class="container">
        <form class="form-signin">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" style="margin-bottom: 5px;">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <br>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <button class="btn btn-lg btn-warning btn-block" v-on:click.prevent="kakaoLogin">카카오 로그인</button>
      </form>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import userApi from '../../Api/user/UserApi.js'
import VueCookies from 'vue-cookies'

import HeaderComponent from '../../components/header/NavigationBar.vue'

const userHelper = createNamespacedHelpers('user')

export default {
  created() { 

  },
    components: {
         'add-header': HeaderComponent
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
                  userId: res.id ,
                  userPwd: Math.random().toString(36).split('.')[1],
                  loginType: 'K',
                  nickName: res.properties.nickname,
                  profileImage: res.properties.profile_image,
                  accessToken: response.access_token,
                  refreshToken: response.refresh_token,
                };

                userApi.join(user).then(() => {
                    VueCookies.set('access_token', response.access_token, response.expires_in);
                    VueCookies.set('refresh_token', response.refresh_token, response.refresh_token_expires_in);

                    _this.setUserData({userCode: res.id,
                                      nickName: res.properties.nickname,
                                      profileImage: res.properties.profile_image})

                    _this.$router.push('/album/main')                  

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
