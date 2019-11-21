<template>
    <div class="sign">
        <!--logo-->
        <div class="logo">
            <router-link to="/">
                <img src="../assets/img/logo.png">
            </router-link>
        </div>
        <!--注册表单-->
        <div class="main">
            <div class="title">
                <h4>
                    <router-link to="/signin">登录</router-link>
                    <b>·</b>
                    <router-link class="active" to="/signup">注册</router-link>
                </h4>
            </div>
            <el-form :model="signupForm" :rules="rules" ref="signupForm">
                <el-form-item class="input-prepend" prop="nickName">
                    <el-input class="top-radius" placeholder="你的昵称" v-model="signupForm.nickname"></el-input>
                    <i class="fa fa-user"></i>
                </el-form-item>
                <el-form-item class="input-prepend" prop="phone">
                    <el-input placeholder="用户名" v-model="signupForm.username"></el-input>
                    <i class="fa fa-mobile-phone"></i>
                </el-form-item>
                <div class="input-prepend ssm">
                    <input type="text" name="" value="" placeholder="手机验证码">
                    <i class="fa fa-shield"></i>
                    <a class="send-ssm btn-success" href="#">发送验证码</a>
                </div>
                <div class="input-prepend">
                    <input class="bottom-radius" type="password" value="" name="" placeholder="设置密码" v-model="signupForm.password">
                    <i class="fa fa-lock"></i>
                </div>
                <input class="btn btn-success sign-up-btn" type="button" value="注册">
                <p class="sign-up-msg">
                    点击 “注册” 即表示您同意并愿意遵守音书<br>用户协议和隐私政策
                </p>
            </el-form>
            <div class="more-sign">
                <p>社交账号直接登录</p>
                <ul>
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
                signupForm: {
                    username:'',
                    password:'',
                    email:'',
                    nickname:''
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
    }
</script>
<style>

</style>