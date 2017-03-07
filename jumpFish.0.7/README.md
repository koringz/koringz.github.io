# jumpFish

加载框能让你的页面变得更加人性！

# jumpFish(options,callback)

````
在你的HTML页面下,只要调用jumpFish方法并传入相应的差数进去, 紧接着在电脑通过chrome browse,

打开你刚刚添加过jumpFish方法的html页面,就能看到效果.

jumpFish.request_handle({
    parentElement:'.loading',	/* 必填 */
    eventElement:'#h1',			/* 必填 */
    textNode:'.loading-txt',	/* 必填 */
    events:'click',				/* 不是必填 */
    text:'稍等,马上就好',        /* 不是必填 */
    timeout: 8000,				/* 不是必填 */
    block:"block"				/* 不是必填 */
},function(ret){ });
````

# 平台

移动端应用
