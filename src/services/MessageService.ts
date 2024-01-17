import { Message } from "@prisma/client"
import ApiService from "./ApiService"


export async function apiGetMessageChats() {
    return ApiService.fetchData({
        method: 'get',
        url: '/api/message',
    })
}


export async function apiCreateMessageChat(param: Message) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/message',
        param
    })
}
