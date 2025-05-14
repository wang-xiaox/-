package com.project.car.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.project.car.domain.User;

/**
 * @version 1.0
 * @description: 用户service
 * @date 2025/4/6 8:45
 */
public interface UserService extends IService<User> {

    /**
    * @description: 分页查询用户
    * @param: apeUser
    * @return: Page
    * @date: 2025/4/6 10:49
    */
    Page<User> getUserPage(User apeUser);

}
