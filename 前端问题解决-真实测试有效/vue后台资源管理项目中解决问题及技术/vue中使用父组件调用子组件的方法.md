[https://blog.csdn.net/Mr_EvanChen/article/details/86024632?ops_request_misc=&request_id=&biz_id=102&utm_term=vue%E7%88%B6%E7%B1%BB%E8%A7%A6%E5%8F%91%E5%AD%90%E7%B1%BB%E6%96%B9%E6%B3%95&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-.first_rank_v2_pc_rank_v29&spm=1018.2226.3001.4187](https://blog.csdn.net/Mr_EvanChen/article/details/86024632?ops_request_misc=&request_id=&biz_id=102&utm_term=vue父类触发子类方法&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-.first_rank_v2_pc_rank_v29&spm=1018.2226.3001.4187)

1.在当前父组件中的子组件上定义

```
<子组件 ref="xxxref">
```



2在子组件中定义一个需要调用的方法

```
methods:{
 method(){
   //子组件的方法
 }
}
```



3.在父组件方法中调用,子组件中的方法就会被触发

```
this.$refs.xxxref.method();
```



注意:使用v-else 或v-if 判断为移除时，获取不到