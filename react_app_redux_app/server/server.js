const express = require('express');
const utils = require('utility');
const bodyParser = require('body-parser');
const cookirParser = require('cookie-parser');
const userRouter = require('./user');

// 新建app
const app = express();
app.use(cookirParser());                    // 解析cookie
app.use(bodyParser.json());                 // 解析post参数
app.use('/user', userRouter);
app.listen(9093, () => {
    console.log('Node app start at port 9093')
})
