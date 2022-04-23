什么是vue?
一个渐进式框架，javascript库，也是用来构建用户界面的



Vue 设计模式





模板语法



计算属性



监视属性



...
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          name: 'Message',
          path: 'message', // 省略写法：自动补充父路由地址
        },
        {
          name: 'News',
          path: '/home/news', // 完整写法
        },
      ]
    },
  ],
});