const router = require('koa-router')()
const db = require('../db.js')
 
router.prefix('/avaCommander')
 
router.get('/', (ctx, next) => {
    ctx.body = 'this is a users response!'
})
 
//查询所有用户
router.get('/selectAllUsers', async (ctx, next) => {
    let sql = 'select * from users'
    let data = await db.query(sql);
    ctx.body = data;
})

//用户登陆
router.post('/selectUserByUsername', async (ctx, next) => {
    let { username } = ctx.request.body;
    let sql = `select * from users where username='${username}'`
    let data = await db.query(sql);
    ctx.body = data
})
 
//删除用户
router.post('/deleteUsers', async (ctx, next) => {
    let { id } = ctx.request.body;
    let sql = `delete from users where id=${id}`
    let data = await db.query(sql);
    ctx.body = data;
})
 
//添加用户
router.post('/addUsers', async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let sql = `insert into users(username,password) values ('${username}',${password})`
    let data = await db.query(sql);
    ctx.body = data;
})
//修改用户
router.post('/updateUsers', async (ctx, next) => {
    let { username, password } = ctx.request.body;
 
    let sql = `update users set password='${password}' where username='${username}'`
    let data = await db.query(sql);
    ctx.body = data;
})
//获取导航栏
router.get('/getNavList', async (ctx, next) =>{
    let sql = 'select * from nav';
    let data = await db.query(sql);
    ctx.body = data;
})
 
 
module.exports = router