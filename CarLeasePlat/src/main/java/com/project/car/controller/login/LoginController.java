package com.project.car.controller.login;

import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.project.car.domain.Result;
import com.project.car.domain.User;
import com.project.car.service.UserService;
import com.project.car.utils.JwtUtil;
import com.project.car.utils.PasswordUtils;
import com.project.car.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @version 1.0
 * @description: 登陆
 * @date 2025/4/6 21:20
 */
@Controller
@ResponseBody
@RequestMapping("login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisUtils redisUtils;

    @PostMapping()
    public Result login(HttpServletRequest request, @RequestBody JSONObject jsonObject) {
        String username = jsonObject.getString("loginAccount");
        String password = jsonObject.getString("password");
        QueryWrapper<User> query = new QueryWrapper<>();
        query.lambda().eq(User::getLoginAccount,username);
        User user = userService.getOne(query);
        if (user == null) {
            return Result.fail("用户名不存在！");
        }
        //比较加密后得密码
        boolean decrypt = PasswordUtils.decrypt(password, user.getPassword() + "$" + user.getSalt());
        if (!decrypt) {
            return Result.fail("用户名或密码错误！");
        }
        if (user.getStatus() == 1) {
            return Result.fail("用户被禁用！");
        }
        //密码正确生成token返回
        String token = JwtUtil.sign(user.getId(), user.getPassword());
        JSONObject json = new JSONObject();
        json.put("token", token);
        return Result.success(json);
    }

    @GetMapping("logout")
    public Result logout() {
        return Result.success();
    }

}
