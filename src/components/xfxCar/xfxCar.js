import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/field-dependent-dropdown'; //引入定义Motors_left_right块的插件


//小飞象智能车
{
    //基础
    {
        //Serial_Port_Burning:板子烧录的处理
        {
            Blockly.Blocks['Serial_Port_Burning'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Serial_Port_Burning",
                        "tooltip": "板子烧录的处理",
                        "helpUrl": "",
                        "message0": "板子烧录的处理 %1",
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
            javascriptGenerator.forBlock['Serial_Port_Burning'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `\n\n\nint Serial_Port_Burning;\n int Serial_Port_Burning_res;\nwhile(1){\ncdc_acm_tx_task();\n Serial_Port_Burning=cdc_acm_getc();\n if(Serial_Port_Burning >= 0){\nkermit_task(Serial_Port_Burning);\n}}\n`;
                return code;
            }
            dartGenerator.forBlock['Serial_Port_Burning'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('板子烧录的处理')\n`
                return code;
            };
        }

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
            javascriptGenerator.forBlock['implement'] = function (block, generator) {
                const text__condition = block.getFieldValue(' condition');

                const statement_inner = generator.statementToCode(block, 'inner');

                // TODO: Assemble javascript into the code variable.
                const code = `while(${text__condition}){\n${statement_inner}\n}\n`;
                return code;
            }
            dartGenerator.forBlock['implement'] = function (block) {
                const text__condition = block.getFieldValue(' condition');


                // TODO: Assemble dart into the code variable.
                const code = `console.log('while ${text__condition}执行')\n`;
                return code;
            }
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
            javascriptGenerator.forBlock['delay'] = function (block) {
                const number_timer = block.getFieldValue('timer');
                let time = number_timer * 1000;

                // TODO: Assemble javascript into the code variable.
                const code = `bflb_mtimer_delay_ms(${time});\n`;
                return code;
            }
            dartGenerator.forBlock['delay'] = function (block) {
                const number_timer = block.getFieldValue('timer');

                // TODO: Assemble dart into the code variable.
                const code = `console.log('延时${number_timer}秒')\n`;
                return code;
            }
        }

        //init_all:初始化灯,蜂鸣器,电机,舵机
        {
            Blockly.Blocks['init_all'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_all",
                        "tooltip": "初始化灯,蜂鸣器,电机,舵机",
                        "helpUrl": "",
                        "message0": "初始化灯,蜂鸣器,电机,舵机 %1",
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
            javascriptGenerator.forBlock['init_all'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Light_init();\nFmq_init();\nMotors_init();\nServo_init();\n`;
                return code;
            }
            dartGenerator.forBlock['init_all'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('初始化全部')\n`
                return code;
            };
        }

    }



    //灯
    {
        //init_Light:初始化灯
        {
            Blockly.Blocks['init_Light'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Light",
                        "tooltip": "初始化灯",
                        "helpUrl": "",
                        "message0": "初始化灯 %1",
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
            javascriptGenerator.forBlock['init_Light'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Light_init();\n`;
                return code;
            }
            dartGenerator.forBlock['init_Light'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('初始化灯')\n`
                return code;
            };
        }

        //Light_on:亮灯
        {
            Blockly.Blocks['Light_on'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Light_on",
                        "tooltip": "亮灯",
                        "helpUrl": "",
                        "message0": "亮灯 %1 %2",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "options",
                                "options": [
                                    [
                                        "左灯",
                                        "LEFT"
                                    ],
                                    [
                                        "右灯",
                                        "RIGHT"
                                    ]
                                ]
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
            javascriptGenerator.forBlock['Light_on'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                // TODO: Assemble javascript into the code variable.
                const code = `Light_on(${dropdown_options});\n`;
                return code;
            }

            dartGenerator.forBlock['Light_on'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                // TODO: Assemble dart into the code variable.
                const code = `console.log('亮灯${dropdown_options}')\n`;
                return code;
            }
        }

        //Light_off:灭灯
        {
            Blockly.Blocks['Light_off'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Light_off",
                        "tooltip": "灭灯",
                        "helpUrl": "",
                        "message0": "灭灯 %1 %2",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "options",
                                "options": [
                                    [
                                        "左灯",
                                        "LEFT"
                                    ],
                                    [
                                        "右灯",
                                        "RIGHT"
                                    ]
                                ]
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
            javascriptGenerator.forBlock['Light_off'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                // TODO: Assemble javascript into the code variable.
                const code = `Light_off(${dropdown_options});\n`;
                return code;
            }

            dartGenerator.forBlock['Light_off'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                // TODO: Assemble dart into the code variable.
                const code = `console.log('灭灯${dropdown_options}')\n`;
                return code;
            }
        }

    }


    //蜂鸣器
    {
        //init_Fmq:初始化蜂鸣器
        {
            Blockly.Blocks['init_Fmq'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Fmq",
                        "tooltip": "初始化蜂鸣器",
                        "helpUrl": "",
                        "message0": "初始化蜂鸣器 %1",
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
            javascriptGenerator.forBlock['init_Fmq'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Fmq_init();\n`;
                return code;
            }
            dartGenerator.forBlock['init_Fmq'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('初始化蜂鸣器')\n`
                return code;
            };
        }

        //Fmq_control:控制蜂鸣器
        {
            Blockly.Blocks['Fmq_control'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Fmq_control",
                        "tooltip": "控制蜂鸣器",
                        "helpUrl": "",
                        "message0": "蜂鸣器 %1 %2",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "options",
                                "options": [
                                    [
                                        "开启",
                                        "on"
                                    ],
                                    [
                                        "关闭",
                                        "off"
                                    ]
                                ]
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
                },
            }
            javascriptGenerator.forBlock['Fmq_control'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                // TODO: Assemble javascript into the code variable.
                const code = `Fmq_${dropdown_options}(fengmingqi);\n`;
                return code;
            }
            dartGenerator.forBlock['Fmq_control'] = function (block) {
                const dropdown_options = block.getFieldValue('options');

                return `console.log('${dropdown_options}蜂鸣器')\n`

            }
        }

    }

    //舵机
    {
        //init_Servo:初始化舵机
        {
            Blockly.Blocks['init_Servo'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Servo",
                        "tooltip": "初始化舵机",
                        "helpUrl": "",
                        "message0": "初始化舵机 %1",
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
            javascriptGenerator.forBlock['init_Servo'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Servo_init();\n`;
                return code;
            }
            dartGenerator.forBlock['init_Servo'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('初始化舵机')\n`
                return code;
            };
        }

        //init_Servo_state:舵机初始化状态
        {
            Blockly.Blocks['init_Servo_state'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_state",
                        "tooltip": "舵机初始化状态",
                        "helpUrl": "",
                        "message0": "舵机初始化状态 %1 %2",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "servo",
                                "options": [
                                    [
                                        "舵机1",
                                        "1"
                                    ],
                                    [
                                        "舵机2",
                                        "2"
                                    ],
                                    [
                                        "舵机3",
                                        "3"
                                    ],
                                    [
                                        "舵机4",
                                        "4"
                                    ],
                                    [
                                        "舵机5",
                                        "5"
                                    ],
                                    [
                                        "舵机6",
                                        "6"
                                    ],
                                    [
                                        "舵机7",
                                        "7"
                                    ],
                                    [
                                        "舵机8",
                                        "8"
                                    ],
                                    [
                                        "舵机9",
                                        "9"
                                    ]
                                ]
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
            javascriptGenerator.forBlock['init_Servo_state'] = function (block) {
                const dropdown_servo = block.getFieldValue('servo');

                // TODO: Assemble javascript into the code variable.
                const code = `Servo_stop(${dropdown_servo});\n`;
                return code;
            }
            dartGenerator.forBlock['init_Servo_state'] = function (block) {
                const dropdown_servo = block.getFieldValue('servo');

                // TODO: Assemble dart into the code variable.
                const code = `console.log('舵机${dropdown_servo}初始化状态')\n`;
                return code;
            }

        }

        //Servo_operation:舵机操作
        {
            Blockly.Blocks['Servo_operation'] = {
                init: function () {
                    this.jsonInit({
                        "type": "steering_gear360",
                        "tooltip": "舵机360度",
                        "helpUrl": "",
                        "message0": "舵机   编号 %1    方向 %2 度数(0~90) %3 %4",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "serial_number",
                                "options": [
                                    [
                                        "S1",
                                        "1"
                                    ],
                                    [
                                        "S2",
                                        "2"
                                    ],
                                    [
                                        "S3",
                                        "3"
                                    ],
                                    [
                                        "S4",
                                        "4"
                                    ],
                                    [
                                        "S5",
                                        "5"
                                    ],
                                    [
                                        "S6",
                                        "6"
                                    ],
                                    [
                                        "S7",
                                        "7"
                                    ],
                                    [
                                        "S8",
                                        "8"
                                    ],
                                    [
                                        "S9",
                                        "9"
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
            javascriptGenerator.forBlock['Servo_operation'] = function (block) {
                const dropdown_serial_number = block.getFieldValue('serial_number');
                const dropdown__turn_around = block.getFieldValue(' turn_around');
                const number_speed = block.getFieldValue('speed');

                let code;
                if (dropdown__turn_around == 'forward') {
                    code = `Servo_forward(${dropdown_serial_number}, ${number_speed});\n`;
                } else {
                    code = `Servo_reverse(${dropdown_serial_number}, ${number_speed});\n`;
                }

                // TODO: Assemble javascript into the code variable.
                return code;
            }
            // dartGenerator.forBlock['Servo_operation'] = function (block) {
            //     const dropdown_serial_number = block.getFieldValue('serial_number');
            //     const dropdown__turn_around = block.getFieldValue(' turn_around');
            //     const number_speed = block.getFieldValue('speed');

            //     // TODO: Assemble dart into the code variable.
            //     const code = `console.log('舵机(360度)编号${dropdown_serial_number} 方向${dropdown__turn_around} 速度${number_speed}')\n`;
            //     return code;
            // }

        }
    }

    //电机
    {
        //init_Motors:初始化电机
        {
            Blockly.Blocks['init_Motors'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Motors",
                        "tooltip": "初始化电机",
                        "helpUrl": "",
                        "message0": "初始化电机 %1",
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
            javascriptGenerator.forBlock['init_Motors'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_init();\n`;
                return code;
            }
            dartGenerator.forBlock['init_Motors'] = function () {
                // var number_digital = block.getFieldValue('digital');
                var code = `console.log('初始化电机')\n`
                return code;
            };
        }

        //Motors_move:电机控制移动
        {
            Blockly.Blocks['Motors_move'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Motors_move",
                        "tooltip": "前进和后退的移动",
                        "helpUrl": "",
                        "message0": "移动 %1 速度 %2 %3",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "options",
                                "options": [
                                    [
                                        "前进",
                                        "forward"
                                    ],
                                    [
                                        "后退",
                                        "backward"
                                    ]
                                ]
                            },
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 100
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
            javascriptGenerator.forBlock['Motors_move'] = function (block) {
                const dropdown_options = block.getFieldValue('options');
                const number_speed = block.getFieldValue('speed');

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_${dropdown_options}(${number_speed});\n`;
                return code;
            }
            // dartGenerator.forBlock['Motors_move'] = function (block) {
            //     const dropdown_motor_number = block.getFieldValue('motor_number');
            //     const number_speed = block.getFieldValue('speed');

            //     // TODO: Assemble dart into the code variable.
            //     const code = `console.log('直流电机${dropdown_motor_number}速度${number_speed}')\n`;
            //     return code;
            // }
        }

        // //Motors_left:电机控制左平移
        // {
        //     Blockly.Blocks['Motors_left'] = {
        //         init: function () {
        //             this.jsonInit({
        //                 "type": "Motors_left",
        //                 "tooltip": "",
        //                 "helpUrl": "",
        //                 "message0": "左平移    速度 %1 角度 %2 %3",
        //                 "args0": [
        //                     {
        //                         "type": "field_number",
        //                         "name": "speed",
        //                         "value": 0,
        //                         "min": 0,
        //                         "max": 100
        //                     },
        //                     {
        //                         "type": "field_dropdown",
        //                         "name": "direction",
        //                         "options": [
        //                             [
        //                                 "左",
        //                                 "0"
        //                             ],
        //                             [
        //                                 "左前",
        //                                 "1"
        //                             ],
        //                             [
        //                                 "左后",
        //                                 "-1"
        //                             ]
        //                         ]
        //                     },
        //                     {
        //                         "type": "input_dummy",
        //                         "name": "NAME"
        //                     }
        //                 ],
        //                 "previousStatement": null,
        //                 "nextStatement": null,
        //                 "colour": '#E6CEAC'
        //             })
        //         }
        //     }
        //     javascriptGenerator.forBlock['Motors_left'] = function (block) {
        //         const number_speed = block.getFieldValue('speed');
        //         const dropdown_direction = block.getFieldValue('direction');

        //         // TODO: Assemble javascript into the code variable.
        //         const code = `Motors_left(${number_speed},${dropdown_direction});\n`;
        //         return code;
        //     }

        // }

        // //Motors_right:电机控制右平移
        // {
        //     Blockly.Blocks['Motors_right'] = {
        //         init: function () {
        //             this.jsonInit({
        //                 "type": "Motors_right",
        //                 "tooltip": "",
        //                 "helpUrl": "",
        //                 "message0": "右平移    速度 %1 角度 %2 %3",
        //                 "args0": [
        //                     {
        //                         "type": "field_number",
        //                         "name": "speed",
        //                         "value": 0,
        //                         "min": 0,
        //                         "max": 100
        //                     },
        //                     {
        //                         "type": "field_dropdown",
        //                         "name": "direction",
        //                         "options": [
        //                             [
        //                                 "右",
        //                                 "0"
        //                             ],
        //                             [
        //                                 "右前",
        //                                 "1"
        //                             ],
        //                             [
        //                                 "右后",
        //                                 "-1"
        //                             ]
        //                         ]
        //                     },
        //                     {
        //                         "type": "input_dummy",
        //                         "name": "NAME"
        //                     }
        //                 ],
        //                 "previousStatement": null,
        //                 "nextStatement": null,
        //                 "colour": '#E6CEAC'
        //             })
        //         }
        //     }
        //     javascriptGenerator.forBlock['Motors_right'] = function (block) {
        //         const number_speed = block.getFieldValue('speed');
        //         const dropdown_direction = block.getFieldValue('direction');

        //         // TODO: Assemble javascript into the code variable.
        //         const code = `Motors_right(${number_speed},${dropdown_direction});\n`;
        //         return code;
        //     }

        // }

        //Motors_around:电机控制右平移
        {
            Blockly.Blocks['Motors_around'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Motors_around",
                        "tooltip": "",
                        "helpUrl": "",
                        "message0": "原地打转    速度 %1 角度 %2 %3",
                        "args0": [
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 100
                            },
                            {
                                "type": "field_dropdown",
                                "name": "direction",
                                "options": [
                                    [
                                        "顺时针",
                                        "1"
                                    ],
                                    [
                                        "逆时针",
                                        "0"
                                    ]
                                ]
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
            javascriptGenerator.forBlock['Motors_around'] = function (block) {
                const number_speed = block.getFieldValue('speed');
                const dropdown_direction = block.getFieldValue('direction');

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_around(${number_speed},${dropdown_direction});\n`;
                return code;
            }

        }

        //Motors_left_right:电机控制右平移和右平移
        {
            Blockly.defineBlocksWithJsonArray([
                {
                    'type': 'Motors_left_right',
                    'message0': '方向 %1 速度 %2 角度 %3 %4 ',
                    'args0': [
                        {
                            'type': 'field_dropdown',
                            'name': 'direction',
                            'options': [['左平移', 'left'], ['右平移', 'right']]
                        },
                        {
                            "type": "field_number",
                            "name": "speed",
                            "value": 0,
                            "min": 0,
                            "max": 100
                        },
                        {
                            'type': 'field_dependent_dropdown',
                            'name': 'angle',
                            'parentName': 'direction',
                            'optionMapping': {
                                'left': [['左', '0'], ['左前', '1'], ['左后', '-1']],
                                'right': [['右', '0'], ['右前', '1'], ['右后', '-1']]
                            },
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": '#E6CEAC'
                }
            ]);
            javascriptGenerator.forBlock['Motors_left_right'] = function (block) {
                const dropdown_options1 = block.getFieldValue('direction');
                const dropdown_options2 = block.getFieldValue('speed');
                const dropdown_options3 = block.getFieldValue('angle');

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_${dropdown_options1}(${dropdown_options2},${dropdown_options3});\n`;
                return code;
            }
        }


        //motor_control_single:电机单控制轮胎运动
        {
            Blockly.Blocks['motor_control_single'] = {
                init: function () {
                    this.jsonInit({
                        "type": "motor_control_single",
                        "tooltip": "电机单控制轮胎运动",
                        "helpUrl": "",
                        "message0": "电机轮胎  %1 速度 %2 运动控制 %3 %4",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "options1",
                                "options": [
                                    [
                                        "左前轮",
                                        "1"
                                    ],
                                    [
                                        "左后轮",
                                        "2"
                                    ],
                                    [
                                        "右前轮",
                                        "3"
                                    ],
                                    [
                                        "右后轮",
                                        "4"
                                    ]
                                ]
                            },
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 100
                            },
                            {
                                "type": "field_dropdown",
                                "name": "options2",
                                "options": [
                                    [
                                        "前进",
                                        "1"
                                    ],
                                    [
                                        "后退",
                                        "2"
                                    ],
                                    [
                                        "停止",
                                        "3"
                                    ]
                                ]
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
            javascriptGenerator.forBlock['motor_control_single'] = function (block) {
                const dropdown_options1 = block.getFieldValue('options1');
                const number_speed = block.getFieldValue('speed');
                const dropdown_options2 = block.getFieldValue('options2');

                // TODO: Assemble javascript into the code variable.
                const code = `motor_control_single(${dropdown_options1},${number_speed},${dropdown_options2});\n`;
                return code;
            }

        }

        //stop_motor:停止电机
        {
            Blockly.Blocks['stop_motor'] = {
                init: function () {
                    this.jsonInit({

                        "type": "stop_motor",
                        "tooltip": "停止电机",
                        "helpUrl": "",
                        "message0": "停止电机 %1",
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
            javascriptGenerator.forBlock['stop_motor'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_stop();\n`;
                return code;
            }
            // dartGenerator.forBlock['stop_all_motor'] = function () {

            //     // TODO: Assemble dart into the code variable.
            //     const code = 'comsole.log("停止所有电机")\n';
            //     return code;
            // }
        }

    }

}





