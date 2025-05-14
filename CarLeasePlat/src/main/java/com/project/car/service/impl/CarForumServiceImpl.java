package com.project.car.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project.car.domain.CarForum;
import com.project.car.mapper.CarForumMapper;
import com.project.car.service.CarForumService;
import org.springframework.stereotype.Service;

/**
 * @author 超级管理员
 * @version 1.0
 * @description: 论坛service实现类
 * @date 2025/4/6 04:37
 */
@Service
public class CarForumServiceImpl extends ServiceImpl<CarForumMapper, CarForum> implements CarForumService {
}
