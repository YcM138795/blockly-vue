#include <stdio.h>
#include <stdlib.h> // 包含rand()函数所需的头文件
#include <time.h>   // 包含srand()函数所需的头文件

int main() {
    int randomNum;
    // 使用当前时间作为随机数种子，确保每次运行时生成的随机数不同
    
    // 生成范围在0到6之间的随机整数
    randomNum = rand()%7; // rand() % (max + 1)

    printf("Random number: %d\n", randomNum);

    return 0;
}