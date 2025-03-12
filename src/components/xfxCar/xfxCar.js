import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/field-dependent-dropdown'; //引入定义Motors_left_right块的插件
import { FieldGridDropdown } from '@blockly/field-grid-dropdown';
import { XTaskCheckTypes } from '../config/config';

class ImageTextGridDropdown extends FieldGridDropdown {
    constructor(options, config) {
        super(options, config);
    }

    showEditor_() {
        super.showEditor_();
        const dropdownDiv = Blockly.DropDownDiv.getContentDiv();

        // 遍历所有选项并修改它们
        this.getOptions().forEach(([option], index) => {
            const imgElement = dropdownDiv.querySelectorAll('img')[index];

            // 如果选项是一个对象并且包含图片信息
            if (imgElement && typeof option === 'object' && option.alt) {
                // 确保已有的图片标签存在
                const textSpan = imgElement.parentNode.querySelector('span.blocklyDropdownTextLabel');

                // 如果没有找到文本标签，则创建新的文本标签
                if (!textSpan) {
                    const spanElement = document.createElement('span');
                    spanElement.innerText = option.alt;  // 使用图片下方的文本
                    spanElement.style.color = 'white';
                    spanElement.style.display = 'block';  // 确保文本显示在图片下方
                    spanElement.style.marginTop = '5px';  // 为文本添加一些间距

                    // 添加居中样式
                    spanElement.style.textAlign = 'center';  // 居中文本
                    spanElement.style.width = '100%';  // 确保span占满父元素的宽度

                    // 设置图片的居中样式
                    imgElement.style.display = 'block';  // 使图片成为块级元素
                    imgElement.style.margin = '0 auto';  // 居中图片

                    imgElement.parentNode.appendChild(spanElement);  // 将文本添加到图片下面
                }
            }
        });

    }
}
Blockly.fieldRegistry.register('ImageTextGridDropdown', ImageTextGridDropdown);


