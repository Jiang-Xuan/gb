# branchinfo

给git分支加注释,解决分支过多无法分辨各个分支的作用

## Intro

工作繁重下,测试不断提来bug,不断的在分支之间切来切去来改bug,改完一个bug之后想再切回原来分支,发现这么多分支,忘记了哪一个分支是刚刚的了,或许你可以单独找个地方记录分支的作用,但是不同的项目同样的分支名又会导致分支混乱或者是还要查看分支还要开着一个文件.这个时候需要来一个命令行工具来帮助分辨某一个分支到底是做什么的.

branchinfo借助node的强大能力,来实现命令行中为git的分支来添加注释.

如果你还没有安装node,请访问<https://nodejs.org/en/>

在node被安装的时候同时还会安装一个包管理器npm,使用该包管理器来安装该包.

## Install

```shell
npm install branchinfo -g
```

## Usage

在成功安装之后会在你的命令行中添加一个命令`gb`

打开你的项目根目录,添加一个新文件`.gitbranch`,键入以下内容:

  master 主分支
  0.0.1 为项目添加README文件
  0.0.2 增加一个特别棒的功能,自动写代码
  0.0.3 自动写JavaScript,放开程序员的手
  0.0.4 以上都是开玩笑的啦

为你的项目添加以上分支:

  git branch 0.0.1
  git branch 0.0.2
  git branch 0.0.3
  git branch 0.0.4

这个是用来测试的分支,千万不要用来开发功能哦.

在完成以上之后,在命令行中键入`gb`,然后回车,你就会发现你的注释已经生效.