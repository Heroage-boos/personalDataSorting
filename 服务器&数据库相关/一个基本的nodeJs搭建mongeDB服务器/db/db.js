//1.加载Mongoose模块
const mongoose = require("mongoose");

//2.connect()连接数据库
module.exports = mongoose.connect(
  "mongodb://127.0.0.1:27017/nba-china-element-admin",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
