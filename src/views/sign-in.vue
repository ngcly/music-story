<template>
    <div class="sign">
        <!--logo-->
        <div class="logo">
            <router-link to="/">
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
            <div class="js-sign-in">
                <form method="post">
                    <div class="input-prepend ">
                        <input class="top-radius" type="text" value="" name="" placeholder="手机号或邮箱">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="input-prepend">
                        <input class="bottom-radius" type="password" value="" name="" placeholder="密码">
                        <i class="fa fa-lock"></i>
                    </div>
                    <div class="remember">
                        <input type="checkbox">&nbsp;
                        <span>记住我</span>
                    </div>
                    <div class="help">
                        <router-link to="/help">
                            登录遇到问题?
                        </router-link>
                    </div>
                    <input class="btn btn-primary" type="button" value="登录">
                </form>
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
    </div>
</template>
<script>
    import '../assets/css/sign.css'
    export default {

    }
</script>
<style>

</style>