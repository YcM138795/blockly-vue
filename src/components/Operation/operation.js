import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';


//操作
{
  //输出
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
  }

  //输入
  {
    //when_button_dowm:当按钮被按下执行 
    {
      Blockly.Blocks['when_button_dowm'] = {
        init: function () {
          this.jsonInit({
            "type": "when_button_dowm",
            "tooltip": "当按钮被按下执行",
            "helpUrl": "",
            "message0": "当 %1 被按下 %2 %3",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "choose",
                "options": [
                  [
                    "A",
                    "A"
                  ],
                  [
                    "B",
                    "B"
                  ]
                ]
              },
              {
                "type": "input_dummy",
                "name": "NAME"
              },
              {
                "type": "input_statement",
                "name": "operation"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230
          });
        }
      }

      javascriptGenerator.forBlock['when_button_dowm'] = function (block, generator) {
        const dropdown_choose = block.getFieldValue('choose');

        const statement_operation = generator.statementToCode(block, 'operation');

        // TODO: Assemble javascript into the code variable.
        const code = `if(${dropdown_choose}){\n${statement_operation}}\n`;
        return code;
      }
    }
    //cheak_button_dowm:校验按钮按下 
    {
      Blockly.Blocks['cheak_button_dowm'] = {
        init: function () {
          this.jsonInit({
            "type": "cheak_button_dowm",
            "tooltip": "校验按钮按下",
            "helpUrl": "",
            "message0": "当 %1 被按下 %2",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "choose",
                "options": [
                  [
                    "A",
                    "A"
                  ],
                  [
                    "B",
                    "B"
                  ]
                ]
              },
              {
                "type": "input_dummy",
                "name": "NAME"
              }
            ],
            "output": "Boolean",
            "colour": 230
          });
        }
      }

      javascriptGenerator.forBlock['cheak_button_dowm'] = function (block) {
        const dropdown_choose = block.getFieldValue('choose');

        // TODO: Assemble javascript into the code variable.
        const code = `${dropdown_choose}`;
        // TODO: Change Order.NONE to the correct operator precedence strength
        return [code, Order.NONE];
      }
    }
  }



  //函数跳出
  {
    //break:跳出
    {
      Blockly.Blocks['break'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "break",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "函数跳出函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['break'] = function () {
        return `break;\n`;
      };
      //   dartGenerator.forBlock['break'] = function (block, generator) {
      //     var value_value = generator.valueToCode(block, 'value', Order.NONE);
      //     var code = '';
      //       code = `console.log("${value_value}");\n`;
      //     return code;
      //   };
    }

    //continue:继续
    {
      Blockly.Blocks['continue'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "continue ",
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "函数继续函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['continue'] = function () {
        return `continue;\n`;
      };
      //   dartGenerator.forBlock['continue'] = function (block, generator) {
      //     var value_value = generator.valueToCode(block, 'value', Order.NONE);
      //     var code = '';
      //       code = `console.log("${value_value}");\n`;
      //     return code;
      //   };
    }

  }

  //常量操作
  {
    //number_variable:变量
    {
      Blockly.Blocks['number_variable'] = {
        init: function () {
          this.jsonInit({
            "type": "number_variable",
            "message0": "定义 %1 = %2 %3",
            "args0": [
              {
                "type": "field_input",
                "name": "value1",
                "text": "a"
              },
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "value2"
              }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "数字常量定义",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['number_variable'] = function (block, generator) {
        var text_value1 = block.getFieldValue('value1');
        var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
        // TODO: Assemble javascript into code variable.
        var code = `int ${text_value1} = ${value_value2};\n`;
        return code;
      };
    }
    //Decrease:变量自减
    {
      Blockly.Blocks['Decrease'] = {
        init: function () {
          this.jsonInit({
            "type": "Decrease",
            "tooltip": "变量自减",
            "helpUrl": "",
            "message0": "自减 %1 每次自减 %2 %3",
            "args0": [
              {
                "type": "field_input",
                "name": "target_value",
                "text": "a"
              },
              {
                "type": "field_number",
                "name": "digit",
                "value": 1
              },
              {
                "type": "input_dummy",
                "name": "target"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230
          })
        }
      }
      javascriptGenerator.forBlock['Decrease'] = function (block) {
        const text_target_value = block.getFieldValue('target_value');
        const number_digit = block.getFieldValue('digit');

        // TODO: Assemble javascript into the code variable.
        const code = `${text_target_value} -= ${number_digit};\n`;
        return code;
      }
    }

  }


}
Blockly.Blocks['function_definition'] = {
  init: function () {
    this.jsonInit({
      "type": "function_definition",
      "tooltip": "",
      "helpUrl": "",
      "message0": "",
      "args0": [
      ],
      "style": "function_definition_style",
    });
  }
};
Blockly.Themes.Classic.blockStyles["function_definition_style"] = {
  "colourPrimary": "#5b67a5",
  "colourSecondary": "#4a56a3",
  "colourTertiary": "#3a46a1",
  "hat": "cap"
};
javascriptGenerator.forBlock['function_definition'] = function (block, generator) {
  console.log(block.inputList[1].fieldRow);
  
  block.inputList[1].fieldRow.forEach((field,index) => {
    if(index>0){
    console.log(field.name);
    }
  });
  const text_name = block.getFieldValue('NAME');

  const text_text_0 = block.getFieldValue('text_1');
  const text_boolean_1 = block.getFieldValue('boolean_2');

  const statement_inner = generator.statementToCode(block, 'inner');

  // TODO: Assemble javascript into the code variable.
  const code = `void ${text_name}(${text_text_0},${text_boolean_1}){\n${statement_inner}}\n`;
  return code;
}

