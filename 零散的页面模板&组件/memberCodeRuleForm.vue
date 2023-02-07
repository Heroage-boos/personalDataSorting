<template>
  <el-form
      class="member-code-rule-form"
      label-position="top"
      :model="info"
      :rules="rules"
      ref="memberCodeRuleForm"
      size="mini"
  >
    <!-- {{ info }} -->
    <el-form-item label="规则名称" prop="rule_name">
      <el-input
          v-model="info.rule_name"
          maxlength="10"
          show-word-limit
          clearable
          placeholder="请输入规则名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="rule_type">
      <el-radio-group v-model="info.rule_type" @change="ruleTypeChange">
        <el-radio
            v-for="item in ruleTypeOption"
            :label="item.value"
            :key="item.key"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="使用成员" prop="member_id">
      <!-- 组件待插入   :customSelectedFn="customSelectedFn" -->
      <add-member-dialog
          ref="addMemberDialogRef"
          input-placeholder="请选择成员"
          :write-back-selected-member-org="writeBackSelectedMemberOrg"
          :is-multiple-selected="info.rule_type == '2'"
          :custom-input-value-fn="customInputValueFn"
          :custom-selected-fn="customSelectedFn"
          :isMultipleSelected="false"
          @confirm="confirmChooseMember"
      >
      </add-member-dialog>
    </el-form-item>
    <el-form-item
        v-if="info.rule_type === '2'"
        label="分配客流规则"
        prop="code_name"
    >
      <el-select
          v-model="info.diversion_rule"
          clearable
          placeholder="请选择"
          class="w-100percent"
      >
        <el-option
            v-for="item in diversionOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <template v-if="info.rule_type === '2' && info.diversion_rule === '1'">
      <el-form-item
          label="扫码次数达到设置数后，自动替换其他成员"
          prop="scans_number_limit"
      >
        <el-input-number
            class="w-100percent text-align-left"
            v-model="info.scans_number_limit"
            :controls="false"
            :min="0"
            :step="1"
            step-strictly
            placeholder="请输入"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item
          label="添加人数达到设置数后，自动替换其他成员"
          prop="add_people_number_limit"
      >
        <el-input-number
            class="w-100percent text-align-left"
            v-model="info.add_people_number_limit"
            :controls="false"
            :min="0"
            :step="1"
            step-strictly
            placeholder="请输入"
        >
        </el-input-number>
      </el-form-item>
    </template>
    <div class="form-item-row flex-row-between">
      <div class="form-item-row-label">
        <span class="form-item-row-label-t1">自动通过</span>
        <span class="form-item-row-label-t2"
        >（客户添加时无需经过确认自动成为好友）</span
        >
      </div>
      <el-switch v-model="info.is_pass" active-value="1" inactive-value="2">
      </el-switch>
    </div>
    <el-form-item label="有效时间" prop="is_long_term">
      <el-radio-group v-model="info.is_long_term">
        <el-radio
            v-for="item in longTermOption"
            :label="item.value"
            :key="item.key"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <div class="p-t-8 w-100percent">
        <el-date-picker
            class="w-100percent"
            size="mini"
            v-if="info.is_long_term === '2'"
            v-model="info.timeRange"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </el-form-item>
    <div class="form-item-row flex-row-between">
      <div class="form-item-row-label">
        <span class="form-item-row-label-t1"> 是否启用该配置 </span>
      </div>
      <el-switch v-model="info.is_use"
                 active-value="1"
                 inactive-value="2"
                 :disabled="isDisabled"
      >
      </el-switch>
    </div>
    <div class="form-tip-row">
      <div class="m-b-16 flex-row flex-col-center">
        <img
            class="tip-icon m-r-8"
            src="../../../static/image/common/info.png"
        />
        <div class="form-tip-title">温馨提示：</div>
      </div>
      <div class="form-tip-txt m-b-8">
        1、请注意启用该配置时，已启用的配置会被禁用
      </div>
      <div :class="['form-tip-txt', info.rule_type === '2' ? 'm-b-8' : '']">
        2、引流规则只允许选择一条生效规则
      </div>
      <div class="form-tip-txt m-b-8" v-if="info.rule_type === '2'">
        3、规则：填写设置数后，扫码次数、添加人数这两个配置其中一个，配置的那个生效。同时配置两个时，以最小限制条件来生效规则。程序上是先按扫码次数、添加人数顺序来。
      </div>
    </div>
  </el-form>
