const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = { pwd: 0, '_v': 0 };

Router.get('/list', (req, res) => {
    const { type } = req.query;
    // User.remove({}, function (e, d) {});      // 清楚数据库数据
    User.find({ type }, (err, doc) => {
        if (err) return console.log(err);
        console.log(doc)
        return res.json({ code: 0, data: doc });
    })
})
Router.post('/update', (req, res) => {
    const userid = req.cookies.userid;
    if (!userid) return res.json.dumps({ code: 1, msg: '用户身份失效！'});
    
    // 查询数据库
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {                                // 合并数据
            user: doc.user,
            type: doc.type
        }, body);
        console.log(data)
        return res.json({ code: 0, data, msg: '保存成功！'});
    })

})
Router.post('/login', (req, res) => {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
        if (!doc) return res.json({ code: 1, msg: '用户名不存在或密码错误'});
        res.cookie('userid', doc._id);
        return res.json({ code: 0, data: doc, msg: '登录成功'})
    })
})
Router.post('/register', (req, res) => {
    // console.log(req.body);
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            console.log(doc)
            return res.json({ code: 1, msg: '用户名重复！'});
        }
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
        userModel.save((err, doc) => {
            if (err) return res.json({ code: 1, msg: '服务器出错了！'});
            const { user, type, _id } = doc;
            res.cookie('userid', _id);
            return res.json({ code: 0, data: { user, type, _id }})
        })
        // User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => {
        //     if (err) return res.json({ code: 1, msg: '连接数据库出错！'});
        //     return res.json({ code: 0, msg: '注册成功！'});
        // })
    })
})

Router.get('/info', function (req, res) {
    // 用户有没有cookie
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({ code: 1})
    }
    User.findOne({ _id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错！'})
        } 
        if (doc) {
            return res.json({ code: 0, data: doc});
        }
    })
});

// md5加密函数
function md5Pwd(pwd) {
    const salt = 'nidaya_jiushi_yourdaye!@_~~';
    return utils.md5(utils.md5(pwd + salt));
}


module.exports = Router;