import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/field-dependent-dropdown'; //引入定义Motors_left_right块的插件
import { FieldGridDropdown } from '@blockly/field-grid-dropdown';
import { XTaskCheckTypes } from '../config/config';


//小飞象智能车
{
    //基础
    {

        //forever:无限循环
        {
            Blockly.Blocks['forever'] = {
                init: function () {
                    this.jsonInit({
                        "type": "forever",
                        "tooltip": "",
                        "helpUrl": "",
                        "message0": "无限循环 %1 %2",
                        "args0": [
                            {
                                "type": "input_end_row",
                                "name": "NAME"
                            },
                            {
                                "type": "input_statement",
                                "name": "inner",
                                "check": XTaskCheckTypes
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['forever'] = function (block, generator) {
                const statement_inner = generator.statementToCode(block, 'inner');

                // TODO: Assemble javascript into the code variable.
                const code = `while(1){\n${statement_inner}\n}\n`;
                return code;
            }
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
                                "name": "inner",
                                "check": XTaskCheckTypes
                            }
                        ],
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
                        "message0": "延时-- %1 毫秒 %2",
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
                    })
                }
            }
            javascriptGenerator.forBlock['delay'] = function (block) {
                const number_timer = block.getFieldValue('timer');
                let time = number_timer;

                // TODO: Assemble javascript into the code variable.
                const code = `vTaskDelay(${time});\n`;
                return code;
            }
            dartGenerator.forBlock['delay'] = function (block) {
                const number_timer = block.getFieldValue('timer');

                // TODO: Assemble dart into the code variable.
                const code = `console.log('延时${number_timer}毫秒')\n`;
                return code;
            }
        }

        //gpio_write:向引脚写入值
        {
            Blockly.Blocks['gpio_write'] = {
                init: function () {
                    this.jsonInit({
                        "type": "gpio_write",
                        "tooltip": "向引脚写入值",
                        "helpUrl": "",
                        "message0": "向  引脚 %1 数字写入值 %2 %3",
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
                                "type": "field_number",
                                "name": "number",
                                "value": 0,
                                "min": 0,
                                "max": 1,
                                "precision": 1
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
            javascriptGenerator.forBlock['gpio_write'] = function (block) {
                const dropdown_gpio = block.getFieldValue('gpio');
                const number_number = block.getFieldValue('number');

                const setWay = number_number == 1 ? 'bflb_gpio_set' : 'bflb_gpio_reset';

                // TODO: Assemble javascript into the code variable.
                const code = `bflb_gpio_init(gpio, ${dropdown_gpio}, GPIO_OUTPUT | GPIO_PULLUP | GPIO_SMT_EN | GPIO_DRV_0);
${setWay}(gpio, ${dropdown_gpio});\n`;
                return code;
            }
        }

        //XTask_mpu6050__task:陀螺仪操作任务执行函数
        {
            Blockly.Blocks['XTask_mpu6050__task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_mpu6050__task",
                        "tooltip": "陀螺仪操作任务执行函数",
                        "helpUrl": "",
                        "message0": "陀螺仪操作任务执行 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_mpu6050__task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = ` xTaskCreate(bl61x_mpu6050_task, (char *)"m6050_task",  8192, NULL, 8, &m6050_handle);\n`;
                return code;
            }
        }


    }

    //烧录板灯
    {
        //XTask_led_task:烧录板灯操作任务执行函数
        {
            Blockly.Blocks['XTask_led_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_led_task",
                        "tooltip": "烧录板灯操作任务执行函数",
                        "helpUrl": "",
                        "message0": "烧录板灯操作任务执行 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_led_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(led_task, (char *)"led_task",  512, NULL, 9, &led_handle);\n`;
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
        //XTask_mpu_task:陀螺仪操作任务执行函数
        {
            Blockly.Blocks['XTask_mpu_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_led_task",
                        "tooltip": "陀螺仪操作任务执行函数",
                        "helpUrl": "",
                        "message0": "陀螺仪操作任务执行 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_mpu_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(mpu_task, (char *)"mpu_task",  512, NULL, 9, &mpu_handle);\n`;
                return code;
            }
        }

        //judgment_board:方向判断
        {
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

                const code = `${judge} {\n${statement_inner}\n}\n`;
                return code;
            }
        }

    }

    //小车灯
    {
        //XTask_light_task:灯操作任务执行函数
        {
            Blockly.Blocks['XTask_light_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_light_task",
                        "tooltip": "灯操作任务执行函数",
                        "helpUrl": "",
                        "message0": "灯操作任务执行 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_light_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(light_task, (char *)"light_task",  512, NULL,   configMAX_PRIORITIES - 3, &light_handle);\n`;
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
        //XTask_fmq_task:蜂鸣器操作任务执行函数
        {
            Blockly.Blocks['XTask_fmq_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_fmq_task",
                        "tooltip": "蜂鸣器操作任务执行函数",
                        "helpUrl": "",
                        "message0": "蜂鸣器操作任务执行 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_fmq_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(fmq_task, (char *)"fmq_task",  512, NULL, configMAX_PRIORITIES - 3, &fmq_handle);\n`;
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
        //XTask_servo_task:电机操作任务执行函数
        {
            Blockly.Blocks['XTask_servo_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_servo_task",
                        "tooltip": "舵机操作任务执行函数",
                        "helpUrl": "",
                        "message0": "舵机操作任务执行函数 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_servo_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(servo_task, (char *)"servo_task",  512, NULL, configMAX_PRIORITIES - 3, &servo_handle);\n`;
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
                        "previousStatement": XTaskCheckTypes,
                        "nextStatement": XTaskCheckTypes,
                        "colour": '#ff7272'
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
        //XTask_motors_task:电机操作任务执行函数
        {
            Blockly.Blocks['XTask_motors_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_motors_task",
                        "tooltip": "电机操作任务执行函数",
                        "helpUrl": "",
                        "message0": "电机操作任务执行函数 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_motors_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(motors_task, (char *)"motors_task",  512, NULL, configMAX_PRIORITIES - 3, &motors_handle);\n`;
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
                                "max": 4095
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

                // TODO: Assemble javascript into the code variable.
                const code = `Motors_${dropdown_options}(${number_speed});\n`;
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
                        "message0": "原地打转    速度 %1 角度 %2 %3",
                        "args0": [
                            {
                                "type": "field_number",
                                "name": "speed",
                                "value": 0,
                                "min": 0,
                                "max": 4095
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
                            "max": 4095
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
                                "max": 4095
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

                // TODO: Assemble javascript into the code variable.
                const code = `motor_control(${dropdown_options1},${number_speed},${dropdown_options2});\n`;
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
        //XTask_ultrasonic_task:超声波操作任务执行函数
        {
            Blockly.Blocks['XTask_ultrasonic_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_ultrasonic_task",
                        "tooltip": "超声波操作任务执行函数",
                        "helpUrl": "",
                        "message0": "超声波操作任务执行函数 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_ultrasonic_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(ultrasonic_task, (char *)"ultrasonic_task",  1024, NULL, configMAX_PRIORITIES - 3, &ultrasonic_handle);\n`;
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
                        "message0": "初始化超声波 %1",
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
            javascriptGenerator.forBlock['init_Ultrasonic'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Ultrasonic_Init();\nfloat distance;\n`;
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
                        "message0": "超声波测距 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['Ultrasonic_ranging'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `Ultrasonic_get_distance(&distance)`;
                // TODO: Change Order.NONE to the correct operator precedence strength
                return [code, Order.NONE];
            }
        }
    }
    
    //红外线
    {
        //XTask_ir_task:红外线操作任务执行函数
        {
            Blockly.Blocks['XTask_ir_task'] = {
                init: function () {
                    this.jsonInit({
                        "type": "XTask_ir_task",
                        "tooltip": "红外线操作任务执行函数",
                        "helpUrl": "",
                        "message0": "红外线操作任务执行函数 %1",
                        "args0": [
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
            javascriptGenerator.forBlock['XTask_ir_task'] = function () {

                // TODO: Assemble javascript into the code variable.
                const code = `xTaskCreate(ir_task, (char *)"ir_task",  4096, NULL, 7, &ir_task_handle);\n`;
                return code;
            }
        }
    }
}
