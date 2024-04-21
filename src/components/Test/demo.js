import Blockly from 'blockly'
import {pythonGenerator,Order} from 'blockly/python';
import {javascriptGenerator} from 'blockly/javascript';
import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化
//  自定义组件注册
        Blockly.Blocks['string_length'] = {
            init: function() {
              this.jsonInit({
                "message0": 'length of %1',
                "args0": [
                  {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "String"
                  }
                ],
                "output": "Number",
                "colour": 160,
                "tooltip": "Returns number of letters in the provided text.",
                "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
              });
            }
          }

  /**
 * @param block
 * @returns {string}
 * 自定义组件生成代码
 */
pythonGenerator.forBlock['string_length'] =  function(block,generator) {
    var value = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || "''";
    return [value + '.length'+'  py', Order.ORDER_MEMBER];
  };

javascriptGenerator.forBlock['string_length'] = function(block, generator) {
    // String or array length.
    var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length'+'  js', Order.MEMBER];
  };