package com.blueair.service.impl;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.blueair.service.IStockService;
import com.blueair.service.ITaskService;
@Component
public class TaskServiceImpl implements ITaskService {
	@Autowired
	private IStockService stockService;
	private static Logger logger=LoggerFactory.getLogger(TaskServiceImpl.class);
	@Scheduled(cron="0 0/30 *  * * ? ")
	@Override
	public void stockCheck() {
		try {
			stockService.autoCheckStock();
		} catch (IOException e) {
			logger.error("查询库存信息故障{}",e);
		}
	}

}
