# git

分布式版本控制工具

要求掌握两个点：

1. 如何进行本地版本控制
2. 如何与远程仓库进行交互



## 1 Git生成秘钥

 

### 1.1 确认本地秘钥

 

SSH 秘钥默认储存在账户的主目录下的 ~/.ssh 目录

如：C:\Users\BF100400\.ssh\

查看是否包含id_rsa和id_rsa.pub(或者是id_dsa和id_dsa.pub之类成对的文件)，有.pub 后缀的文件就是公钥，另一个文件则是密钥。

如果有这两个文件，则跳过1.2；如果没有这两个文件，甚至.ssh目录也没有，则需要用ssh-keygen 来创建

 

### 1.2 生成秘钥信息

- 在.ssh 目录下右键打开Git Bash(.ssh目录不存在，则在任一目录下操作，或者手动创建该目录)

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713090847777-172058387.png)

- 生成秘钥：ssh-keygen -t rsa -C "your_email@youremail.com" ，直接Enter就行，然后会提示输入密码(可输可不输)

　　  **说明**：命令中的email，就是gitlab中的账号，需要保持一致

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713091132873-649479118.png)

- 执行完成之后，在.ssh 目录下就会生成秘钥文件（没有.ssh目录的会自动生成，手动创建的则不会重复生成）

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713091212844-1148120549.png)

 

## 2 gitlab秘钥添加

笔者当前所在公司使用的gitlab作为代码管理仓库平台，所以下面是gitlab为例说明如何进行秘钥添加，如果个人研究或学习使用的是github，方法同下

 

### 2.1登录gitlab

使用申请的gitlab账号登录

确保登录成功

 

### 2.2 添加秘钥

- 在搜索框中搜索：SSH Keys

![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713095253730-1712799284.png)

- 点击 Add SSH Keys

![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713095353677-140232680.png)

- 拷贝公钥文件(即1.2中生成的id_rsa.pub)中的信息到key输入框中，title可以随便起，见名知意即可。然后点击Add Keys

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713095445564-1455885333.png)

至此，git及gitlab相关配置已经全部完成，接下来可以使用git从gitlab上克隆代码来测试相关安装和配置的正确性

 

## 3 Git示例

 

注意：克隆代码之前确保有相关的项目代码权限(master、developer、reporter)，如无权限，请求项目具有master权限的同事帮忙分配权限

 

- 这里以verify-center项目为例(有相关权限的项目，登录gitlab后，首页右侧会全部以列表形式展示)，点击verify-center获取SSH 链接地址

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713095551519-1241111736.png)

- 在本地目标下载目录下，右键-->Git Bash Here
- 输入命令：git clone git@gitlab.baofoo.net:clearing/verify-center.git
- 首次拉取代码时，需要确认秘钥信息，输入yes即可

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713094502121-415189976.png)

- 确认项目已从gitlab上克隆到本地

 ![img](https://images2018.cnblogs.com/blog/1090314/201807/1090314-20180713094515814-1131813335.png)

 

项目拉取完成，可以打开使用了



## 本地版本控制

1. git init
   初始化 git 本地仓库（只需要做一次）
2. 基本概念：三个区

- 工作区：刚刚修改、新建、删除文件，会保存在工作区（写代码的区域）
- 暂存区：暂时保存代码的区域
- 版本区：进行本地版本控制代码的区域

3. git add .
   将工作区文件添加到暂存区中
4. git commit -m '注释'
   将暂存区文件添加版本区中
5. git status
   查看代码的位于哪个区（状态）
   红色：位于工作区
   绿色：位于暂存区
   没有：位于版本区

## 2. 远程仓库交互

注意：必须先进行本地版本控制，再进行远程仓库交互
因为推送代码，只能推送本地版本区代码，其他区域推不上远程仓库

1. 本地没有仓库，远程有仓库，怎么交互

- 场景：初次到公司，参与项目开发。负责人先创建好远程仓库，程序员负责拉取远程仓库代码到本地来开发
- 将远程仓库克隆下来

  - git clone repo_url

2. 本地有一个仓库，远程没有仓库，怎么交互

- 新建本地仓库，并做好本地版本控制

  - git init
  - git add .
  - git commit -m 'xxx'
- 先将本地仓库和远程仓库关联上（只需要做一次）

  - git remote add origin repo_url 关联远程仓库

    - git remote remove origin 删除关联远程仓库地址
  - 远程仓库地址有两种

    - https：需要用户名和密码认证
      - 往往第一次需要，后续会自动保存
    - ssh：需要进行 ssh 钥匙验证
      - 首先本地电脑需要生成 ssh 的秘钥和公钥：ssh-keygen -t rsa
        - 按三次回车
        - 地址在 `C:\Users\xxx用户\.ssh`
        - `id_rsa` 秘钥
        - `id_rsa.pub` 公钥
      - 将公钥所有内容复制，添加到个人的 ssh 公钥管理中
      - 当前电脑就拥有操作个人仓库的权限了
- 将本地仓库代码推送到远程仓库去

  - git push -u origin master
    - 将来推送 master，可以简化指令为 git push
    - 将来推送 dev 分支，指令为：git push origin dev
    - 第一次使用 ssh 推送，需要输入 yes 记录 gitee 的地址