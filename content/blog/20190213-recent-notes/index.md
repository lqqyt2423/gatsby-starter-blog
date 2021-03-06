---
title: 最近的笔记
date: "2019-02-12T16:00:00.000Z"
description: ""
---

## Linux find 命令

正则查找当前目录下的文件或目录：

```bash
find ./ -regex .*txt
find ./ -regex ".*txt"
```

## Fix Mac Launchpad Problems

Rebuild:

```bash
defaults write com.apple.dock ResetLaunchPad -bool true
killall Dock
```

[How to Fix Launchpad Problems on Your Mac](https://www.lifewire.com/fix-launchpad-problems-in-os-x-2259966)

## docker 命令

```bash
docker image ls
docker container ls
docker container ls --all
docker ps
docker container kill id
docker container rm id
docker container exec -it [containerID] /bin/bash
```

## MySQL 相关

```
show variables like 'wait_timeout';
set global wait_timeout=10;
show variables like 'interactive_timeout';
set global interactive_timeout=10;
show variables like '%max_connections%';
```

## Linux 权限相关

```bash
chown -R ubuntu code
chgrp -R ubuntu code
```

## mongoose update createdAt

use doc.save() other than model.findByIdAndUpdate()

## HTTP 实体首部

如果对实体进行了压缩，Content-Length 为压缩后的大小，而非原始大小。Content-MD5 的计算也为压缩后再计算。

Content-Type 为原始实体主体的媒体类型，如果实体经过内容编码如gzip压缩，Content-Type 仍是编码之前的实体类型。