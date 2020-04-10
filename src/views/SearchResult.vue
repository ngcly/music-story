<template>
  <div class="container">
    <div class="list-container">
      <ul class="list">
        <li v-for="(essay, indx) in essays" :key="indx">
          <div class="content">
            <router-link :to="{path: '/essayDetail/'+essay.id}" v-text="essay.title" class="title"></router-link>
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
    this.load(this.$route.params.keyword);
  }
};
</script>

<style scoped>
</style>