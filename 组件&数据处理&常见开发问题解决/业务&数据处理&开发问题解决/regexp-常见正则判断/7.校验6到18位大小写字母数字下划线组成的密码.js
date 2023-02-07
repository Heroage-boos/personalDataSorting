// 校验6到18位大小写字母数字下划线组成的密码
const validatePassword = (password) => {
  const reg = /^[a-zA-Z0-9_]{6,18}$/;
  return reg.test(password);
};
