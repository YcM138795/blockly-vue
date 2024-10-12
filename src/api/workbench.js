import request from '@/utils/request'
export function createEntry(data){

    return request({
        url: 'http://192.168.130.3:3000/workbench/create-entry',
        method: 'post',
        data
      })
}
export function getEntry(){
    return request({
        url: 'http://192.168.130.3:3000/workbench/find-entries',
        method: 'get'
        
    })
}