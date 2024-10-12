import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// import { EventBus } from '../../utils/eventBus';


//函数
{
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
                            "check":['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#4e72b8'
                })
            }
        };
        javascriptGenerator.forBlock['light_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void light_task(void *param){\n${statements_operate}}\n`;
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
                            "check":['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#4e72b8'
                })
            }
        };
        javascriptGenerator.forBlock['fmq_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void fmq_task(void *param){\n${statements_operate}}\n`;
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
                            "check":['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#4e72b8'
                })
            }
        };
        javascriptGenerator.forBlock['motors_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void motors_task(void *param){\n${statements_operate}}\n`;
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
                            "check":['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#4e72b8'
                })
            }
        };
        javascriptGenerator.forBlock['servo_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void servo_task(void *param){\n${statements_operate}}\n`;
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
                            "check":['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task']
                        }
                    ],
                    "colour": '#4e72b8'
                })
            }
        };
        javascriptGenerator.forBlock['ultrasonic_task'] = function (block, generator) {
            var statements_operate = generator.statementToCode(block, 'operate');
            // TODO: Assemble javascript into code variable.
            var code = `void ultrasonic_task(void *param){\n${statements_operate}}\n`;
            return code;
        };
    }

}


