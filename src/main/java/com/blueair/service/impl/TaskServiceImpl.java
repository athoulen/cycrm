package com.blueair.service.impl;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.blueair.service.IPromoteService;
import com.blueair.service.IStockService;
import com.blueair.service.ITaskService;
@Component
public class TaskServiceImpl implements ITaskService {
	@Autowired
	private IStockService stockService;
	@Autowired
	private IPromoteService promoteService;
	private static Logger logger=LoggerFactory.getLogger(TaskServiceImpl.class);
//	@Scheduled(cron="0 0/30 *  * * ? ")
	@Scheduled(cron="0/15 * *  * * ? " )
	@Override
	public void stockCheck() {
		try {
			stockService.sendExpStockInfo();
		} catch (IOException e) {
			logger.error("发送库存信息故障{}",e);
		}
	}

	@Scheduled(cron="0/15 * *  * * ? ")
	@Override
	public void rebateCheck(){
		try {
			promoteService.promotionExpInfoSender();
		} catch (IOException e) {
			logger.error("发送推广费异常信息故障{}",e);
		}
	}
}
