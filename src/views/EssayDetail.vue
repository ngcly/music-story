<template>
  <div class="container">
    <div class="row">
      <div class="main">
        <section>
          <h1 class="title" v-text="essayDetail.title"></h1>
          <div class="essay-us">
            <div class="us-box">
              <router-link class="avatar" to="/u/123">
                <el-avatar :size="48" :src="essayDetail.user.avatar"></el-avatar>
              </router-link>
              <div style="margin-left: 8px;">
                <div class="us-info">
                  <span class="us-name">
                    <router-link to="#">{{essayDetail.user.username}}</router-link>
                  </span>
                  <el-button class="btn btn-info" round size="mini">关注</el-button>
                </div>
                <div style="display: flex;">
                  <span class="ed">发表时间：{{essayDetail.createdTime}}</span>
                  <span class="ed">阅读：{{essayDetail.readNum}}</span>
                </div>
              </div>
            </div>
          </div>
          <article>{{essayDetail.content}}</article>
        </section>
        <div id="page-comment">
          <section class="pg-comment">
            <div style="display:flex;">
              <el-avatar :size="40" :src="essayDetail.user.avatar"></el-avatar>
              <div class="comment-form">
                <el-form>
                  <el-form-item>
                    <el-input type="textarea" placeholder="写下你的评论..."></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="cm-s">
                      <div>
                        <span>Enter 发表</span>
                      </div>
                      <div>
                        <el-button class="btn btn-info" round size="mini">发布</el-button>
                        <el-button class="btn btn-info" round size="mini">取消</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <h3>全部评论</h3>
            <div></div>
          </section>
        </div>
      </div>
      <div>待填充</div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "essayDetail",
  props: {
    id: String
  },
  data() {
    return {
      essayDetail: {
        title: "",
        content: "",
        readNum: "",
        createTime: "",
        updateTime: "",
        user: {
          username: "",
          avatar: ""
        }
      }
    };
  },
  mounted() {
    api.essays("", "/" + this.id).then(response => {
      this.essayDetail = response.data;
    });
  }
};
</script>>

<style scoped>
.container {
  width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 30px;
}
*,
:after,
:before {
  box-sizing: border-box;
}
.main {
  padding-top: 30px;
  padding-right: 0;
  width: 76.11%;
}
.index .main .split-line {
  margin: -5px 0 15px;
}
.title {
  font-size: 30px;
  font-weight: 700;
  word-break: break-word;
  margin-bottom: 0.5em;
}
.essay-us {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-size: 13px;
}
.us-box {
  display: flex;
  align-items: center;
}
.us-info {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.us-name {
  font-size: 16px;
  font-weight: 500;
  margin-right: 8px;
}
.ed {
  margin-right: 10px;
  color: #969696;
  font-size: 13px;
}
.pg-comment {
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
}
.comment-form {
  margin-left: 10px;
  margin-bottom: 48px;
  flex-grow: 1;
}
.cm-s {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #969696;
  align-items: center;
}
</style>>