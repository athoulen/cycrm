package com.blueair.service;

import java.io.IOException;
import java.util.List;

import org.aspectj.lang.JoinPoint;

import com.blueair.bean.alertbean.promotereb.PromoteRebateInfo;

public interface IPromoteService {

	public void checkAndRecordPromotionExp(JoinPoint joinPoint, Object retValue);

	public void promotionExpInfoSender() throws IOException;

	public void updatePromoteState(List<PromoteRebateInfo> proRebateInfos);
}
