#cmake最低版本需求，不加入此行会受到警告信息
cmake_minimum_required(VERSION 3.16)

#项目名称
project(code)

#指定生成的可执行文件的输出目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

#生成应用程序 code
add_executable(code code.c)
