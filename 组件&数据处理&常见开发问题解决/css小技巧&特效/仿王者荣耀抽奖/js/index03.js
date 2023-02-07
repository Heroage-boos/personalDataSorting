var i=1;
function go(){
   var num=parseInt(Math.random()*14+1)+14;
    
var timer= setInterval(function(){
     num--;
     if(num==0){
         clearInterval(timer);
     }

  var foritem=  document.getElementsByClassName('item');
  for(items of foritem ){
     items.classList.remove('current');
  }


    var items=document.getElementById('item'+i);
    items.classList.add('current');
    i++;
    if(i>14){
        i=1;
    }
     


 },300);

}
