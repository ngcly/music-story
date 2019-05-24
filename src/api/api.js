import request from "../utils/request";
import user from "./user";

const commonApi = [
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
]

const all = commonApi.concat(user);

export default request(all);