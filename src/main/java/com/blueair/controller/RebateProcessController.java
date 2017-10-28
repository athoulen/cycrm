package com.blueair.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.PageListBean;
import com.blueair.bean.rebate.RebateMain;
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
	@RequestMapping("deal")
	public ModelMap queryRebateList(int page,int pageSize){
		PageListBean bean = rebateService.queryRebateList((page-1)*pageSize,pageSize);
		return rightPageListBeanResult(null, "查询成功！", "result", bean);
	}
}
