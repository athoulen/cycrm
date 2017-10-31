package com.blueair.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.blueair.bean.BusinessFlowQuery;
import com.blueair.bean.CustomerProtocol;
import com.blueair.bean.PageListBean;
import com.blueair.web.exception.ServiceException;
/**
 * 流向导入 service
 * @author lenovo
 *
 */
public interface IFlowImpService {

	/**
	 * 导入流向数据
	 * @param param 
	 * @return boolean
	 * @throws SQLException 
	 * @throws Exception 
	 */
	public boolean importFlowData(Map<String, Object> param) throws SQLException, Exception;
	
	/**
	 * 查询客户ID列表
	 * @return
	 */
	public List<CustomerProtocol> selectCustomerId();

	/**
	 * 查询
	 * @param queryMap
	 * @throws ServiceException 
	 */
	public PageListBean<BusinessFlowQuery> queryForFlow(Map<String, Object> queryMap) throws ServiceException;
	
}
