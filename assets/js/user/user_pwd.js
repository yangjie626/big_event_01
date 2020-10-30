$(function() {
    // 定义校验规则
    layui.form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不一致
        samePwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return "新旧密码不能相同"
            }
        },
        // 两次输入的新密码要一致
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码输入不一致"
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault(e);
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $(this)[0].reset()
            }
        })
    })

})