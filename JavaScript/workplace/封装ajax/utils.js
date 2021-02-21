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
        console.log("vixkle")
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