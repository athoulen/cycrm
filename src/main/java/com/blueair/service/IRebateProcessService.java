package com.blueair.service;

import com.blueair.bean.PageListBean;
import com.blueair.web.exception.ServiceException;

public interface IRebateProcessService {
	//异步处理流向-->应返佣金
	public boolean AsynDealFlow() throws ServiceException;
	//查询返佣金列表
	public PageListBean queryRebateList(int firstItem,int pageSize);
	//结算佣金
	public void payRebate(Long id);
	//取消结算
	public void cancelPayment(Long id);
}
