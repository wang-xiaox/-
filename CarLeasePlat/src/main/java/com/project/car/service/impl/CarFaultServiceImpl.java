package com.project.car.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.project.car.domain.CarFault;
import com.project.car.mapper.CarFaultMapper;
import com.project.car.service.CarFaultService;
import org.springframework.stereotype.Service;

/**
 * @author 超级管理员
 * @version 1.0
 * @description: 车辆故障service实现类
 * @date 2025/4/6 02:38
 */
@Service
public class CarFaultServiceImpl extends ServiceImpl<CarFaultMapper, CarFault> implements CarFaultService {
}
