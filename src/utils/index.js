
import axios from 'axios'; // 确保正确导入 axios
import { burn } from './kermit.js'; // 导入 burn 函数

// 下载文件并返回 Blob 对象
async function downloadFile(url) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'blob' // 获取二进制数据
        });
        console.log(response);
        return response.data; // 返回 blob 数据
    } catch (error) {
        console.error('Error downloading the file:', error);
        throw error;
    }
}


// 主函数：获取文件 URL，下载文件并保存到 USB 闪存盘
async function postData(data) {
    try {
        const response = await axios.post('https://www.iot.jnuiclab.com/eapi/admin/oss/visualCompile', {
            code: data
        });

        console.log('c代码',data);
        //获取阿里云oss编译文件的url
        const fileUrl = response.data.msg;
        console.log('Download URL:', fileUrl);

        const blob = await downloadFile(fileUrl);
        console.log(blob.size);
        console.log('获取编译文件成功');

        let result = burn(blob)
        if(result){
            return result;
        }else{
            return '下载成功'
        }


    } catch (error) {
        console.error('Error in the main function:', error);
        return '二进制文件获取失败'
    }
}



// 导出函数
export { postData };


