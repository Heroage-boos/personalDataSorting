官网地址:https://www.swiper.com.cn/api/index.html



封装一个swiper组件

components-->carousel-->index.vue

```
<template>
  <div
    class="swiper-container"
    ref="swiper"
    @mouseenter="swiper.autoplay.stop()"
    @mouseleave="swiper.autoplay.start()"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in imageList" :key="img.id">
        <img :src="img.imgUrl" :alt="img.id" />
      </div>
    </div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
//下载swiper
//引入swiper结构和样式
import Swiper from "swiper";
//npm i swiper@5
import "swiper/css/swiper.min.css";
//引入html
//暴露出去
export default {
  name: "Carousel",
  props: {
    imageList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    imageList: {
      handler(imageList) {
        // 新问题：第一个轮播图触发两次，第一次触发没有意义，第一次没有数据
        if (!imageList.length) return;
        // 当此函数触发了，就有值了～
        this.$nextTick(() => {
          // 当此函数触发了，DOM元素就更新好了～
          this.swiper = new Swiper(this.$refs.swiper, {
            navigation: {
              nextEl: ".swiper-button-next",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击分页器的指示点分页器会控制Swiper切换。
            },
            loop: true, // 无缝轮播
            autoplay: true, // 自动轮播
          });
        });
      },
      immediate: true, // 让watch一上来触发
    },
  },
};
</script>

```

view-->xxx.vue

使用swiper轮播图

```
<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :imageList="imgList" />
      </div>
      <NavTypeRight />>
    </div>
  </div>
</template>


<script>
//引入swiper组件
import Carousel from "../../../carousel";

export default {
 name:"xxx",
 data(){   
   //这里存放图片要轮播的图片
   imgList:[]
 }
}
</script>

```

