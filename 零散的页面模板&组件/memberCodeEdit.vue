<template>
  <div class="member-code-edit">
    <div class="page-step-title">
      <div class="step-index m-r-8">1</div>
      <div class="step-txt">基本配置</div>
    </div>
    <div>
      <el-row>
        <el-col :sm="16" :md="12" :lg="12">
          <el-form
            label-position="top"
            :model="info"
            :rules="rules"
            ref="memberCodeEditForm"
            size="mini"
          >
            <el-form-item label="分组名称" prop="group_id">
              <a-tree-select
                class="ant-select-selection"
                size="small"
                v-model="info.group_id"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择分组名称"
                allow-clear
                tree-default-expand-all
                ref="crudClassifyTree"
                v-on:search="searchGroupKey"
                :tree-data="groupTreeData"
                :replace-fields="replaceFields"
                :filter-tree-node="filterGroupTreeNode"
                treeNodeFilterProp="title"
              >
              </a-tree-select>
            </el-form-item>
            <el-form-item label="成员活码名称" prop="code_name">
              <el-input
                v-model="info.code_name"
                maxlength="10"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="code_description">
              <el-input
                v-model="info.code_description"
                maxlength="20"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="给客户标记标签" prop="tag_id">
              <select-tag
                ref="selectTag"
                :write-back-selected-tag="info.tag_arr"
                :max-tag-num="200"
              >
              </select-tag>
            </el-form-item>
            <el-form-item label="欢迎语" class="m-b-0">
              <div class="welcome-tip-txt">
                不填成员活码欢迎语，则默认发送成员欢迎语，如无成员欢迎语则发送通用欢迎语！
              </div>
              <welcome-text-and-file
                ref="welcomFileList"
                :write-back-welcome="writeBackWelcome"
                :allow-add-wechat-app-type="[0]"
              >
              </welcome-text-and-file>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="page-step-title flex-row-between">
      <div class="flex-row">
        <div class="step-index m-r-8">2</div>
        <div class="step-txt">活码规则配置</div>
      </div>
      <div class="flex-row flex-col-center" v-if="this.pageType === 'edit'">
        <el-button size="mini" ref="ruleData" @click="addRule">
          新建规则
        </el-button>
        <el-popover
          placement="bottom-start"
          title="说明：引流规则只允许选择一条生效规则"
          width="280"
          trigger="hover"
          popper-class="tip-title-popover"
        >
          <img
            slot="reference"
            class="tip-icon m-l-8"
            src="../../static/image/common/info.png"
          />
        </el-popover>
      </div>
    </div>
    <!-- 新增 规则 -->
    <div v-if="this.pageType === 'add'">
      <el-row>
        <el-col :sm="16" :md="12" :lg="12">
          <!-- @update-choose-member="updateChooseMember" -->
          <member-code-rule-form ref="addMemberCodeForm" type="add">
          </member-code-rule-form>
          <div class="flex-row-end m-t-16">
            <el-button size="mini" @click="backToList">取消 </el-button>

            <el-button
              size="mini"
              type="primary"
              @click="saveAdd"
              :loading="loadingbut"
              >{{ loadingbuttext }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 编辑 规则 -->
    <div v-if="this.pageType === 'edit'">
      <member-code-rule ref="memberCodeRule"></member-code-rule>
      <div class="flex-row-end m-t-16">
        <el-button size="mini" @click="backToList">取消 </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveUpdate"
          :loading="loadingbut"
          >{{ loadingbuttext }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "member-code-edit",
  data() {
    return {
      // 页面相关
      pageType: "add",
      // 表单
      info: {
        group_id: "",
        code_name: "",
        code_description: "",
        tag_id: "",
      },
      rules: {
        group_id: [
          { required: true, message: "请选择分组名称", trigger: "blur" },
        ],
        code_name: [
          { required: true, message: "请输入成员活码名称", trigger: "blur" },
          { max: 10, message: "长度在 10 个字符", trigger: "blur" },
        ],
        code_description: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { max: 20, message: "长度在 20 个字符", trigger: "blur" },
        ],
      },
      // 分组名称
      treeExpandedKeys: [],
      groupTreeData: [],
      searchKey: "",
      replaceFields: {
        children: "children",
        title: "name",
        value: "id",
        key: "id",
      },
      // 欢迎语
      writeBackWelcome: {},

      value: "",
      loadingbut: false, //审核提交加载中
      loadingbuttext: "确定",
      searchGroupName: "",
    };
  },
  created() {
    this.initPage();
    this.getGroupTreeData();
  },
  methods: {
    searchGroupKey(v) {
      this.searchGroupName = v;
      this.getGroupTreeData();
      console.log("最新的数据===", this.groupTreeData);
    },
    getQueryVariable,
    filterGroupTreeNode(searchKey, node) {
      console.log(node.data.props);
      if (node.data.props && node.data.props.name.includes(searchKey)) {
        return true;
      }
    },
    backToList() {
      let groupId = this.getQueryVariable("group_id") || 0;
      let pageNo = this.getQueryVariable("page_no") || 1;
      let fromPage = this.getQueryVariable("from_page") || "member_code";
      let id = this.getQueryVariable("id") || 0;

      if (fromPage == "member_code") {
        location.href = `/${fromPage}?back_tree_id=${groupId}&back_table_page_no=${pageNo}`;
      } else {
        location.href = `./${fromPage}?group_id=${groupId}&back_table_page_no=${pageNo}&id=${id}`;
      }
    },
    addRule() {
      this.$refs.memberCodeRule.handleAddRule();
    },
    initPage() {
      this.pageType = this.getQueryVariable("type") || "add";
      if (this.pageType === "add") {
        this.initAddPage();
      } else if (this.pageType === "edit") {
        this.initEditPage();
      }
    },
    initAddPage() {
      this.info.group_id = this.getQueryVariable("group_id");
      // this.info.group_name = decodeURI(this.getQueryVariable("group_name"));
      this.writeBackWelcome = {
        content: "",
        emojiPopoverVisible: false,
        other_content_list: [],
      };
    },
    initEditPage() {
      let id = this.getQueryVariable("id");
      console.log("成员活码回显===", id);
      let that = this;
      Admin.api.ajax(
        {
          url: "/member_code/update",
          loading: true,
          type: "get",
          data: { id: id },
        },
        (ret, res) => {
          if (res.code != 200) {
            window.location.href = "./member_code";
          } else {
            let info = res.data;
            that.info = info;
            let writeBackWelcome = {
              content: info.welcome_msg_data.text_message,
              other_content_list: info.welcome_msg_data.attachment_data,
            };
            this.writeBackWelcome = writeBackWelcome;
          }
        }
      );
    },
    getGroupTreeData() {
      Admin.api.ajax(
        {
          url: "/member_code_group",
          loading: true,
          type: "get",
          data: { search_name: this.searchGroupName },
        },
        (ret, res) => {
          this.groupTreeData = [];
          console.log("结果==", res);
          this.$forceUpdate();
          this.groupTreeData = res.data;
        }
      );
    },

    async saveAdd() {
      let checkW = await this.$refs.welcomFileList.getQueryVariable();
      if (!checkW) {
        return;
      }

      let groupId = this.info.group_id;
      let codeData = [];
      let addMemberCodeFormV = await this.$refs[
        "addMemberCodeForm"
      ].validateForm();
      this.$refs["memberCodeEditForm"].validate((valid) => {
        if (valid && addMemberCodeFormV) {
          this.loadingbut = true;
          this.loadingbuttext = "提交中...";
          let codeInfo = this.$refs.addMemberCodeForm.info;
          let tagId = this.$refs.selectTag.tags.map((ele) => ele.id).join(",");
          codeData = {
            ...this.info,
            ...codeInfo,
            ...{ tag_id: tagId },
          };
          console.log("新增save", tagId, {
            ...this.info,
            ...codeInfo,
            ...{ tag_id: tagId },
          });
          console.log("成员活码结果===", codeData);

          let message_attachment_data =
            this.$refs.welcomFileList.info.other_content_list;
          let message_text = this.$refs.welcomFileList.info.content;
          let attachment_data = [];

          console.log("附件内容", message_attachment_data);
          for (var i = 0; i < message_attachment_data.length; i++) {
            let attachment = {
              msg_type: "",
              qw_media_id: "",
              qw_pic_url: "",
              qw_link_title: "",
              qw_link_picurl: "",
              qw_link_desc: "",
              qw_link_url: "",
              qw_miniprogram_title: "",
              qw_miniprogram_pic_url: "",
              qw_miniprogram_appid: "",
              qw_miniprogram_page: "",
              qw_video_url: "",
            };

            switch (message_attachment_data[i].type) {
              case 1:
                attachment.msg_type = "IMAGE";
                attachment.qw_pic_url = message_attachment_data[i].upload_url;
                break;

              case 2:
                attachment.msg_type = "MINIPROGRAM";
                attachment.qw_miniprogram_page = message_attachment_data[i].url;
                attachment.qw_miniprogram_appid =
                  message_attachment_data[i].appid;
                attachment.qw_miniprogram_title =
                  message_attachment_data[i].title;
                attachment.qw_miniprogram_pic_url =
                  message_attachment_data[i].upload_url;
                attachment.qw_media_id = message_attachment_data[i].media_id;
                break;
              case 3:
                attachment.msg_type = "LINK";
                attachment.qw_link_title = message_attachment_data[i].title;
                attachment.qw_link_picurl =
                  message_attachment_data[i].upload_url;
                attachment.qw_link_desc =
                  message_attachment_data[i].description;
                attachment.qw_link_url = message_attachment_data[i].url;
                break;
              case 4:
                attachment.msg_type = "VIDEO";
                attachment.qw_video_url = message_attachment_data[i].media_url;
                attachment.qw_media_id = message_attachment_data[i].media_id;
            }
            attachment_data.push(attachment);
          }
          let message_data = {
            text_message: message_text,
            attachment_data: attachment_data,
          };

          console.log("欢迎语结果===", message_data);

          let param = {
            group_id: codeData.group_id,
            code_name: codeData.code_name,
            code_description: codeData.code_description,
            is_tag: codeData.tag_id.length > 0 ? 1 : 2,
            tag_id: codeData.tag_id,
            is_welcome:
              (message_data.text_message.length > 0 ||
                message_data.attachment_data.length) > 0
                ? 1
                : 2,
            welcome_msg_data: JSON.stringify(message_data),
            rule_name: codeData.rule_name,
            rule_type: codeData.rule_type,
            diversion_rule: codeData.diversion_rule,
            add_people_number_limit:
              codeData.add_people_number_limit != "undefined"
                ? codeData.add_people_number_limit
                : 0,
            scans_number_limit:
              codeData.scans_number_limit != "undefined"
                ? codeData.scans_number_limit
                : 0,
            begin_time:
              codeData.timeRange.length > 0 ? codeData.timeRange[0] : "",
            end_time:
              codeData.timeRange.length > 0 ? codeData.timeRange[1] : "",
            is_use: codeData.is_use,
            is_pass: codeData.is_pass,
            is_long_term: codeData.is_long_term,
            member_id: codeData.member_id,
          };
          Admin.api.ajax(
            {
              url: "/member_code/add",
              async: true,
              type: "post",
              data: param,
            },
            (ret, res) => {
              location.href = `/member_code?back_tree_id=${groupId}&back_table_page_no=1`;
              this.$message({
                type: "success",
                message: "添加成功",
              });
            },
            (ret, res) => {
              this.loadingbut = false;
              this.loadingbuttext = "提交";
            }
          );
          console.log(param);
        }
      });
    },
    async saveUpdate() {
      let fromPage = this.getQueryVariable("from_page") || "member_code";
      let checkW = await this.$refs.welcomFileList.getQueryVariable();
      if (!checkW) {
        return;
      }
      this.$refs["memberCodeEditForm"].validate((valid) => {
        if (valid) {
          let groupId = this.info.group_id;
          let pageNo = this.getQueryVariable("page_no");
          this.loadingbut = true;
          this.loadingbuttext = "提交中...";

          let id = this.getQueryVariable("id");

          console.log("info===", this.info);
          let tagId = this.$refs.selectTag.tags.map((ele) => ele.id).join(",");
          console.log("tagId===", tagId);

          let new_message_attachment_data =
            this.$refs.welcomFileList.info.other_content_list;
          let new_message_text = this.$refs.welcomFileList.info.content;

          let message_attachment_data = new_message_attachment_data;
          let message_text = new_message_text;

          console.log("附件", message_attachment_data);
          console.log("附件消息", message_text);

          let attachment_data = [];
          for (var i = 0; i < message_attachment_data.length; i++) {
            let attachment = {
              msg_type: "",
              qw_media_id: "",
              qw_pic_url: "",
              qw_link_title: "",
              qw_link_picurl: "",
              qw_link_desc: "",
              qw_link_url: "",
              qw_miniprogram_title: "",
              qw_miniprogram_pic_url: "",
              qw_miniprogram_appid: "",
              qw_miniprogram_page: "",
              qw_video_url: "",
            };

            switch (message_attachment_data[i].type) {
              case 1:
                attachment.msg_type = "IMAGE";
                attachment.qw_pic_url = message_attachment_data[i].upload_url;
                break;

              case 2:
                attachment.msg_type = "MINIPROGRAM";
                attachment.qw_miniprogram_page = message_attachment_data[i].url;
                attachment.qw_miniprogram_appid =
                  message_attachment_data[i].appid;
                attachment.qw_miniprogram_title =
                  message_attachment_data[i].title;
                attachment.qw_miniprogram_pic_url =
                  message_attachment_data[i].upload_url;
                attachment.qw_media_id = message_attachment_data[i].media_id;
                break;
              case 3:
                attachment.msg_type = "LINK";
                attachment.qw_link_title = message_attachment_data[i].title;
                attachment.qw_link_picurl =
                  message_attachment_data[i].upload_url;
                attachment.qw_link_desc =
                  message_attachment_data[i].description;
                attachment.qw_link_url = message_attachment_data[i].url;
                break;
              case 4:
                attachment.msg_type = "VIDEO";
                attachment.qw_video_url = message_attachment_data[i].media_url;
                attachment.qw_media_id = message_attachment_data[i].media_id;
            }
            attachment_data.push(attachment);
          }
          let message_data = {
            text_message: message_text,
            attachment_data: attachment_data,
          };
          let para = {
            code_description: this.info.code_description,
            code_name: this.info.code_name,
            group_id: this.info.group_id,
            is_tag: tagId.length > 0 ? 1 : 2,
            is_welcome:
              (message_data.text_message.length > 0 ||
                message_data.attachment_data.length) > 0
                ? 1
                : 2,
            tag_id: tagId,
            welcome_msg_data: JSON.stringify(message_data),
            code_id: id,
          };
          console.log("update para===", para);
          Admin.api.ajax(
            {
              url: "/member_code/update",
              async: true,
              type: "post",
              data: para,
            },
            (ret, res) => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              if (fromPage == "member_code") {
                location.href = `/member_code?back_tree_id=${groupId}&back_table_page_no=${pageNo}`;
              } else {
                location.href = `./${fromPage}?group_id=${groupId}&back_table_page_no=${pageNo}&id=${id}`;
              }
            },
            () => {
              this.loadingbut = false;
              this.loadingbuttext = "提交";
            }
          );
        }
      });
    },
  },

  components: {
    "member-code-rule-form": httpVueLoader(
      "../memberCode/components/memberCodeRuleForm.vue"
    ),
    "member-code-rule": httpVueLoader(
      "../memberCode/components/memberCodeRule.vue"
    ),
    "select-tag": httpVueLoader("../selectTag/selectTag.vue"),
    "welcome-text-and-file": httpVueLoader(
      "../welcomeTextAndFile/welcomeTextAndFile.vue"
    ),
  },
};
</script>
<style>
/* @import url("../../static/tag/tagItemList.css"); */
</style>
<style scoped>
@import url("../../../../static/memberCode/memberCodeEdit.css");
</style>
