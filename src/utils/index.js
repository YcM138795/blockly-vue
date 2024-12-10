
// 导入 axios
import axios from 'axios';
import { EventBus } from './eventBus'; // 引入事件总线
import {headerFile} from '../components/config/config.js';

// 下载文件并返回 Blob 对象
async function getBlob(url) {

    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'blob' // 获取二进制数据
        });

        return response.data; // 返回 Blob 对象
    } catch (error) {
        console.error('下载文件时出错:', error);
        throw error;
    }
}

// 将 Blob 转换为 File 对象并处理
function BlobToFile(blob, fileName) {
    try {
        // 创建 File 对象
        const file = new File([blob], fileName, { type: blob.type });

        // 使用事件总线传递 File 对象，模拟 `<input type="file">` 的行为
        EventBus.$emit('file', file);
        console.log('文件对象:', file);

    } catch (error) {
        console.error('处理文件时出错:', error);
    }
}

//辅助函数：获取任务id
async function getId(data) {
    try {
        const response = await axios.post('https://edu.jnuiclab.com/api/visualCompile/startCompile', {
            code: data
        });
        console.log('C代码:', data);
        console.log('返回消息:', response.data.msg);
        return response.data.msg;  // 返回 taskId

    } catch (error) {
        console.error('获取任务id失败:', error);
    }
}

// 辅助函数：获取编译结果
async function getCompileResult(taskId) {
    try {
        const response = await axios.get(`https://edu.jnuiclab.com/api/visualCompile/getCompileResult/${taskId}`);
        console.log('编译结果:', response.data);
        return response.data;  // 返回完整的响应对象
    } catch (error) {
        console.error('获取编译结果错误:', error);
        return null;  // 错误时返回 null
    }
}

// 轮询函数，直到获取到成功的编译结果或超时
async function pollCompileResult(taskId, timeout = 20000, interval = 1000) {
    console.log('开始轮询编译结果');
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let count = 0;//记录当前轮询次数

        // 创建一个轮询定时器
        const pollInterval = setInterval(async () => {
            count++;
            const elapsed = Date.now() - startTime;

            if (count == 21) {
                console.log('轮询次数:', count);
                const result = await getCompileResult(taskId);
                clearInterval(pollInterval);  // 超时，停止轮询
                resolve(result.msg);  // 返回第二个接口信息
            }
            // 检查是否超过超时时间
            if (elapsed > timeout) {
                clearInterval(pollInterval);  // 超时，停止轮询
                reject(new Error('超时未获取到有效的编译结果'));
                return;
            }

            // 调用获取编译结果的函数
            const result = await getCompileResult(taskId);
            console.log('编译结果:', result.msg);


            if (result && result.msg && result.msg.startsWith('https://')) {  // 判断是否包含有效的 URL
                clearInterval(pollInterval);  // 成功，停止轮询
                resolve(result.msg);  // 解析成功，返回下载文件 URL
            }
            if (result && result.msg && result.msg.startsWith('Failed')) {  // 判断是否包含有效的 URL
                clearInterval(pollInterval);  // 编译出错，停止轮询
                resolve('代码编译出错,积木代码逻辑有误');  // 解析成功，返回字符串
            }
        }, interval);  // 每隔 interval 时间（500 毫秒）调用一次
    });
}

// 主函数：下载文件并处理
async function Compile(data) {
    data = headerFile + data;

    try {
        console.log('开始编译');
        const taskId = await getId(data);  // 获取 taskId
        const fileUrl = await pollCompileResult(taskId);  // 获取编译结果文件 URL

        if (fileUrl.startsWith('Compiling')) {
            return '代码编译超时,请稍后再试';
        }
        if (fileUrl == '代码编译出错,积木代码逻辑有误') {
            return '代码编译出错,积木代码逻辑有误';
        }
        if (fileUrl.startsWith('Task')) {
            return '服务器繁忙，请稍后再试';
        }
        if (fileUrl.startsWith('Error')) {
            return '阿里云服务器出错，请稍后再试';
        }

        const blob = await getBlob(fileUrl);  // 下载文件

        BlobToFile(blob, 'binary_file.ota');  // 处理文件
        // downFile(blob, 'binary_file.ota');  // 下载文件

        return '代码编译成功';
    } catch (error) {
        console.error('主函数错误:', error);
        return '代码编译超时,请稍后再试';
    }
}

// 导出函数
export { Compile };


