package com.project.car.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project.car.domain.CarType;
import com.project.car.mapper.CarTypeMapper;
import com.project.car.service.CarTypeService;
import org.springframework.stereotype.Service;

/**
 * @author 超级管理员
 * @version 1.0
 * @description: 汽车类型service实现类
 * @date 2025/4/6 09:01
 */
@Service
public class CarTypeServiceImpl extends ServiceImpl<CarTypeMapper, CarType> implements CarTypeService {
}