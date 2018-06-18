// 链接mongoose, 并且使用xiaoai
const mongoose = require('mongoose');
// 链接mongo 并且使用xiaoai这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/xiaoai';
mongoose.connect(DB_URL);
// mongoose.connection.on('connected', () => {
//     console.log('mongo connect success');
// });

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        // 头像
        'avatar': { type: String },
        // 个人简介
        'desc': { type: String },
        // 职位名
        'title': { type: String },
        // 如果是boss， 还有两个字段
        'company': { type: String },
        'money': { type: String },
        'position': { type: String }
    },
    chat: {}
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}