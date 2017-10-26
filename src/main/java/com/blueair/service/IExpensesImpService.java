package com.blueair.service;

import java.util.List;
/**
 * 推广费 service
 * @author lenovo
 *
 */
public interface IExpensesImpService {

	/**
	 * 查询推广费
	 * @return
	 */
	public List<Object> selectExpenses();
	
}
