// Native
var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]
  
  var index = users.findIndex(function (o) { return o.age >= 40; })
  console.log(index)//1