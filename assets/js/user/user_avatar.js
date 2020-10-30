$(function() {
    // 1.获取裁剪区域
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比,指定裁剪框形状如4/3,16/9
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)


    //2.点击上传按钮,选择图片
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })


    // 3.更换裁剪区域图片
    $('#file').on('change', function(e) { // change事件,只要值改变就会被触动
        // console.log(e);
        // 获取上传图片,在这里将图片变成路径,在内存中生成虚拟路径
        var file = e.target.files[0] // file 伪数组
            // 前端非空校验
        if (file == undefined) {
            return layui.layer.msg('请上传头像')
        }
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)

        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 4.图像上传
    $('#btnUpload').on('click', function() {
        // 获取base64格式的图片(字符串)
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                    // 父页面刷新
                window.parent.getUserInfo()
            }


        })

    })



})