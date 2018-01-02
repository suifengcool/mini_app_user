const { mysql } = require('../qcloud')

/**
 * 新建活动日程
 */
async function create (ctx, next) {
    var data = {
        start_time: ctx.request.body.start_time,
        user: ctx.request.body.user,
        end_time: ctx.request.body.end_time,
        date: ctx.request.body.date,
        adress: ctx.request.body.adress,
        event_detail: ctx.request.body.event_detail,
        event_title: ctx.request.body.event_title

    }

    await mysql('schedule').insert(data)

    ctx.state.data = {
        data: null
    }
}


/**
 * 更新joke列表
 */
async function getList (ctx, next) {
    
    var arr = await mysql("joke").select('*')

    ctx.state.data = {
        data: arr
    }
}

module.exports = {
    getList,
    create
}