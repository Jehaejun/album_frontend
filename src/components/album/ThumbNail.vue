<template>
    <div class="">
      <div class="col-sm-6 col-md-3" v-for="(album, index) in albums" v-bind:key="index" >
        <div class="thumbnail" v-on:click.prevent="viewAlbum(album.contents)">
          <img :src="getImgUrl(album.imgPath)">
          <div class="caption">
            <h3 id="thumbnail-label">{{album.title}}<a class="anchorjs-link"><span class="anchorjs-icon"></span></a></h3>
            <p>{{album.user.nickName}}</p>
           <!-- <p><a class="btn btn-primary" role="button">Button</a> <a class="btn btn-default" role="button">Button</a></p>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ['albums']// 부모로 받은 데이터
    ,

    created() { 
    },

    methods: {
        viewAlbum(text){
            //$emit => 부모(App.vue)에게 @view 이름으로 이벤트 전달
            //인자도 같이 전달
            this.$emit('@btnView', text);
        },
       getImgUrl(imgPath) {
       // return 'http://jhjun07.iptime.org:18003/images/album/' + imgPath;
       return 'http://172.17.100.17:80/images/album/' + imgPath;
      }
    }
    
}
</script>