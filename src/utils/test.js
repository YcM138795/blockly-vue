import {dartGenerator} from 'blockly/dart'


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