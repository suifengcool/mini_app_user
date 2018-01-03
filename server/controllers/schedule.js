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
        month: ctx.request.body.month,
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
 * 获取列表
 */
async function getScheduleListByMonth (ctx, next) {
    var arr = await mysql("schedule").where({month: ctx.request.body.month})

    ctx.state.data = {
        data: arr
    }
}

/**
 * 获取列表
 */
async function getScheduleListByDay (ctx, next) {
    var date = ctx.request.body.date
    var arr = await mysql("schedule").where({date});

    ctx.state.data = {
        data: arr
    }
}

module.exports = {
    getScheduleListByMonth,
    getScheduleListByDay,
    create
}