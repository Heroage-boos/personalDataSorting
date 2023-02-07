function checkCopy() {
  const getSelectedText = () => window.getSelection().toString();
  return getSelectedText;
}

// 浏览器在全局 windows 对象上有一个名为 getSelection 的内置方法。使用此方法，你可以创建一个单行代码，返回网页上被框选的文本。
//可通过浏览器打印查看选定文本 console.log( window.getSelection().toString())
