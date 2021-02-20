<template>
    <div class="bs-example bs-navbar-top-example" data-example-id="navbar-fixed-to-top">
    <nav class="navbar navbar-default navbar-fixed-top">
      <!-- We use the fluid option here to avoid overriding the fixed width of a normal container within the narrow content columns. -->
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-6" aria-expanded="false" style="height: 1px;">
          <ul class="nav navbar-nav" style="/* float:right; */">
            <li class=""><router-link to="/album/main">Home</router-link></li>
          </ul>

        <ul class="nav navbar-nav navbar-right">
            <li v-if="isLogin"><a href="#"><span class="glyphicon glyphicon-user"></span> {{userData.nickName}}</a></li>
            <li v-if="isLogin"><router-link to="/album/reg"><span class="glyphicon glyphicon-picture"></span> 앨범등록</router-link></li>
            <li v-if="!isLogin"><router-link to="/user/login"><span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
            <li v-if="isLogin" @click="logOut"><router-link to="/album/main"><span class="glyphicon glyphicon-log-out"></span> Logout</router-link></li>
        </ul>
        </div><!-- /.navbar-collapse -->
      </div>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import userApi from '../../Api/user/UserApi.js'
import VueCookies from 'vue-cookies'

const userHelper = createNamespacedHelpers('user')

export default {
    created() {
        this.userData = this.getUserData;
        if(this.userData.nickName != undefined){
            this.isLogin = true;
        }
    },

    data() {
        return {
            userData: {},
            isLogin: false
        }
     },

    methods: {
      logOut(){
        userApi.logOut().then(() => {
          VueCookies.remove('access_token');
          VueCookies.remove('refresh_token');

          this.setUserData({});

          this.isLogin = false;

          alert('로그아웃 되었습니다.');

          this.$router.push('/user/login')  
          
        });
      },
      ...userHelper.mapMutations([
        'setUserData'     // -> this.setUserData()
      ]),
      ...userHelper.mapActions([
        'callMutation'      // -> this.callMutation()
      ])
    },

    computed: {
        ...userHelper.mapState({
            userCode: state => state.userCode     // -> this.userCode
        }),
        ...userHelper.mapGetters([
            'getUserData'       // -> this.getUserData
        ])
  }
}
</script>