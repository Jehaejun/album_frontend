<template>
    <div>
        <add-header></add-header>

    <div class="container">
      <div class="row">
        <div class="col-md-3 text-center"><div class="card mb-4 shadow-sm"><img src="" id="output" style="height: 100%; width: 100%;"> <div class="card-body"><p class="card-text"></p> </div></div></div>
        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">앨범 등록</h4>
          <form class="needs-validation" novalidate="">

            <div class="mb-3">
          <label for="username">사진첨부</label>
          <div class="input-group">
            
            <input type="text" class="form-control" id="username" placeholder="사진을 첨부해주세요." required="" readonly v-model="imgName">
            <div class="input-group-prepend">
              <input type="button" class="btn btn-outline-info" value="첨부" @click="onClickUpload">
            </div>
            <div class="invalid-feedback" style="width: 100%;">
              Your username is required.
            </div>
          </div>
          <input type="file" value="파일 선택" id="btn_upload" accept="image/*" @change="uploadImage($event)" style="display: none;">
            </div>
              <div class="mb-3">
                <label for="firstName">제목</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required="" v-model="name">
                <div class="invalid-feedback">
                  입력해주세요.
                </div>
              </div>
              <div class="mb-3">
                <label for="lastName">내용</label>
                <textarea class="form-control" id="lastName" placeholder="" value="" required="" style="margin-top: 0px;margin-bottom: 0px;height: 100px;" v-model="contents">
                </textarea>
                <div class="invalid-feedback">
                  입력해주세요.
                </div>
              </div>

            <hr class="mb-4">
           <!--  <button class="btn btn-primary btn-lg btn-block" type="submit" 	>
                Continue to checkout
            </button> -->
            <!-- @click="insertAlbum(name, contents)" -->
            <input class="btn btn-primary btn-lg btn-block" type="button" value="저장하기"  @click="onClickSubmit(name, contents)">
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
    </div> 
    
</template>

<script>
import HeaderComponent from '../../components/header/NavigationBar.vue'

import AlbumApi from "../../Api/album/AlbumApi";
import ImageModule from "../../modules/ImageModule.js";

export default {
  created() {},
  components: {
    "add-header": HeaderComponent
  },

  methods: {
    onClickSubmit(name, contents) {
      var forms = document.getElementsByClassName("needs-validation");
      Array.prototype.filter.call(forms, function(form) {
        form.classList.add("was-validated");
      });

      var elFile = document.getElementById("btn_upload");

/*
      if (elFile.files[0].size > 15728640) {
        alert("사진용량 15MB 이하만 업로드 가능합니다.");
        return false;
      }
*/
    //console.log(ImageModule.dataURItoBlob(ImageModule.imageObj));

    if (name != "" && contents != "") {
        let imgData = new FormData();
        imgData.append('name', elFile.files[0].name);
        imgData.append('file', ImageModule.dataURItoBlob(ImageModule.imageObj)); 

        AlbumApi.imageUpload(imgData).then((response)=>{
          console.log(response)
                AlbumApi.insertAlbum(name, contents, response.data.filePath);
        }); 

        }
    },

    onClickUpload() {
      var btn = document.getElementById("btn_upload");
      btn.click();
    },

    uploadImage(event) {
        var orientation;
        this.imgName = event.target.files[0].name;

        var file = event.target.files[0];
        if (file && file.name) {
            EXIF.getData(file, function() {
                var exifData = EXIF.pretty(this);
                if (exifData) {
                    console.log(EXIF.getTag(this, "Orientation"));
                    orientation = EXIF.getTag(this, "Orientation");
                } else {
                    alert("No EXIF data found in image '" + file.name + "'.");
                    return false;
                }
            });
        }
// 주석주석주석
        ImageModule.resizeImage({
            file: event.target.files[0],
            maxSize: 1028
        }).then(resizedImage => {
            ImageModule.resetOrientation(base64Img => {
                ImageModule.imageObj = base64Img;
                document.getElementById("output").src = ImageModule.imageObj;
            }, resizedImage, orientation);
        });
    }
},
 
  data() {
    return {
      name: "",
      contents: "",
      imgName: ""
    };
  }
};
</script>