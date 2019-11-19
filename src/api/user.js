const api = [
    {
        name: "login",
        url: "/signin?client_id=cloud_client&client_secret=secret",
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
    }
]

export default api;