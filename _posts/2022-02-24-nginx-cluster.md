---
title: "nginx集群"
tags:
  - Articles
---

### 配置 nginx

在 `conf.d` 的文件夹内的子文件设置 `default.conf` 文件, 请求访问的接口设置代理设置`proxy_pass http://koringz_proj_cluster/`表示访问 ngnix 文件夹下的 `upstream` 的子文件 `koringz_proj_cluster.conf`, 打开文件 `koringz_proj_cluster.conf` 看到配置信息如下：

```bash
upstream koringz_proj_cluster {
  server 172.1.1.100:9091 weight=5 max_fails=3 fail_timeout=30s
}
```

多个代理的文件, 就是代理多个集群.
