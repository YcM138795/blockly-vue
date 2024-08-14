
import axios from 'axios'; // 确保正确导入 axios
// 下载文件并自动下载
async function downloadFile(url) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'blob' // 获取二进制数据
        });
        console.log(response);
        // 调用自动下载文件的函数
        autoDownloadFile(response.data, 'binary_file.ota');
        
    } catch (error) {
        console.error('下载文件时出错:', error);
        throw error;
    }
}


// 自动下载文件的函数
function autoDownloadFile(blob, fileName) {
    try {
        // 创建一个隐藏的链接元素
        const link = document.createElement('a');
        const downloadUrl = window.URL.createObjectURL(blob);
        link.href = downloadUrl;
        link.setAttribute('download', fileName); // 设置下载的文件名

        // 触发点击事件以下载文件
        document.body.appendChild(link);
        link.click();

        // 下载完成后移除链接元素
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('自动下载文件时出错:', error);
    }
}

// 主函数：获取文件 URL,下载文件并保存到 USB 闪存盘
async function postData(data) {
    console.log('开始编译');
//     data = `#include "bflb_core.h"
//     #include "bflb_mtimer.h"
//     #include "bflb_i2c.h"
//     #include "bflb_gpio.h"
//     #include "board.h"
    
//     #include "cdc_acm_template.h"
//     struct bflb_device_s *gpio;
//     struct bflb_device_s *i2c0;
//     extern void board_init(void);
//     //前进
// void go(void)
// {
//   pca9685_set_channel(i2c0, 14, 2000, 0);
//   pca9685_set_channel(i2c0, 15, 0, 0);
//   pca9685_set_channel(i2c0, 12, 2000, 0);
//   pca9685_set_channel(i2c0, 13, 0, 0);
//   pca9685_set_channel(i2c0, 11, 2000, 0);
//   pca9685_set_channel(i2c0, 10, 0, 0);
//   pca9685_set_channel(i2c0, 9, 2000, 0);
//   pca9685_set_channel(i2c0, 8, 0, 0);
// }
//  //后退
// void back(void)
// {
//   pca9685_set_channel(i2c0, 15, 2000, 0);
//   pca9685_set_channel(i2c0, 14, 0, 0);
//   pca9685_set_channel(i2c0, 13, 2000, 0);
//   pca9685_set_channel(i2c0, 12, 0, 0);
//   pca9685_set_channel(i2c0, 10, 2000, 0);
//   pca9685_set_channel(i2c0, 11, 0, 0);
//   pca9685_set_channel(i2c0, 8, 2000, 0);
//   pca9685_set_channel(i2c0, 9, 0, 0);

// }
// //左转灯
// void ll(void)
// {
//     // 输出高电平亮set,输出低电平灭reset
//     bflb_gpio_reset(gpio, GPIO_PIN_9);  // 设高电平,点亮led
//     bflb_mtimer_delay_ms(100);  // 延时1s
    
//     bflb_gpio_set(gpio, GPIO_PIN_9);  // 设低电平,熄灭led
//     bflb_mtimer_delay_ms(100);  // 延时1s
// }

// //蜂鸣器
// void bell(void)
// {
//     // 输出高电平亮set,输出低电平灭reset
//     bflb_gpio_set(gpio, GPIO_PIN_22); 
//     bflb_mtimer_delay_ms(100);  // 延时1s
    
//     bflb_gpio_reset(gpio, GPIO_PIN_22);
//     bflb_mtimer_delay_ms(100);  // 延时1s
// }
// //左转
// void left(void)
// {
//     pca9685_set_channel(i2c0, 15, 2000, 0);
//     pca9685_set_channel(i2c0, 14, 0, 0);
//     pca9685_set_channel(i2c0, 13, 2000, 0);
//     pca9685_set_channel(i2c0, 12, 0, 0);
//     pca9685_set_channel(i2c0, 11, 2000, 0);
//     pca9685_set_channel(i2c0, 10, 0, 0);
//     pca9685_set_channel(i2c0, 9, 2000, 0);
//     pca9685_set_channel(i2c0, 8, 0, 0);
// }

// //右转灯
// void rl(void)
// {
//     // 输出高电平亮set,输出低电平灭reset
//     bflb_gpio_reset(gpio, GPIO_PIN_25);  // 设高电平,点亮led
//     bflb_mtimer_delay_ms(100);  // 延时1s

//     bflb_gpio_set(gpio, GPIO_PIN_25);  // 设低电平,熄灭led
//     bflb_mtimer_delay_ms(100);  // 延时1s
  
// }

// //右转
// void right(void)
// {
//     pca9685_set_channel(i2c0, 14, 2000, 0);
//     pca9685_set_channel(i2c0, 15, 0, 0);
//     pca9685_set_channel(i2c0, 12, 2000, 0);
//     pca9685_set_channel(i2c0, 13, 0, 0);
//     pca9685_set_channel(i2c0, 10, 2000, 0);
//     pca9685_set_channel(i2c0, 11, 0, 0);
//     pca9685_set_channel(i2c0, 8, 2000, 0);
//     pca9685_set_channel(i2c0, 9, 0, 0);
// }
// // 初始化GPIO
// void LED_gpio_init(void)
// {
//   bflb_gpio_init(gpio, GPIO_PIN_9, GPIO_OUTPUT | GPIO_PULLDOWN | GPIO_SMT_EN | GPIO_DRV_0);  // 左灯
//   bflb_gpio_set(gpio, GPIO_PIN_9);  // 设低电平,熄灭led
//   bflb_gpio_init(gpio, GPIO_PIN_22, GPIO_OUTPUT | GPIO_PULLUP | GPIO_SMT_EN | GPIO_DRV_3);  // 蜂鸣器

//   bflb_gpio_init(gpio, GPIO_PIN_25, GPIO_OUTPUT | GPIO_PULLDOWN | GPIO_SMT_EN | GPIO_DRV_0);  //右灯
//   bflb_gpio_set(gpio, GPIO_PIN_25);  // 设低电平,熄灭led
// }

// void M0p_ota(void)
// {
//     int c;
//     int ret;
//     // 这些代码需要保持运行来处理OTA协议,可以单独放在一个timer回调函数里面,定时运行
//     // 这些函数都是非阻塞的
//     //====vvvv====

//     cdc_acm_tx_task();
//     c = cdc_acm_getc();
//     if (c >= 0) {
//     //cdc_acm_putc(c);
//     kermit_task(c); // OTA
//     }
//     //====^^^^====
// }\n`+ data;
    try {

        const response = await axios.post('https://edu.jnuiclab.com/api/admin/oss/replace', {
            code: data
        });

    console.log('c代码', data);
    //获取阿里云oss编译文件的url
    const fileUrl = response.data.msg;
    console.log('Download URL:', fileUrl);

    await downloadFile(fileUrl);

    return '二进制文件获取成功';

} catch (error) {
    console.error('Error in the main function:', error);
    return '二进制文件获取失败'
}
}



// 导出函数
export { postData };


