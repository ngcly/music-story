import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let stompClient = null

const websocket = {
  connection: function (store, onConnect, onError) {
    if (process.client) {
      const apiBase = import.meta.env.VITE_BASE_API || window.location.origin
      const socketUrl = new URL('/chat', apiBase).toString()
      const socket = new SockJS(socketUrl)
      stompClient = Stomp.over(socket)
      const token = store.token
      if (!token?.access_token) return null
      stompClient.connect(
        { Authorization: `${token.token_type || 'Bearer'} ${token.access_token}` },
        () => onConnect?.(stompClient),
        onError
      )
      return stompClient
    }
    return null
  }
}

export default websocket
