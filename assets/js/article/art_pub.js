$(function() {
    initCate()

    // 渲染下拉框里的文章类别
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 渲染文章分类
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function(e) {
            // 文件列表数组
            var file = e.target.files[0]
            if (file.length == 0) {
                return
            }

            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

        })
        // 设置状态
    var state = "已发布";
    /* $('#btnSave1').on('click', function() {
        state = "已发布"//方法二
    }) */
    $('#btnSave2').on('click', function() {
        state = "草稿"
    })

    // 添加文章
    $('#form-pub').on('click', function(e) {
        e.preventDefault()
            // 创建FormData对象
        var fd = new FormData(this)
        fd.append('state', state)
            // console.log(...fd);
            // 放入图片
            // 生成图片是一个异步任务
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            }).toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                    // console.log(...fd);
                publishArticle(fd) //发送ajax要写在生成图片里面,以防图片还没加载成功
            })


    })


    // 添加文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                    // location.href = '/article/art_list.html'
                setTimeout(function() {
                    window.parent.document.getElementById('art_list').click()
                }, 1500)
            }
        })
    }
})