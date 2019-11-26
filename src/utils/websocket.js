import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const initWebSocket=()=>{
    // 建立连接对象
    let stompClient="";
    let socket = new SockJS(process.env.VUE_APP_BASE_API+'/chat');
    // 获取STOMP子协议的客户端对象
    stompClient = Stomp.over(socket);
    //前端对后台连接心跳监控间隔
    stompClient.heartbeat.outgoing=20000;
    //后台对前端心跳监控，若为0则不进行心跳监控
    stompClient.heartbeat.incoming=0;
    return stompClient;
}
