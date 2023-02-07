// 首先要去判断 当前对象是否为有效对象
const isVaildObject = (obj) => {
  return typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length;
};
// 这里直接用上面的函数 如果有效就返回本身，无效就返回空对象
const safeObject = (obj) => (isVaildObject(obj) ? obj : {});
