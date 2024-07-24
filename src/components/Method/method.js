import * as Blockly from 'blockly/core';
import {javascriptGenerator, Order} from 'blockly/javascript';
import {dartGenerator} from 'blockly/dart';



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
    javascriptGenerator.forBlock['string_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
        code = `printf("${value_value}");\n`;
      return code;
    };
    dartGenerator.forBlock['string_printf'] = function (block, generator) {
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
    javascriptGenerator.forBlock['number_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
      code = `printf("%d",${value_value});\n`;
      return code;
    };
    dartGenerator.forBlock['number_printf'] = function (block, generator) {
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

    javascriptGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `strlen("${argument0}")`;
      return [code, Order.MEMBER];
    };
    dartGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `("${argument0}").length`;
      return [code, Order.MEMBER];
    };
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