### yarn简介：

  yarn是facebook发布的一款取代npm的包管理工具。

  yarn的特点：

- 速度超快。
- Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
- 超级安全。
  在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
- 超级可靠。
  使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

### yarn安装:

  macos下安装
    `brew install yarn`

  下载node.js，使用npm安装
    `npm install -g yarn`
    `yarn --version`

  Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可
    `yarn config set registry https://registry.npm.taobao.org -g`
    `yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g`

### yarn常用命令：

  安装yarn
    `npm install -g yarn`

  安装成功后，查看版本号：
    `yarn --version`

  全局安装包
    `yarn golbal add <package>`

##### 创建文件项目

  创建文件夹 yarn
    `md yarn`
  进入yarn文件夹
    `cd yarn`
  初始化项目
    `yarn init` // 同npm init，执行输入信息后，会生成package.json文件

  yarn的配置项：
    `yarn config list`// 显示所有配置项
    `yarn config get <key>`//显示某配置项
    `yarn config delete <key>` //删除某配置项
    `yarn config set <key> <value> [-g|--global]` //设置配置项
    `yarn global list` //获取yarn安装包列表

  安装包：
    `yarn install` [//安装package.json里所有包](https://xn--package-4g6m3574a.xn--json-8h0gt02f9uhek3g/)，并将包及它的所有依赖项保存进yarn.lock
    `yarn install --flat` //安装一个包的单一版本
    `yarn install --force` //强制重新下载所有包
    `yarn install --production` //只安装dependencies里的包
    `yarn install --no-lockfile`[//不读取或生成yarn.lock](https://xn--yarn-fb5fm02ao2zmbx542a609b.lock/)
    `yarn install --pure-lockfile` [//不生成yarn.lock](https://xn--yarn-fb5f137h141a.lock/)

  添加包（会更新package.json和yarn.lock）：

​    `yarn add [package]`// 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
​    `yarn add [package]@[version]` // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
​    `yarn add [package]@[tag]` // 安装某个tag（比如beta,next或者latest）

  //不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型：
    `yarn add --dev/-D`// 加到 devDependencies
    `yarn add --peer/-P` // 加到 peerDependencies
    `yarn add --optional/-O` // 加到 optionalDependencies

  //默认安装包的主要版本里的最新版本，下面两个命令可以指定版本：
    `yarn add --exact/-E`// 安装包的精确版本。例如yarn add foo@1.2.3会接受1.9.1版，但是yarn add foo@1.2.3 --exact只会接受1.2.3版
    `yarn add --tilde/-T`// 安装包的次要版本里的最新版。例如yarn add foo@1.2.3 --tilde会接受1.2.9，但不接受1.3.0

  发布包
    `yarn publish`
  移除一个包
    `yarn remove <packageName>`：移除一个包，会自动更新package.json和yarn.lock

  更新一个依赖
    `yarn upgrade`用于更新包到基于规范范围的最新版本

  运行脚本
    `yarn run` 用来执行在 package.json 中 scripts 属性下定义的脚本

  显示某个包的信息
    `yarn info <packageName>` 可以用来查看某个模块的最新版本信息

  缓存
    `yarn cache`
    `yarn cache list` # 列出已缓存的每个包
    `yarn cache dir` # 返回 全局缓存位置
    `yarn cache clean` # 清除缓存

### yarn和npm比较

### yarn简介：

  yarn是facebook发布的一款取代npm的包管理工具。

  yarn的特点：

- 速度超快。
- Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
- 超级安全。
  在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
- 超级可靠。
  使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

### yarn安装:

  macos下安装
    `brew install yarn`

  下载node.js，使用npm安装
    `npm install -g yarn`
    `yarn --version`

  Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可
    `yarn config set registry https://registry.npm.taobao.org -g`
    `yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g`

### yarn常用命令：

  安装yarn
    `npm install -g yarn`

  安装成功后，查看版本号：
    `yarn --version`

  全局安装包
    `yarn golbal add <package>`

##### 创建文件项目

  创建文件夹 yarn
    `md yarn`
  进入yarn文件夹
    `cd yarn`
  初始化项目
    `yarn init` // 同npm init，执行输入信息后，会生成package.json文件

  yarn的配置项：
    `yarn config list`// 显示所有配置项
    `yarn config get <key>`//显示某配置项
    `yarn config delete <key>` //删除某配置项
    `yarn config set <key> <value> [-g|--global]` //设置配置项
    `yarn global list` //获取yarn安装包列表

  安装包：
    `yarn install` [//安装package.json里所有包](https://xn--package-4g6m3574a.xn--json-8h0gt02f9uhek3g/)，并将包及它的所有依赖项保存进yarn.lock
    `yarn install --flat` //安装一个包的单一版本
    `yarn install --force` //强制重新下载所有包
    `yarn install --production` //只安装dependencies里的包
    `yarn install --no-lockfile`[//不读取或生成yarn.lock](https://xn--yarn-fb5fm02ao2zmbx542a609b.lock/)
    `yarn install --pure-lockfile` [//不生成yarn.lock](https://xn--yarn-fb5f137h141a.lock/)

  添加包（会更新package.json和yarn.lock）：

​    `yarn add [package]`// 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
​    `yarn add [package]@[version]` // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
​    `yarn add [package]@[tag]` // 安装某个tag（比如beta,next或者latest）

  //不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型：
    `yarn add --dev/-D`// 加到 devDependencies
    `yarn add --peer/-P` // 加到 peerDependencies
    `yarn add --optional/-O` // 加到 optionalDependencies

  //默认安装包的主要版本里的最新版本，下面两个命令可以指定版本：
    `yarn add --exact/-E`// 安装包的精确版本。例如yarn add foo@1.2.3会接受1.9.1版，但是yarn add foo@1.2.3 --exact只会接受1.2.3版
    `yarn add --tilde/-T`// 安装包的次要版本里的最新版。例如yarn add foo@1.2.3 --tilde会接受1.2.9，但不接受1.3.0

  发布包
    `yarn publish`
  移除一个包
    `yarn remove <packageName>`：移除一个包，会自动更新package.json和yarn.lock

  更新一个依赖
    `yarn upgrade`用于更新包到基于规范范围的最新版本

  运行脚本
    `yarn run` 用来执行在 package.json 中 scripts 属性下定义的脚本

  显示某个包的信息
    `yarn info <packageName>` 可以用来查看某个模块的最新版本信息

  缓存
    `yarn cache`
    `yarn cache list` # 列出已缓存的每个包
    `yarn cache dir` # 返回 全局缓存位置
    `yarn cache clean` # 清除缓存

### yarn和npm比较

![](https://img-blog.csdnimg.cn/20190311224816977.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2lkb215d2F5,size_16,color_FFFFFF,t_70)

