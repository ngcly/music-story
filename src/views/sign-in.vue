<template>
    <div class="sign">
        <!--logo-->
        <div class="logo">
            <router-link to="/home">
                <img src="../assets/img/logo.png">
            </router-link>
        </div>
        <!--登录表单-->
        <div class="main">
            <div class="title">
                <h4>
                    <router-link class="active" to="/sign-in">登录</router-link>
                    <b>·</b>
                    <router-link to="/sign-up">注册</router-link>
                </h4>
            </div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="username" class="input-prepend">
                    <el-input class="top-radius" placeholder="手机号或邮箱" v-model="loginForm.username"></el-input>
                    <i class="fa fa-user"></i>
                </el-form-item>
                <el-form-item prop="password" class="input-prepend">
                    <el-input class="bottom-radius" type="password"  placeholder="密码" v-model="loginForm.password"></el-input>
                    <i class="fa fa-lock"></i>
                </el-form-item>
                <div class="remember">
                    <input type="checkbox">&nbsp;
                    <span>记住我</span>
                </div>
                <div class="help">
                    <router-link to="/help">
                        登录遇到问题?
                    </router-link>
                </div>
                <input class="btn btn-primary" type="button" value="登录" @click="login('loginForm')">
            </el-form>
            <div class="more-sign">
                <p>社交账号登录</p>
                <ul>
                    <li class="weibo">
                        <a href="#">
                            <i class="fa fa-weibo"></i>
                        </a>
                    </li>
                    <li class="weixin">
                        <a href="#">
                            <i class="fa fa-weixin"></i>
                        </a>
                    </li>
                    <li class="qq">
                        <a href="#">
                            <i class="fa fa-qq"></i>
                        </a>
                    </li>
                    <li class="other">
                        <a href="#">
                            其他
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import '../assets/css/sign.css'
    export default {
        data(){
            return {
                loginForm: {
                    username:'',
                    password:''
                },
                rules: {
                    username: [
                        {required: true,message: '请输入用户名',trigger: 'blur'}
                    ],
                    password: [
                        {required: true,message: '请输入密码',trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            login(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.$store.dispatch("Login",this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push(this.$route.query.redirect || '/home')
                            }).catch(() => {this.loading = false;});
                    }else{
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>

</style>