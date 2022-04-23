1.最初的写法

api-->user.js

```
//import axios from "axios"
//拦截器
import request from "@/utils/request";

export const cancelSale = skuId => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get" 
    
  });
};
```

view-->xxx.vue

```
import {cancelSale} from "@/api/user"
```



2.比较复杂的优化

api-->produck-->trademark.js

```
import request from "@/utils/request";
/**
 * GET /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword}
findBaseTrademarkByKeyword

GET /admin/product/baseTrademark/get/{id}
获取BaseTrademark

GET /admin/product/baseTrademark/getTrademarkList
getTrademarkList

POST /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList
findBaseTrademarkByTrademarkIdList

DELETE /admin/product/baseTrademark/remove/{id}
删除BaseTrademark

POST /admin/product/baseTrademark/save
新增BaseTrademark

PUT /admin/product/baseTrademark/update
修改BaseTrademark

GET /admin/product/baseTrademark/{page}/{limit}
 */
export default {
  //按分页获取列表
  getMarkList(page, limit) {
    return request({
      url: `/admin/product/baseTrademark/${page}/${limit}`,
      method: "get"
    });
  },
  //删除品牌
  deleteMark(skuId) {
    return {
      url: `/admin/product/baseTrademark/remove/${skuId}`,
      method: "DELETE"
    };
  },
  //添加和修改品牌
  addOrUpdate(mark) {
    if (mark.skuId) {
      return request({
        url: `/admin/product/baseTrademark/save`,
        method: "POST",
        //添加id由后天自动生成
        data: {
          ...mark
        }
      });
    } else {
      return request.put(`/admin/product/baseTrademark/update`, mark);
      /*  request({
        url: `/admin/product/baseTrademark/update`,
        method: "put",
        data: {
          ...mark
        }
      }); */
    }
  }
};

```

api-->index.js

```
// import trademark from "./product/trademark";
// import user from './user';

// export const trademark = trademark;
// export const user = user;

// 此处代码相当于上述1和4的结合体,引入之后直接暴露
export { default as user } from "./user";
export { default as trademark } from "./product/trademark";
```

src-->main.js

```
import * as API from "@/api";

//通过  vm.$API.user.login() 就能访问 但还是不太方便
```



3.简化后的语法

比较复杂的api不变，引入方式变化

src-->main.js

```
import * as API from "@/api";
Vue.prototype.$API=API
```

view-->xxx.js

```
this.$API.trademark.getTradeMarkList(this.page,this.limit)//可以直接访问到
```



--注意:全部放在原型上几乎不会影响性能，因为放在原型对象上$API上的是一个属性存放是一个地址值