</template>
<script>
module.exports = {
  name: "member-code-rule-form",
  props: {
    writeBackRule: {
      type: Object,
      default: function () {
        return {
          id: "",
        };
      },
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      baseInfo: {
        rule_name: "",
        rule_type: "1",
        member_id: "",
        diversion_rule: "1",
        scans_number_limit: "",
        add_people_number_limit: "",
        is_pass: "1",
        is_long_term: "1",
        timeRange: [],
        is_use: "1",
      },
      info: {},
      rules: {
        rule_name: [
          {required: true, message: "请输入规则名称", trigger: "blur"},
          { max: 10, message: '长度在 10 个字符', trigger: 'blur' }
        ],
        rule_type: [{required: true, message: "请选择类型", trigger: "blur"}],
        is_long_term: [
          {required: true, message: "请选择有效时间", trigger: "blur"},
        ],
        member_id: [
          {required: true, message: "请选择使用成员", trigger: ["blur", "change"]},
        ],
        scans_number_limit: [
          {required: true, message: "请填写扫码次数", trigger: "blur"},
        ],
        add_people_number_limit: [
          {required: true, message: "请填写扫码次数", trigger: "blur"},
        ],
      },
      writeBackSelectedMemberOrg: [],
      ruleTypeOption: [
        {
          value: "1",
          label: "单成员",
        },
        {
          value: "2",
          label: "多成员",
        },
      ],
      longTermOption: [
        {
          value: "1",
          label: "长期有效",
        },
        {
          value: "2",
          label: "有效时间",
        },
      ],
      diversionOption: [
        {
          value: "1",
          label: "客户数限制",
        },
        {
          value: "2",
          label: "随机",
        },
      ],
      customInputValueFn: (param) => {
        return this.getShowStr(param, 3) || "";
      },
      // isDisabled: false
    };
  },
  created() {
    // this.info = {
    //   ...this.baseInfo
    // }
  },
  methods: {
    ruleFormClearValidate() {
      if (this.$refs.memberCodeRuleForm) {
        this.$refs.memberCodeRuleForm.clearValidate();
      }
    },
    validateForm() {
      return new Promise((res, rej) => {
        this.$refs.memberCodeRuleForm.validate((valid) => {
          res(valid);
        });
      })
    },
    customSelectedFn(data, len) {
      // return !data.isOrg;
      // 单成员只能选人
      if (this.info.rule_type === "1") {
        return !data.isOrg;
      } else {
        if (data.isOrg) {
          return false;
        } else if (len >= 50) {
          this.$message.error('客户人数最多支持选择 50 人！');
          return false;
        } else {
          return true;
        }
      }
    },
    ruleTypeChange(v) {
      this.writeBackSelectedMemberOrg = [];
    },
    getShowStr(arr, len) {
      return `${arr
          .slice(0, len)
          .map((ele) => ele[`member_name`] || ele[`department_name`])
          .join("，")}${arr.length > len ? "..." : ""}`;
    },
    confirmChooseMember(r) {
      console.log("选人=====", r);
      this.writeBackSelectedMemberOrg = r;
      if (r && Array.isArray(r)) {
        let member_id = r.map(ele => ele.id).join(',');
        this.$set(this.info, 'member_id', member_id);
        this.$set(this.info, 'member_arr', r);
      }
      if (this.$refs.addMemberDialogRef) {
        this.$refs.addMemberDialogRef.dialogVisible = false;
      }
    },
  },
  watch: {
    writeBackRule: {
      handler(n, o) {
        console.log("监听变化", n, this.writeBackRule);
        if (n && n.id) {
          let r = JSON.parse(JSON.stringify({...this.baseInfo, ...this.writeBackRule}));
          if (r.is_long_term === '2') {
            r.timeRange = [r.begin_time, r.end_time];
          }
          this.info = r;
          // 回显编辑数据
          this.writeBackSelectedMemberOrg = r.member_arr.map(ele => {
            return {
              ...ele,
              id: ele.member_id,
              member_name: ele.name
            }
          });
          if (this.info.is_use == "1") {
            this.$emit("set-switch-disable", true);
          }
          console.log("编辑", this.info);
        } else {
          this.info = {
            ...this.baseInfo
          }
          this.writeBackSelectedMemberOrg = [];
          // Object.assign(this.info, this.baseInfo);
          console.log("新增===", this.info);
        }
      },
      immediate: true,

    }
  },
  components: {
    "add-member-dialog": httpVueLoader(
        "../../addMemberDialog/addMemberDialog.vue"
    ),
  },
};
</script>
<style scoped>
@import url("../../../../../static/memberCode/memberCodeRuleForm.css");
</style>