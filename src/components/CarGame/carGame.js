import Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python';
import { javascriptGenerator } from 'blockly/javascript';
import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化

/**
 * 自定义组件注册
 */

// 函数型自定义快
Blockly.Blocks['turn'] = {
    init: function () {
        this.jsonInit({
                "type": "turn",
                "message0": "方向 %1 %2 角度 %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "方向",
                        "options": [
                            [
                                "lrft",
                                "左边",
                                
                            ],
                            [
                                "right",
                                "右边",
                                
                            ]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_angle",
                        "name": "角度",
                        "angle": 90
                    }
                ],
                "inputsInline": true,
                "output": "String",
                "colour": 195,
                "tooltip": "",
                "helpUrl": ""
            }
        );
    }
}
/**
 * 自定义组件生成代码
 * @param block
 * @returns {string}
 */



pythonGenerator.forBlock['turn'] = function(block, ) {
    var dropdown___ = block.getFieldValue('方向');
    var angle___ = block.getFieldValue('角度');
    // TODO: Assemble python into code variable.
    // TODO: Change ORDER_NONE to the correct strength.
    // return 'turn('+dropdown___+','+angle___+')';
    turn( dropdown___ , angle___ );
    return  ''
  };
javascriptGenerator.forBlock['turn'] = function(block, ) {
    var dropdown___ = block.getFieldValue('方向');
    var angle___ = block.getFieldValue('角度');
    // TODO: Assemble python into code variable.
    // TODO: Change ORDER_NONE to the correct strength.
    // return 'turn('+dropdown___+','+angle___+')';
    turn( dropdown___ , angle___ );
    return  ''
  };



  function  turn(direction,angle){
    console.log(`向${direction}转了${angle}度`);
  }