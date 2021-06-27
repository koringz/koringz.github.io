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
