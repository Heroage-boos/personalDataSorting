支付需要请求接口然后接口会返回一个携带一个img图片

我们需要采用qrcode插件将img图片转换成base64图片然后进行展示和支付



```
import { payInfo, oderInfo } from "../../../api/submitOrder";
//显示的支付扫描弹出框
import Dialog from "../../../components/Dialog";
//qecode库
import QRCode from "qrcode";


methods: {
    async showPay() {
      const { orderId } = this.$route.query;
      const res = await payInfo(orderId);
      // 将微信支付的地址转换成二维码图片地址
      this.codeUrl = await QRCode.toDataURL(res.codeUrl);
      /*   console.log(this.codeUrl);支付二维码 base64格式 */
      // 查询支付状态
      this.oderInfo();
      //让弹出框显示
      this.visible = true;
    },
    
    //查询支付状态的方法
     oderInfo() {
      // 先清除
      clearInterval(this.timer);
      // 在设置
      this.timer = setInterval(async () => {
        await oderInfo(this.$route.query.orderId);
        // 成功了
        this.$router.history.push("/paySuccess");
      }, 5000);
    },
  }
  
```

