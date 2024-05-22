// node server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 导入 cors 模块
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // 导入 child_process 模块
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // 使用 cors 中间件

// 定义执行构建的函数
function buildProject(callback) {
    console.log(`当前工作目录: ${process.cwd()}`);
    //获取做拼接当前工作目录
    const path = require('path');
    const buildFolderPath = path.join(process.cwd(), 'build');
    //转换到拼接目录    
    process.chdir(buildFolderPath);
    console.log(`当前工作目录: ${process.cwd()}`);
    //执行cmake --build .生成exe二进制文件
    exec('cmake --build .', (error, stdout, stderr) => {
        if (error) {
            console.error(`执行 cmake --build . 出错: ${error.message}`);
            callback(error);
            return;
        }
        if (stderr) {
            console.error(`执行 cmake --build . 出错: ${stderr}`);
            callback(stderr);
            return;
        }
        console.log(`执行 cmake --build . 输出: ${stdout}`);
        callback(null, stdout);
    });

    // 获取上一级目录的路径并跳回
    const parentFolderPath = path.resolve(process.cwd(), '..');
    process.chdir(parentFolderPath);

    // 输出新的当前工作目录
    console.log(`当前工作目录: ${process.cwd()}`);
}

// 定义写入代码的接口
app.post('/writeCode', (req, res) => {
    const code = req.body.code; // 获取请求体中的代码数据
    const fullcode = '#include<stdio.h>\n#include<string.h>\n#include<stdlib.h>\n#include <time.h>\n#define false 0\n#define true 1\n' + code

    // 获取项目根目录下的 code.txt 文件路径
    const filePath = path.join(__dirname, 'code.c');

    // 将代码写入到 code.c 文件中
    fs.writeFile(filePath, fullcode, (err) => {
        if (err) {
            console.error('代码下载出错:', err);
            res.status(500).send('代码下载出错');
        } else {
            console.log('代码下载成功');
            // 执行构建
            buildProject((error, data) => {
                if (error) {
                    res.status(500).send('cmake --build .执行失败');
                    res.send('代码下载成功');
                } else {
                    console.log('cmake --build .执行成功:',data);
                    res.send('代码下载成功');
                }
            });
        }
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器已启动，监听端口 ${PORT}`);
});