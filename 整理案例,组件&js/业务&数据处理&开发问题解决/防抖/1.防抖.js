// 防抖
// fn 需要防抖的函数，delay 为定时器时间
function debounce(fn, delay) {
  let timer = null; // 用于保存定时器
  return function () {
    // 如果timer存在 就清除定时器，重新计时
    if (timer) {
      clearTimeout(timeout);
    }
    //设置定时器，规定时间后执行真实要执行的函数
    timeout = setTimeout(() => {
      fn.apply(this);
    }, delay);
  };
}

// 作者：braveMan
// 链接：https://juejin.cn/post/7147501250837151752
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
