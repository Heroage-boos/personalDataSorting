<template>
  <div class="crud-classify-tree flex-column flex-row-start">
    <div class="crud-classify-tree-head flex-row-between m-b-24">
      <!-- @keyup.enter.native="searchByKey"-->
      <el-input
        class="flex-1 m-r-8"
        placeholder="请输入内容"
        v-model="keyword"
        size="mini"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button size="mini" @click="handleClickAdd()">新建分组</el-button>
    </div>
    <div class="crud-classify-tree-wrap flex-1">
      <!-- :props="defaultProps" -->
      <!-- :filter-node-method="filterNode" -->
      <el-tree
        class="filter-tree"
        :data="treeData"
        node-key="id"
        highlight-current
        default-expand-all
        ref="filterTree"
        draggable
        @node-drop="handleDropTreeNode"
        @node-drag-end="handleDragEnd"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :indent="8"
      >
        <div
          class="custom-tree-node flex-1 flex-row-between"
          slot-scope="{ node, data }"
        >
          <div
            class="left-label"
            @mouseover="
              (e) => {
                return mouseenterTree(e, data);
              }
            "
            :label="data.name"
            :id="node.id"
          >
            <el-tooltip
              v-if="data.isPopover"
              popper-class="crud-classify-tree-label-popover"
              :content="node.data.name"
              placement="top-start"
            >
              <div class="overflow-ellipsis p-r-8 left-label-txt">
                {{ node.data.name }}
              </div>
            </el-tooltip>
            <div v-else class="overflow-ellipsis p-r-8 left-label-txt">
              {{ node.data.name }}
            </div>
            <div class="mock-info-badge" v-if="data.hits_num">
              {{ data.hits_num > 99 ? "99+" : data.hits_num }}
            </div>
          </div>
          <!-- trigger="click" -->
          <span
            v-if="acitveRightHandle !== data.id"
            @click.stop="handleClickRightOperateBtn(data)"
            class="right-operate-btn"
          >
            <i class="el-icon-more fs-14"></i>
          </span>
          <el-popover
            :key="data.id"
            v-else
            popper-class="crud-classify-tree-operate-popover"
            placement="right-start"
            trigger="hover"
            :visible-arrow="false"
          >
            <div class="right-operate-wrap">
              <div
                class="right-operate-item"
                v-for="item in operateList"
                :key="item.name"
                @click.stop="handleClickOperateItem(item, data)"
              >
                {{ item.name }}
              </div>
            </div>
            <span
              @click.stop="() => {}"
              class="right-operate-btn"
              slot="reference"
            >
              <i class="el-icon-more fs-14"></i>
            </span>
          </el-popover>
        </div>
      </el-tree>
    </div>
    <el-dialog
      :visible.sync="dialog.visible"
      width="418px"
      custom-class="crud-classify-tree-dialog"
    >
      <div slot="title">{{ dialog.title }}</div>
      <el-form
        @submit.native.prevent
        size="mini"
        label-position="top"
        :model="form"
        ref="crudClassifyForm"
      >
        <el-form-item
          label="分组名称"
          prop="name"
          :rules="[{ required: true, message: '分组名称不可为空' }]"
        >
          <el-input
            placeholder="请输入分组名称"
            v-model="form.name"
            maxlength="10"
            show-word-limit
            clearable
            @keyup.enter.native.prevent="dialogConfirm"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
