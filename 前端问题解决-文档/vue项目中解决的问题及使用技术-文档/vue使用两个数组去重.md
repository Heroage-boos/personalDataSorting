```
// _this.restaurants是数组较长的那一组，_this.tableDates是较短的那组数组
for(var i=0;i<_this.tableDates.length;i++){
     for(var j=0;j< _this.restaurants.length;j++){ 
         if( _this.restaurants[j].itemCode == _this.tableDates[i].itemCode){
          _this.restaurants.splice(j,1);
          j = j - 1;
       }
    }
}

```

