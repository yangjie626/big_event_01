$(function() {
    initArtCateList()
        //1. 初始化文章分类列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }

    var indexAdd = null
        // 2.显示添加文章列表弹出层
    $('#btnAddCate').on('click', function() {
        // 利用框架代码,显示提示添加文章类别区域
        indexAdd = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#tpl-diolog').html(),
        })
    })

    //3. add通过代理的形式为form表单绑定提交事件(事件委托)
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                initArtCateList()
                layui.layer.msg(res.message)
                    // 通过索引,关系弹窗
                layui.layer.close(indexAdd)
            }
        })
    })



    // 通过代理形式为编辑按钮绑定点击事件
    var indexEdit = null
    $('body').on('click', '.btn-edit', function() {
        //4.显示修改表单
        indexEdit = layui.layer.open({
                type: 1,
                title: '修改文章分类',
                area: ['500px', '260px'],
                content: $('#tpl-edit').html(),
            })
            // 显示完毕修改form,再获取Id对应的文章分类信息
            // 获取Id,发送ajax获取数据,渲染到页面
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                // 将获取到的数据渲染到修改模板中
                layui.form.val('form-edit', res.data)
            }
        })

    })

    // 通过代理的形式为表单绑定提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                initArtCateList()
                layui.layer.msg(res.message)
                layui.layer.close(indexEdit)
            }

        })




    })


    // 通过代理形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除么?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    initArtCateList()
                    layui.layer.msg(res.message)
                    layer.close(index);
                }
            })


        });
    })

})