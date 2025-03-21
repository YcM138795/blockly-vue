import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import {XTaskCheckTypes} from '../../components/config/config';

// import { EventBus } from '../../utils/eventBus';

//后缀
const suffix = `while(1){
  vTaskDelay(1000);
  }\n`
//前缀
const prefix = `gpio = bflb_device_get_by_name("gpio");`

//线程
{
    // int_main:开始的线程
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
            // 分开 `setup` 和 `loop` 代码
            var setup_code = "";
            var loop_code = "";
            // 处理多个代码块
            statements_operate.split("\n").forEach(statement => {
            if (statement.includes("---LOOP---")) {
                loop_code += statement.replace("---LOOP---", "") + "\n";
            } else {
                setup_code += statement + "\n";
            }
            });
            // TODO: Assemble javascript into code variable.
            var code = `int main(void){
board_init();
float pitch,roll,yaw; 	
uart0 = bflb_device_get_by_name("uart0");
board_i2c0_gpio_init(); // GPIO0 GPIO1  
usbdev_init();
board_sdh_gpio_init();
fatfs_sdh_driver_register();
ota_init();
adc_init();
btconnt_init();
runota=0;
if (adc_key_is_right(adc_key_read()))	//判断按键被按下了
{
	xTaskCreate(usbdev_task, (char *)"usbdev_task", 8192, NULL, 7, &usbdev_handle);
	xTaskCreate(zforth_task, (char *)"zforth_task", 8192, NULL, 7, &zforth_handle);
	vTaskStartScheduler();
	while (1)
	{
		if (runota >0)
		{
			vTaskPrioritySet(usbdev_handle, 15); 
			vTaskPrioritySet(zforth_handle, 15);
		}
	};
}else{
    xTaskCreate(usbdev_task, (char *)"usbdev_task", 8192, NULL, 7, &usbdev_handle);
    xTaskCreate(zforth_task, (char *)"zforth_task", 8192, NULL, 7, &zforth_handle);
    ${setup_code}
    vTaskStartScheduler();
  while (1){
    if (runota >0){
        ${loop_code}
        vTaskPrioritySet(usbdev_handle, 7);
        vTaskPrioritySet(zforth_handle, 7);
    }
  };\n}\n}\n`;
            return code;
        };
    }


    // led_task:烧录板灯线程
    {
        Blockly.Blocks['led_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "led_task",
                    "tooltip": "烧录板灯线程(仅一个)",
                    "helpUrl": "",
                    "message0": "烧录板灯线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['led_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void led_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // light_task:灯线程
    {
        Blockly.Blocks['light_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "light_task",
                    "tooltip": "灯线程(仅一个)",
                    "helpUrl": "",
                    "message0": "灯线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['light_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void light_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // fmq_task:蜂鸣器线程
    {
        Blockly.Blocks['fmq_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "fmq_task",
                    "tooltip": "蜂鸣器线程(仅一个)",
                    "helpUrl": "",
                    "message0": "蜂鸣器线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['fmq_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void fmq_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // motors_task:电机线程
    {
        Blockly.Blocks['motors_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "motors_task",
                    "tooltip": "电机线程(仅一个)",
                    "helpUrl": "",
                    "message0": "电机线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['motors_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void motors_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // servo_task:舵机线程
    {
        Blockly.Blocks['servo_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "servo_task",
                    "tooltip": "舵机线程(仅一个)",
                    "helpUrl": "",
                    "message0": "舵机线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['servo_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void servo_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // mpu_task:陀螺仪线程
    {
        Blockly.Blocks['mpu_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "mpu_task",
                    "tooltip": "陀螺仪线程(仅一个)",
                    "helpUrl": "",
                    "message0": "陀螺仪线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['mpu_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void mpu_task(void *param){\n${prefix}\nbl61x_mpu6050_init(i2c0);\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // ultrasonic_task:超声波线程
    {
        Blockly.Blocks['ultrasonic_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "ultrasonic_task",
                    "tooltip": "超声波线程(仅一个)",
                    "helpUrl": "",
                    "message0": "超声波线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['ultrasonic_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void ultrasonic_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

    // ir_task:红外遥控线程
    {
        Blockly.Blocks['ir_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "ir_task",
                    "tooltip": "红外遥控线程(仅一个)",
                    "helpUrl": "",
                    "message0": "红外遥控线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };

        javascriptGenerator.forBlock['ir_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `int ir_task(void)
{
    printf("IR NEC case:\\r\\n");
    uint64_t rx_data;
    uint8_t rx_len;
    struct bflb_ir_rx_config_s rx_cfg;

    irrx = bflb_device_get_by_name("irrx");

    /* RX init */
    rx_cfg.rx_mode = IR_RX_NEC;
    rx_cfg.input_inverse = true;
    rx_cfg.deglitch_enable = false;
    bflb_ir_rx_init(irrx, &rx_cfg);

    /* Enable rx, wait for sending */
    bflb_ir_rx_enable(irrx, true);
    
    ${prefix}
    ${statements_operate}
    ${suffix}
}\n`;

            return code;
        };
    }

    // logo_task:logo线程
    {
        Blockly.Blocks['logo_task'] = {
            init: function () {
                this.jsonInit({
                    "type": "logo_task",
                    "tooltip": "logo线程(仅一个)",
                    "helpUrl": "",
                    "message0": "logo线程 %1 %2",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                        {
                            "type": "input_statement",
                            "name": "operate",
                            "check": XTaskCheckTypes
                        }
                    ],
                    "colour": '#B463FF'
                })
            }
        };
        javascriptGenerator.forBlock['logo_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void logo_task(void *param){\n${prefix}\n${statements_operate}\n${suffix}}\n`;
            return code;
        };
    }

}


