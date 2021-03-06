---
title: Linux 知识点
date: "2018-03-19T16:00:00.000Z"
description: ""
---

## 文档/帮助相关

man 页面中标题旁代号的意思

- 1 使用者在shell环境中可以操作的命令或可运行文件
- 2 系统核心可呼叫的函数与工具等
- 3 一些常用的函数(function)与函式库(library)，大部分为C的函式库(libc)
- 4 装置文件的说明，通常在/dev下的文件
- 5 配置文件或者是某些文件的格式
- 6 游戏(games)
- 7 惯例与协议等，例如Linux文件系统、网络协议、ASCII code等等的说明
- 8 系统管理员可用的管理命令
- 9 跟kernel有关的文件

man 页面各个分级内容的意思

- NAME  简短的命令、数据名称说明
- SYNOPSIS  简短的命令下达语法(syntax)简介
- DESCRIPTION 较为完整的说明，这部分最好仔细看看！
- OPTIONS 针对 SYNOPSIS 部分中，有列举的所有可用的选项说明
- COMMANDS  当这个程序(软件)在运行的时候，可以在此程序(软件)中下达的命令
- FILES 这个程序或数据所使用或参考或连结到的某些文件
- SEE ALSO  可以参考的，跟这个命令或数据有相关的其他说明！
- EXAMPLE 一些可以参考的范例
- BUGS  是否有相关的臭虫！

放文档的地址：`/usr/share/doc`

## 检查Linux 状态时有用的命令

如果要看目前有谁在在线，可以下达『who』这个命令
如果要看网络的联机状态，可以下达 『 netstat -a 』这个命令
要看背景运行的程序可以运行『 ps -aux 』这个命令。

## Linux系统里面账号、密码、群组信息的保存位置

所有的系统上的账号与一般身份使用者，还有那个root的相关信息， 都是记录在/etc/passwd这个文件内的
个人的密码则是记录在/etc/shadow这个文件下
所有的组名都纪录在/etc/group内

## 修改文件属性与权限

- chgrp: 改变文件所属群组 --- 要被改变的组名必须要在/etc/group 文件内存在才行
- chown: 改变文件拥有者 --- 在/etc/passwd 这个文件中有纪录的用户名称才能改变
- chmod: 改变文件的权限, SUID, SGID, SBIT 等等的特性

## Filesystem Hierarchy Standard (FHS)

- /bin 系统有很多放置执行文件的目录，但/bin 比较特殊。因为/bin 放置的是在单人维护模式下还能够被操作的指令
- /boot 这个目录主要在放置开机会使用到的文件，包括 Linux 核心文件以及开机选单与开机所需配置文件等
- /dev 在 Linux 系统上，任何装置与接口设备都是以文件的型态存在于这个目录当中的
- /etc 系统主要的配置文件几乎都放置在这个目录内
- /lib 在开机时会用到的函式库， 以及在/bin 或/sbin 底下的指令 会呼叫的函式库而已
- /srv 可以视为『service』的缩写，是一些网络服务启动之后，这些服务所需要取用的数据目录
- /usr /usr 里面放置的数据属于可分享的与不可变动的，usr 是 Unix Software Resource 的缩写， 也就是『Unix 操 作系统软件资源』所放置的目录
- /var 主要针对常态性变动的文件，包括快取(cache)、登录档(log file)以及某些软件运 作所产生的文件


### usr

- /usr/bin 所有一般用户能够使用的指令都放在这里
- /usr/local 系统管理员在本机自行安装自己下载的软件(非 distribution 默认提供者)，建议安装到此目录， 这 样会比较便于管理
- /usr/share 主要放置只读架构的数据文件，当然也包括共享文件。在这个目录下放置的数据几乎是不分硬件 架构均可读取的数据， 因为几乎都是文本文件
- /usr/src 一般原始码建议放置到这里，src 有 source 的意思。至于核心原始码则建议放置到/usr/src/linux/ 目录下

### var

