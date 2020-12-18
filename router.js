var fs = require("fs");

var express = require("express");
//express提供了一种更好的方式 专门用来包装路由的
var router = express.Router(); //创建一个路由容器

//把路由都挂载到router路由容器中
router.get("/students", function (req, res) {
  //路由
  fs.readFile("./db.json", function (err, data) {
    if (err) {
      return res.status(500).send("Server error.");
    }
    var students = JSON.parse(data).students; //从文件中读取到定数据一定是字符串  需要手动转换成对象
    res.render("index.html", {
      //使用模版引擎渲染页面
      fruits: ["苹果", "橘子", "香蕉"], //模版数据
      students: students,
    });
  });
});

router.get("/students/new", function (req, res) {});
router.post("/students/new", function (req, res) {});
router.get("/students/edit", function (req, res) {});
router.post("/students/edit", function (req, res) {});
router.get("/students/aelete", function (req, res) {});

module.exports = router;
