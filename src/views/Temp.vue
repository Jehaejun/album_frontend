<template>
    <div>

    <div class="container">
     <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h2>Checkout form</h2>
        <p class="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>

      <div class="row">
        
        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">앨범 등록</h4>
          <form class="needs-validation" novalidate="">

            <div class="mb-3">
          <label for="username">사진첨부</label>
          <div class="input-group">
            
            <input type="text" class="form-control" id="username" placeholder="사진을 첨부해주세요." required="" readonly>
            <div class="input-group-prepend">
              <input type="button" class="btn btn-outline-info" value="첨부">
            </div>
            <div class="invalid-feedback" style="width: 100%;">
              Your username is required.
            </div>
          </div>
          <input type="file" value="파일 선택" id="btn_upload" accept="image/*" style="display: none;">
            </div>
              <div class="mb-3">
                <label for="firstName">작성자</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required="" >
                <div class="invalid-feedback">
                  입력해주세요.
                </div>
              </div>
              <div class="mb-3">
                <label for="lastName">내용</label>
                <textarea class="form-control" id="lastName" placeholder="" value="" required="" style="margin-top: 0px;margin-bottom: 0px;height: 100px;" >
                </textarea>
                <div class="invalid-feedback">
                  입력해주세요.
                </div>
              </div>

            <hr class="mb-4">
           <!--  <button class="btn btn-primary btn-lg btn-block" type="submit" 	>
                Continue to checkout
            </button> -->
            <!-- @click="insertAlbum(name, memo)" -->
            <input class="btn btn-primary btn-lg btn-block" type="button" value="저장하기"  @click="onClickSubmit">
             <input class="btn btn-primary btn-lg btn-block" type="button" value="쿠키테스트"  @click="cookie">
          </form>
        </div>
      </div>

      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">© 2017-2018 Company Name</p>
        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Privacy</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
    </div>

    <div>
    <b-button-group>
      <b-button>Button 1</b-button>
      <b-button>Button 2</b-button>
      <b-button>Button 3</b-button>
    </b-button-group>
  </div>
  <b-button variant="primary" disabled>
    <b-spinner small type="grow"></b-spinner>
    Loading...
  </b-button>
    </div> 
    
</template>

<script>
/* import HeaderComponent from '../components/AlbumHeader.vue'

import AlbumApi from '../api/AlbumModel.js' */
import testApi from '../Api/TestApi.js'

export default {
    created() {
      console.log(process.env)
    },
    components: {
       /*  'add-header': HeaderComponent */
    },

    methods:{
        onClickSubmit(){
          testApi.test().then((response) => {
                    console.log(response.data)
                })
        },

        cookie(){
          testApi.cookie().then((response) => {
                    console.log(response.data)
                })
        }
            /* this.$axios.post('http://127.0.0.1:8081/').then((response) => {
                    console.log(response.data)
                }) */
                  
        
        /* 
		onClickSubmit(name, memo){
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.classList.add('was-validated');
            });

            var elFile = document.getElementById('btn_upload');

            if(elFile.files[0].size > 15728640){
                alert("사진용량 15MB 이하만 업로드 가능합니다.");
                return false;
            }
			if(name != '' && memo != ''){
                
                
                let imgData = new FormData();
                imgData.append('name', elFile.files[0].name);
                imgData.append('file', elFile.files[0]); 

                AlbumApi.imageUpload(imgData).then((response)=>{
                    AlbumApi.insertAlbum(name, memo, response.data.filePath);
                });

            }
        },
        
        onClickUpload(){
            var btn = document.getElementById('btn_upload');
            btn.click();
        },

        uploadImage(event){
            if(event.target.files[0].size > 15728640){
                alert("사진용량 15MB 이하만 업로드 가능합니다.");
                return false;
            }

            console.log(event.target.files[0]);
            this.imgName = event.target.files[0].name;

            
        } */
    },
    
    data () {
        return {
            /* name : '',
            memo : '',
            imgName : '' */
        }
    }
}

</script>