module.exports = {
  name: "crudClassifyTree",
  props: {
    parentSearchParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      keyword: "",
      treeData: [],
      operateList: [
        {
          name: "新增子级",
          methods: "addChildren",
        },
        {
          name: "编辑名称",
          methods: "editCurrent",
        },
        {
          name: "删除",
          methods: "delCurrentConfirm",
        },
      ],
      dialog: {
        visible: false,
        title: "",
        type: "add", // add edit
        name: "",
      },
      form: {
        name: "",
        parentId: 0,
      },
      activeData: null,
      // 当前点击的 tree 操作d
      acitveRightHandle: null,
      searchCodeData: {},
    };
  },
  computed: {
    // disabled() {
    //   return this.loading || this.noMore
    // }
  },
  created() {
    this.getTreeData();
  },
  beforeDestroy() {},
  mounted() {},
  watch: {
    keyword(val) {
      this.getTreeData();
    },
    // parentSearchParams(n, o) {
    // this.getTreeData();
    // }
  },
  methods: {
    isNodeIdExit(value, key, tree) {
      for (let i = 0; i < tree.length; i++) {
        let cur = tree[i];
        if (cur[key] == value) {
          return cur;
        } else {
          if (cur.children && cur.children.length > 0) {
            let res = this.isNodeIdExit(value, key, cur.children);
            if (res) {
              return res;
            }
          }
        }
      }
    },
    showSure(v) {
      console.log("成员活码查询参数===", v);
      this.searchCodeData = v;
      this.getTreeData();
    },
    handleClickRightOperateBtn(data) {
      this.acitveRightHandle = data.id;
    },
    acitveRightHandleHide(data) {
      this.acitveRightHandle = null;
    },
    getQueryVariable,
    mouseenterTree(e, data) {
      let { target } = e;
      if (target.scrollWidth > target.clientWidth) {
        this.$set(data, "isPopover", true);
      }
    },
    resetTree() {
      this.searchCodeData = {};
      this.keyword = "";
      this.getTreeData();
    },
    editCurrent(data) {
      console.log("编辑====", data);
      this.activeData = JSON.parse(JSON.stringify(data));
      this.dialog.title = "编辑分组名称";
      this.form.name = data.name;
      this.dialog.visible = true;
      this.form.operate = "edit";
      this.form.id = data.id;
    },
    addChildren(data) {
      console.log("加字节点==", data);
      this.dialog.title = "新建分组名称";
      this.form.name = "";
      this.form.parentId = data.id || 0;
      this.dialog.visible = true;
      this.$nextTick(() => {
        if (this.$refs.crudClassifyForm) {
          this.$refs.crudClassifyForm.clearValidate();
        }
      });
    },
    delConfirm(data) {
      console.log("删除====", data, data.id);
      this.form.operate = "del";
      this.form.id = data.id;
      Admin.api.ajax(
        {
          url: "/member_code_group/delete/" + this.form.id,
          loading: true,
          type: "post",
        },
        (ret, res) => {
          if (data.id == this.activeData.id) {
            this.activeData = {};
          }
          this.getTreeData();
          this.$message({
            type: "success",
            message: "删除分组成功",
          });
        }
      );
    },
    handleNodeClick(data, node) {
      this.$emit("updatecurrenttreedata", data);
      this.activeData = JSON.parse(JSON.stringify(data));
    },
    delCurrentConfirm(data) {
      if (data.children && data.children.length) {
        this.$confirm(
          "当前分组下有子级分组，删除该组会把子级分组都会删除！",
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.delConfirm(data);
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
      } else {
        this.delConfirm(data);
      }
    },
    handleDropTreeNode(draggingNode, dropNode, dropType, ev) {
      console.log("dropA====", ...arguments);
      console.log("draggingNode====", draggingNode);
      console.log("dropNode====", dropNode);
      console.log("dropType====", dropType);

      // let id = draggingNode.data && draggingNode.data.id
      // let did = dropNode && dropNode.id
      // console.log("拖拽id===", id, "释放", did);
      var paramData = [];
      // 当拖拽类型不为inner,说明只是同级或者跨级排序，只需要寻找目标节点的父ID，获取其对象以及所有的子节点，并为子节点设置当前对象的ID为父ID即可
      // 当拖拽类型为inner，说明拖拽节点成为了目标节点的子节点，只需要获取目标节点对象即可
      var data = dropType != "inner" ? dropNode.parent.data : dropNode.data;
      var nodeData =
        dropNode.level == 1 && dropType != "inner" ? data : data.children;
      // 设置父ID,当level为1说明在第一级，pid为空
      nodeData.forEach((element) => {
        // element.pid = dropNode.level == 1 ? "" : data.id;
        element.pid = data.id;
      });
      nodeData.forEach((element, i) => {
        var dept = {
          deptId: element.id,
          parentDeptId: element.pid || 0,
          order: i,
        };
        paramData.push(dept);
      });
      console.log("拖拽=====", paramData);

      let that = this;
      Admin.api.ajax(
        {
          url: "/member_code_group/edit/parent",
          loading: true,
          type: "post",
          data: { group_arr: paramData },
        },
        function (ret, res) {
          that.getTreeData();
        }
      );
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("drag end: ", dropNode && dropNode.name, dropType);
    },
    handleClickAdd(v) {
      this.form = {
        name: "",
        parentId: 0,
      };
      this.$set(this.dialog, "type", "add");
      this.$set(this.dialog, "title", "新建分组名称");
      this.$set(this.dialog, "visible", true);
      this.$nextTick(() => {
        if (this.$refs.crudClassifyForm) {
          this.$refs.crudClassifyForm.clearValidate();
        }
      });
    },
    dialogCancel() {
      this.$set(this.dialog, "visible", false);
    },
    dialogConfirm() {
      this.$refs.crudClassifyForm.validate((valid) => {
        if (valid) {
          console.log("tree save ====", this.form);
          var group_data = {
            name: this.form.name,
            pid: this.form.parentId,
            id: this.form.id,
          };

          if (this.form.operate == "edit") {
            this.getTreeData();
            Admin.api.ajax(
              {
                url: "/member_code_group/update",
                loading: true,
                type: "post",
                data: group_data,
              },
              (ret, res) => {
                this.getTreeData();
                this.$message({
                  type: "success",
                  message: "编辑成功",
                });
                this.form.operate = "";
              }
            );
          } else {
            Admin.api.ajax(
              {
                url: "/member_code_group/add",
                loading: true,
                type: "post",
                data: group_data,
              },
              (ret, res) => {
                console.log("新增返回=====", ret);
                this.activeData = ret;
                this.getTreeData();
                this.$message({
                  type: "success",
                  message: "添加成功",
                });
              }
            );
          }
          console.log(this.form.operate);
          this.$set(this.dialog, "visible", false);
        }
      });
    },

    handleClickOperateItem(item, data) {
      console.log("======", item, data);
      this[item.methods](data);
    },
    // searchByKeyFront(v) {
    // this.$refs.filterTree.filter(this.keyword);
    // },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getTreeData() {
      console.log("树查询参数===", this.parentSearchParams);
      let param = {};

      //搜索参数
      if (this.keyword) {
        param.group_name = this.keyword;
      }

      //搜索参数
      if (this.searchCodeData.code_name) {
        param.code_name = this.searchCodeData.code_name;
      }
      //时间筛选
      if (this.searchCodeData.create_time) {
        param.start_time = this.searchCodeData.create_time[0];
        param.end_time = this.searchCodeData.create_time[1];
      }

      console.log("查询参数", param);

      Admin.api.ajax(
        {
          url: "/member_code_group",
          loading: true,
          type: "get",
          data: param,
        },
        (ret, res) => {
          this.treeData = res.data || [];
          console.log("res值===", this.treeData);
          if (this.treeData && this.treeData.length) {
            this.$nextTick(() => {
              const back_tree_id = this.getQueryVariable("back_tree_id");
              const back_table_page_no =
                this.getQueryVariable("back_table_page_no");
              let is_id =
                (this.activeData ? this.activeData.id : back_tree_id) || "";
              const is_N = this.isNodeIdExit(is_id, "id", this.treeData);
              console.log("节点是否存在====", is_N);
              let cd = {};
              if (this.activeData && is_N) {
                if (this.activeData.id) {
                  this.$refs.filterTree.setCurrentKey(this.activeData.id);
                  cd = this.$refs.filterTree.getCurrentNode();
                  if (cd) {
                    cd = JSON.parse(JSON.stringify(cd));
                    delete cd.children;
                    this.activeData = cd;
                    this.$emit("updatecurrenttreedata", cd);
                    return;
                  } else {
                    this.activeData = {};
                  }
                }
              } else {
                if (back_tree_id) {
                  this.$refs.filterTree.setCurrentKey(back_tree_id);
                  cd = this.$refs.filterTree.getCurrentNode();
                  if (cd) {
                    cd = JSON.parse(JSON.stringify(cd));
                    delete cd.children;
                    this.activeData = cd;
                    this.$emit("updatecurrenttreedata", cd, back_table_page_no);
                    return;
                  } else {
                    this.activeData = {};
                  }
                }
              }
              console.log("默认情况");
              if (this.treeData[0] && this.treeData[0].id) {
                cd = JSON.parse(JSON.stringify(this.treeData[0]));
                delete cd.children;
                this.activeData = cd;
                this.$emit("updatecurrenttreedata", cd);
                this.$refs.filterTree.setCurrentKey(cd.id);
              } else {
                this.$emit("updatecurrenttreedata", {});
              }
            });
          } else {
            this.$emit("updatecurrenttreedata", {});
          }
        }
      );
    },
  },
  components: {},
};
</script>

