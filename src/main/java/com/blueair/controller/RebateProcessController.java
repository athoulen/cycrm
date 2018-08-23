package com.blueair.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.PageListBean;
import com.blueair.service.IRebateProcessService;
import com.blueair.util.DateUtil;
import com.blueair.util.JsonUtil;
import com.blueair.web.exception.ServiceException;

@RestController
@RequestMapping("rebateProcess")
public class RebateProcessController extends BaseController {
	@Autowired
	private IRebateProcessService rebateService;

	/**
	 * 手动处理需结算的清单
	 * @return
	 * @throws ServiceException
	 */
	@RequestMapping("deal")
	public ModelMap AsynDealFlow() throws ServiceException{
		Long before=System.currentTimeMillis();
		rebateService.AsynDealFlow();
		Long after=System.currentTimeMillis();
		return rightResult(null, "处理成功！用时"+(after-before)/1000+"毫秒");
	}
	
	/**
	 * 获取佣金结算列表
	 * @return
	 * @throws ServiceException 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "deprecation" })
	@RequestMapping("list")
	public ModelMap queryRebateList(String json,int page,int pageSize) throws ServiceException{
		Map<String, Object> params=JsonUtil.convertJson2Object(json, Map.class);
		Object startDate=params.get("startDate");
		PageListBean bean = rebateService.queryRebateList(params,(page-1)*pageSize,pageSize);
		return rightPageListBeanResult(null, "查询成功！", "result", bean);
	}
	
	/**
	 * 获取佣金结算列表
	 * @return
	 */
	@RequestMapping("pay/{id:\\d+}")
	public ModelMap payRebate(@PathVariable("id") Long id){
		boolean flag = rebateService.payRebateDeal(id,1);
		if(flag){
			return rightResult(null, "付款成功！");
		}
		return errorResult("付款失败！");
	}
	
	@RequestMapping("pay/cancel/{id:\\d+}")
	public ModelMap cancelPayRebate(@PathVariable("id") Long id){
		boolean flag = rebateService.payRebateDeal(id,0);
		if(flag){
			return rightResult(null, "撤销付款成功！");
		}
		return errorResult("撤销付款失败！");
	}
	
	@RequestMapping("time/latest")
	public ModelMap getLatestDataTime(){
		Date date = rebateService.getLatestDataTime();
		return rightObjectResult(null, "查询成功！", "date", DateUtil.date2String2(date));
	}
}
