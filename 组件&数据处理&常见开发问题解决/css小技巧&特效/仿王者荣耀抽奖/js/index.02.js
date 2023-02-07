var i=1;
function go(){
 var num=parseInt(Math.random()*14+1)+14;

//  1.设置一个定时器
 var timer= setInterval(function(){
  num--;
  if(num==0){
      clearInterval(timer);
  }
//设置当前样式
  var item=  document.getElementsByClassName('item');
  for( items of item){
      items.classList.remove('current');
  }

  //设置当前选过的样式
  var items=document.getElementById('item'+i);
  items.classList.add('current');
  i++;

if(i>14){
i=1;
}

  },300)


}