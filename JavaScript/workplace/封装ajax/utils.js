/*
    封装一个函数，创建xhr对象
    => 不需要参数
    => 返回值就是一个可以在本浏览器使用的xhr对象

1.  把每一种创建方式写成一个函数，依次调用函数
    如果不报错，表示方法可用
    如果可用，把creXhr重新赋值为可用的那个函数
    此后，在本次会话中，调用creXhr便是直接调用可用的函数，不需要重复判断
2.  写到数组里

懒惰模式
*/
function creXhr() {
    let flag = false
    let xhr = null

    // 根据各种判断，给xhr赋值
    const arr = [
    () => { return new XMLHttpRequest() },
    () => { return new ActiveXObject("Msxml.XMLHTTP") },
    () => { return new ActiveXObject("Msxml2.XMLHTTP") },
    () => { return new ActiveXObject("Microsoft.XMLHTTP")},
    ]

    for (let i = 0; i < arr.length; i++) {
        try {
            xhr = arr[i]()
            creXhr = arr[i]
            flag = true
            break
        } catch (e) {}
    }

    // 判断flag
    if (!flag) {
        xhr = "不支持ajax"
        throw new Error(xhr)
    }

    return xhr
}

function ajax(options={}) {
    // options = {} - to ensure 'options' is a obj
    // 1. 参数验证
    if (!options.url) {
        throw new Error("请填写url")
    }

    if (!(options.type === undefined 
        || typeof options.type === "string"
        || options.type.toUpperCase() === "GET"
        || options.type.toUpperCase() === "POST")) {
            throw new Error("只接受GET或POST请求方式")
    }

    if (!(options.async == undefined || typeof options.async === "boolean")) {
        throw new Error("async需要boolean类型")
    }

    if (!(options.dataType == undefined 
        || options.dataType.toUpperCase() === "STRING"
        || options.dataType.toUpperCase() === "JSON")) {
        throw new Error("只支持string和json数据类型")
    }

    if (!(options.data == undefined 
        || typeof options.data === "string"
        || Object.prototype.toString.call(options.call) === "[object Object]")) {
        throw new Errow("只支持string和object类型data")
    }

    // 验证 success 和 error (回调函数)
    if (!(options.success == undefined || typeof options.success === "function")) {
        throw new Error("success需要是函数类型")
    }
    if (!(options.error == undefined || typeof options.error === "function")) {
        throw new Error("error需要是函数类型")
    }

    // 2. 设置默认值
    var _default = {
        url: options.url,
        type: options.type || "GET",
        async: typeof options.async === "boolean" ? options.async : true,
        dataType: options.dataType || "string",
        data: options.data || "",
        success: options.success || function() {},
        error: options.error || function() {}
    }

    // 调整一下data
    if (typeof _default.data === "object") {
        var str = ""
        for (var key in _default.data) {
            str += key + "=" + _default.data[key] + "&"
        }

        _default.data = str.slice(0,-1)
    }
    // 发送请求
    var xhr = creXhr()
    // 如果是 get，url + "?" + data
    // 如果是 post，url
    if (_default.type.toUpperCase() === "GET" && _dafault.data) {
        _default.url += "?" + _default.data
    }
    xhr.open(_default.type, _default.url, _defaule.async)
    xhr.onreadystatechange = function() {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.readyState === 4) {
            // 如果datatype是json，要解析
            if (_default.dataType.toUpperCase() === "JSON") {
                _default.success(JSON.parse(xhr.responseText))
            } else if (_default.dataType.toUpperCase === "STRING") {
                _default.error(xhr.responseText)
            }
        }

        if (xhr.readyState === 4 && xhr.status >= 400) {
            _default.error(xhr.status)
        }
    }
    // 判断是不是 post
    if (_default.type.toUpperCase() === "POST") {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    }
    xhr.send(_default.data)
}