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
    if (students.length === 0) {
      //当无用户数据时
      student.id = 1;
    } else {
      student.id = students[students.length - 1].id + 1; //处理id唯一不重复
    }
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

exports.findById = function (studentId, callback) {
  //根据id获取学生信息对象
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var student = students.find(function (element) {
      return element.id == studentId;
    });
    callback(null, student);
  });
};

exports.updateById = function (student, callback) {
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;

    student.id = parseInt(student.id); //把id存为number

    var stu = students.find(function (element) {
      //根据id查询原数组中的对象 stu
      return element.id == student.id;
    });
    //将用户更改的用户信息对象赋值给stu
    for (var key in student) {
      stu[key] = student[key];
    }
    //重新将数组转为字符串
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

exports.deleteById = function (studentId, callback) {
  //根据id删除学生
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    var stuindex = students.findIndex(function (element) {
      return element.id == studentId; //查找条件
    });
    students.splice(stuindex, 1);
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
