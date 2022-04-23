//1.加载mongose模块
const mongoose = require("mongoose");
//2.定义Schema表模型
const Schema = mongoose.Schema;

//3.定义schema表模型规则
const todoSchema = new Schema({
  admin: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: false,
  },
});

/**
 * 4.model 定义表  有了Model,我们就可以来对数据库进行增删改查的操作了
 * 在连接多个数据库时，connection.model()很有用。
 * 需要注意，在模型使用的连接打开之前，不会创建/删除tank。每个模型都有一个与之关联的连接，使用mongoose.model()时，模型将使用默认的mongoose连接。
 * 如果要使用自定义连接，请用连接(connection)的model()方法来替代：
 */
const todoModel = mongoose.model("todos", todoSchema);

//5.将model表模型暴露出去
module.exports = todoModel;
