import request from '@/utils/request'
export function createCodeBlock(data){

    return request({
        url: '/proxy/codeblock/create',
        method: 'post',
        data
      })
}
export function find(data){
    return request({
        url: '/proxy/codeblock/find',
        method: 'post',
        data
        
    })
}