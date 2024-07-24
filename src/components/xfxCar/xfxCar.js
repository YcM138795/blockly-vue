import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import {dartGenerator} from 'blockly/dart';


//小飞象智能车
{

    //open_led:亮灯
    {
        Blockly.Blocks['open_led'] = {
            init: function () {
                this.jsonInit({
                    "type": "open__led",
                    "message0": "亮灯      持续时间 %1",
                    "args0": [
                        {
                            "type": "field_number",
                            "name": "digital",
                            "value": -1
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC',
                    "tooltip": "亮灯",
                    "helpUrl": ""
                })
            }
        }
        javascriptGenerator.forBlock['open_led'] = function (block) {
            var number_digital = block.getFieldValue('digital');
            var code;
            var time = number_digital * 1000;
            // TODO: Assemble javascript into code variable.
            if (number_digital >= 0) {

                code = `bflb_gpio_set(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
            } else {
                code = 'bflb_gpio_set(gpio, GPIO_PIN_32);\n';
            }
            return code;
        };
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
                    "message0": "灭灯    持续时间 %1",
                    "args0": [
                        {
                            "type": "field_number",
                            "name": "digital",
                            "value": -1
                        }
                    ],
                    "inputsInline": true,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC',
                    "tooltip": "灭灯",
                    "helpUrl": ""
                })
            }
        }
        javascriptGenerator.forBlock['close_led'] = function (block) {
            var number_digital = block.getFieldValue('digital');

            var code;
            // TODO: Assemble javascript into code variable.
            if (number_digital >= 0) {
                var time = number_digital * 1000;
                code = `bflb_gpio_reset(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
            } else {
                code = `bflb_gpio_reset(gpio, GPIO_PIN_32);\n`;
            }
            return code;
        };
        dartGenerator.forBlock['close_led'] = function (block) {
            var number_digital = block.getFieldValue('digital');
            var code = `
      this.ledArr.push('close_led')
      this.ledArr.push(${number_digital})
      console.log('灭灯');\n`
            return code;
        };
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
}








