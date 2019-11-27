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
                <el-form-item class="input-prepend" prop="username">
                    <el-input class="top-radius" placeholder="用户名" v-model="signupForm.username"></el-input>
                    <i class="fa fa-user"></i>
                </el-form-item>
                  <el-form-item class="input-prepend" prop="email">
                    <el-input class="top-radius" placeholder="邮箱" v-model="signupForm.email"></el-input>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                </el-form-item>
                <!-- <el-form-item class="input-prepend" prop="phone">
                    <el-input placeholder="手机号" v-model="signupForm.phone"></el-input>
                    <i class="fa fa-mobile-phone"></i>
                </el-form-item>
                <div class="input-prepend ssm">
                    <input type="text" name="" value="" placeholder="手机验证码">
                    <i class="fa fa-shield"></i>
                    <a class="send-ssm btn-success" href="#">发送验证码</a>
                </div> -->
                <el-form-item class="input-prepend" prop="password">
                    <el-input class="bottom-radius" type="password" placeholder="设置密码" v-model="signupForm.password"></el-input>
                    <i class="fa fa-lock"></i>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn btn-info" type="info" round @click="signup('signupForm')">注册</el-button>
                </el-form-item>
                <p class="sign-up-msg">
                    点击 “注册” 即表示您同意并愿意遵守音书<br>用户协议和隐私政策
                </p>
            </el-form>
            <div class="more-sign">
                <p>社交账号直接注册</p>
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
    import '../assets/css/sign.css';
    import { Message } from 'element-ui';
    import md5 from 'js-md5';
    import api from "@/api/api";
    export default {
        data(){
            return {
                signupForm: {
                    username:'',
                    password:'',
                    email:'',
                    phone:''
                },
                rules: {
                    username: [
                        {required: true,message: '请输入用户名',trigger: 'blur'},
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    email: [
                        {required: true,message: '请输入邮箱',trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    password: [
                        {required: true,message: '请输入密码',trigger: 'blur'},
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            signup(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.loading = true;
                        let userInfo = JSON.parse(JSON.stringify(this.signupForm));
                        userInfo.password = md5(userInfo.password);
                        api.signup(userInfo).then(response => {
                            this.loading = false;
                            Message.success({message:response.data+": 注册成功！请前往邮箱进行激活"});
                            this.$router.push('/signin');
                        })
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