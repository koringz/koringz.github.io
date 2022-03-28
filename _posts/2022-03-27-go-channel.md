---
title: "go-channel通道死锁"
tags:
  - golang
---

### 防止通道死锁

如果在一个通道设置接收指定大小的数据, 那么当通道数据满了, 就无法继续接收数据, 将会报出如下错误提示! `fatal error: all goroutines are asleep - deadlock!`

源代码如下：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)
func acceptChan() {
	channel := make(chan string, 2)
	fmt.Println("first")
	channel <- "write one"
	fmt.Println("seccond")
	channel <- "write two"
	fmt.Println("third")
	channel <- "write three"

	message := <-channel
	fmt.Println(message)
}


func main() {
	acceptChan()
}

```

上面的代码执行结果得到的报错信息如下：

```go
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
main.acceptChan()
D:/company/learning/development/GolandProjects/main.go:54 +0x129
main.main()
D:/company/learning/development/GolandProjects/main.go:64 +0x2a
exit status 2
```

如果要避免上面的代码执行导致错误的结果, 可以在通道接收数据过程中用 `select` 处理. 最后把通道的数据传给变量赋值, 使用 `select` 改进之后代码如下：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)
func acceptChan() {
	channel := make(chan string, 2)
	fmt.Println("first")
	channel <- "write one"
	fmt.Println("seccond")
	channel <- "write two"
	fmt.Println("third")
	select {
		case  channel <- "write three":
			fmt.Println("ok")
		default:
			fmt.Println("final")

	}

	message := <-channel
	fmt.Println("结果：", message)
}


func main() {
	acceptChan()
}

```

最后执行看到结果如下：

```bash
first
seccond
third
final
结果： write one
```
