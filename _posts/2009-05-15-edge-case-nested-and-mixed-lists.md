---
title: "window系统安装mysql"
# categories:
#   - Edge Case
# tags:
#   - content
#   - css
#   - edge case
#   - lists
#   - markup
---

### 下载地址（不含其他图形界面）

[mysql](https://dev.mysql.com/downloads/windows/installer/)
如果下载win7 64位，在下载后出现不兼容，可以在window窗口菜单中找到mysql install --community扩展项下载一个x64位即可。个人选了兼容版本5.6.51版本

### 变量配置

选择“此电脑”，单击右键，选择“属性” -> “高级系统设置” -> “环境变量”。

分别设置如下系统变量值：

```YAML
MYSQL_HOME
C:\Program Files\MySQL\MySQL Server 5.6
path
%MYSQL_HOME%\bin
```

然后回到MySQL目录（个人电脑 C:\Program Files\MySQL\MySQL Server 5.6）打开\bin文件夹下创建my.ini文件（可以理解为初始化启动提供服务并建立连接传输数据所需的协议信息），填写如下代码：

```YAML
[client]
port=3306
default-character-set=utf8 
[mysqld]
port=3306
character_set_server=utf8
basedir=%MYSQL_HOME%
datadir=%MYSQL_HOME%\data
[WinMySQLAdmin]
%MYSQL_HOME%\bin\mysqld.exe
```

### 测试服务

（1）进入cmd界面，执行如下命令（或者进入>bin文件目录打开cmd执行）：

>mysqld.exe –install

Service successfully installed.

表示安装成功

（2）初始化mysql，创建一个具有空密码的 root 用户，在 cmd 命令提示符界面输入 mysqld --initialize-insecure后，系统会自动在 mysql安装路径中生成相应的 data 目录，并自动创建好空密码的 root 用户，表示初始化成功。
`
>mysqld --initialize-insecure

启动 mysql 并设置密码

（3）在 cmd界面输入如下命令，启动 mysql 服务：

>net start mysql

然后，在服务启动后，因为刚创建的 root 用户是空密码，因此，需要先进行密码设定，在 cmd 界面输入以下内容。（默认设置root和123456）

>mysqladmin -u root -p password 此处输入新的密码
Enter password: 此处输入旧的密码
（note：由于刚开始创建用户的密码为空，所以在第一次修改用户的密码时，在Enter password: 的后面不用输入旧密码，直接回车）

最后，如需把已经启动的MySQL 服务给停止掉，则执行如下命令：

>net stop mysql

再启动mysql服务：

>net start mysql

测试是否安装成功：

>net start mysql // 开启mysql
>mysql -u root -p // 连接mysql

### 测试问题

如果提示缺少：（安装mysql过程中出现无法找到入口，无法定位程序输入点fesetround于动态链接库；或者运行net start mysql仍是出错！）

发生系统错误2
服务名无效
...

// 首先删除

>mysql：mysqld --remove


// 再重新安装

>mysqld --install -> 这里ok也就是安装成功了


// 再重新启动

>net start mysql -> 这里出错，基本确认是启动不正确，细心、检查一下就可以解决问题

比如碰到：服务名无效！删除mysql目录下/data文件下的数据，保留/data目录，然后看mysql服务名称是否正确，通过win+R输入services.msc，查看mysql服务名为MySQL56，然后打开cmd界面，输入net start MySQL56显示服务启动成功！否则会提示：发生系统错误问题！