module.exports = async ctx => {
    const { mysql } = require('../qcloud')
    
    // var data = {
    //     content: ctx.req
    // }

    // await mysql("joke").insert(data)
    var arr = await mysql('joke').select('*');

    ctx.state.data = {
        data: arr
    }
}