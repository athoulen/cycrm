package com.blueair.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.blueair.bean.CustomerProtocol;
/**
 * 流向导入 service
 * @author lenovo
 *
 */
public interface IFlowImpService {

	/**
	 * 导入流向数据
	 * @param param 
	 * @return map
	 * @throws SQLException 
	 * @throws Exception 
	 */
	public Map<String, Object> importFlowData(Map<String, Object> param) throws SQLException, Exception;
	
	/**
	 * 查询客户ID列表
	 * @return
	 */
	public List<CustomerProtocol> selectCustomerId();
	
}
