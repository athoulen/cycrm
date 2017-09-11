package com.blueair.service.impl;

import java.util.List;

import com.blueair.bean.Customer;
import com.blueair.service.ICustomerService;

public class CustomerServiceImpl extends BaseServiceImpl implements ICustomerService {

	@Override
	public boolean addCustomerList(List<Customer> list) {
		
		int result = getBaseDao().insert("CustomerMapper.insertCustomerList", list);
		if(result>0){
			return true;
		}
		return false;
	}

}
