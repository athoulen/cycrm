package com.blueair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.PageListBean;
import com.blueair.service.IRebateProcessService;
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
		rebateService.AsynDealFlow();
		return rightResult(null, "处理成功！");
	}
	
	/**
	 * 获取佣金结算列表
	 * @return
	 */
	@RequestMapping("list")
	public ModelMap queryRebateList(int page,int pageSize){
		PageListBean bean = rebateService.queryRebateList((page-1)*pageSize,pageSize);
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
}
