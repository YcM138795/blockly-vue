import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// import { EventBus } from '../../utils/eventBus';

//后缀
const suffix = `while(1){
  vTaskDelay(1000);
}`

//函数
{
    // int_main:开始的函数
    {
        Blockly.Blocks['int_main'] = {
            init: function () {
                this.jsonInit({
                    "type": "int_main",
                    "message0": "开始入口",
                    "args0": [],
                    "message1": "%1",
                    "args1": [
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['']
                        }
                    ],
                    "colour": '#4FD284',
                    "tooltip": "开始(唯一且不可删除)",
                    "helpUrl": "",
                    "deletable": false,
                    "style": {
                        "hat": "cap"              // 使用帽子块的外观，这样这个块看起来像程序的开始
                    }
                }
                ),
                    // 设置块不可删除
                    this.setDeletable(false);
            },
            // 设置块不可删除
        };
        javascriptGenerator.forBlock['int_main'] = function (block) {
            var statements_operate = javascriptGenerator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `int main(void){
  board_init();
  usbdev_init();
  board_sdh_gpio_init();
  fatfs_sdh_driver_register();
  ota_init();\n
  xTaskCreate(usbdev_task, (char *)"usbdev_task", 8192, NULL, configMAX_PRIORITIES - 3, &usbdev_handle);
  xTaskCreate(zforth_task, (char *)"zforth_task", 8192, NULL, configMAX_PRIORITIES - 3, &zforth_handle);
  xTaskCreate(bl61x_mpu6050_task, (char *)"m6050_task",  8192, NULL, 8, &m6050_handle);		//陀螺仪任务
${statements_operate}
  vTaskStartScheduler();
	while (1);\n}\n`;
            return code;
        };
    }


    // led_task:烧录板灯函数
    {
        Blockly.Blocks['led_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "led_task",
                    "tooltip": "烧录板灯函数(仅一个)",
                    "helpUrl": "",
                    "message0": "烧录板灯函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['led_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void led_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // light_task:灯函数
    {
        Blockly.Blocks['light_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "light_task",
                    "tooltip": "灯函数(仅一个)",
                    "helpUrl": "",
                    "message0": "灯函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['light_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void light_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // fmq_task:蜂鸣器函数
    {
        Blockly.Blocks['fmq_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "fmq_task",
                    "tooltip": "蜂鸣器函数(仅一个)",
                    "helpUrl": "",
                    "message0": "蜂鸣器函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['fmq_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void fmq_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // motors_task:电机函数
    {
        Blockly.Blocks['motors_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "motors_task",
                    "tooltip": "电机函数(仅一个)",
                    "helpUrl": "",
                    "message0": "电机函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['motors_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void motors_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // servo_task:舵机函数
    {
        Blockly.Blocks['servo_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "servo_task",
                    "tooltip": "舵机函数(仅一个)",
                    "helpUrl": "",
                    "message0": "舵机函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['servo_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void servo_task(void *param){\n${statements_operate}\n}\n`;
            return code;
        };
    }

    // mpu_task:陀螺仪函数
    {
        Blockly.Blocks['mpu_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "mpu_task",
                    "tooltip": "陀螺仪函数(仅一个)",
                    "helpUrl": "",
                    "message0": "陀螺仪函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['mpu_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void mpu_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // ultrasonic_task:超声波函数
    {
        Blockly.Blocks['ultrasonic_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "ultrasonic_task",
                    "tooltip": "超声波函数(仅一个)",
                    "helpUrl": "",
                    "message0": "超声波函数 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": ['XTask_light_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_mpu_task', 'XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['ultrasonic_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void ultrasonic_task(void *param){\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

}


