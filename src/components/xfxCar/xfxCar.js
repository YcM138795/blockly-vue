import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';


//小飞象智能车
{
    //implement:执行内部逻辑
    {
        Blockly.Blocks['implement'] = {
            init: function () {
                this.jsonInit({
                    "type": "_implement",
                    "tooltip": "执行内部逻辑",
                    "helpUrl": "",
                    "message0": "while %1 %2 执行 %3",
                    "args0": [
                      {
                        "type": "field_input",
                        "name": " condition",
                        "text": "1"
                      },
                      {
                        "type": "input_dummy",
                        "name": "NAME"
                      },
                      {
                        "type": "input_statement",
                        "name": "inner"
                      }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                  })
            }
        }
        javascriptGenerator.forBlock['implement'] = function(block,generator) {
            const text__condition = block.getFieldValue(' condition');
          
            const statement_inner = generator.statementToCode(block, 'inner');
          
            // TODO: Assemble javascript into the code variable.
            const code = `while(${text__condition}){\n${statement_inner}\n}\n`;
            return code;
          }
        dartGenerator.forBlock['implement'] = function(block) {
            const text__condition = block.getFieldValue(' condition');
          
          
            // TODO: Assemble dart into the code variable.
            const code = `console.log('while ${text__condition}执行')\n`;
            return code;
        }
    }

    //init_gpio:初始化引脚
    {
        Blockly.Blocks['init_gpio'] = {
            init: function () {
                this.jsonInit({
                    "type": "init_gpio",
                    "tooltip": "初始化GPIO",
                    "helpUrl": "",
                    "message0": "初始化GPIO %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['init_gpio'] = function () {

            // TODO: Assemble javascript into the code variable.
            const code = `LED_gpio_init();\n`;
            return code;
        }
        dartGenerator.forBlock['init_gpio'] = function () {
            // var number_digital = block.getFieldValue('digital');
            var code = `console.log('初始化GPIO')\n`
            return code;
        };
    }
    //init_board:初始化引脚
    {
        Blockly.Blocks['init_board'] = {
            init: function () {
                this.jsonInit({
                    "type": "init_board",
                    "tooltip": "初始化board",
                    "helpUrl": "",
                    "message0": "初始化board %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['init_board'] = function () {

            // TODO: Assemble javascript into the code variable.
            const code = `board_init();\n gpio = bflb_device_get_by_name("gpio");\n`;
            return code;
        }
        dartGenerator.forBlock['init_board'] = function () {
            // var number_digital = block.getFieldValue('digital');
            var code = `console.log('初始化board,获取gpio')\n`
            return code;
        };
    }

    //delay:延时
    {
        Blockly.Blocks['delay'] = {
            init: function () {
                this.jsonInit({
                    "type": "delay",
                    "tooltip": "",
                    "helpUrl": "",
                    "message0": "延时-- %1 秒 %2",
                    "args0": [
                      {
                        "type": "field_number",
                        "name": "timer",
                        "value": 0,
                        "min": 0
                      },
                      {
                        "type": "input_dummy",
                        "name": "NAME"
                      }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                  })
            }
        }
        javascriptGenerator.forBlock['delay'] = function(block) {
            const number_timer = block.getFieldValue('timer');
            let time = number_timer * 100;
          
            // TODO: Assemble javascript into the code variable.
            const code = `bflb_mtimer_delay_ms(${time});\n`;
            return code;
          }
        dartGenerator.forBlock['delay'] = function(block) {
            const number_timer = block.getFieldValue('timer');
          
            // TODO: Assemble dart into the code variable.
            const code = `console.log('延时${number_timer}秒')\n`;
            return code;
          }
    }

    //left_led:左转灯
    {
        Blockly.Blocks['left_led'] = {
            init: function () {
                this.jsonInit({
                    "type": "left_led",
                    "tooltip": "亮左转灯",
                    "helpUrl": "",
                    "message0": "左转灯 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['left_led'] = function () {
            return `ll();\n`
        },
        dartGenerator.forBlock['left_led'] = function () {
                return `console.log('左转灯')\n`
        }
    }

    //right_led:右转灯
    {
        Blockly.Blocks['right_led'] = {
            init: function () {
                this.jsonInit({
                    "type": "right_led",
                    "tooltip": "亮右转灯",
                    "helpUrl": "",
                    "message0": "右转灯 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['right_led'] = function () {
            return `rl();\n`
        },
            dartGenerator.forBlock['right_led'] = function () {
                return `console.log('右转灯')\n`
            }
    }

    //bell:蜂鸣器
    {
        Blockly.Blocks['bell'] = {
            init: function () {
                this.jsonInit({
                    "type": "bell",
                    "tooltip": "蜂鸣器",
                    "helpUrl": "",
                    "message0": "蜂鸣器 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['bell'] = function () {
            return `bell();\n`
        },
            dartGenerator.forBlock['bell'] = function () {
                return `console.log('蜂鸣器')\n`
            }
    }

    //left左转
    {
        Blockly.Blocks['left'] = {
            init: function () {
                this.jsonInit({
                    "type": "left",
                    "tooltip": "左转",
                    "helpUrl": "",
                    "message0": "左转 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['left'] = function () {
            return `left();\n`
        },
        dartGenerator.forBlock['left'] = function () {
                return `console.log('左转')\n`
        }
    }
    //right右转
    {

        Blockly.Blocks['right'] = {
            init: function () {
                this.jsonInit({
                    "type": "right",
                    "tooltip": "右转",
                    "helpUrl": "",
                    "message0": "右转 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['right'] = function () {
            return `right();\n`
        },
        dartGenerator.forBlock['right'] = function () {
                return `console.log('右转')\n`
        }
    }
    //go前进
    {
        Blockly.Blocks['go'] = {
            init: function () {
                this.jsonInit({
                    "type": "go",
                    "tooltip": "前进",
                    "helpUrl": "",
                    "message0": "前进 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['go'] = function () {
            return `go();\n`
        },
        dartGenerator.forBlock['go'] = function () {
                return `console.log('前进')\n`
        }
    }
    //back后退
    {
        Blockly.Blocks['back'] = {
            init: function () {
                this.jsonInit({
                    "type": "back",
                    "tooltip": "后退",
                    "helpUrl": "",
                    "message0": "后退 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            },
        }
        javascriptGenerator.forBlock['back'] = function () {
            return `back();\n`
        },
        dartGenerator.forBlock['back'] = function () {
                return `console.log('后退')\n`
        }
    }


    //steering_gear180：舵机180度
    {
        Blockly.Blocks['steering_gear180'] = {
            init: function () {
                this.jsonInit({
                    "type": "steering_gear180",
                    "tooltip": "舵机180度",
                    "helpUrl": "",
                    "message0": "舵机(180)  编号 %1 角度 %2 %3",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "serial_number",
                            "options": [
                                [
                                    "S1",
                                    "S1"
                                ],
                                [
                                    "S2",
                                    "S2"
                                ],
                                [
                                    "S3",
                                    "S3"
                                ],
                                [
                                    "S4",
                                    "S4"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "angle",
                            "value": 0,
                            "min": 0,
                            "max": 180
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['steering_gear180'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const number_angle = block.getFieldValue('angle');

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.Servo(SuperBit.enServo.${dropdown_serial_number}, ${number_angle});\n`;
            return code;
        }
        dartGenerator.forBlock['steering_gear180'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const number_angle = block.getFieldValue('angle');

            // TODO: Assemble dart into the code variable.
            const code = `console.log('舵机180度编号${dropdown_serial_number}转动${number_angle}')\n`;
            return code;
        }

    }

    //steering_gear270：舵机270度
    {
        Blockly.Blocks['steering_gear270'] = {
            init: function () {
                this.jsonInit({
                    "type": "steering_gear270",
                    "tooltip": "舵机270度",
                    "helpUrl": "",
                    "message0": "舵机(270)  编号 %1 角度 %2 %3",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "serial_number",
                            "options": [
                                [
                                    "S1",
                                    "S1"
                                ],
                                [
                                    "S2",
                                    "S2"
                                ],
                                [
                                    "S3",
                                    "S3"
                                ],
                                [
                                    "S4",
                                    "S4"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "angle",
                            "value": 0,
                            "min": 0,
                            "max": 270
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['steering_gear270'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const number_angle = block.getFieldValue('angle');

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.Servo2(SuperBit.enServo.${dropdown_serial_number}, ${number_angle});\n`;
            return code;
        }
        dartGenerator.forBlock['steering_gear270'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const number_angle = block.getFieldValue('angle');

            // TODO: Assemble dart into the code variable.
            const code = `console.log('舵机(270度)编号${dropdown_serial_number} 转动${number_angle}')\n`;
            return code;
        }

    }

    //steering_gear360：舵机360度
    {
        Blockly.Blocks['steering_gear360'] = {
            init: function () {
                this.jsonInit({
                    "type": "steering_gear360",
                    "tooltip": "舵机360度",
                    "helpUrl": "",
                    "message0": "舵机(360)   编号 %1    方向 %2 速度(0~90) %3 %4",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "serial_number",
                            "options": [
                                [
                                    "S1",
                                    "S1"
                                ],
                                [
                                    "S2",
                                    "S2"
                                ],
                                [
                                    "S3",
                                    "S3"
                                ],
                                [
                                    "S4",
                                    "S4"
                                ]
                            ]
                        },
                        {
                            "type": "field_dropdown",
                            "name": " turn_around",
                            "options": [
                                [
                                    "正转",
                                    "forward"
                                ],
                                [
                                    "反转",
                                    "reverse"
                                ],
                                [
                                    "停止",
                                    "stop"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "speed",
                            "value": 0,
                            "min": 0,
                            "max": 90
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['steering_gear360'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const dropdown__turn_around = block.getFieldValue(' turn_around');
            const number_speed = block.getFieldValue('speed');

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.Servo3(SuperBit.enServo.${dropdown_serial_number}, SuperBit.enPos.${dropdown__turn_around}, ${number_speed});\n`;
            return code;
        }
        dartGenerator.forBlock['steering_gear360'] = function (block) {
            const dropdown_serial_number = block.getFieldValue('serial_number');
            const dropdown__turn_around = block.getFieldValue(' turn_around');
            const number_speed = block.getFieldValue('speed');

            // TODO: Assemble dart into the code variable.
            const code = `console.log('舵机(360度)编号${dropdown_serial_number} 方向${dropdown__turn_around} 速度${number_speed}')\n`;
            return code;
        }

    }

    //motor_single:直流电机单控制
    {
        Blockly.Blocks['motor_single'] = {
            init: function () {
                this.jsonInit({
                    "type": "motor_single",
                    "tooltip": "直流电机单控制",
                    "helpUrl": "",
                    "message0": "直流电机 %1 速度(-255~255) %2 %3",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "motor_number",
                            "options": [
                                [
                                    "M1",
                                    "M1"
                                ],
                                [
                                    "M2",
                                    "M2"
                                ],
                                [
                                    "M3",
                                    "M3"
                                ],
                                [
                                    "M4",
                                    "M4"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "speed",
                            "value": 0,
                            "min": -255,
                            "max": 255
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['motor_single'] = function (block) {
            const dropdown_motor_number = block.getFieldValue('motor_number');
            const number_speed = block.getFieldValue('speed');

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.MotorRun(SuperBit.enMotors.${dropdown_motor_number}, ${number_speed});\n`;
            return code;
        }
        dartGenerator.forBlock['motor_single'] = function (block) {
            const dropdown_motor_number = block.getFieldValue('motor_number');
            const number_speed = block.getFieldValue('speed');

            // TODO: Assemble dart into the code variable.
            const code = `console.log('直流电机${dropdown_motor_number}速度${number_speed}')\n`;
            return code;
        }
    }

    //motor_double:直流电机双控制
    {
        Blockly.Blocks['motor_double'] = {
            init: function () {
                this.jsonInit({
                    "type": "motor_double",
                    "tooltip": "直流电机双控制",
                    "helpUrl": "",
                    "message0": "直流电机 %1 %2 速度(-255~255) %3 %4 直流电机 %5 %6 速度(-255~255) %7 %8",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "motor_number1",
                            "options": [
                                [
                                    "M1",
                                    "M1"
                                ],
                                [
                                    "M2",
                                    "M2"
                                ],
                                [
                                    "M3",
                                    "M3"
                                ],
                                [
                                    "M4",
                                    "M4"
                                ]
                            ]
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME1"
                        },
                        {
                            "type": "field_number",
                            "name": "speed1",
                            "value": 0,
                            "min": -255,
                            "max": 255
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME2"
                        },
                        {
                            "type": "field_dropdown",
                            "name": "motor_number2",
                            "options": [
                                [
                                    "M1",
                                    "M1"
                                ],
                                [
                                    "M2",
                                    "M2"
                                ],
                                [
                                    "M3",
                                    "M3"
                                ],
                                [
                                    "M4",
                                    "M4"
                                ]
                            ]
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME3"
                        },
                        {
                            "type": "field_number",
                            "name": "speed2",
                            "value": 0,
                            "min": -255,
                            "max": 255
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME4"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                })
            }
        }
        javascriptGenerator.forBlock['motor_double'] = function (block) {
            const dropdown_motor_number1 = block.getFieldValue('motor_number1');

            const number_speed1 = block.getFieldValue('speed1');

            const dropdown_motor_number2 = block.getFieldValue('motor_number2');

            const number_speed2 = block.getFieldValue('speed2');

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.MotorRunDual(\nSuperBit.enMotors.${dropdown_motor_number1}, ${number_speed1},\nSuperBit.enMotors.${dropdown_motor_number2}, ${number_speed2});\n`;
            return code;
        }
        dartGenerator.forBlock['motor_double'] = function (block) {
            const dropdown_motor_number1 = block.getFieldValue('motor_number1');

            const number_speed1 = block.getFieldValue('speed1');

            const dropdown_motor_number2 = block.getFieldValue('motor_number2');

            const number_speed2 = block.getFieldValue('speed2');

            // TODO: Assemble dart into the code variable.
            const code = `console.log('直流电机${dropdown_motor_number1}速度${number_speed1}  直流电机${dropdown_motor_number2}速度${number_speed2}')\n`;
            return code;
        }
    }


    //stop_all_motor:停止所有电机
    {
        Blockly.Blocks['stop_all_motor'] = {
            init: function () {
                this.jsonInit({

                    "type": "stop_all_motor",
                    "tooltip": "停止所有电机",
                    "helpUrl": "",
                    "message0": "停止所有电机 %1",
                    "args0": [
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                }
                )
            }
        }
        javascriptGenerator.forBlock['stop_all_motor'] = function () {

            // TODO: Assemble javascript into the code variable.
            const code = `SuperBit.MotorStopAll();\n`;
            return code;
        }
        dartGenerator.forBlock['stop_all_motor'] = function () {

            // TODO: Assemble dart into the code variable.
            const code = 'comsole.log("停止所有电机")\n';
            return code;
        }
    }





    //open_led:亮灯
    {
        Blockly.Blocks['open_led'] = {
            init: function () {
                this.jsonInit({
                    "type": "open_led",
                    "tooltip": "亮灯",
                    "helpUrl": "",
                    "message0": "亮灯   %1 —持续时间 %2 %3",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "direction",
                            "options": [
                                [
                                    "左转灯",
                                    "left"
                                ],
                                [
                                    "右转灯",
                                    "right"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "digit",
                            "value": -1,
                            "min": -1
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC',
                })
            }
        }
        javascriptGenerator.forBlock['open_led'] = function (block) {
            const dropdown_direction = block.getFieldValue('direction');
            const number_digit = block.getFieldValue('digit');

            // TODO: Assemble javascript into the code variable.
            let code;
            let time;
            if (dropdown_direction == 'left') {
                if (number_digit >= 0) {
                    time = number_digit * 100;
                    code = `bflb_gpio_reset(gpio, GPIO_PIN_9);\nbflb_mtimer_delay_ms(${time});\n`
                } else {
                    code = 'bflb_gpio_reset(gpio, GPIO_PIN_9);\n';
                }
            } else {

                if (number_digit >= 0) {
                    time = number_digit * 100;
                    code = `bflb_gpio_reset(gpio, GPIO_PIN_25);\nbflb_mtimer_delay_ms(${time});\n`
                } else {
                    code = 'bflb_gpio_reset(gpio, GPIO_PIN_25);\n';
                }
            }
            return code;
        }
        dartGenerator.forBlock['open_led'] = function (block) {
            var number_digital = block.getFieldValue('digital');
            var code = `
      this.ledArr.push('open_led')
      this.ledArr.push(${number_digital})
      console.log('亮灯');\n`
            return code;
        };
    }

    //close_led:灭灯
    {
        Blockly.Blocks['close_led'] = {
            init: function () {
                this.jsonInit({
                    "type": "close_led",
                    "tooltip": "灭灯",
                    "helpUrl": "",
                    "message0": "灭灯 %1 持续时间 %2 %3",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "direction",
                            "options": [
                                [
                                    "左转灯",
                                    "left"
                                ],
                                [
                                    "右转灯",
                                    "right"
                                ]
                            ]
                        },
                        {
                            "type": "field_number",
                            "name": "digit",
                            "value": -1,
                            "min": -1
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC',
                    "inputsInline": true
                })
            }
        }
        javascriptGenerator.forBlock['close_led'] = function (block) {
            const dropdown_direction = block.getFieldValue('direction');
            const number_digit = block.getFieldValue('digit');

            // TODO: Assemble javascript into the code variable.
            let code;
            let time;
            if (dropdown_direction == 'left') {
                if (number_digit >= 0) {
                    time = number_digit * 100;
                    code = `bflb_gpio_set(gpio, GPIO_PIN_9);\nbflb_mtimer_delay_ms(${time});\n`
                } else {
                    code = 'bflb_gpio_set(gpio, GPIO_PIN_9);\n';
                }
            } else {

                if (number_digit >= 0) {
                    time = number_digit * 100;
                    code = `bflb_gpio_set(gpio, GPIO_PIN_25);\nbflb_mtimer_delay_ms(${time});\n`
                } else {
                    code = 'bflb_gpio_set(gpio, GPIO_PIN_25);\n';
                }
            }
            return code;
        }
        dartGenerator.forBlock['close_led'] = function (block) {
            var number_digital = block.getFieldValue('digital');
            var code = `
      this.ledArr.push('close_led')
      this.ledArr.push(${number_digital})
      console.log('灭灯');\n`
            return code;
        };
    }



}





