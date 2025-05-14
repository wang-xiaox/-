package com.project.car.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project.car.domain.User;
import com.project.car.mapper.UserMapper;
import com.project.car.service.UserService;
import org.springframework.stereotype.Service;

/**
 * @version 1.0
 * @description: 用户service实现类
 * @date 2025/4/6 8:46
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * 分页查询用户
     */
    @Override
    public Page<User> getUserPage(User user) {
        Page<User> page = new Page<>(user.getPageNumber(),user.getPageSize());
        return baseMapper.getUserPage(page,user);
    }
}
