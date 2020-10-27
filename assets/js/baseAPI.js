// $.ajaxPrefilter()要绑定在所有ajax之前,这个方法会在ajax请求执行后再触发,这个方法执行完毕,ajax才执行
// 开发环境地址
var baseURL = 'http://ajax.frontend.itheima.net'
    // 测试环境地址
    // var baseURL = 'http://ajax.frontend.itheima.net'
    // 生产环境地址
    // var baseURL = 'http://ajax.frontend.itheima.net'
    // 拦截所有ajax请求,get/post/ajax
$.ajaxPrefilter(function(params) {
    // console.log(params.url);
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url
        // console.log(params.url);
})