---
title: "mysql rdms 笔记"
tags:
  - Articles
---



## 删除字段

```mysql
delete from userlist where name = "${getParseData.name}"
```

## 添加字段

```mysql
insert into members ( firstname, lastname, memberid ) values( "zzz", "sss", 1);
```

## 创建表

```mysql
mysql> create table test(name varchar(20) not null);
mysql> alter table test add column id int auto_increment not null, add primary key(id);
mysql> describe test2;
```

## 查询最后一条

```mysql
select id from table1 where id>1,name=1 order by id desc limit 1
```

**note** 了解最后一个命令 `order by`, 这个命令允许我们在给定的列上对数据库进行排序, 后面给需要排序字段的名称. 默认情况下, 按照升序排列; 其中`asc`为升序如`ORDER BY id asc`, `desc`为降序如`ORDER BY id desc`. 
其中给定命令`limit`为输出限制 1 行数量.
{: .notice-info}

## 查询一条记录($id)的下一条记录

```mysql
select * from table1 where id>$id  order by id asc dlimit 1
```


## 查询前n行记录

```mysql
select * from table1 limit 0,n;
```

## 查询多个字段的模糊搜索

```mysql

select * from user where realname like '%龙%' and realname like '%文%'
```

## 模糊查询加分页

```mysql
select * from userlist1 where name like "%${search_data}%" and id limit ${10 * (page_index-1) } , ${10}
```

## 插入数据到表格

```mysql
insert into userlist1( name, type, description ) values( "${getParseData.name}", "${getParseData.type}", "${getParseData.description}" )
```

