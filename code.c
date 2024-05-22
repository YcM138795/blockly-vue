#include <stdio.h>
#include <stdlib.h> // 包含rand()函数所需的头文件
#include <time.h>   // 包含srand()函数所需的头文件
int main(){
  srand(time(NULL));
  int b=rand()%299+0;
  if (((1)<0) || ((0+0)<0)) {
    printf("%d",111);
  }
return 0;
}