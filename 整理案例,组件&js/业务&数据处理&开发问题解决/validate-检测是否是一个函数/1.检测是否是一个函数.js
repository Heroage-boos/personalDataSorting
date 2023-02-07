// 检测是否是一个函数  其实写法以后直接 isFunction 就好了，避免重复写判断
const isFunction = (obj) => {
  return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
};