<style scoped>
@import url("../../../../../static/memberCode/crudClassifyTree.css");
</style>
<style>
.crud-classify-tree-dialog .el-dialog__body {
  padding: 24px;
  /* padding-top: 16px;
  padding-bottom: 16px; */
}

.crud-classify-tree-operate-popover {
  padding: 0;
  width: 84px !important;
  box-sizing: border-box;
  min-width: 84px;
}

/* .crud-classify-tree .el-popover.el-popper {
  padding: 0;
} */
.crud-classify-tree-operate-popover .right-operate-item {
  padding: 0 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: #171717;
  cursor: pointer;
}

.crud-classify-tree-operate-popover .right-operate-item:hover {
  background: #1773fa;
  color: #fff;
}

.crud-classify-tree-label-popover .left-label-txt {
  padding-right: 6px;
  font-weight: 400;
}

.el-tree-node.is-current > .el-tree-node__content {
  background-color: #eef5ff !important;
  color: #1773fa;
}

.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .mock-info-badge {
  background-color: #1773fa !important;
}

.el-tree-node.is-current > .el-tree-node__content .left-label-txt,
.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .custom-tree-node
  .right-operate-btn
  i {
  color: #1773fa !important;
}

.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon {
  color: #1773fa;
}

.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon.is-leaf:before {
  color: transparent;
}
</style>
