import ApiService from "./ApiService"

export async function apiCreateMessageChatBot(param: Object) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/messagebot',
        param
    })
}
