import request from "../utils/request";

const apiConfig = [
    {
        name: "login",
        url: "/signin",
        method: "post"
    },
    {
        name: "signup",
        url: "/signup",
        method: "post"
    },
    {
        name: "userInfo",
        url: "/user",
        method: "get"
    }
];

export default request(apiConfig);