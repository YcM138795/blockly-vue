import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/field-bitmap';

// 基础
{

  //字符
  {
    //string:字符串
    {
      Blockly.Blocks['string'] = {
        init: function () {
          this.jsonInit({
            "type": "string",
            "message0": "\" %1 \"",
            "args0": [
              {
                "type": "field_input",
                "name": "value",
                "text": " "
              }
            ],
            "inputsInline": true,
            "output": "String",
            "colour": 180,
            "tooltip": "字符串",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['string'] = function (block) {
        var text_value = block.getFieldValue('value');
        // TODO: Assemble javascript into code variable.
        var code = `${text_value}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
      dartGenerator.forBlock['string'] = function (block) {
        var text_value = block.getFieldValue('value');
        // TODO: Assemble javascript into code variable.
        var code = `${text_value}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
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
            "colour": 180,
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




  // barcket:括号
  {
    Blockly.Blocks['bracket'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "bracket",
            "message0": "( %1 %2 )",
            'icons': {
              // Your state goes here!
              'my_icon': 'my_icon',
            },
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "digit"
              }
            ],
            "inputsInline": false,
            "output": null,
            "colour": 180,
            "icon": 'my_icon',
            "tooltip": "括号",
            "helpUrl": ""
          }
        );
      }
    }
    javascriptGenerator.forBlock['bracket'] = function (block, generator) {
      var value_digit = generator.valueToCode(block, 'digit', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = '(' + value_digit + ')';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };
    dartGenerator.forBlock['bracket'] = function (block, generator) {
      var value_digit = generator.valueToCode(block, 'digit', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = '(' + value_digit + ')';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };

  }

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
          "colour": 180,
          "tooltip": "开始(唯一且不可删除)",
          "helpUrl": "",
          "deletable": false,
          "style": {
            "hat": "cap"              // 使用帽子块的外观，这样这个块看起来像程序的开始
          }
        }
      )
      }
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
${statements_operate}
  vTaskStartScheduler();
	while (1);\n}\n`;
      return code;
    };
    dartGenerator.forBlock['int_main'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      // var code =`int main(){\n${statements_operate} \nreturn 0;\n}` ;
      var code = `${statements_operate}`;
      return code;
    };
  }


  Blockly.defineBlocksWithJsonArray([
    {
      type: 'test_field_bitmap',
      message0: 'bitmap: %1',
      args0: [
        {
          type: 'field_bitmap',
          name: 'FIELDNAME',
          width: 5,
          height: 5,
          colours: { filled: '#4d8c8c', empty: '#fff' }
        },
      ],
      "previousStatement": ['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task'],
      "nextStatement": ['XTask_light_task','XTask_fmq_task','XTask_servo_task','XTask_motors_task','XTask_ultrasonic_task'],
      "colour": 180
    },
  ]);
  javascriptGenerator.forBlock['test_field_bitmap'] = function () {
    // TODO: Assemble javascript into code variable.
    var code = ``;
    return code;
  };



}


