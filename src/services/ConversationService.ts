import { Conversation } from "@prisma/client"
import ApiService from "./ApiService"


export async function apiGetConversations() {
    return ApiService.fetchData({
        method: 'get',
        url: '/api/conversation',
    })
}

export async function apiGetConversation(param: Conversation) {
    return ApiService.fetchData({
        method: 'get',
        url: `/api/conversation/${param.code}`,
    })
}

export async function apiPostCreateConversation(param: Conversation) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/conversation',
        param
    })
}