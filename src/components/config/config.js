export const XTaskCheckTypes = [
    'XTask_light_task',
    'XTask_led_task',
    'XTask_fmq_task',
    'XTask_servo_task',
    'XTask_motors_task',
    'XTask_mpu_task',
    'XTask_ultrasonic_task',
    'XTask_ir_task',
    'logo_task',
];

export const headerFile = `#include <FreeRTOS.h>
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
#include "bl61x_Servo.h"
#include "bl61x_Ultrasonic.h"
#include "bl61x_M6050.h"
#include "ota.h"
#include "log.h"
#include "ir_task.h"
#include "bflb_ir.h"
#include "bt_connect.h"

#define DBG_TAG "MAIN"
#define VERSION __DATE__ " " __TIME__

static struct bflb_device_s *gpio;
static TaskHandle_t logo_handle;	//logo显示任务
static TaskHandle_t zforth_handle;	//
static TaskHandle_t usbdev_handle;	//
static TaskHandle_t light_handle;	//车灯任务
static TaskHandle_t fmq_handle;		//蜂鸣器任务
static TaskHandle_t motors_handle;	//电机任务
static TaskHandle_t ultrasonic_handle;	//超声波任务
static TaskHandle_t led_handle;		//板子上的灯任务
static TaskHandle_t m6050_handle;	//陀螺仪任务
static TaskHandle_t mpu_handle;		//陀螺仪功能任务（主板朝上闪灯）
static TaskHandle_t servo_handle;	//舵机任务
static TaskHandle_t ir_task_handle;	//红外遥控任务
void led_task(void *param);
void light_task(void *param);
void fmq_task(void *param);
void motors_task(void *param);
void mpu_task(void *param);
void servo_task(void *param);
void ultrasonic_task(void *param);
int ir_task(void *param);
void logo_task(void *param);
// OTA TODO:
// add sha256sum check
// add xz decompress support
// add kermit long packet support
struct bflb_device_s *uart0 = NULL;
struct bflb_device_s *i2c0;
struct bflb_device_s *irrx;

uint8_t runota=0;
int index1;
void version(void) {
	char buf[128];
	snprintf(buf, 127, "version: %s\\n\\r", VERSION);
	zf_txs(buf);
}

volatile int pitch1,roll1,yaw1;
//陀螺仪任务
//连上串口，即可读取陀螺仪的欧拉角，根据获得的欧拉角，可以控制灯闪烁或者蜂鸣器发声灯功能。

void bl61x_mpu6050_task(void *param)
{
    //Led_init();

	int i=0;
	int report=1;

	float pitch,roll,yaw; 		//欧拉角
	short aacx,aacy,aacz;		//加速度传感器原始数据
	short gyrox,gyroy,gyroz;	//陀螺仪原始数据
	short temp;					//温度
  
  	bl61x_mpu6050_init(i2c0);

	printf("-----\\r\\n");


	while(1)
	{

		if(mpu_dmp_get_data(&pitch,&roll,&yaw)==0)
		{ 
			temp=MPU6050_Get_Temperature();	//得到温度值
			MPU6050_Get_Accelerometer(&aacx,&aacy,&aacz);	//得到加速度传感器数据
			MPU6050_Get_Gyroscope(&gyrox,&gyroy,&gyroz);	//得到陀螺仪数据


			if((i%10)==0)
			{ 
			if(temp<0)
			{
				temp=-temp;		//转为正数
			}

			printf("Temperature:%d*c\\r\\n",temp);

			temp=pitch*10;
			if(temp<0)
			{
				temp=-temp;		//转为正数
			}

			printf("Pitch:%d\\r\\n",temp);
			pitch1=temp;
			temp=roll*10;
			if(temp<0)
			{
				temp=-temp;		//转为正数
			}

			printf("Roll:%d\\r\\n",temp);
			roll1=temp;
			temp=yaw*10;
			if(temp<0)
			{
				temp=-temp;		//转为正数
			}

			printf("Yaw:%d\\r\\n",temp);
			yaw1=temp;
			}
		}
        
        	
		i++;			
		vTaskDelay(30);

	}
	vTaskDelete(NULL);
}\n`