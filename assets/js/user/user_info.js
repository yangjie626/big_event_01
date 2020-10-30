$(function() {
    // 定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入 1-6位字符'
            }
        }
    })
    initUserInfo()
        // 获取用户信息,并渲染到表单输入框中
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                //成功后 将用户信息渲染到表单中
                // lay-filter的属性值,form.val是layui提供的,需要layui.xxx,不用记
                layui.form.val('formUserInfo', res.data)
            }

        })
    }

    // 表单重置
    $('#btnReset').on('click', function(e) {
            // 阻止重置默认行为
            e.preventDefault()
                // 为form重新赋值
            initUserInfo()
        })
        // 修改用户信息,将首页上面一部分一起改变
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止浏览器默认行为,form表单提交
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                    // 调用父页面上的更新用户信息和头像方法(getUserInfo()函数写在入口函数外的原因,成为全局函数,谁都能调用)
                window.parent.getUserInfo()
            }
        })
    })
})