import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import dart from 'blockly/dart';

import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化


//功能
{
  //string_printf:输出
  {
    Blockly.Blocks['string_printf'] = {
      init: function () {
        this.jsonInit({
          "type": "printf",
          "message0": "字符输出 %1",
          "args0": [
            {
              "type": "input_value",
              "name": "value"
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "字符输出函数",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['string_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
        code = `printf("${value_value}");\n`;
      return code;
    };
    dart.dartGenerator.forBlock['string_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
        code = `console.log("${value_value}");\n`;
      return code;
    };
  }
  //number_printf:输出
  {
    Blockly.Blocks['number_printf'] = {
      init: function () {
        this.jsonInit({
          "type": "printf",
          "message0": "数字输出 %1",
          "args0": [
            {
              "type": "input_value",
              "name": "value"
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "数字输出函数",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['number_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
      code = `printf("%d",${value_value});\n`;
      return code;
    };
    dart.dartGenerator.forBlock['number_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
      code = `console.log(${value_value});\n`;
      return code;
    };
  }


  //string_length:求长度
  {
    Blockly.Blocks['string_length'] = {
      init: function () {
        this.jsonInit({
          "message0": 'length of %1',
          "args0": [
            {
              "type": "input_value",
              "name": "VALUE",
            }
          ],
          "output": "Number",
          "colour": 230,
          "tooltip": "求长度",
        });
      }
    }

    javascript.javascriptGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `strlen("${argument0}")`;
      return [code, Order.MEMBER];
    };
    dart.dartGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `("${argument0}").length`;
      return [code, Order.MEMBER];
    };
  }

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
          "colour": 230,
          "tooltip": "亮灯",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['open_led'] = function (block) {
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
    dart.dartGenerator.forBlock['open_led'] = function (block) {
      var number_digital = block.getFieldValue('digital');
      var code = `
      this.ledArr.push('open_led')
      this.ledArr.push(${ number_digital })
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
          "colour": 230,
          "tooltip": "灭灯",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['close_led'] = function (block) {
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
    dart.dartGenerator.forBlock['close_led'] = function (block) {
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
      init:function(){
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
          "colour": 230
        })
      }
  }
  javascript.javascriptGenerator.forBlock['steering_gear180'] = function(block) {
    const dropdown_serial_number = block.getFieldValue('serial_number');
    const number_angle = block.getFieldValue('angle');
  
    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.Servo(SuperBit.enServo.${dropdown_serial_number}, ${number_angle});\n`;
    return code;
  }
  dart.dartGenerator.forBlock['steering_gear180'] = function(block) {
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
      init:function(){
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
          "colour": 230
        })
      }
  }
  javascript.javascriptGenerator.forBlock['steering_gear270'] = function(block) {
    const dropdown_serial_number = block.getFieldValue('serial_number');
    const number_angle = block.getFieldValue('angle');
  
    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.Servo2(SuperBit.enServo.${dropdown_serial_number}, ${number_angle});\n`;
    return code;
  }
  dart.dartGenerator.forBlock['steering_gear270'] = function(block) {
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
      init:function(){
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
          "colour": 225
        })
      }
  }
  javascript.javascriptGenerator.forBlock['steering_gear360'] = function(block) {
    const dropdown_serial_number = block.getFieldValue('serial_number');
    const dropdown__turn_around = block.getFieldValue(' turn_around');
    const number_speed = block.getFieldValue('speed');
  
    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.Servo3(SuperBit.enServo.${dropdown_serial_number}, SuperBit.enPos.${dropdown__turn_around}, ${number_speed});\n`;
    return code;
  }
  dart.dartGenerator.forBlock['steering_gear360'] = function(block) {
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
      init:function(){
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
          "colour": 225
        })
    }
  }
  javascript.javascriptGenerator.forBlock['motor_single'] = function(block) {
    const dropdown_motor_number = block.getFieldValue('motor_number');
    const number_speed = block.getFieldValue('speed');
  
    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.MotorRun(SuperBit.enMotors.${dropdown_motor_number}, ${number_speed});\n`;
    return code;
  }
  dart.dartGenerator.forBlock['motor_single'] = function(block) {
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
    init:function(){
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
        "colour": 225
      })
    }
  }
  javascript.javascriptGenerator.forBlock['motor_double'] = function(block) {
    const dropdown_motor_number1 = block.getFieldValue('motor_number1');
  
    const number_speed1 = block.getFieldValue('speed1');
  
    const dropdown_motor_number2 = block.getFieldValue('motor_number2');
  
    const number_speed2 = block.getFieldValue('speed2');
  
    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.MotorRunDual(\nSuperBit.enMotors.${dropdown_motor_number1}, ${number_speed1},\nSuperBit.enMotors.${dropdown_motor_number2}, ${number_speed2});\n`;
    return code;
  }
  dart.dartGenerator.forBlock['motor_double'] = function(block) {
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
          "colour": 225
        }
      )
    }
  }
  javascript.javascriptGenerator.forBlock['stop_all_motor'] = function() {

    // TODO: Assemble javascript into the code variable.
    const code = `SuperBit.MotorStopAll();\n`;
    return code;
  }
  dart.dartGenerator.forBlock['stop_all_motor'] = function() {

    // TODO: Assemble dart into the code variable.
    const code = 'comsole.log("停止所有电机")\n';
    return code;
  }
}

}


// {
//   #include "bflb_gpio.h"
// #include "bflb_mtimer.h"

// #define MOTOR_GPIO_PIN 32 // 假设电机连接到GPIO引脚32

// void init_motor_gpio(void) {
//     struct bflb_device_s *gpio;

//     gpio = bflb_device_get_by_name("gpio");
//     if (gpio == NULL) {
//         printf("Failed to get GPIO device\n");
//         return;
//     }

//     struct bflb_gpio_cfg_s gpio_cfg = {
//         .pin = MOTOR_GPIO_PIN,
//         .mode = GPIO_OUTPUT,
//         .pull = GPIO_PULLUP,
//         .smt = GPIO_SMT_EN,
//         .drv = GPIO_DRV_1,
//     };

//     bflb_gpio_init(gpio, &gpio_cfg);
// }

// void start_motor(struct bflb_device_s *gpio) {
//     bflb_gpio_set(gpio, MOTOR_GPIO_PIN);
// }

// void stop_motor(struct bflb_device_s *gpio) {
//     bflb_gpio_reset(gpio, MOTOR_GPIO_PIN);
// }

// void run_motor_for_duration(struct bflb_device_s *gpio, uint32_t duration_ms) {
//     start_motor(gpio);
//     bflb_mtimer_delay_ms(duration_ms);
//     stop_motor(gpio);
// }

// int main(void) {
//     struct bflb_device_s *gpio;

//     bflb_platform_init(0);

//     gpio = bflb_device_get_by_name("gpio");
//     if (gpio == NULL) {
//         printf("Failed to get GPIO device\n");
//         return -1;
//     }

//     init_motor_gpio();
    
//     // 运行电机5秒钟
//     run_motor_for_duration(gpio, 5000);

//     return 0;
// }

// }