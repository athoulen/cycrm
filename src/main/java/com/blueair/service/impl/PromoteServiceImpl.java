package com.blueair.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.aspectj.lang.JoinPoint;

import com.blueair.bean.alertbean.AlertObject;
import com.blueair.bean.alertbean.promotereb.PromoteRebateInfo;
import com.blueair.service.IPromoteService;
import com.blueair.util.ConvertUtil;
import com.blueair.util.HandleType;
import com.blueair.util.JsonUtil;
import com.blueair.websocket.InStream;

public class PromoteServiceImpl extends BaseServiceImpl implements IPromoteService {

	@Override
	public void checkAndRecordPromotionExp(JoinPoint joinPoint, Object result) {
		Object[] os=joinPoint.getArgs();
		Object o=os[0];
		PromoteRebateInfo promoteRebateInfo = getBaseDao().queryForObject("ProtocolMapper.queryForPromoteAndRebateMer", ConvertUtil.convertBean2Map(o), PromoteRebateInfo.class);
		if(promoteRebateInfo==null){
			return ;
		}
		if(!calculatePromoteRebate(promoteRebateInfo)){
			int count=getBaseDao().queryForObject("ProtocolMapper.queryExpProRebateCount", ConvertUtil.convertBean2Map(promoteRebateInfo), Integer.class);
			if(count>0){
				getBaseDao().update("ProtocolMapper.updateExpProRebateSubInfo", promoteRebateInfo);
			}else{
				getBaseDao().insert("ProtocolMapper.insertExpProRebateInfo", promoteRebateInfo);
			}
		}else{
			getBaseDao().update("ProtocolMapper.updateExpProRebateInfo", promoteRebateInfo);
		}
	}
	
	@Override
	public void promotionExpInfoSender() throws IOException{
		List<PromoteRebateInfo> promotionExpInfos = getBaseDao().queryForList("ProtocolMapper.queryForPromotionExpInfo", null, PromoteRebateInfo.class);
		if (promotionExpInfos!=null&&!promotionExpInfos.isEmpty()) {
			AlertObject object =new AlertObject();
			object.setAlertCode(HandleType.PROMOTE_EXP_NOTE);
			object.setAlertMessage(HandleType.PROMOTE_EXC_MESSAGE_NOTE);
			object.setBeans(ConvertUtil.convertBeans2List(promotionExpInfos));
			InStream.sendMessage2Users(JsonUtil.convertObject2Json(object), "ceshi");
		}
	}
	
	@Override
	public void updatePromoteState(List<PromoteRebateInfo> proRebateInfos){
		getBaseDao().update("ProtocolMapper.updatePromoteState", proRebateInfos);
	}
	
	public boolean calculatePromoteRebate(PromoteRebateInfo promoteRebateInfo){
		BigDecimal promote = promoteRebateInfo.getPromote()==null?new BigDecimal(0):promoteRebateInfo.getPromote();
		BigDecimal rebate = promoteRebateInfo.getRebate()==null?new BigDecimal(0):promoteRebateInfo.getRebate();
		BigDecimal totalPromote = promoteRebateInfo.getTotalPromote()==null?new BigDecimal(0):promoteRebateInfo.getTotalPromote();
		BigDecimal total=totalPromote.subtract(rebate).subtract(promote);
		promoteRebateInfo.setSubstract(total);
		if(total.doubleValue()>=0){
			return true;
		}
		return false;
	}

}
