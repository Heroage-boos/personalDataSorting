<template>
  <div class="page member-code-list flex-column">
    <div class="search-head-wrap flex-row-between bg-color-fff p-24">
      <div class="search-head-left flex-1">
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="search"
          size="mini"
          class="demo-form-inline"
        >
          <el-form-item label="成员活码名称：" class="m-b-0 m-r-24">
            <el-input
              @clear="headSearch"
              @keyup.enter.native="headSearch"
              style="width: 210px"
              size="mini"
              placeholder="请输入名称"
              v-model="search.code_name"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间：" class="m-b-0">
            <el-date-picker
              style="width: 320px"
              size="mini"
              v-model="search.create_time"
              type="datetimerange"
              placeholder="选择日期时间"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              @change="headSearch"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="search-head-right">
        <el-button size="mini" @click="resetHeadSearch">重置</el-button>
        <el-button type="primary" size="mini" @click="headSearch"
          >查询
        </el-button>
      </div>
    </div>
    <div class="content-wrap flex-column flex-1 bg-color-fff p-24 m-t-16">
      <!--      <div class="content-head flex-row-between">-->
      <!--        <div class="content-head-txt">数据列表</div>-->
      <!--      </div>-->
      <div class="content-main flex-row-start flex-1">
        <div class="left p-t-16 p-b-16">
          <crud-classify-tree
            ref="crudClassifyTree"
            :parent-search-params="search"
            @updatecurrenttreedata="updateCurrentTreeData"
          >
          </crud-classify-tree>
        </div>
        <div class="mid"></div>
        <div class="right flex-1 flex-column">
          <div class="table-head flex-row flex-row-between">
            <div class="table-head-left overflow-ellipsis">
              {{ currentTreeData.name || "" }}
            </div>
            <div class="table-head-right">
              <el-button
                v-if="currentTreeData && currentTreeData.id"
                type="primary"
                size="mini"
                @click="handleListItemAdd"
              >
                新增成员活码
              </el-button>
            </div>
          </div>
          <div class="table-body flex-1">
            <el-table
              v-if="currentTreeData && currentTreeData.id"
              :data="tableData"
              style="width: 100%"
              size="mini"
              max-height="calc(100% - 5px)"
              height="calc(100% - 5px)"
            >
              <el-table-column label="二维码" width="100px">
                <template slot-scope="scope">
                  <el-image
                    style="width: 42px; height: 42px"
                    :src="scope.row.code_url"
                    fit="fill"
                    @click="previewCodeImg(scope.row)"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline fs-24"></i>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                label="成员活码名称"
                prop="code_name"
                show-overflow-tooltip
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                prop="code_description"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="分组名称"
                prop="code_group_name"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="create_time"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="引流数量（人）"
                prop="code_drainage_num"
                show-overflow-tooltip
                min-width="120px"
              >
              </el-table-column>
              <el-table-column
                label="关联标签"
                :width="tagColW"
                min-width="176px"
              >
                <template slot-scope="scope">
                  <div
                    v-if="
                      scope.row.tag_arr &&
                      Array.isArray(scope.row.tag_arr) &&
                      scope.row.tag_arr.length
                    "
                    class="table-row-tag-cell flex-row-between"
                  >
                    <div
                      :class="[
                        scope.row.isTagOver > 18
                          ? 'table-row-tag-list-wrap table-row-tag-list-wrap-1-row no-wrap'
                          : 'table-row-tag-list-wrap no-wrap',
                      ]"
                    >
                      <div
                        v-for="(tag, index) in scope.row.tag_arr"
                        :key="index"
                        :class="[
                          'table-row-tag-item',
                          `table-row-tag-item-${tag.tag_group_type}`,
                        ]"
                      >
                        <div class="left tag-txt">{{ tag.tag_group_name }}</div>
                        <div class="right">
                          <div class="right-txt tag-txt">
                            {{ tag.tag_name }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <el-popover
                      v-if="scope.row.isTagOver > 18"
                      placement="bottom-end"
                      trigger="hover"
                      width="542"
                    >
                      <div
                        class="
                          table-row-tag-list-wrap
                          table-row-tag-list-wrap-limit-height
                        "
                      >
                        <div
                          v-for="(tag, index) in [...scope.row.tag_arr]"
                          :key="index"
                          :class="[
                            'table-row-tag-item',
                            `table-row-tag-item-${tag.tag_group_type}`,
                          ]"
                        >
                          <div class="left tag-txt">
                            {{ tag.tag_group_name }}
                          </div>
                          <div class="right">
                            <div class="right-txt tag-txt">
                              {{ tag.tag_name }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="table-row-tag-more" slot="reference">
                        <i
                          class="el-icon-more"
                          v-if="scope.row.isTagOver > 18"
                        ></i>
                      </div>
                    </el-popover>
                  </div>
                  <template v-else> -- </template>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="160px" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleListItemDetail(scope.row, scope.index)"
                    >查看详情
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleListItemEdit(scope.row, scope.index)"
                    >编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleListItemDel(scope.row, scope.index)"
                    >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- v-else-if="tableData && (!tableData.length)" -->
            <div
              class="empty-tree-data"
              v-else-if="tableData && !tableData.length"
            >
              <div class="empty-tree-data-txt">暂无分组！</div>
              <el-button size="mini" type="primary" @click="addNewClassify"
                >新建分组
              </el-button>
            </div>
            <!-- 二维码弹窗 -->
            <el-dialog
              :visible.sync="previewDialog.dialogVisible"
              width="418px"
            >
              <div slot="title">{{ previewDialog.title }}</div>
              <div style="text-align: center; margin-bottom: 40px">
                <el-image
                  :src="previewDialog.imgUrl"
                  style="width: 285px; height: 285px"
                >
                </el-image>
              </div>
              <a :href="previewDialog.imgUrl" :download="previewDialog.imgName">
                <el-button size="small" type="primary" class="w-100percent">
                  下载二维码
                </el-button>
              </a>
            </el-dialog>
          </div>
          <div class="table-pagination-wrap flex-row-end">
            <el-pagination
              v-if="tableData.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNo"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNo"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "member-code-list",
  data() {
    return {
      previewDialog: {
        dialogVisible: false,
        title: "二维码",
        imgUrl: "",
        imgName: "",
      },
      search: {},
      tableData: [],
      pageSize: 10,
      pageNo: 1,
      pageSizes: [10, 15, 20],
      totalNo: 0,
      param: {},
      currentTreeData: {},
      // 最小 176px 最大 280px
      tagColW: "176px",
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleListItemAdd() {
      let id = (this.currentTreeData && this.currentTreeData.id) || 0;
      let name =
        (this.currentTreeData && this.currentTreeData.name.substring(0, 10)) ||
        "";
      location.href = `./member_code/add?type=add${
        id ? `&group_id=${id}` : ""
      }${name ? `&group_name=${name}` : ""}&page_no=${this.pageNo}`;
    },
    handleListItemEdit(row, index) {
      let id = (this.currentTreeData && this.currentTreeData.id) || 0;
      location.href = `./member_code/update?type=edit&id=${row.code_id}&group_id=${id}&page_no=${this.pageNo}&from_page=member_code`;
    },
    handleListItemDetail(row, index) {
      let id = (this.currentTreeData && this.currentTreeData.id) || 0;
      location.href = `./member_code/detail?id=${row.code_id}&group_id=${id}&page_no=${this.pageNo}&from_page=member_code`;
    },
    handleListItemDel(row, index) {
      this.$confirm("确认删除该条成员活码?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let that = this;
          Admin.api.ajax(
            {
              url: "/member_code/delete/" + row.code_id,
              loading: true,
              type: "post",
            },
            function (ret, res) {
              that.getTableData(); //获取新的数
              if (res.code == 200) {
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addSuccess() {
      this.$message({
        type: "info",
        message: "添加成功",
      });
    },
    updateCurrentTreeData(d, pageNo) {
      this.currentTreeData = d.id ? JSON.parse(JSON.stringify(d)) : {};
      this.pageNo = parseInt(pageNo) || 1;
      this.getTableData();
    },
    addNewClassify() {
      this.$refs.crudClassifyTree.handleClickAdd();
    },
    previewCodeImg(row) {
      this.previewDialog.dialogVisible = true;
      this.previewDialog.imgUrl = row.code_url;
      this.previewDialog.imgName = row.code_name;
    },
    downloadCodeImg() {
      let a = document.createElement("a");
      // a.download = name + ".xls";
      a.href = this.previewDialog.imgUrl;
      $("body").append(a); // 修复firefox中无法触发click
      a.click();
      $(a).remove();
    },
    getTableData() {
      if (!this.currentTreeData.id) {
        this.tableData = [];
        return;
      }
      // 查询参数
      let param = {
        page_num: this.pageNo,
        page_size: this.pageSize,
        group_id: this.currentTreeData.id,
      };

      // //搜索参数
      if (this.search.code_name) {
        param.search_name = this.search.code_name;
      }
      //时间筛选
      if (this.search.create_time) {
        param.start_time = this.search.create_time[0];
        param.end_time = this.search.create_time[1];
      }
      let that = this;
      console.log("table请求参数====", param);
      Admin.api.ajax(
        {
          url: "/member_code",
          loading: true,
          type: "get",
          data: param,
        },
        function (ret, res) {
          let tableData = res.data.rule_list;
          let tagMaxW = 0;
          tableData.map((row, index) => {
            row.code_description = row.code_description || "--";
            let tagsTxtLen = 0;
            if (row.tag_arr && row.tag_arr.length) {
              row.tag_arr.map((tag) => {
                let tagItemTxtLen =
                  tag.tag_group_name.length + tag.tag_name.length;
                if (tagItemTxtLen) {
                  tagsTxtLen = tagsTxtLen + tagItemTxtLen + 2;
                }
              });
            }
            row.isTagOver = tagsTxtLen - 1;
            if (row.isTagOver > tagMaxW) {
              tagMaxW = row.isTagOver;
            }
          });
          const limitMaxW = 280;
          const limitMinW = 176;
          if (tagMaxW > 18) {
            that.tagColW = `${limitMaxW}px`;
          } else {
            let cL = tagMaxW * 14 + 20;
            that.tagColW = `${
              cL > limitMaxW ? limitMaxW : cL < limitMinW ? limitMinW : cL
            }px`;
          }
          // console.log("全部宽度====", tagMaxW, that.tagColW)
          that.tableData = tableData;
          that.totalNo = res.data.total_num;
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getTableData();
    },
    resetHeadSearch() {
      this.search = {};
      this.$refs.crudClassifyTree.resetTree();
    },
    headSearch() {
      console.log("index 参数==", this.search);

      this.$refs.crudClassifyTree.showSure(this.search);
      this.pageNo = 1;
      this.getTableData();
    },
  },
  components: {
    "crud-classify-tree": httpVueLoader("./components/crudClassifyTree.vue"),
  },
};
</script>
<style>
@import url("../../../../static/tag/tagItemList.css");
</style>
<style scoped>
@import url("../../../../static/memberCode/memberCodeList.css");
.no-wrap {
  flex-wrap: nowrap;
}
</style>
