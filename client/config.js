/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://vvua66nv.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取joke列表
        getJoke: `${host}/weapp/get_joke_list`,

        // 更新joke列表
        updateJoke: `${host}/weapp/update_joke_list`,

        // 新建活动日程
        createSchedule: `${host}/weapp/create_schedule`,

        // 获取日程列表
        getScheduleListByMonth: `${host}/weapp/get_schedule_list_by_month`,
        getScheduleListByDay: `${host}/weapp/get_schedule_list_by_day`
    }
};

module.exports = config;
