## Upload 上传

当使用upload上传的组件时，直接使用模板无法上传图片，后台network报404，

页面上也不显示图片

原因是:

```
  <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
  </el-upload>


  data:{
  return {
      imgUrl:"",
	}
  }

  methods:{
  //请求成功触发这个回调函数
   handleAvatarSuccess(res, file) {
   //由于用户通过input标签选中图片之后，改图片就存储与浏览器内容中
      //走这段代码 不管是请求成不成公都不会添加到我们的服务器上，只会存储在浏览器内存中国
     // this.imageUrl = URL.createObjectURL(file.raw);
      //所以这里要改成
      this.imgUrl=file;
    },
    //图片上传之前触发的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
  
```

1)action走的是不真实的地址，需要走我们服务器地址

2）



需求:当用户上传图片之后，如果服务器返回网络图片地址，该地址在页面上展示

拆解:

​     1.用户如何才能上传图片

​              -借助input标签type="file"

​      2.将图片数据发送到服务器，服务器将当前图片保存在静态资源服务器上

​				一般公司中，至少会有一个专门放置静态资源的服务器