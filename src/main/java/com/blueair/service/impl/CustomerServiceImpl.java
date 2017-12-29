package com.blueair.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.Customer;
import com.blueair.service.ICustomerService;
import com.blueair.util.ConvertUtil;
import com.blueair.util.OperateUtil;
@Service("customerService")
public class CustomerServiceImpl extends BaseServiceImpl implements ICustomerService {

	@Override
	public boolean addCustomerList(List<Customer> list) {
		
		int result = getBaseDao().insert("CustomerMapper.insertCustomerList", list);
		if(result>0){
			return true;
		}
		return false;
	}

	@Override
	public int insertCustomer(Customer customer) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(customer);
		int count=getBaseDao().queryForObject("CustomerMapper.queryCustomerByName", params,Integer.class);
		if(count>0){
			return -1;
		}
		OperateUtil.insertOperatorInfo(params);
		int result = getBaseDao().insert("CustomerMapper.insertCustomer", params);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public int updateCustomer(Customer customer) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(customer);
		int count=getBaseDao().queryForObject("CustomerMapper.queryCustomerByName", params,Integer.class);
		if(count>0){
			return -1;
		}
		OperateUtil.insertOperatorInfo(params);
		int result = getBaseDao().insert("CustomerMapper.updateCustomer", params);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public Customer queryCustomerById(Integer id) {
		return  getBaseDao().queryForObject("CustomerMapper.queryCustomerById", id, Customer.class);
	}
	
	@Override
	public List<Customer> selectCustomerId(){
		return getBaseDao().queryForList("CustomerMapper.selectCustomers", null, Customer.class);
	}

	@Override
	public Map<String, Object> queryCustomersBlur(Customer customer, int firstItem, int pageSize, int flag) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(customer);
		List<Customer> list = getBaseDao().queryForList("CustomerMapper.queryCustomersBlur", params, Customer.class);
		Integer totalCount = getBaseDao().queryForObject("CustomerMapper.queryCustomersCount", params, Integer.class);
		return dealWithPageList(list,totalCount);
	}

}
