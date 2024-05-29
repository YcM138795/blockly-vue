
import axios from 'axios'; // 确保正确导入 axios

// 下载文件并返回 Blob 对象
async function downloadFile(url) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'blob' // 获取二进制数据
        });
        console.log(response, '11111111');
        return response.data; // 返回 Blob 数据
    } catch (error) {
        console.error('Error downloading the file:', error);
        throw error;
    }
}

// 保存文件到 USB 闪存盘
async function saveFileToUSB(blob, fileName) {
    if ('showSaveFilePicker' in window) {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: '选择要储存的位置',
                    accept: { 'application/octet-stream': ['.exe'] },
                }],
            });
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            console.log("文件已写入USB闪存盘");
            return 1;
        } catch (error) {
            console.error("保存文件时出错:", error);
            return -1;
        }
    } else {
        console.log("File System Access API不被支持");
    }
}

// 主函数：获取文件 URL，下载文件并保存到 USB 闪存盘
async function postData(data) {
    try {
        const response = await axios.post('https://www.iot.jnuiclab.com/eapi/oss/visualCompile', {
            code: data
        });

        const fileUrl = response.data.msg;
        console.log('Download URL:', fileUrl);

        const blob = await downloadFile(fileUrl);
        console.log('File downloaded successfully');

        let saveState = await saveFileToUSB(blob, 'downloaded_file.exe');

        if (saveState === 1) {
            return 1;
        } else {
            return 0;
        }


    } catch (error) {
        console.error('Error in the main function:', error);
        return -1
    }
}





//串口
// async function  portAction() {
//     if ("serial" in navigator) {
//         // console.log("Web Serial API is supported.");
//         try {
//             const port = await requestPort();
//             await openPort(port);

//             readFromPort(port); // 开始读取数据

//             // 假设你有一些数据要发送
//             const dataToSend = "Hello, Serial!";
//             await writeToPort(port, dataToSend);

//             // 停止操作后关闭串口
//             await closePort(port);
//         } catch (error) {
//             console.error("操作失败:", error);
//         }
//     } else {
//         console.log("Web Serial API is not supported.");
//     }
// }
// //选择并请求串口
// async function requestPort() {
//     try {
//         const port = await navigator.serial.requestPort();
//         console.log("串口已选择:", port);
//         return port;
//     } catch (error) {
//         console.error("请求串口时出错:", error);
//         throw error;
//     }
// }
// //打开串口
// async function openPort(port) {
//     try {
//         await port.open({ baudRate: 9600 });
//         console.log("串口已打开:", port);
//     } catch (error) {
//         console.error("打开串口时出错:", error);
//         throw error;
//     }
// }

// async function readFromPort(port) {
//     const textDecoder = new TextDecoderStream();
//     await port.readable.pipeTo(textDecoder.writable);
//     const reader = textDecoder.readable.getReader();
//     try {
//         for (; ;) { // 用for循环代替while (true)
//             const { value, done } = await reader.read();
//             if (done) {
//                 break;
//             }
//             console.log("接收到的数据:", value);
//         }
//     } catch (error) {
//         console.error("读取串口数据时出错:", error);
//     } finally {
//         reader.releaseLock();
//     }
// }

// async function writeToPort(port, data) {
//     const textEncoder = new TextEncoderStream();
//     await textEncoder.readable.pipeTo(port.writable);
//     const writer = textEncoder.writable.getWriter();

//     try {
//         await writer.write(data);
//         console.log("数据已发送:", data);
//     } catch (error) {
//         console.error("写入串口数据时出错:", error);
//     } finally {
//         writer.releaseLock();
//     }
// }

// async function closePort(port) {
//     try {
//         await port.close();
//         console.log("串口已关闭");
//     } catch (error) {
//         console.error("关闭串口时出错:", error);
//     }
// }



// 导出函数
export { postData };


