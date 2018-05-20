const express = require('express');
var mongoose = require('mongoose');

// 链接mongoose, 并且使用xiaoai
const DB_URL = 'mongodb://127.0.0.1:27017/xiaoai';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('mongo connect success');
});
// 类似mysql的schema
const User = mongoose.model('user', new mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true}
}))
// 新增数据
// User.create({
//     name: '艾大爷',
//     age: 14
// }, (err, doc) => {
//     if (!err) console.log(doc);
//     console.log(err);
// })

// 跟新数据
User.update({ 'name': 'xiaoxiaoai'}, {'$set': { age: 27}}, (err, doc) => {
    if (!err) console.log(doc);
})
// 新建app
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
})

app.get('/data', (req, res) => {
    User.findOne({ name: 'xiaoxiaoai' }, (err, doc) => {
        res.json(doc);
    })
})

app.listen(9093, () => {
    console.log('Node app start at port 9093')
})
