import Blockly from 'blockly'
import dart from 'blockly/dart';
// import python from 'blockly/python';
import {dartGenerator} from 'blockly/dart'

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化




dart.dartGenerator.forBlock['int_main'] = function (block,generator) {
    var statements_operate = generator.statementToCode(block, 'operate');
    // TODO: Assemble javascript into code variable.
// var code =`int main(){\n${statements_operate} \nreturn 0;\n}` ;
var code =`${statements_operate}` ;
    return code;
  };


function test (workspace){
    var code;
    const JSCode = dartGenerator.workspaceToCode(workspace);
    let  start = JSCode.indexOf('{') + 1;
    let end = JSCode.lastIndexOf('}');
    let extractedCode = JSCode.substring(start, end);
  
    code = extractedCode

    return code
} 


export{test}