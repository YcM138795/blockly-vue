
// 导入 axios
import axios from 'axios';
import { EventBus } from './eventBus'; // 引入事件总线

// 下载文件并返回 Blob 对象
async function downloadFile(url) {

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
function handleFile(blob, fileName) {
    try {
        // 创建 File 对象
        const file = new File([blob], fileName, { type: blob.type });

        EventBus.$emit('file', file);
        // 模拟 `<input type="file">` 的行为
        // 这里不需要实际的 `<input>` 元素，可以直接使用 `file` 对象
        console.log('文件对象:', file);

    } catch (error) {
        console.error('处理文件时出错:', error);
    }
}

// 主函数：下载文件并处理
async function postData(data) {
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

        const response = await axios.post('https://edu.jnuiclab.com/api/admin/oss/replace', {
            code: data
        });
        console.log('c代码', data);


        const fileUrl = response.data.msg;
        console.log('Download URL:', fileUrl);

        const blob = await downloadFile(fileUrl);

        // 直接处理 Blob 对象而不需要实际的文件选择
        handleFile(blob, 'binary_file.ota');

        return '二进制文件获取成功';

    } catch (error) {
        console.error('主函数错误:', error);
        return '二进制文件获取失败';
    }
}



// 导出函数
export { postData };



// // 导入 axios
// import axios from 'axios';
// import { EventBus } from './eventBus'; // 引入事件总线

// // 下载文件并返回 Blob 对象
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

// // 将 Blob 转换为 File 对象并处理
// function handleFile(blob, fileName) {
//     try {
//         // 创建 File 对象
//         const file = new File([blob], fileName, { type: blob.type });

//         // 使用事件总线传递 File 对象
//         EventBus.$emit('file', file);

//         // 模拟 `<input type="file">` 的行为
//         console.log('文件对象:', file);

//         // 触发文件下载
//         const downloadUrl = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = downloadUrl;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(downloadUrl); // 释放URL对象

//         console.log('文件下载完成:', fileName);

//     } catch (error) {
//         console.error('处理文件时出错:', error);
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
