<template>
    <div class="container">
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
                        <p class="abstract" v-html="item.content"></p>
                        <div class="meta">
                          <router-link to="#">
                            <i class="fa fa-user" aria-hidden="true"> {{item.author}}</i>
                          </router-link>
                          <!-- <span>
                            <i class="fa fa-eye" aria-hidden="true"> {{item.read_num}}</i>
                          </span>
                          <span>
                            <i class="fa fa-comment" aria-hidden="true"> {{item.updated_time}}</i>
                          </span> -->
                        </div>
                      </div>
                    </li>
                  </ul>
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
        }
    },
    methods: {
      load() {
        this.loading = true;
        api.essaySearch("", "/10/" + this.page +"/"+ this.$route.params.sf).then(response => {
          if (response.data.content && response.data.content.length > 0) {
            this.essays.push(response.data.content);
            this.page++;
            this.loading = false;
          }
        });
      }
    },
    mounted() {
        this.load();
    }
}
</script>

<style scoped>

</style>