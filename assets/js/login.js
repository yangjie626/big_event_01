// 入口函数
$(function() {
    // 点击去注册,隐藏登录区域,显示注册区域
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击去登录,隐藏注册区域,显示登录区域
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义校验规则
    // 从layui中获取form对象,使用layui的效果---这一句没有,则后面代码不会生效
    var form = layui.form
        // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容,然后进行一次等于的判断,如果判断失败,则return一个提示信息即可
            // 选择器必须带空格,选择的是后代中的input,name属性值为password的那一个标签
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致,请重新输入'
            }
        }
    });
    var layer = layui.layer //从layui导入弹出层layer
        // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
            // 发起ajax的POST请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },

            success: function(res) {
                // 返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后返回代码
                layer.msg(res.message)
                    // 切换登录模块
                $('#link-login').click()
                    // 清空注册表单,reset()方法是js原生方法,不是jQuery提供的
                $('#form-reg')[0].reset()
            }
        })
    });

    // 监听登录表单
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息,保存token,跳转页面
                layer.msg(res.msg)
                    // 保存token,未来的接口要使用token
                localStorage.setItem('token', res.token)
                    // 跳转
                location.href = "/index.html"
            }
        })
    })




})