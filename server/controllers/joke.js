const { mysql } = require('../qcloud')

/**
 * 获取joke列表
 */
async function getList (ctx, next) {
    var arr = await mysql('joke').select('*');

    ctx.state.data = {
        data: arr
    }
}


/**
 * 更新joke列表
 */
async function update (ctx, next) {
    var data = {
        content: ctx.request.body.content,
        user: ctx.request.body.user
    }

    await mysql("joke").insert(data)

    ctx.state.data = {
        data: null
    }
}

module.exports = {
    getList,
    update
}