// 入口函数
$(function() {
        // 获取用户信息,渲染头像和用户名
        getUserInfo()

        // 退出登录
        $('#btnLogout').on('click', function() {
            // 使用框架询问框
            layui.layer.confirm('是否确定退出登录', { icon: 3, title: '提示' }, function(index) {
                // 删除本地储存的token
                localStorage.removeItem('token')
                    // 跳转到login页面
                location.href = '/login.html'
                    // 关闭弹出层
                layer.close(index);
            });




        })
    })
    // 必须定义在入口函数之外,是全局函数,后面要用,使其全局可用这函数里面的代码,为了改一个图片,另一处图片跟着改动
    // 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers要设置是api文档说明中要求的
        /*  headers: {
             // 重新登录,因为token过期时间12小时
             Authorization: localStorage.getItem('token') || ""
         }, */
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 调用renderAvatar渲染用户的头像   
            renderAvatar(res.data)
        }

    })
}
// 渲染用户的头像函数
function renderAvatar(user) {
    //1. 获取用户名称
    var name = user.nickname || user.username;
    // 2.欢迎文字
    $('#welcome').html(name)
        // 3.头像
    if (user.user_pic !== null) {
        // 有头像,显示头像隐藏文字圆
        $('.text-avatar').hide();
        $('.layui-nav-img').show().attr('src', 'user.user_pic')

    } else {
        // 没有头像
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }
}