/**
 * js脚本文件，用来实现交互功能
 */

 /**
  * 定义变量
  */
  var name ='张三'
  var age=28;
//  console.log(name);//将数据输出到控制台
//  console.log(age);

 /**
  * 条件判断
 */
// if(age>=18){
//     console.log("成年");
// }else{
//     console.log("未成年");
// }

/**
 * 数组
 */
var names =['唐伯虎','秋香','石榴姐'];
// console.log(names);

/**
 * 循环
 */
// for(var a of names){
//    console.log(a);
// }

/**
 * 定义函数
 */
// function print(){
//     console.log(name);
//     console.log(age);
// }
// print();//调用函数
// print();


/**
 * 随机数
 */
// var x=Math.random();//随机生成（0-1）之间的小数
//随机生成一个【1-100】之间的整数
// var x=parent(Math.random()*100+1);//{1,101}
// console.log(x);

/**
 * 计时器
 */
function start(){
    var i=1;
    var timer = setInterval(function(){//设置关闭的计时器
        console.log(i);
        i++;//自增，每次加1

        if(i>20){
            clearInterval(timer);//停止计时器
            console.log("计时器停止啦");
        }
    },2000);//1秒 =1000毫秒
}


/**
 * 页面DOM操作
 */

 function change(){
//   var tiger= document.getElementById('tiger');
//    tiger.classList.add('a3');
//       tiger.classList.remove('a1');
//    console.log(tiger.classList);
 var items=document.getElementsByClassName('bbb');
 for(var items of items){
    // console.log(items);
      items.classList.add('a2');
 }
 }