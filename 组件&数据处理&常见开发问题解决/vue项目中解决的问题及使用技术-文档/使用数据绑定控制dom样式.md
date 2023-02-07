1.定义cssy样式

<style>
    .xxxSty{
		样式值
    }
</style>



2.定义data

  data(){

​		retrun {

​           xxxSty:true;//或false

​     	}

​	}



3.dom中使用

  <div :class="xxxSty"></div>

