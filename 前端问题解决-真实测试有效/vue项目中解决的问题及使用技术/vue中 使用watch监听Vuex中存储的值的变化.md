# vue中使用watch监听Vuex中存储的值变化

[![青梅煮码](https://pic2.zhimg.com/v2-34f719fbf4b847f95f10d42a385042c5_xs.jpg?source=172ae18b)](https://www.zhihu.com/people/qmzm.io)

[青梅煮码](https://www.zhihu.com/people/qmzm.io)[](https://www.zhihu.com/question/48510028)

西安三码信息技术有限公司 软件开发工程师

2 人赞同了该文章

需求是当vuex中存储的PageId 发生变化，则让定义的index的值等于 PageId，那么就得实时监听PageId的变化



computed 中



```js
computed: {
	monitor () {
		return this.$store.state.PageId
	}
}
```



watch 中



```text
watch: {
	monitor () {
		this.index = this.$store.state.PageId
	}
}
```



computed 和 watch 中必须定义的函数名一样，如上代码 computed 中为 monitor，那么 watch 中也需一样为 monitor