// 用户登陆接口

const router = require('koa-router')()
const db = require('../db.js')
router.prefix('/users')
// 实现token方式登陆验证
const jwt = require('jsonwebtoken')
const tokenConfig = {privateKey: 'xxxxxxxxxxxx'} // 加密密钥

// 登陆路由
router.post('/login', async (ctx) => {
  try {
    const data = ctx.request.body
    const { username, password } = data
    let sql = `select password from users where username='${username}'`
    let res = await db.query(sql);
    //console.log("query:",res.length);
    if(res.length===0){
      ctx.body = {code: 2, message: '账号不存在'};
    }else if (res[0].password===password) {
      const userInfo = {username: username, userID: password}
      const token = jwt.sign(userInfo, tokenConfig.privateKey, {expiresIn: '7d'}) // 签发 token， 7天有效期
      ctx.body = {code: 1, message: '登陆成功', data: {token: 'Bearer ' + token}}
    } else {
      ctx.body = {code: 0, message: '密码错误'}
    }
  } catch(err) {
    throw new Error(err)
  }
})
// 验证是否已登陆
router.get('/getUserInfo', async (ctx) => {
  try {
    const token = ctx.get('Authorization') // 获取请求 Header 中 Authorization 值
    let userInfo = {}
    if (token === '') {
      ctx.body = {code: 0, message: '未登陆'}
    } else {
      try {
        userInfo = jwt.verify(token.split(' ')[1], tokenConfig.privateKey) // 验证 token
        ctx.body = {code: 1, message: '已登陆', data: {userInfo: userInfo, loginStatus: true}}
      } catch(err) {
        // token 过期或无效
        ctx.body = {code: 0, message: '未登陆', data: {userInfo: {}, loginStatus: false}}}
      }
    }catch(err) {
      throw new Error(err)
  }
})


module.exports = router
