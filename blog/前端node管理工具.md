# 前端node管理工具 #

而bower是一个前端模块管理工具，也能够解决依赖问题，在前端开发中也和好用。

## npm 和 bower的打包依赖区别 ##

在npm上：

如果没有嵌套依赖关系，避免依赖冲突要困难得多。 这是npm工作方式的基础，并且已被证明是非常成功的方法。

    project root

    [node_modules] // default directory for dependencies
	 -> dependency A
	 	-> dependency B
	    [node_modules]
	    -> dependency A

 	 -> dependency C
	    [node_modules]
	    -> dependency B
	      [node_modules]
	       -> dependency A 
	    -> dependency D

在Bower上：
	
	project root
	[bower_components] // default directory for dependencies
	 -> dependency A
	 -> dependency B // needs A
	 -> dependency C // needs B and D
	 -> dependency D

Bower针对前端进行了优化。 Bower使用平面依赖树，每个包只需要一个版本，从而将页面负载降至最低。