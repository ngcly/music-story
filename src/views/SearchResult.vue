<template>
  <div class="container">
    <div class="list-container">
      <span v-show='essays.length <= 0'>抱歉，暂未搜到相关内容！</span>
      <ul class="list">
        <li v-for="(essay, indx) in essays" :key="indx">
          <div class="content">
            <router-link :to="{path: '/essayDetail/'+essay.id}" v-html="essay.title" class="title"></router-link>
            <p class="abstract" v-html="essay.content"></p>
            <div class="meta">
              <router-link to="#">
                <i class="fa fa-user" aria-hidden="true">{{essay.author}}</i>
              </router-link>
              <!-- <span>
                       <i class="fa fa-eye" aria-hidden="true"> {{item.read_num}}</i>
                    </span>
                    <span>
                        <i class="fa fa-comment" aria-hidden="true"> {{item.updated_time}}</i>
              </span>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  props: {
    sf: String
  },
  data() {
    return {
      page: 1,
      essays: []
    };
  },
  methods: {
    load(keyWord) {
      this.loading = true;
      api.essaySearch("", "/10/" + this.page + "/" + keyWord).then(response => {
        this.essays = response.data.content;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.load(this.sf);
  },
  watch: {
    'sf'(newVal){
      this.load(newVal);
    }
  }
};
</script>

<style scoped>
.list-container {
  width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding: 30px 15px 0 15px
}
ul li {
  position: relative;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
}
.title {
  margin: -7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
.abstract {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 24px;
  color: #999;
}
.meta {
  padding-right: 0 !important;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.meta i {
  margin-right: 10px;
  color: #b4b4b4;
}
</style>