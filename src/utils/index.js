
// 导入 axios
import axios from 'axios';
import { EventBus } from './eventBus'; // 引入事件总线

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
async function pollCompileResult(taskId, timeout = 10000, interval = 1000) {
    console.log('开始轮询编译结果');
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        // 创建一个轮询定时器
        const pollInterval = setInterval(async () => {
            const elapsed = Date.now() - startTime;

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
        }, interval);  // 每隔 interval 时间（500 毫秒）调用一次
    });
}

// 主函数：下载文件并处理
async function Compile(data) {
    data = `#include <FreeRTOS.h>
    #include "task.h"
    #include "bflb_core.h"
    #include "bflb_mtimer.h"
    #include "bflb_uart.h"
    #include "board.h"
    #include "io.h"
    #include "ota.h"
    #include "i2c.h"
    #include "spi.h"
    #include "usbdev.h"
    #include "logo.h"
    #include "zforth.h"
    #include "zforth_bl61x.h"
    #include "bl61x_light.h"
    #include "bl61x_fmq.h"
    #include "bl61x_Motors.h"
    #include "bl61x_Ultrasonic.h"
    #include "ota.h"
    #include "log.h"
    
    #define DBG_TAG "MAIN"
    #define VERSION __DATE__ " " __TIME__
    
    static TaskHandle_t logo_handle;
    static TaskHandle_t zforth_handle;
    static TaskHandle_t usbdev_handle;
    static TaskHandle_t light_handle;
    static TaskHandle_t fmq_handle;
    static TaskHandle_t motors_handle;
    static TaskHandle_t servo_handle;
    static TaskHandle_t ultrasonic_handle;
    
    void version(void) {
	char buf[128];
	snprintf(buf, 127, "version: %s\\n\\r", VERSION);
	zf_txs(buf);
    }

    void ultrasonic_task(void *param);
    void motors_task(void *param);
    void servo_task(void *param);
    void fmq_task(void *param);
    void light_task(void *param);\n`+ data;

    try {
        console.log('开始编译');
        const taskId = await getId(data);  // 获取 taskId
        const fileUrl = await pollCompileResult(taskId);  // 获取编译结果文件 URL
        const blob = await getBlob(fileUrl);  // 下载文件

        BlobToFile(blob, 'binary_file.ota');  // 处理文件
        downFile(blob, 'binary_file.ota');  // 下载文件

        return '二进制文件获取成功';
    } catch (error) {
        console.error('主函数错误:', error);
        return '二进制文件获取失败';
    }
}

// 转换blob，下载文件
function downFile(blob, fileName) {
    try {
        // 触发文件下载
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl); // 释放URL对象

        console.log('文件下载完成:', fileName);

    } catch (error) {
        console.error('处理文件时出错:', error);
    }
}

// 导出函数
export { Compile };



// // 导入 axios
// import axios from 'axios';
// import { EventBus } from './eventBus'; // 引入事件总线

// 下载文件并返回 Blob 对象
// async function downloadFile(url) {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: url,
//             responseType: 'blob' // 获取二进制数据
//         });

//         return response.data; // 返回 Blob 对象
//     } catch (error) {
//         console.error('下载文件时出错:', error);
//         throw error;
//     }
// }



// // 主函数：下载文件并处理
// async function postData(data) {
//     data = `#include <FreeRTOS.h>
//     #include "task.h"
//     #include "bflb_core.h"
//     #include "bflb_mtimer.h"
//     #include "bflb_uart.h"
//     #include "board.h"
//     #include "io.h"
//     #include "ota.h"
//     #include "i2c.h"
//     #include "spi.h"
//     #include "usbdev.h"
//     #include "logo.h"
//     #include "zforth.h"
//     #include "zforth_bl61x.h"
//     #include "bl61x_light.h"
//     #include "bl61x_fmq.h"
//     #include "bl61x_Motors.h"
//     #include "bl61x_Ultrasonic.h"
//     #include "ota.h"
//     #include "log.h"
    
//     #define DBG_TAG "MAIN"
//     #define VERSION __DATE__ " " __TIME__
    
//     static TaskHandle_t logo_handle;
//     static TaskHandle_t zforth_handle;
//     static TaskHandle_t usbdev_handle;
//     static TaskHandle_t light_handle;
//     static TaskHandle_t fmq_handle;
//     static TaskHandle_t motors_handle;
//     static TaskHandle_t ultrasonic_handle;
    
//     void version(void) {
// 	char buf[128];
// 	snprintf(buf, 127, "version: %s\\n\\r", VERSION);
// 	zf_txs(buf);
//     }

//     void ultrasonic_task(void *param);
//     void motors_task(void *param);
//     void fmq_task(void *param);
//     void light_task(void *param);\n`+ data;

//     try {
//         console.log('开始编译');

//         const response = await axios.post('https://edu.jnuiclab.com/api/admin/oss/replace', {
//             code: data
//         });
//         console.log('c代码', data);

//         const fileUrl = response.data.msg;
//         console.log('Download URL:', fileUrl);

//         const blob = await downloadFile(fileUrl);

//         // 直接处理 Blob 对象并触发文件下载
//         handleFile(blob, 'binary_file.ota');

//         return '二进制文件获取成功';

//     } catch (error) {
//         console.error('主函数错误:', error);
//         return '二进制文件获取失败';
//     }
// }

// // 导出函数
// export { postData };
