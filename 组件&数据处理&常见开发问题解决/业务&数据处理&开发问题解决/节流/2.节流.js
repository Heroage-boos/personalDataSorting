// 节流
function throttle(fn) {
  let timer = null; // 首先设定一个变量，没有执行定时器时,默认为 null
  return function () {
    if (timer) return; // 当定时器没有执行的时候timer永远是false,后面无需执行
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)
      // 表示可以执行下一次循环了。
      timer = null;
    }, 1000);
  };
}

// 作者：braveMan
// 链接：https://juejin.cn/post/7147501250837151752
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
