var express = require("express");
var router = require("./router");

var app = express();

app.use("/node_modules/", express.static("./node_modules/")); //开放静态资源服务
app.use("/public/", express.static("./public/"));

app.engine("html", require("express-art-template")); //配置模版引擎

app.use(router); //把路由容器挂载到app服务中（将路由挂载到app实例上）

app.listen(3000, function () {
  console.log("running 3000...");
});
