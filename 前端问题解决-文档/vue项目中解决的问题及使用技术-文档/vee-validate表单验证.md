官网:https://vee-validate.logaretm.com/v4/



vee-validate 用来专门做表单验证的库

1.下载

```
//下载
npm i vee-validate
```

2.封装一个js验证

view-->register-->validation.js

```
//引入声明验证规则
import { extend } from "vee-validate";
//引入的Reg正则验证
import { passwordReg, phoneReg, codeReg } from "../../utils/regs";
/**
export const phoneReg = /^1[0-9]{10}$/;
export const passwordReg = /^[0-9a-zA-Z_]{6,18}$/;
export const codeReg = /^[0-9]{6}$/;
*/

// 定义表单校验规则
extend("phoneRequired", {
  //
  validate(value) {
    return !!value;
  },
  message: "手机号不能为空", // 校验失败提示的错误信息
  computesRequired: true, // 必要的
});

extend("phone", {
  validate(value) {
    // console.log(value);
    return phoneReg.test(value);
  },
  message: "请输入合法手机号", // 校验失败提示的错误信息
});

extend("passwordRequired", {
  validate(value) {
    return !!value;
  },
  message: "密码不能为空",
  computesRequired: true,
});

extend("password", {
  validate(value) {
    return passwordReg.test(value);
  },
  message: "请输入合法密码",
});

extend("rePasswordRequired", {
  validate(value) {
    return !!value;
  },
  message: "确认密码不能为空",
  computesRequired: true,
});

extend("rePassword", {
  validate(rePassword, { password }) {
    // console.log(args);
    // 获取到密码
    return rePassword === password;
  },
  message: "两次密码输入不一致",
  params: ["password"], // 声明接受参数
});

extend("codeRequired", {
  validate(value) {
    return !!value;
  },
  message: "手机验证码不能为空",
  computesRequired: true,
});

extend("code", {
  validate(value) {
    return codeReg.test(value);
  },
  message: "验证码输入不正确",
});

extend("verify", {
  validate(value) {
    return value;
  },
  message: "请同意用户协议",
  computesRequired: true,
});

```

3.引入并使用

view-->register-->index.vue

```
 //提交时候判断是否验证  全局验证
 <ValidationObserver v-slot="{ handleSubmit }">
        <form class="register" @submit.prevent="handleSubmit(submit)">
          //局部验证 rules验证规则名 tag浏览器替换标签   提示验证错误v-slot="{ errors }"
          <ValidationProvider
            class="content"
            name="phone"
            rules="phoneRequired|phone"
            tag="div"
            :debounce="1000"
            v-slot="{ errors }"
          >
            <label>手机号:</label>
            // v-model="user.phone"绑定验证data
            <input
              type="text"
              placeholder="请输入你的手机号"
              v-model="user.phone"
            />
            //提示报错信息
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          
          <ValidationProvider
            class="controls"
            rules="verify"
            tag="div"
            :debounce="1000"
            v-slot="{ errors }"
          >
            <input name="m1" type="checkbox" v-model="user.verify" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="btn" @click="submit">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>


<script>

import { ValidationObserver, ValidationProvider } from "vee-validate";
//必须引入 验证规则文件
import "./validation";

export default {
  methods: {
    submit() {
      console.log("全部验证通过之后会打印");
    },
  },
};
</script>

```



