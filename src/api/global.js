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
        name: "logout",
        url: "/logout",
        method: "post"
    },
    {
        name: "userInfo",
        url: "/user/info",
        method: "get"
    },
    {
        name: "updateUser",
        url: "/user/info",
        method: "put"
    },
    {
        name: "addUser",
        url: "/user/info",
        method: "post"
    },
    {
        name: "notice",
        url: "/notice",
        method: "get"
    },
    {
        name: "carousel",
        url: "/carousel",
        method: "get"
    },
    {
        name: "essays",
        url: "/essay",
        method: "get"
    },
    {
        name: "create",
        url: "/user/essay",
        method: "post"
    },
    {
        name: "myessay",
        url: "/user/essay",
        method: "get"
    },
    {
        name: "altessay",
        url: "/user/essay",
        method: "put"
    },
    {
        name: "comments",
        url: "/comments",
        method: "get"
    }
];

export default request(apiConfig);