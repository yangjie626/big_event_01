// $.ajaxPrefilter()要绑定在所有ajax之前,这个方法会在ajax请求执行后再触发,拦截ajax发送执行此函数,这个方法执行完毕,ajax才真正执行
// 开发环境地址
var baseURL = 'http://ajax.frontend.itheima.net'
    // 测试环境地址
    // var baseURL = 'http://ajax.frontend.itheima.net'
    // 生产环境地址
    // var baseURL = 'http://ajax.frontend.itheima.net'
    // 拦截所有ajax请求,get/post/ajax
$.ajaxPrefilter(function(option) {
    // console.log(option.url);
    // 拼接对应环境的服务器地址
    // option每一次阻截的ajax请求
    option.url = baseURL + option.url
        // console.log(option.url);


    // 给指定地址添加身份认证
    if (option.url.indexOf('/my/') !== -1) {
        // 有my,即有权限
        option.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 拦截所有相应,判断用户信息
    // 无论成功与失败都会调用complete调用函数
    option.complete = function(res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        // obj.message需要写,否则不会发生跳转
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 销毁token 页面跳转
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})