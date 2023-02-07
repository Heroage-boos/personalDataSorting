npm设置镜像的方法（包含切换国外国内镜像源）
版权

服务器项目部署

一.通过命令配置淘宝镜像
切换为淘宝镜像命令（安装一些package容易报错）
npm config set registry https://registry.npm.taobao.org
查看当前使用的镜像地址命令
npm config get registry
如果返回 https://registry.npm.taobao.org，说明镜像配置成功。
二、切换回原镜像（安装一些package不容易报错）
npm config set registry https://registry.npmjs.org
三、其他镜像地址查询
安装nrm
npm install nrm -g
使用nrm查询其他镜像地址(出现报错，可能是因为安装了最新版本的nrm导致冲突)
nrm ls
报错结果如下 ：
node:internal/validators:119
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
    ^

[TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
  at new NodeError (node:internal/errors:363:5)
  at validateString (node:internal/validators:119:11)
  at Object.join (node:path:429:7)
  at Object.<anonymous> (C:\Users\Admin\AppData\Roaming\npm\node_modules\nrm\cli.js:17:20)
  at Module._compile (node:internal/modules/cjs/loader:1109:14)
  at Object.Module._extensions..js (node:internal/modules/cjs/loader:1138:10)
  at Module.load (node:internal/modules/cjs/loader:989:32)
  at Function.Module._load (node:internal/modules/cjs/loader:829:14)
  at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
  at node:internal/main/run_main_module:17:47
] {
  code: 'ERR_INVALID_ARG_TYPE'
}

报错解决办法 ：
使用步骤二所示方法将镜像切换为原始镜像，避免以为切换为其他镜像引起的报错；
查看nrm可用的版本
npm view nrm versions
卸载原有的nrm：
npm uninstall -g nrm
安装指定版本的nrm（这里使用1.1.0不会报错，使用的node版本为v16.3.0）
npm install -g nrm@1.1.0
查看安装的nrm版本：
nrm -V或者nrm --version
成功结果显示如下 ：
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/

  四、通过配置淘宝镜像并使用cnpm安装
  安装cnpm
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  使用cnpm
  cnpm install xxx
  其中在node v16.3.0环境下使用淘宝镜像安装一些package时出现报错，后续找到方法后更新，建议先忍一忍，使用原始镜像。

  

  

  原文链接：https://blog.csdn.net/weixin_45182409/article/details/117981169