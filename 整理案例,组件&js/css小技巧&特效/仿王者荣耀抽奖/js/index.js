var i=1;//当前移动到第几个皮肤上面
function go(){
    // 生成一个{1,14}之间的随机数
    // Math.random() 返回介于 0（包含） ~ 1（不包含） 之间的一个随机数
    var num=parseInt(Math.random()*14+1)+14;//{1,14}   +14至少走一圈
    //开启计时器
    var timer=setInterval(function (){
        num--;
        //停止计时器
        if(num==0){
            clearInterval(timer);
        }
        //去除原来选中项的样式
      var items=  document.getElementsByClassName('item');
      for( item of items){
        item.classList.remove('current');
    }
     

      

        //设置当前选中的样式
       var item= document.getElementById('item'+i);
        item.classList.add('current');
        i++; 
        if(i>14){
          i = 1;
         }

    },100);

}