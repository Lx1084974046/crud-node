// 数据操作文件模块
// 职责：操作文件中到数据，只处理数据，不关心业务
//封装异步API
var fs = require("fs");
var dbPath = "./db.json";
//callback中的参数
//第一个参数是err
//成功是null
//错误是错误对象
//第二个参数是结果
//成功是数组
//错误是undefined
exports.find = function (callback) {
  //获取所有学生列表
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};

exports.save = function (student, callback) {
  //添加保存学生
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students[students.length - 1].id + 1; //处理id唯一不重复
    //把用户传递的对象保存到数组中
    students.push(student);
    //对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students,
    });
    //把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

exports.updateById = function (studentId, callback) {
  //更新学生
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var student = null;
    students.forEach((element) => {
      if (element.id == studentId) {
        student = element;
      }
    });
    callback(null, student);
  });
};

exports.delete = function () {
  //删除学生
};
