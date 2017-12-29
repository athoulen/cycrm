package com.blueair.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.blueair.bean.Customer;
import com.blueair.bean.CustomerProtocol;
import com.blueair.service.IAreaService;
import com.blueair.service.IFlowImpService;
import com.blueair.service.impl.CustomerServiceImpl;
import com.blueair.util.SpringContextHolder;

public class CustomerCache {
	private static IAreaService areaService	=(IAreaService) SpringContextHolder.getApplicationContext().getBean("areaService");
	private static IFlowImpService flowImpService =(IFlowImpService) SpringContextHolder.getApplicationContext().getBean("flowImpService");
	private static CustomerServiceImpl customerService =(CustomerServiceImpl) SpringContextHolder.getApplicationContext().getBean("customerService");

	private static Map<String, Object> cityMap = null ;
	private static Map<String, Object> areaMap = null ;
	private static Map<String, Object> customerPtlMap = null ;
	private static Map<String, Object> customerMap = null ;
	
	public static Map<String, Object> getCityMap() {
		if(cityMap==null){
			setCityMap();
		}
		return cityMap;
	}
	public static void setCityMap() {
		areaMap=areaService.loadAreaInfo();
	}
	public static Map<String, Object> getAreaMap() {
		if(areaMap==null){
			setAreaMap();
		}
		return areaMap;
	}
	public static void setAreaMap() {
		cityMap=areaService.loadCityInfo();
	}
	
	public static Map<String, Object> getCustomerPtlMap() {
		if(customerPtlMap==null){
			setCustomerPtlMap();
		}
		return customerPtlMap;
	}
	
	public static Map<String, Object> getCustomerMap() {
		if(customerMap==null){
			setCustomerMap();
		}
		return customerMap;
	}
	
	public static void setCustomerMap() {
		List<Customer> customers=customerService.selectCustomerId();
		customerMap=new HashMap<>();
		for (Customer customer : customers) {
			customerMap.put(customer.getCustomerName(), customer.getCustomerId());
		}
	}

	public static void setCustomerPtlMap() {
		List<CustomerProtocol> customerPtlList =flowImpService.selectCustomerId();
		customerPtlMap = new HashMap<String, Object>();
		for (CustomerProtocol customerProtocol : customerPtlList) {
			customerPtlMap.put(customerProtocol.getHospitalId()+""+ customerProtocol.getProductId()+"", customerProtocol);
		}
	}
}