- /var/cache 应用程序本身运作过程中会产生的一些暂存档
- /var/lib 程序本身执行的过程中，需要使用到的数据文件放置的目录
- /var/log 重要到不行!这是登录文件放置的目录!里面比较重要的文件如/var/log/messages, /var/log/wtmp(记 录登入者的信息)等
- /var/mail 放置个人电子邮件信箱的目录
- /var/run 某些程序或者是服务启动后，会将他们的 PID 放置在这个目录下

## 文件内容查阅

- cat 由第一行开始显示文件内容
- tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写
- nl 显示的时候，顺道输出行号 --- cat -n
- more 一页一页的显示文件内容
- less 与 more 类似，但是比 more 更好的是，他可以往前翻页
- head 只看头几行
- tail 只看尾巴几行
- od 以二进制的方式读取文件内容

举例：显示10到20行的数据 `cat ./file.txt | head -n 20 | tail -n 10`

## 文件系统的运作

文件系统通常会将这两部份的数据分别存放在不同的区块，权限与属性放置到 inode 中，至于实际数据则放置到 data block 区块中。 另外，还有一个超级区块 (superblock) 会记 录整个文件系统的整体信息，包括 inode 与 block 的总量、使用量、剩余量等。

每个 inode 与 block 都有编号，至于这三个数据的意义可以简略说明如下：

- superblock 记录此 filesystem 的整体信息，包括 inode/block 的总量、使用量、剩余量， 以及文件系统的 格式与相关信息等
- inode 记录文件的属性，一个文件占用一个 inode，同时记录此文件的数据所在的 block 号码
- block 实际记录文件的内容，若文件太大时，会占用多个 block

### inode 记录的文件数据

- 该文件的存取模式(read/write/excute)
- 该文件的拥有者与群组(owner/group)
- 该文件的容量
- 该文件建立或状态改变的时间(ctime)
- 最近一次的读取时间(atime)
- 最近修改的时间(mtime)
- 定义文件特性的旗标(flag)，如 SetUID...
- 该文件真正内容的指向 (pointer)

## 压缩指令

### 常见的压缩文件扩展名

- *.Z compress 程序压缩的文件;
- *.zip zip 程序压缩的文件;
- *.gz gzip 程序压缩的文件;
- *.bz2 bzip2 程序压缩的文件;
- *.xz xz 程序压缩的文件;
- *.tar tar 程序打包的数据，并没有压缩过;
- *.tar.gz tar 程序打包的文件，其中并且经过 gzip 的压缩
- *.tar.bz2 tar 程序打包的文件，其中并且经过 bzip2 的压缩
- *.tar.xz tar 程序打包的文件，其中并且经过 xz 的压缩

### 常用压缩命令

- 压缩某文件，不保留源文件：`gzip 1.txt`
- 解压缩某文件，不保留源文件：`gzip -d 1.txt.gz`
- 压缩文件输出流，可重导向：`gzip -c 1.txt > 1.txt.gz`
- `bzip2`和`xz`命令与上面3个相同，之后后缀改为`bz2`
- `bzip2`和`xz` 多了个`-k`的参数，保留源文件

### 打包指令tar

- 打包与压缩 `tar [-z|-j|-J] [cv] [-f 待建立的新檔名] filename...`
- 查看包含的文件名称 `tar [-z|-j|-J] [tv] [-f 既有的 tar 檔名]`
- 解压缩 `tar [-z|-j|-J] [xv] [-f 既有的 tar 檔名] [-C 目录]`

`-z gzip | -j bzip2 | -J xz`

## bash

