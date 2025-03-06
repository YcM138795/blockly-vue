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
export function update(data){
    return request({
        url: '/proxy/codeblock/update',
        method: 'put',
        data
    })
}

export function remove(data){
    return request({
        url: '/proxy/codeblock/delete',
        method: 'delete',
        data
    })
}