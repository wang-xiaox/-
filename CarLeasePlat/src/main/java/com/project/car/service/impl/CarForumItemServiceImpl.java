package com.project.car.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project.car.domain.CarForumItem;
import com.project.car.mapper.CarForumItemMapper;
import com.project.car.service.CarForumItemService;
import org.springframework.stereotype.Service;

/**
 * @author 超级管理员
 * @version 1.0
 * @description: 论坛评论service实现类
 * @date 2025/4/6 05:00
 */
@Service
public class CarForumItemServiceImpl extends ServiceImpl<CarForumItemMapper, CarForumItem> implements CarForumItemService {
}