//小飞象智能车
{

    //烧录板灯
    {
        //XTask_led_task:烧录板灯操作任务执行线程
        {
            Blockly.Blocks['XTask_led_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_led_task",
                        "tooltip": "烧录板灯操作任务执行",
                        "helpUrl": "",
                        "message0": "烧录板灯操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_led_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(led_task, (char *)"led_task",  512, NULL, ${configMAX_PRIORITIES}, &led_handle);\n---LOOP---vTaskSuspend(led_handle);\n`;
                return code;
            }
        }

        //init_Led:初始化烧录板灯
        {
            Blockly.Blocks['init_Led'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Led",
                        "tooltip": "初始化烧录板灯",
                        "helpUrl": "",
                        "message0": "初始化烧录板灯 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_Led'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Led_init();\n`;
                return code;
            }
        }

        //Led_on:烧录板灯亮
        {
            Blockly.Blocks['Led_on'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Led_on",
                        "tooltip": "烧录板灯亮",
                        "helpUrl": "",
                        "message0": "烧录板灯亮 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Led_on'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Led_on();\n`;
                return code;
            }
        }

        //Led_off:烧录板灯灭
        {
            Blockly.Blocks['Led_off'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Led_off",
                        "tooltip": "烧录板灯灭",
                        "helpUrl": "",
                        "message0": "烧录板灯灭 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Led_off'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Led_off();\n`;
                return code;
            }
        }


    }

    //陀螺仪
    {
        //XTask_mpu_task:陀螺仪操作任务执行线程
        {
            Blockly.Blocks['XTask_mpu_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_led_task",
                        "tooltip": "陀螺仪操作任务执行",
                        "helpUrl": "",
                        "message0": "陀螺仪操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_mpu_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(mpu_task, (char *)"mpu_task",  512, NULL, ${configMAX_PRIORITIES}, &mpu_handle);\n---LOOP---vTaskSuspend(mpu_handle);\nxTaskCreate(bl61x_mpu6050_task, (char *)"m6050_task",  8192, NULL, ${configMAX_PRIORITIES}, &m6050_handle);\n---LOOP---vTaskSuspend(m6050_handle);\n`;
                return code;
            }
        }

        //judgment_board:方向判断
        {
            Blockly.defineBlocksWithJsonArray([
                {
                    type: 'judgment_board',
                    "message0": "方向判断:当 %1 %2 执行 %3",
                    args0: [
                        {
                            type: 'ImageTextGridDropdown',
                            name: 'options',
                            options: [
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%9B%BE%E6%A0%87%E5%90%91%E4%B8%8A.png',
                                    width: 25,
                                    height: 25,
                                    alt: '图标向上',
                                }, '图标向上'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%9B%BE%E6%A0%87%E5%90%91%E4%B8%8B.png',
                                    width: 25,
                                    height: 25,
                                    alt: '图标向下',
                                }, '图标向下'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%9B%BE%E6%A0%87%E5%B7%A6%E5%80%BE.png',
                                    width: 25,
                                    height: 25,
                                    alt: '图标左倾',
                                }, '图标左倾'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%9B%BE%E6%A0%87%E5%8F%B3%E5%80%BE.png',
                                    width: 25,
                                    height: 25,
                                    alt: '图标右倾',
                                }, '图标右倾'],
                            ],
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
                    "previousStatement": XTaskCheckTypes,
                    "nextStatement": XTaskCheckTypes,
                    "colour": '#ff7272'
                },
            ]);

            javascriptGenerator.forBlock['judgment_board'] = function (block, generator) {
                let judge;
                const dropdown_name = block.getFieldValue('options');
                const statement_inner = generator.statementToCode(block, 'inner');

                if (dropdown_name == '图标向上') {
                    judge = 'if((pitch1<200) && (pitch1>0) && (roll1>1600) && (roll1<1800))'
                } else if (dropdown_name == '图标向下') {
                    judge = 'if((pitch1<200) && (pitch1>0) && (roll1>0) && (roll1<200))';
                } else if (dropdown_name == '图标左倾') {
                    judge = 'if((pitch1<800) && (pitch1>0) && (roll1>0) && (roll1<900))';
                } else {
                    judge = 'if((pitch1<800) && (pitch1>0) && (roll1>900) && (roll1<1100))'
                }

                const code = `${judge}{\n${statement_inner}\n}\nvTaskDelay(500);\n`;
                return code;
            }
        }

    }

    //小车灯
    {
        //XTask_light_task:灯操作任务执行线程
        {
            Blockly.Blocks['XTask_light_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_light_task",
                        "tooltip": "灯操作任务执行",
                        "helpUrl": "",
                        "message0": "灯操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_light_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(light_task, (char *)"light_task",  512, NULL,   ${configMAX_PRIORITIES}, &light_handle);\n---LOOP---vTaskSuspend(light_handle);\n`;
                return code;
            }
        }

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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_Light'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Light_init();\n`;
                return code;
            }
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
                        "previousStatement": ['XTask_light_task', 'XTask_led_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
                        "nextStatement": ['XTask_light_task', 'XTask_led_task', 'XTask_led_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
                        "colour": '#ff7272'
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
        //XTask_fmq_task:蜂鸣器操作任务执行线程
        {
            Blockly.Blocks['XTask_fmq_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_fmq_task",
                        "tooltip": "蜂鸣器操作任务执行",
                        "helpUrl": "",
                        "message0": "蜂鸣器操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_fmq_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(fmq_task, (char *)"fmq_task",  512, NULL, ${configMAX_PRIORITIES}, &fmq_handle);\n---LOOP---vTaskSuspend(fmq_handle);\n`;
                return code;
            }
        }

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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
        //XTask_servo_task:电机操作任务执行线程
        {
            Blockly.Blocks['XTask_servo_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_servo_task",
                        "tooltip": "舵机操作任务执行",
                        "helpUrl": "",
                        "message0": "舵机操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],                 
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_servo_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(servo_task, (char *)"servo_task",  512, NULL, ${configMAX_PRIORITIES}, &servo_handle);\n---LOOP---vTaskSuspend(servo_handle);\n`;
                return code;
            }
        }
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
                                    ],
                                    [
                                        "舵机10",
                                        "10"
                                    ],
                                    [
                                        "舵机11",
                                        "11"
                                    ],
                                    [
                                        "舵机12",
                                        "12"
                                    ],
                                    [
                                        "舵机13",
                                        "13"
                                    ],
                                    [
                                        "舵机14",
                                        "14"
                                    ],
                                    [
                                        "舵机15",
                                        "15"
                                    ],
                                    [
                                        "舵机16",
                                        "16"
                                    ],
                                ]
                            },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_Servo_state'] = function (block) {
                const dropdown_servo = block.getFieldValue('servo');

                // TODO: Assemble javascript into the code variable.
                const code = `Servo_stop(${dropdown_servo});\n`;
                return code;
            }
        }

        //Servo_operation:舵机操作
        {
            Blockly.Blocks['Servo_operation'] = {
                init: function () {
                    this.jsonInit({
                        "type": "steering_gear360",
                        "tooltip": "舵机180度",
                        "helpUrl": "",
                        "message0": "舵机   编号 %1    方向 %2 度数(0~180) %3 %4",
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
                                    ],
                                    [
                                        "S10",
                                        "10"
                                    ],
                                    [
                                        "S11",
                                        "11"
                                    ],
                                    [
                                        "S12",
                                        "12"
                                    ],
                                    [
                                        "S13",
                                        "13"
                                    ],
                                    [
                                        "S14",
                                        "14"
                                    ],
                                    [
                                        "S15",
                                        "15"
                                    ],
                                    [
                                        "S16",
                                        "16"
                                    ],
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
                                "type": "input_dummy"
                            },
                            {
                                "type": "input_value",
                                "name": "speed"
                            }
                        ],
                        "inputsInline": true,
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Servo_operation'] = function (block,generator) {
                const dropdown_serial_number = block.getFieldValue('serial_number');
                const dropdown__turn_around = block.getFieldValue(' turn_around');
                const number_speed = generator.valueToCode(block, 'speed', Order.ATOMIC);

                let code;
                if (dropdown__turn_around == 'forward') {
                    code = `Servo_forward(${dropdown_serial_number}, ${number_speed});\n`;
                } else {
                    code = `Servo_reverse(${dropdown_serial_number}, ${number_speed});\n`;
                }

                // TODO: Assemble javascript into the code variable.
                return code;
            }

        }

        //Servo_set:舵机设置角度
        {
            Blockly.Blocks['Servo_set'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Servo_set",
                        "tooltip": "舵机设置度",
                        "helpUrl": "",
                        "message0": "舵机   编号 %1  度数(0~180) %2 %3",
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
                                    ],
                                    [
                                        "S10",
                                        "10"
                                    ],
                                    [
                                        "S11",
                                        "11"
                                    ],
                                    [
                                        "S12",
                                        "12"
                                    ],
                                    [
                                        "S13",
                                        "13"
                                    ],
                                    [
                                        "S14",
                                        "14"
                                    ],
                                    [
                                        "S15",
                                        "15"
                                    ],
                                    [
                                        "S16",
                                        "16"
                                    ],
                                ]
                            },
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 180
                            },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Servo_set'] = function (block) {
                const dropdown_serial_number = block.getFieldValue('serial_number');
                const number_speed = block.getFieldValue('speed');
                const code = `Servo_jiaodu(${dropdown_serial_number}, ${number_speed});\n`; 

                // TODO: Assemble javascript into the code variable.
                return code;
            }

        }

    }

    //电机
    {
        //XTask_motors_task:电机操作任务执行线程
        {
            Blockly.Blocks['XTask_motors_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_motors_task",
                        "tooltip": "电机操作任务执行",
                        "helpUrl": "",
                        "message0": "电机操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_motors_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(motors_task, (char *)"motors_task",  512, NULL, ${configMAX_PRIORITIES}, &motors_handle);\n---LOOP---vTaskSuspend(motors_handle);\n`;
                return code;
            }
        }

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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
                        "message0": "移动 %1 速度百分比 %2 % %3",
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
                                "max": 100,
                                "precision": 0.1
                            },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Motors_move'] = function (block) {
                const dropdown_options = block.getFieldValue('options');
                const number_speed = block.getFieldValue('speed');
                const speed = 4095 * number_speed / 100;

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_${dropdown_options}(${speed});\n`;
                return code;
            }
        }


        //Motors_around:电机控制右平移
        {
            Blockly.Blocks['Motors_around'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Motors_around",
                        "tooltip": "",
                        "helpUrl": "",
                        "message0": "原地打转    速度百分比 %1 % 角度 %2 %3",
                        "args0": [
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 100,
                                "precision": 0.1
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Motors_around'] = function (block) {
                const number_speed = block.getFieldValue('speed');
                const dropdown_direction = block.getFieldValue('direction');
                const speed = 4095 * number_speed / 100;

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_around(${speed},${dropdown_direction});\n`;
                return code;
            }

        }

        //Motors_left_right:电机控制右平移和右平移
        {
            Blockly.defineBlocksWithJsonArray([
                {
                    'type': 'Motors_left_right',
                    'message0': '方向 %1 速度百分比 %2 % 角度 %3 %4 ',
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
                            "max": 100,
                            "precision": 0.1
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
                    "previousStatement": XTaskCheckTypes,
                    "nextStatement": XTaskCheckTypes,
                    "colour": '#ff7272'
                }
            ]);
            javascriptGenerator.forBlock['Motors_left_right'] = function (block) {
                const dropdown_options1 = block.getFieldValue('direction');
                const dropdown_options2 = block.getFieldValue('speed');
                const dropdown_options3 = block.getFieldValue('angle');
                const speed = 4095 * dropdown_options2 / 100;


                // TODO: Assemble javascript into the code variable.
                const code = `Motors_${dropdown_options1}(${speed},${dropdown_options3});\n`;
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
                        "message0": "电机轮胎  %1 速度百分比 %2 % 运动控制 %3 %4",
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
                                "max": 100,
                                "precision": 0.1
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['motor_control_single'] = function (block) {
                const dropdown_options1 = block.getFieldValue('options1');
                const number_speed = block.getFieldValue('speed');
                const dropdown_options2 = block.getFieldValue('options2');
                const speed = 4095 * number_speed / 100;

                // TODO: Assemble javascript into the code variable.
                const code = `motor_control(${dropdown_options1},${speed},${dropdown_options2});\n`;
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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

    //超声波
    {
        //XTask_ultrasonic_task:超声波操作任务执行线程
        {
            Blockly.Blocks['XTask_ultrasonic_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_ultrasonic_task",
                        "tooltip": "超声波操作任务执行",
                        "helpUrl": "",
                        "message0": "超声波操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_ultrasonic_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(ultrasonic_task, (char *)"ultrasonic_task",  1024, NULL, ${configMAX_PRIORITIES}, &ultrasonic_handle);\n---LOOP---vTaskSuspend(ultrasonic_handle);\n`;
                return code;
            }
        }

        //init_Ultrasonic:初始化超声波
        {
            Blockly.Blocks['init_Ultrasonic'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Ultrasonic",
                        "tooltip": "初始化超声波",
                        "helpUrl": "",
                        "message0": "初始化超声波 \n ping trig: %1 \n echo: %2 %3",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "gpio1",
                                options: [
                                  ["P0", "GPIO_PIN_22"],
                                  ["P1", "GPIO_PIN_25"],
                                  ["P2", "GPIO_PIN_21"],
                                  ["P3", "GPIO_PIN_27"],
                                  ["P4", "GPIO_PIN_31"],
                                  ["P5", "GPIO_PIN_32"],
                                  ["P6", "GPIO_PIN_33"],
                                  ["P7", "GPIO_PIN_34"],
                                  ["P8", "GPIO_PIN_24"],
                                  ["P9", "GPIO_PIN_6"],
                                  ["P10", "GPIO_PIN_29"],
                                  ["P11", "GPIO_PIN_30"],
                                  ["P12", "GPIO_PIN_16"],
                                  ["P13", "GPIO_PIN_17"],
                                  ["P14", "GPIO_PIN_18"],
                                  ["P15", "GPIO_PIN_28"],
                                  ["P16", "GPIO_PIN_9"],
                                ],
                              },
                              {
                                type: "field_dropdown",
                                name: "gpio2",
                                options: [
                                  ["P0", "GPIO_PIN_22"],
                                  ["P1", "GPIO_PIN_25"],
                                  ["P2", "GPIO_PIN_21"],
                                  ["P3", "GPIO_PIN_27"],
                                  ["P4", "GPIO_PIN_31"],
                                  ["P5", "GPIO_PIN_32"],
                                  ["P6", "GPIO_PIN_33"],
                                  ["P7", "GPIO_PIN_34"],
                                  ["P8", "GPIO_PIN_24"],
                                  ["P9", "GPIO_PIN_6"],
                                  ["P10", "GPIO_PIN_29"],
                                  ["P11", "GPIO_PIN_30"],
                                  ["P12", "GPIO_PIN_16"],
                                  ["P13", "GPIO_PIN_17"],
                                  ["P14", "GPIO_PIN_18"],
                                  ["P15", "GPIO_PIN_28"],
                                  ["P16", "GPIO_PIN_9"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_Ultrasonic'] = function (block) {
                const gpio1 = block.getFieldValue("gpio1");
                const gpio2 = block.getFieldValue("gpio2");
                // TODO: Assemble javascript into the code variable.
                const code = `Ultrasonic_Init(${gpio1},${gpio2});\nfloat distance;\n`;
                return code;
            }
        }


        //distance:超声波测出的距离
        {
            Blockly.Blocks['distance'] = {
                init: function () {
                    this.jsonInit({
                        "type": "distance",
                        "tooltip": "超声波测出的距离",
                        "helpUrl": "",
                        "message0": "距离:distance %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "output": "Number",
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['distance'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `distance`;
                return [code, Order.NONE];
            }
        }
        //Ultrasonic_ranging:超声波测距
        {
            Blockly.Blocks['Ultrasonic_ranging'] = {
                init: function () {
                    this.jsonInit({
                        "type": "Ultrasonic_ranging",
                        "tooltip": "超声波触发测距，并计算距离",
                        "helpUrl": "",
                        "message0": "超声波测距\n ping trig: %1 \n echo: %2 \n unit: cm %3",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "gpio1",
                                options: [
                                  ["P0", "GPIO_PIN_22"],
                                  ["P1", "GPIO_PIN_25"],
                                  ["P2", "GPIO_PIN_21"],
                                  ["P3", "GPIO_PIN_27"],
                                  ["P4", "GPIO_PIN_31"],
                                  ["P5", "GPIO_PIN_32"],
                                  ["P6", "GPIO_PIN_33"],
                                  ["P7", "GPIO_PIN_34"],
                                  ["P8", "GPIO_PIN_24"],
                                  ["P9", "GPIO_PIN_6"],
                                  ["P10", "GPIO_PIN_29"],
                                  ["P11", "GPIO_PIN_30"],
                                  ["P12", "GPIO_PIN_16"],
                                  ["P13", "GPIO_PIN_17"],
                                  ["P14", "GPIO_PIN_18"],
                                  ["P15", "GPIO_PIN_28"],
                                  ["P16", "GPIO_PIN_9"],
                                ],
                              },
                              {
                                type: "field_dropdown",
                                name: "gpio2",
                                options: [
                                  ["P0", "GPIO_PIN_22"],
                                  ["P1", "GPIO_PIN_25"],
                                  ["P2", "GPIO_PIN_21"],
                                  ["P3", "GPIO_PIN_27"],
                                  ["P4", "GPIO_PIN_31"],
                                  ["P5", "GPIO_PIN_32"],
                                  ["P6", "GPIO_PIN_33"],
                                  ["P7", "GPIO_PIN_34"],
                                  ["P8", "GPIO_PIN_24"],
                                  ["P9", "GPIO_PIN_6"],
                                  ["P10", "GPIO_PIN_29"],
                                  ["P11", "GPIO_PIN_30"],
                                  ["P12", "GPIO_PIN_16"],
                                  ["P13", "GPIO_PIN_17"],
                                  ["P14", "GPIO_PIN_18"],
                                  ["P15", "GPIO_PIN_28"],
                                  ["P16", "GPIO_PIN_9"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "output": null,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['Ultrasonic_ranging'] = function (block) {
                const gpio1 = block.getFieldValue("gpio1");
                const gpio2 = block.getFieldValue("gpio2");
                // TODO: Assemble javascript into the code variable.
                const code = `Ultrasonic_get_distance(${gpio1},${gpio2},&distance)`;
                // TODO: Change Order.NONE to the correct operator precedence strength
                return [code, Order.NONE];
            }
        }
    }

    //红外线
    {
        //XTask_ir_task:红外线操作任务执行线程
        {
            Blockly.Blocks['XTask_ir_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_ir_task",
                        "tooltip": "红外线操作任务执行",
                        "helpUrl": "",
                        "message0": "红外线操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_ir_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue("configMAX_PRIORITIES");
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(ir_task, (char *)"ir_task",  4096, NULL, ${configMAX_PRIORITIES}, &ir_task_handle);\n---LOOP---vTaskSuspend(ir_task_handle);\n`;
                return code;
            }
        }
        {
            Blockly.Blocks['init_Ir'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_Ir",
                        "tooltip": "红外初始化",
                        "helpUrl": "",
                        "message0": "红外初始化 %1 %2",
                        "args0": [
                            {
                                "type": "field_dropdown",
                                "name": "gpio",
                                "options": [
                                    [
                                        "P0",
                                        "GPIO_PIN_22"
                                    ],
                                    [
                                        "P1",
                                        "GPIO_PIN_25"
                                    ],
                                    [
                                        "P2",
                                        "GPIO_PIN_21"
                                    ],
                                    [
                                        "P3",
                                        "GPIO_PIN_27"
                                    ],
                                    [
                                        "P4",
                                        "GPIO_PIN_31"
                                    ],
                                    [
                                        "P5",
                                        "GPIO_PIN_32"
                                    ],
                                    [
                                        "P6",
                                        "GPIO_PIN_33"
                                    ],
                                    [
                                        "P7",
                                        "GPIO_PIN_34"
                                    ],
                                    [
                                        "P8",
                                        "GPIO_PIN_24"
                                    ],
                                    [
                                        "P9",
                                        "GPIO_PIN_6"
                                    ],
                                    [
                                        "P10",
                                        "GPIO_PIN_29"
                                    ],
                                    [
                                        "P11",
                                        "GPIO_PIN_30"
                                    ],
                                    [
                                        "P12",
                                        "GPIO_PIN_16"
                                    ],
                                    [
                                        "P13",
                                        "GPIO_PIN_17"
                                    ],
                                    [
                                        "P14",
                                        "GPIO_PIN_18"
                                    ],
                                    [
                                        "P15",
                                        "GPIO_PIN_28"
                                    ],
                                    [
                                        "P16",
                                        "GPIO_PIN_9"
                                    ]
                                ]
                            },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_Ir'] = function (block) {
                const dropdown_gpio = block.getFieldValue('gpio');
                // TODO: Assemble javascript into the code variable.
                const code = `board_ir_gpio_init(${dropdown_gpio});\n`;
                return code;
            }
        }
        {
            Blockly.Blocks['bflb_ir_receive'] = {
                init: function () {
                    this.jsonInit({
                        "type": "bflb_ir_receive",
                        "tooltip": "红外接收",
                        "helpUrl": "",
                        "message0": "红外接收 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['bflb_ir_receive'] = function () {
                // TODO: Assemble javascript into the code variable.
                const code = `rx_len = bflb_ir_receive(irrx, &rx_data);\nprintf("Receive bit:%d, value: 0x%016lx",rx_len, rx_data);\n`;
                return code;
            }
        }
    }

    //logo
    {
        //XTask_logo_task:logo操作任务执行线程
        {
            Blockly.Blocks['XTask_logo_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_logo_task",
                        "tooltip": "logo操作任务执行",
                        "helpUrl": "",
                        "message0": "logo操作任务执行\n优先级: %1 %2",
                        "args0": [
                            {
                                type: "field_dropdown",
                                name: "configMAX_PRIORITIES",
                                options: [
                                  ["1", "1"],
                                  ["2", "2"],
                                  ["3", "3"],
                                  ["4", "4"],
                                  ["5", "5"],
                                  ["6", "6"],
                                  ["7", "7"],
                                  ["8", "8"],
                                  ["9", "9"],
                                  ["10", "10"],
                                  ["11", "11"],
                                  ["12", "12"],
                                  ["13", "13"],
                                  ["14", "14"],
                                ],
                              },
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": [''],
                        "nextStatement": [''],
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['XTask_logo_task'] = function (block) {
                const configMAX_PRIORITIES = block.getFieldValue('configMAX_PRIORITIES');
                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(logo_task, (char *)"logo_task", 8192, NULL,${configMAX_PRIORITIES}, &logo_handle);\n---LOOP---vTaskSuspend(logo_handle);\n`;
                return code;
            }
        }

        //init_logo:初始化logo显示
        {
            Blockly.Blocks['init_logo'] = {
                init: function () {
                    this.jsonInit({
                        "type": "init_logo",
                        "tooltip": "初始化logo显示",
                        "helpUrl": "",
                        "message0": "初始化logo显示 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['init_logo'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `lcd_bl_init();
	lcd_bl_on();
	lcd_init();\n`;
                return code;
            }
        }

        //logo_display:logo显示
        {
            Blockly.defineBlocksWithJsonArray([
                {
                    type: 'logo_display',
                    tooltip: 'logo显示',
                    "message0": "logo显示 %1 %2",
                    args0: [
                        {
                            type: 'ImageTextGridDropdown',
                            name: 'options',
                            options: [
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8F%89%E5%8F%B7.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: 'X号',
                                }, '叉号'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%AF%B9%E5%8F%B7.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '√号',
                                }, '对号'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E7%88%B1%E5%BF%832.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '爱心',
                                }, '爱心'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E7%AC%91%E8%84%B81.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '笑脸',
                                }, '笑脸'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%93%AD%E8%84%B8.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '哭脸',
                                }, '哭脸'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E4%B8%8A%E7%AE%AD%E5%A4%B4.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '上箭头',
                                }, '上箭头'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E4%B8%8B%E7%AE%AD%E5%A4%B4.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '下箭头',
                                }, '下箭头'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%B7%A6%E7%AE%AD%E5%A4%B4.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '左箭头',
                                }, '左箭头'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8F%B3%E7%AE%AD%E5%A4%B4.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '右箭头',
                                }, '右箭头'],
                                [{
                                    src: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E4%BA%94%E8%A7%92%E6%98%9F.jpg',
                                    width: 25,
                                    height: 25,
                                    alt: '五角星',
                                }, '五角星'],
                            ],
                        },
                        {
                            "type": "input_dummy",
                            "name": "NAME"
                        },
                    ],
                    "previousStatement": XTaskCheckTypes,
                    "nextStatement": XTaskCheckTypes,
                    "colour": '#ff7272'
                },
            ]);

            javascriptGenerator.forBlock['logo_display'] = function (block) {
                let logo;
                const dropdown_name = block.getFieldValue('options');

                if (dropdown_name == '叉号') {
                    logo = 'logo_cha();'
                } else if (dropdown_name == '对号') {
                    logo = 'logo_gou();';
                } else if (dropdown_name == '爱心') {
                    logo = 'logo_aixin();';
                } else if (dropdown_name == '笑脸') {
                    logo = 'logo_xiaolian();';
                } else if (dropdown_name == '哭脸') {
                    logo = 'logo_kulian();';
                } else if (dropdown_name == '上箭头') {
                    logo = 'logo_shang();';
                } else if (dropdown_name == '下箭头') {
                    logo = 'logo_xia();';
                } else if (dropdown_name == '左箭头') {
                    logo = 'logo_zuo();';
                } else if (dropdown_name == '右箭头') {
                    logo = 'logo_you();';
                } else if (dropdown_name == '五角星') {
                    logo = 'logo_wujiaoxing();';
                }

                const code = `${logo}\n`;
                return code;
            }
        }

        //lcd_clear:显示板清空
        {
            Blockly.Blocks['lcd_clear'] = {
                init: function () {
                    this.jsonInit({
                        "type": "lcd_clear",
                        "tooltip": "显示板清空",
                        "helpUrl": "",
                        "message0": "显示板清空 %1",
                        "args0": [
                            {
                                "type": "input_dummy",
                                "name": "NAME"
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['lcd_clear'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `lcd_clear(0x0);\n`;
                return code;
            }
        }

    }
    {
        Blockly.Blocks['init_Button'] = {
            init: function () {
                this.jsonInit({
                    "type": "init_Button",
                    "tooltip": "初始化按键",
                    "helpUrl": "",
                    "message0": "初始化按键",
                    "previousStatement": XTaskCheckTypes,
                    "nextStatement": XTaskCheckTypes,
                    "colour": '#ff7272'
                })
            }
        }
        javascriptGenerator.forBlock['init_Button'] = function () {

            // TODO: Assemble javascript into the code variable.
            const code = `adc_init();\n`;
            return code;
        }
    }
    //gpio_write:向引脚写入值
        {
          Blockly.Blocks["gpio_write"] = {
            init: function () {
              this.jsonInit({
                type: "gpio_write",
                tooltip: "向引脚写入值",
                helpUrl: "",
                message0: "向  引脚 %1 数字写入值 %2 %3",
                args0: [
                  {
                    type: "field_dropdown",
                    name: "gpio",
                    options: [
                      ["P0", "GPIO_PIN_22"],
                      ["P1", "GPIO_PIN_25"],
                      ["P2", "GPIO_PIN_21"],
                      ["P3", "GPIO_PIN_27"],
                      ["P4", "GPIO_PIN_31"],
                      ["P5", "GPIO_PIN_32"],
                      ["P6", "GPIO_PIN_33"],
                      ["P7", "GPIO_PIN_34"],
                      ["P8", "GPIO_PIN_24"],
                      ["P9", "GPIO_PIN_6"],
                      ["P10", "GPIO_PIN_29"],
                      ["P11", "GPIO_PIN_30"],
                      ["P12", "GPIO_PIN_16"],
                      ["P13", "GPIO_PIN_17"],
                      ["P14", "GPIO_PIN_18"],
                      ["P15", "GPIO_PIN_28"],
                      ["P16", "GPIO_PIN_9"],
                    ],
                  },
                  {
                    type: "field_dropdown",
                    name: "number",
                    options: [
                      ["0", "0"],
                      ["1", "1"],
                    ],
                  },
                  {
                    type: "input_dummy",
                    name: "NAME",
                  },
                ],
                previousStatement: XTaskCheckTypes,
                nextStatement: XTaskCheckTypes,
                colour: "#ff7272",
              });
            },
          };
          javascriptGenerator.forBlock["gpio_write"] = function (block) {
            const dropdown_gpio = block.getFieldValue("gpio");
            const number_number = block.getFieldValue("number");
    
            const setWay = number_number == 1 ? "bflb_gpio_set" : "bflb_gpio_reset";
    
            // TODO: Assemble javascript into the code variable.
            const code = `bflb_gpio_init(gpio, ${dropdown_gpio}, GPIO_OUTPUT | GPIO_PULLUP | GPIO_SMT_EN | GPIO_DRV_0);
        ${setWay}(gpio, ${dropdown_gpio});\n`;
            return code;
          };
        }
        {
          Blockly.Blocks["gpio_output"] = {
            init: function () {
              this.jsonInit({
                type: "gpio_output",
                tooltip: "选择引脚的高低电平",
                helpUrl: "",
                message0: "当  引脚 %1 被按下时输出为 %2 %3 %4",
                args0: [
                  {
                    type: "field_dropdown",
                    name: "gpio",
                    options: [
                      ["P0", "GPIO_PIN_22"],
                      ["P1", "GPIO_PIN_25"],
                      ["P2", "GPIO_PIN_21"],
                      ["P3", "GPIO_PIN_27"],
                      ["P4", "GPIO_PIN_31"],
                      ["P5", "GPIO_PIN_32"],
                      ["P6", "GPIO_PIN_33"],
                      ["P7", "GPIO_PIN_34"],
                      ["P8", "GPIO_PIN_24"],
                      ["P9", "GPIO_PIN_6"],
                      ["P10", "GPIO_PIN_29"],
                      ["P11", "GPIO_PIN_30"],
                      ["P12", "GPIO_PIN_16"],
                      ["P13", "GPIO_PIN_17"],
                      ["P14", "GPIO_PIN_18"],
                      ["P15", "GPIO_PIN_28"],
                      ["P16", "GPIO_PIN_9"],
                    ],
                  },
                  {
                    type: "field_dropdown",
                    name: "electrical_level",
                    options: [
                      ["高电平", "true"],
                      ["低电平", "false"],
                    ],
                  },
                  {
                    type: "input_dummy",
                    name: "NAME",
                  },
                  {
                    type: "input_statement",
                    name: "operation",
                    check: XTaskCheckTypes,
                  },
                ],
                previousStatement: XTaskCheckTypes,
                nextStatement: XTaskCheckTypes,
                colour: "#ff7272",
              });
            },
          };
          javascriptGenerator.forBlock["gpio_output"] = function (
            block,
            generator
          ) {
            const dropdown_gpio = block.getFieldValue("gpio");
            const electrical_level =
              block.getFieldValue("electrical_level") == "true" ? true : false;
            const statement_operation = generator.statementToCode(
              block,
              "operation"
            );
            // TODO: Assemble javascript into the code variable.
            const code = `bflb_gpio_init(gpio, ${dropdown_gpio}, GPIO_INPUT | GPIO_PULLUP | GPIO_SMT_EN | GPIO_DRV_0);\nif(bflb_gpio_read(gpio, ${dropdown_gpio})==${electrical_level}){\n${statement_operation}};\n`;
            return code;
          };
        }
         //数字读取引脚
            {
              Blockly.Blocks["gpio_read"] = {
                init: function () {
                  this.jsonInit({
                    type: "gpio_read",
                    tooltip: "数字读取引脚",
                    helpUrl: "",
                    message0: "数字读取引脚 %1",
                    args0: [
                      {
                        type: "field_dropdown",
                        name: "gpio",
                        options: [
                          ["P0", "GPIO_PIN_22"],
                          ["P1", "GPIO_PIN_25"],
                          ["P2", "GPIO_PIN_21"],
                          ["P3", "GPIO_PIN_27"],
                          ["P4", "GPIO_PIN_31"],
                          ["P5", "GPIO_PIN_32"],
                          ["P6", "GPIO_PIN_33"],
                          ["P7", "GPIO_PIN_34"],
                          ["P8", "GPIO_PIN_24"],
                          ["P9", "GPIO_PIN_6"],
                          ["P10", "GPIO_PIN_29"],
                          ["P11", "GPIO_PIN_30"],
                          ["P12", "GPIO_PIN_16"],
                          ["P13", "GPIO_PIN_17"],
                          ["P14", "GPIO_PIN_18"],
                          ["P15", "GPIO_PIN_28"],
                          ["P16", "GPIO_PIN_9"],
                        ],
                      },
                    ],
                    inputsInline: true,
                    output: "Number", // 修改这里为 Number 类型
                    colour: "#ff7272",
                  });
                },
              };
              javascriptGenerator.forBlock["gpio_read"] = function (block) {
                const gpio = block.getFieldValue("gpio");
                const code = `bflb_gpio_read(gpio, ${gpio})`;
                return [code, Order.NONE];
              };
            }
            {
                Blockly.Blocks["gpio_init"] = {
                    init: function () {
                      this.jsonInit({
                        type: "gpio_read",
                        tooltip: "初始化引脚",
                        helpUrl: "",
                        message0: "初始化引脚 %1为%2",
                        args0: [
                          {
                            type: "field_dropdown",
                            name: "gpio",
                            options: [
                              ["P0", "GPIO_PIN_22"],
                              ["P1", "GPIO_PIN_25"],
                              ["P2", "GPIO_PIN_21"],
                              ["P3", "GPIO_PIN_27"],
                              ["P4", "GPIO_PIN_31"],
                              ["P5", "GPIO_PIN_32"],
                              ["P6", "GPIO_PIN_33"],
                              ["P7", "GPIO_PIN_34"],
                              ["P8", "GPIO_PIN_24"],
                              ["P9", "GPIO_PIN_6"],
                              ["P10", "GPIO_PIN_29"],
                              ["P11", "GPIO_PIN_30"],
                              ["P12", "GPIO_PIN_16"],
                              ["P13", "GPIO_PIN_17"],
                              ["P14", "GPIO_PIN_18"],
                              ["P15", "GPIO_PIN_28"],
                              ["P16", "GPIO_PIN_9"],
                            ],
                          },
                          {
                            type: "field_dropdown",
                            name: "method",
                            options: [
                              ["输入", "GPIO_INPUT"],
                              ["输出", "GPIO_OUTPUT"],
                            ],
                          },
                        ],
                        previousStatement: XTaskCheckTypes,
                        nextStatement: XTaskCheckTypes,
                        colour: "#ff7272",
                      });
                    },
                  };
                  javascriptGenerator.forBlock["gpio_init"] = function (block) {
                    const gpio = block.getFieldValue("gpio");
                    const method = block.getFieldValue("method");
                    const code = `bflb_gpio_init(gpio, ${gpio}, ${method}|GPIO_PULLUP|GPIO_SMT_EN|GPIO_DRV_3);\n`;
                    return code;
                  };
            }
}
