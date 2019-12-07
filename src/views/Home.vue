<template>
  <div class="container index">
    <el-row>
      <el-col :span="24">
        <div>
          <Acquaint :delay="0.5" :speed="100" :content="notice">
            <span v-for="(item, index) in notice" :key="index">{{item}}</span>
          </Acquaint>
        </div>
      </el-col>
    </el-row>

    <div class="row">
      <div class="col-xs-16 main">
        <div class="block">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in carousel" :key="item.id">
              <a target="_blank" :href="item.forwardUrl">
                <img :src="item.imageUrl" class="imgCarousel" />
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="split-line"></div>

        <div class="list-container">
          <ul class="list">
            <li v-for="(essay, indx) in essays" :key="indx">
              <ul class="note-list" infinite-scroll-url="/">
                <li v-for="(item, index) in essay" :key="index">
                  <div class="content">
                    <router-link
                      :to="{path: '/essayDetail/'+item.id}"
                      v-text="item.title"
                      class="title"
                    ></router-link>
                    <p class="abstract" v-text="item.content"></p>
                    <div class="meta">
                      <a>
                        <i class="fa fa-user" aria-hidden="true">{{item.username}}</i>
                      </a>
                      <a>
                        <i class="fa fa-eye" aria-hidden="true">{{item.read_num}}</i>
                      </a>
                      <span>
                        <i class="fa fa-comment" aria-hidden="true">{{item.updated_time}}</i>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <el-button type="info" round class="load-more" @click="load()" v-if="noMore == false">阅读更多</el-button>
          <p v-if="noMore">没有更多了</p>
          <el-backtop target=".container" :visibility-height="50"></el-backtop>
        </div>
      </div>
      <div class="col-xs-7 col-xs-offset-1 aside">待填充</div>
    </div>
  </div>
</template>

<script>
import Acquaint from "@/components/Acquaint.vue";
import api from "@/api/api";

export default {
  name: "home",
  components: {
    Acquaint
  },
  data() {
    return {
      carousel: [{}],
      notice: [],
      essays: [],
      page: 1,
      noMore: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      api.essays("", "/10/" + this.page).then(response => {
        if (response.data && response.data.length > 0) {
          this.essays.push(response.data);
          if(response.data.length < 10){
            this.noMore = true;
          }
          this.page++;
          this.loading = false;
        } else {
          this.noMore = true;
        }
      });
    }
  },
  mounted() {
    api.carousel().then(response => {
      this.carousel = response.data;
    }),
      api.notice().then(response => {
        response.data.forEach(element => {
          this.notice.push(element.content);
        });
      }),
      this.load();
  }
};
</script>

<style scoped>
.scrollContainer {
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  width: 79%;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.imgCarousel {
  width: 100%;
}

.container {
  width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
*,
:after,
:before {
  box-sizing: border-box;
}
.row {
  margin-left: -15px;
  margin-right: -15px;
}
.index .main {
  padding-top: 30px;
  padding-right: 0;
}
.col-xs-16 {
  width: 66.66667%;
}
.index .main .split-line {
  margin: -5px 0 15px;
}
.note-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.note-list li {
  position: relative;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
}
.note-list .title {
  margin: -7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
.note-list .abstract {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #999;
}
.note-list .meta {
  padding-right: 0 !important;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}
.note-list .meta a {
  margin-right: 10px;
  color: #b4b4b4;
}
.iconfont {
  font-family: iconfont !important;
  font-size: inherit;
  font-style: normal;
  font-weight: 400 !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.index .aside {
  padding: 30px 0 0;
}
.col-xs-offset-1 {
  margin-left: 4.16667%;
}
.col-xs-7 {
  width: 29.16667%;
}
.col-xs-7,
.col-xs-16 {
  float: left;
}
.load-more {
  width: 100%;
  height: 40px;
  margin: 30px auto 60px;
  padding: 10px 15px;
  text-align: center;
  font-size: 15px;
}
</style>