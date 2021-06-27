---
title: "mysql rdms 笔记"
tags:
  - Articles
---

## 创建表

```bash
mysql> create table test(name varchar(20) not null);
mysql> alter table test add column id int auto_increment not null, add primary key(id);
mysql> describe test;
```

## 插入数据到表格

```bash
insert into userlist( name, type, description ) values( 
    "${getParseData.name}", 
    "${getParseData.type}", 
    "${getParseData.description}" 
)
```

## 添加字段

```bash
insert into members ( firstname, lastname, memberid ) values( "zzz", "sss", 1);
```

## 删除字段

```bash
delete from userlist where (name = "${getParseData.name}") and (age > 18)
```
**Note:**之前`from`进入查询提取列表的排列信息, `where`进入查询特定子集, `where`命令使用逻辑运算符指定要返回那些行如`WHERE nameValue = 369`, 如果是字符串使用"引号, 数字不需要引号. 模糊查询多个子集, 使用括号分割每个逻辑字段, 其中括号分割使你查询更容易理解,  `and` 和 `or` 命令进行组合多个逻辑条件.
{: .notice--info}


## 查询最后一条

```bash
select id from table where id>1,name=1 order by id desc limit 1
```

**Note:**了解最后一个命令 `order by`, 这个命令允许我们在给定的列上对数据库进行排序, 后面给需要排序字段的名称. 默认情况下, 按照升序排列; 其中`asc`为升序如`ORDER BY id asc`, `desc`为降序如`ORDER BY id desc`. 其中给定命令`limit`为输出限制 1 行数量.
{: .notice--info}

## 查询一条记录($id)的下一条记录

```bash
select * from table where id>$id  order by id asc limit 1
```

## 查询前n行记录

```bash
select * from table limit 0,n;
```

## 查询多个字段的模糊搜索

```bash

select * from user where realname like '%龙%' and realname like '%文%'
```
**Note:**中间命令`like`


## 模糊查询加分页

```bash
select * from userlist where name like "%${search_data}%" 
    and id limit ${10 * (page_index-1) } , ${10}
```

## 多表查询

```bash
select userList.name, testList.type
from userList
INNER JOIN testList
ON userList.member_id = testList.member_id
```
**Note:**列表和字段关联编写..使用逗号分隔表名和列名,如`select name, type from`会写成`select userList.name, testList.type from`, 此处关联表名表示告诉数据库要查找每个表来查找每个表的列.`from`查找表名后面紧接着`join`指定应该连接哪些表并`on`指定每个表中哪些列是相关的.


{: .notice--info}


总结: 了解重要的命令 `select` `where` `limit` `order by` `join`