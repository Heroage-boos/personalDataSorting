// 校验2-9位文字 不符合为 false  符合为 true
const validateName = (name) => {
  const reg = /^[\u4e00-\u9fa5]{2,9}$/;
  return reg.test(name);
};

// 作者：braveMan
// 链接：https://juejin.cn/post/7147501250837151752
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
