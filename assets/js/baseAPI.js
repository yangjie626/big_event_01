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


    // 
    if (option.url.indexOf('/my/') !== -1) {
        // 有my,即有权限
        option.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
})