问题描述:



原因:



解决:

```
<el-select
            v-model="knowledgeAddInfo.group_id" //加上v-model停止报错
            class="form-ipt-style"
            placeholder="请选择活动区域"
            filterable
            remote
            :remote-method="getGroupList"
          >
            <el-option
              v-for="item in groupList"
              :key="item.group_id"
              :label="item.name"
              :value="item.group_id"
            ></el-option>
          </el-select>
```

