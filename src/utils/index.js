
import axios from 'axios'; // 确保正确导入 axios

async function postData(data) {

    
    // JSON.stringify(code)
    alert(typeof data)
    alert(JSON.stringify(data))
    // console.log(code);
    try {
        const response = await axios.post('http://127.0.0.1:4523/m1/4252646-3894117-default/oss/visualCompile', 
        {
            code:data   
          
        });
        console.log(response,'111');
        this.responseData = response.data;
      } catch (error) {
        console.error('调用 POST 接口时出错：', error);
      }
portAction();
    // fetch('http://127.0.0.1:4523/m1/4252646-3894117-default/oss/visualCompile', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             alert('1')
    //             throw new Error('Network response was not ok');

    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Response from server:', data);
    //         alert('2')

    //     })
    //     .catch(error => {
    //         console.error('There was a problem with your fetch operation:', error);
    //     });

}

//串口
async function  portAction() {
    if ("serial" in navigator) {
        console.log("Web Serial API is supported.");
        try {
            const port = await requestPort();
            await openPort(port);

            readFromPort(port); // 开始读取数据

            // 假设你有一些数据要发送
            const dataToSend = "Hello, Serial!";
            await writeToPort(port, dataToSend);

            // 停止操作后关闭串口
            await closePort(port);
        } catch (error) {
            console.error("操作失败:", error);
        }
    } else {
        console.log("Web Serial API is not supported.");
    }
}
//选择并请求串口
async function requestPort() {
    try {
        const port = await navigator.serial.requestPort();
        console.log("串口已选择:", port);
        return port;
    } catch (error) {
        console.error("请求串口时出错:", error);
        throw error;
    }
}
//打开串口
async function openPort(port) {
    try {
        await port.open({ baudRate: 9600 });
        console.log("串口已打开:", port);
    } catch (error) {
        console.error("打开串口时出错:", error);
        throw error;
    }
}

async function readFromPort(port) {
    const textDecoder = new TextDecoderStream();
    await port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    try {
        for (; ;) { // 用for循环代替while (true)
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            console.log("接收到的数据:", value);
        }
    } catch (error) {
        console.error("读取串口数据时出错:", error);
    } finally {
        reader.releaseLock();
    }
}

async function writeToPort(port, data) {
    const textEncoder = new TextEncoderStream();
    await textEncoder.readable.pipeTo(port.writable);
    const writer = textEncoder.writable.getWriter();

    try {
        await writer.write(data);
        console.log("数据已发送:", data);
    } catch (error) {
        console.error("写入串口数据时出错:", error);
    } finally {
        writer.releaseLock();
    }
}

async function closePort(port) {
    try {
        await port.close();
        console.log("串口已关闭");
    } catch (error) {
        console.error("关闭串口时出错:", error);
    }
}

// 导出函数
export { postData };


