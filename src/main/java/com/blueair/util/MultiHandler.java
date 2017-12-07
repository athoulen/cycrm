package com.blueair.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.blueair.bean.alertbean.merchanpro.MerchanProductBean;
import com.blueair.service.impl.BaseServiceImpl;
@Component
public class MultiHandler extends BaseServiceImpl {
	private Logger logger=LoggerFactory.getLogger(MultiHandler.class);
	@Async
	public void getAllocateSum(MerchanProductBean merchanProductBean,List<MerchanProductBean> list,CountDownLatch finish){
		try {
			Integer classType=getBaseDao().queryForObject("MerchanMapper.queryForClassType", merchanProductBean.getMerchanId(), Integer.class);
			if(classType==1){
				return ;
			}
			Long allocSum=getBaseDao().queryForObject("BusinessFlowMapper.queryForMerchanProductAllocSum", ConvertUtil.convertBean2Map(merchanProductBean), Long.class);
			merchanProductBean.setAllocateSum(allocSum);
			list.add(merchanProductBean);
		} catch (Exception e) {
			logger.debug("Error{}",e);
		} finally {
			finish.countDown();
		}
		
	}
	
	@Async
	public void writeInMerchanStock(MerchanProductBean merchanProductBean,Object lastFlowId,CountDownLatch finish){
		try {
			Map<String, Object> params=new HashMap<>();
			params.put("lastFlowId", lastFlowId);
			params.put("merProductBean", merchanProductBean);
			Integer count = getBaseDao().queryForObject("BusinessFlowMapper.getMerchanProductCount", params, Integer.class);
			if(count>0){
				getBaseDao().update("BusinessFlowMapper.updateMerchanProductStock", params);
			}else{
				getBaseDao().insert("BusinessFlowMapper.insertMerchanProductStock", params);
			}
		} catch (Exception e) {
			logger.debug("Error{}",e);
		} finally {
			finish.countDown();
		}
	}
}
