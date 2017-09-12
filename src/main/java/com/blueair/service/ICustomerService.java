package com.blueair.service;

import java.util.List;
import java.util.Map;

import com.blueair.bean.Customer;

public interface ICustomerService {

	public boolean addCustomerList(List<Customer> list);

	/**
	 * 新增客户
	 * @param customer
	 * @return
	 */
	public int insertCustomer(Customer customer);
	
	/**
	 * 编辑客户信息
	 * @param customer
	 * @return
	 */
	public int updateCustomer(Customer customer);
	
	/**
	 * 查询客户
	 * @param id
	 * @return
	 */
	public Customer queryCustomerById(Integer id);
	
	/**
	 * 模糊查询客户列表
	 * @param customer
	 * @param firstItem
	 * @param pageSize
	 * @param flag
	 * @return
	 */
	public Map<String, Object> queryCustomersBlur(Customer customer,int firstItem,int pageSize,int flag);
}
