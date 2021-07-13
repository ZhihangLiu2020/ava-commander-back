// 数据和文件接口

const router = require('koa-router')()
const db = require('../db.js')
router.prefix('/avaCommander')

//引用multer实现文件上传与下载
const multer=require('koa-multer');
//配置单文件上传的路径
var storage = multer.diskStorage({
    //定义文件保存路径
    destination:function(req,file,cb){
        cb(null,'./public/upload/');//路径根据具体而定。如果不存在的话会自动创建一个路径
    },                       //注意这里有个，
    //修改文件名
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });

//下载文件
const send = require('koa-send')

// 上传文件接口
router.post('/upload',upload.single('file'), async (ctx,next) => {
    console.log('new data',ctx.req.file.filename)
    ctx.body = {
        code: 200,
        filename: ctx.req.file.filename
    }
});

// 下载文件
router.post('/download', async (ctx, next)=>{
	let { name }  = ctx.request.body;
	let path = `./public/upload/${name}`;
	ctx.attachment(path);
    await send(ctx, path);
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
    let sql = `select password from users where username='${username}'`
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
    let sql = 'select * from nav order by id';
    let data = await db.query(sql);
    ctx.body = data;
})
// 获取场景列表
router.get('/getScenceList', async (ctx, next) => {
    let sql = 'select * from scence';
    let data = await db.query(sql);
    ctx.body = data;
})
// 获取结果列表
router.get('/getResultList', async (ctx, next) => {
    let sql = 'select * from result';
    let data = await db.query(sql);
    ctx.body = data;
})
// 获取支持协议列表
router.get('/getProtocolList', async (ctx, next) => {
    let sql = 'select * from protocols';
    let data = await db.query(sql);
    ctx.body = data;
})
// 获取流量样本列表
router.get('/getTrafficList', async (ctx, next) => {
    let sql = 'select * from sampletraffic';
    let data = await db.query(sql);
    ctx.body = data;
})
 
 
module.exports = router