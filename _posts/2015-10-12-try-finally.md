---
title: "javascript:理解try...catch...finally"
# categories:
#   - Edge Case
# tags:
#   - markup
---

以前，我一直喜欢用`console.log(do some thing)`去执行输出的类型和值，想马上看到弹出的信息，就会直接在浏览器`alert()`一下，这些是基础知识。

稍微复杂一点点，就要用到判断语句，`if else`进行条件判断，话说if条件else否则，这样的判断对于写程序代码的码侬已经是非常熟悉不过了。

如果你觉得这个也很简单，可能会用到混合if else条件判断语句加上`try catch` 来处理语句，虽然用`try catch`能处理任何的对象，通过`throw`扔一条有错误的语句，接着`catch`抛出该对象或者该对象的错误，今天我们只说`try...catch`，下面的例子分别抛出数组、时间、原型函数、数字类型等。

```js
function trycatch () {
    var array = [234],
        newdate = new Date(),
        fun = function(){},
        is = 12.22,
        call;
    try{
        throw array + '\n' + newdate.toLocaleString() + ' \n' + fun.prototype.constructor + 
        '\n' + (typeof is == 'number') +' \n' + call ; //小心local后面还有一个'e'
    }
    catch(e){
        console.log(e);
    }
    finally{
        console.log('err finally');
    }
}
trycatch () 
//  输出：

// 234

// 2015/10/12 下午10:07:03 

// function (){}

// true 

// undefined
```

**Note**更准确的说，`try`内放一条可能产生错误的语句。当`try`语句开始执行并抛出错误时，`catch`才执行内部的语句和对应的`try`内的错误信息message。何时执行`finally`语句，只有当`try`语句和`catch`语句执行之后，才执行finally语句，不论try抛出异常或者`catch`捕获都会执行`finally`语句。
{: .notice--info}

```js
function trycatch () {
    try{
        throw new Error('koringz');
    }
    catch(e){
        console.log(e.message);
    }
    finally{
        console.log('err finally');
    }
}
trycatch ()
//  输出：
// koringz
// err finally
```

通过`try`扔出一条错误的语句，我们看到在`catch`捕获到一条错误的的信息// koringz，但是同样的`finally`也输出了 // err finally。虽然我们了解try catch工作流的处理方式，但是并不了解`finally`块的代码处理程序，按照以往我们对`finally`语句一贯的思维方式，就是`finally`输出不受`try`和`catch`的限制和约束。以下是`finally`的几个输出演示代码：

```js
function trycatch () {
    try{
        throw new Error('koringz');
    }
    finally{
        console.log('err finally');
        return console.log('new finally')
    }
}
trycatch ()
// err finally
// new finally
```

如上所示，`try`扔一条错误的语句，`finally`输出的结果是： // err finally  // new finally。

```js
function trycatch () {
    try{
        throw new Error('koringz');
    }
    catch(e){
        console.log('err finally');
        return console.log('new finally')
    }
}
trycatch ()
// err finally
// new finally
```

如上所示，`try`扔一条错误的语句，`catch`捕获到错误输出结果同上`finally`。 // err finally  // new finally。

当我修改try的语句：

```js
function trycatch () {
    try{
        // 
    }
    catch(e){
        console.log('err finally');
        return console.log('new finally')
    }
}
trycatch ()
// 空(viod)
// 空(viod)
```

结果就输出都为空。// 空(viod)。因为`try`没有扔出错误，所以`catch`没有捕获到异常，故输出结果就为空。

那么我们再看看下面这个案例，通过下面的例子，可能会让你更加地了解`try catch`语句的异常处理。

```js
try{
    try{
        throw new Error('open');
    }
    catch(e){
        console.info(e.message);
        throw e
    }
    finally{
        console.log('finally');
    }
}
catch(e){
    console.log('op',e.message);
}
// open
// finally
// op open
```

当我们在`try`可能引发错误的代码块内嵌套`try catch`，通过嵌套的代码块try内扔一条可能出现错误的语句 `throw new Error('open');`，紧接着嵌套的`try`将错误传递给嵌套的`catch`处理，最终通过嵌套的`finally`运行过后，我们看到最后一条结果// op open，其实嵌套的`catch`捕获的错误信息扔给最外层`catch`捕获的。// op open

也就是说：任何给定的异常只会被离它最近的封闭`catch`块捕获一次。

当然，在“内部”块抛出的任何新异常(因为catch块里的代码也可以抛出异常)，都将会被“外部”块所捕获。

**注意：如果try块作用域内执行setTimeout方法，从setTimeout定时器里面把错误err信息throw扔出来，catch外部是不能捕获的，因为setTimeout是在临时寄存器上执行的，所以不在一个栈上处理上下文的，错误err无法被捕获。
{: .notice--info}
 