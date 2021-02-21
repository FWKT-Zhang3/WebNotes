<?php
    // 没有 php 没有测试
    // 后端业务逻辑
    // 1. 接收参数
    if (!isset($_POST["username"]) || !isset($_POST["password"])) {
        $arr = array("message" => "请输入用户名/密码", "code" => 0);
        echo json_encode($arr);
        // 打断代码
        exit;
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    // 2. 去数据库比对
    $link = mysqli_connect("localhost", "root", "root", "gp20");

    $sql = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password' ";

    $res = mysqli_query($link, $sql);

    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

    // 3. 判断结果
    if (count($data)) {
        $arr = array(
            "message" => "登陆成功",
            "code" => 1
        );
    } else {
        $arr = array(
            "message" => "登录失败",
            "code" => 2
        );
    }

    echo json_encode($arr);
?>