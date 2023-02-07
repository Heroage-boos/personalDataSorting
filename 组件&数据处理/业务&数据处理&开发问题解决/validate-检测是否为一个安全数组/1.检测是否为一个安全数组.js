// 检测是否为一个安全数组,若不是返回空数组  这里借助isArray 方法
const safeArray = (array) => {
  return Array.isArray(array) ? array : [];
};