- 打印变量: `echo $PATH`
- 设置变量: `name=value`
- 可使用字符`\` 将特殊字符变为一般字符
- 若该变量为扩增变量内容时，则可用 "$变量名称" 或 ${变量} 累加内容
- 若该变量需要在其他子程序执行，则需要以 `export` 来使变量变成环境变量
- 通常大写字符为系统默认变量，自行设定变量可以使用小写字符，方便判断
- 取消变量的方法为使用 unset :『unset 变量名称』
- `env`或 `export` 可列出环境变量
- `set` 观察所有变量 (含环境变量与自定义变量)
- 基本上，在 Linux 预设的情况中，使用{大写的字母}来设定的变量 一般为系统内定需要的变量
- `export`: 自定义变量转成环境变量
- `alias`: 设置别名
- `unalias`: 取消别名
- bash 的进站与欢迎讯息: `/etc/issue, /etc/motd`
- `stty -a` 来列出目前环境中所有的按键列表

设置变量时双引号和单引号的功能不同：
- 双引号内的特殊字符如 $ 等，可以保有原本的特性
- 单引号内的特殊字符则仅为一般字符 (纯文本)


### `stty` 列出的含义

- intr : 送出一个 interrupt (中断) 的讯号给目前正在 run 的程序 (就是终止啰!);
- quit : 送出一个 quit 的讯号给目前正在 run 的程序;
- erase : 向后删除字符，
- kill : 删除在目前指令列上的所有文字;
- eof : End of file 的意思，代表『结束输入』。
- start : 在某个程序停止后，重新启动他的 output
- stop : 停止目前屏幕的输出;
- susp : 送出一个 terminal stop 的讯号给正在 run 的程序

### 快捷键对应的功能

- CTRL + C: 终止目前的命令
- CTRL + D: 输入结束EOF
- CTRL + M: Enter
- CTRL + S: 暂停屏幕的输出
- CTRL + Q: 恢复屏幕的输出
- CTRL + U: 在提示字符下，将整列命令删除
- CTRL + Z: 『暂停』目前的命令

### 数据流重导向

`>` 为覆盖 `>>` 为累加

- 标准输入 stdin 代码为0 使用`<` 或`<<`
- 标准输出 stdout 代码为1 使用`>` 或`>>`
- 标准错误输出 stderr 代码为2 使用`2>` 或`2>>`

举例：

将标准输出和标准错误输出分别保存至两个文件中：

```bash
find /home -name .bashrc > list_right 2> list_error
```

不显示标准错误输出（导入到`/dev/null` 中）：

```bash
find /home -name .bashrc 2> /dev/null
```

不区分标准输出和错误，一起导入到一个文件中：
```bash
find /home -name .bashrc > list 2>&1
```

## 账号管理、权限设置

命令相关：

- 新增使用者：`useradd`
- 设置账号密码：`passwd`
- 更新使用者配置：`usermod`
- 删除y用户相关数据：`userdel`
- 查询uid/gid等信息：`id`
- change shell： `chsh`
- 添加群组：`groupadd`
- 修改群组配置：`groupmod`
- 删除群组：`groupdel`
- 群组管理员功能：`gpasswd`
- 使用者身份切换：`su`, `sudo`
- 查询使用者：`w`, `who`, `last`, `lastlog`
- 邮件：`mail`

## 例行性工作进程

无论是`at` 还是`crontab`，它们的最小时间单位都是**分钟**，在**整分钟时间**运行，即秒为0的时候运行。

### 仅执行一次的工作排程 at

必须有`atd` 进程运行，才会执行`at` 中设定的工作。用`at` 添加工作进程后，实际上是将此工作以文本方式写入至目录`/var/spool/at/` 中，然后该工作便能等待`atd` 的取用和执行了。

可以使用`/etc/at.allow` 和`/etc/at.deny` 两个文件对使用`at` 命令的用户作出限制。

命令

```bash
at [-mldv] TIME
```

- `-c`，列出某一项排程内容
- `-l` 相当于`atq`，列出排程
- `-d` 相当于`atrm`，删除某一排程

TIME 的设定规则举例：

```bash
at 04:00
at 04:00 2018-05-05
at now + 3 days
at now + 1 minute
```

- `at` 排程执行时是用的下达命令时所在的目录，所以为避免出错，目录相关设置可设置为绝对目录。
- `at` 是背景执行的，类似于`nohup`

### 系统有空时才进行的背景任务 batch

会在CPU负载小于0.8时，才进行所下达的任务。

> 负载：CPU在单一时间点所负责的工作数量，而非CPU使用率。CPU负载越大，会频繁地在不同任务之间切换。命令`uptime` 可看到负载信息。

`batch` 也是用`atq/atrm` 来管理的。

### 循环执行的例行性工作排程

循环执行的例行性工作排程则是由`cron(crond)` 这个系统服务来控制的。

可以使用`/etc/cron.allow` 和`/etc/cron.deny` 两个文件对使用`crontab` 命令的用户作出限制。

当用户使用`crontab` 这个指令来建立工作排程之后，该项工作就会被纪录到`/var/spool/cron/` 里面去了，而且是以账号来作为判别的。

`crontab [-e][-l][-r]`

- `-e` 编辑工作内容
- `-l` 查阅工作内容
- `-r` 移除所有工作内容

编辑工作内容，示例：

```
0-59 * * * * date >> 1.txt
分 时 日 月 周 指令
```
特殊字符包括：星号*、逗号,、减号-、斜线/n

命令内容建议使用**绝对路径**。

如果是**系统的例行性任务**，可以直接编辑`/etc/crontab` 文件。

`crond` 预设有三个地方有会执行脚本配置文件：

- `/etc/crontab` 系统维护管理
- `/etc/cron.d/*` 自己开发软件
- `/var/spool/cron/*` 个人行为

> `anacron` 可唤醒停机时间的工作任务

## 进程管理

程序被触发后，执行者的权限与属性、程序的程序代码与所需数据等都会被加载内存中，操作系统并给予这个内存内的单元一个标识符 (PID)，可以说，进程就是一个正在运作中的程序。

子进程的PPID与父进程的PID相等。

- `&` 将工作丢到背景中执行
- `ctrl + z` 将目前工作丢到背景中暂停
- `jobs` 观察目前背景中工作状态
- `fg %jobnumber` 将背景工作拿到前景来处理
- `bg` 将背景中暂停的工作变成运行状态
- `kill PID` 给某进程发送信号
- `killall name` 给相关的所有进程发送信号
- `nohup` 脱机管理工作
- `nice/renice` 调整优先级

`kill/killall` 讯号signal：

- `-9` 强制删除一个工作
- `-15` 正常步骤结束一个工作（默认）

### 进程观察

`ps` 将某个时间点的进程显示出来

- `ps -l` 当前`bash` 的进程
- `ps aux` 所有系统运作的进程

`top` 动态观察进程的状态，执行过程中可以使用指令：

- P 以CPU 使用资源排序
- M 以Memory 使用资源排序
- N 以PID 排序
- k 给予某个PID 一个signal

`pstree` 列出进程树，`-p` 同时列出PID

### 系统资源的观察

- `free` 观察内存使用情况
- `uname` 查阅系统与核心相关信息
- `uptime` 观察系统启动时间与工作负载
- `netstat` 追踪网络或插槽文件
- `dmesg` 分析核心产生的讯息
- `vmstat` 侦测系统资源变化

`netstat` 参数

- `-a` 将目前系统上所有的联机、监听、Socket 数据都列出来
- `-t` 列出tcp 网络封包的数据
- `-u` 列出udp 网络封包的数据
- `-n` 不以进程的服务名称，以端口号来显示
- `-l` 列出目前正在网络监听的服务（listing）
- `-p` 列出改网络服务的进程PID

常用命令`netstat -tulnp`

## 系统服务 daemon

早起所有的服务启动脚本通通放置于`/etc/init.d/` 底下，现在用`systemd` 来进行管理。

`systemd` 配置文件放置目录：

- `/usr/lib/systemd/system/`
- `/run/systemd/system/`
- `/etc/systemd/system/`

通过`systemctl` 指令管理

`systemctl [command] [unit]`

- start
- stop
- restart
- reload 重载配置文件
- enable 下次开机时启动
- disable 下次开机时不启动
- status 状态

直接`systemctl` 列出系统上启动的`unit`

## 软件安装

### 通过源码安装

一般步骤为：通过`configure` 来建立`Makefile`，之后通过`make` 安装即可。

`Makefile` 示例：

```
main:
	ps aux >> 1.txt
clean:
	rm 1.txt
```

### 软件安装

Red Hat/Fedora, RPM, rpm, yum

Debian/Ubuntu, DPKG, dpkg, apt-get