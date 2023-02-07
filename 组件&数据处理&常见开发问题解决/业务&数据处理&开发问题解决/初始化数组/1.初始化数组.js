function iniArray() {
  // fill()方法 是 es6新增的一个方法 使用指定的元素填充数组,其实就是用默认内容初始化数组
  const arrList = Array(6).fill();
  console.log(arrList); // 此处打印的是 ['','','','','','']
}
