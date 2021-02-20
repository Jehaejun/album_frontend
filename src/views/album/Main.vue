<template>
    <div>
        <add-header></add-header>
        <add-main v-bind:albums="albumList" v-on:@btnView="detailView"></add-main>   
    </div> 
</template>

<script>
import HeaderComponent from '../../components/header/NavigationBar.vue'
import MainComponent   from '../../components/album/ThumbNail.vue'

import albumApi from '../../Api/album/AlbumApi.js'

export default {
    created() {
        this.getAlbumList();
    },

    data() {
        return {
            albumList: []
        }
     },

    components: {
        'add-header': HeaderComponent,
        'add-main'  : MainComponent
    },

    methods: {
        getAlbumList(){
            albumApi.selectAlbum().then((response)=>{
                this.albumList = response.data;
            });
        },
        detailView(text){
            alert(text);
        }
    }
}
</script>