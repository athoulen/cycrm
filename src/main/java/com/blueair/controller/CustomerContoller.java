package com.blueair.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blueair.bean.Customer;
import com.blueair.bean.CustomerExcel;
import com.blueair.bean.Product;
import com.blueair.cache.CustomerCache;
import com.blueair.cache.MerchanCache;
import com.blueair.service.ICustomerService;
import com.blueair.service.IProductService;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.DateUtil;
import com.blueair.util.JsonUtil;
import com.blueair.util.PoiExcelUtil;
import com.blueair.web.exception.ServiceException;

@RestController
@RequestMapping("customer")
public class CustomerContoller extends BaseController {
	@Autowired
	private ICustomerService customerService;
	
	private Logger logger=LoggerFactory.getLogger(CustomerContoller.class);

	/*@RequestMapping("/uploadCustomer")
	public ModelMap uploadCustomer(HttpServletRequest request,@RequestParam(value="customerExcel") MultipartFile customerExcel){
		String fileName = customerExcel.getOriginalFilename();
		if(fileName.contains("客户模板")){
			String ext = fileName.substring(fileName.lastIndexOf("."));
		try {
			InputStream is = customerExcel.getInputStream();
			if(is==null){
				logger.debug("文件为空");
				throw new ServiceException("上传内容为空");
			}
			PoiExcelUtil excelReader = new PoiExcelUtil(is,ext);  
			List<CustomerExcel> list = excelReader.readExcelContentToBean(CustomerExcel.class, 25, true);
			if(list==null||list.isEmpty()){
				logger.info("上传内容为空");
				throw new ServiceException("上传内容为空");
			}
			List<Product> products=new ArrayList<>();
			for (CustomerExcel customerExcel2 : list) {
				Product product=new Product(customerExcel2.getProductName(),customerExcel2.getProductNorm());
				products.add(product);
			}
			//获得药品ID
			products=productService.insertProduct(products);
			
			List<Customer> customers = convertExcelToCustomer(list,products);
			
		} catch (Exception e) {
		    logger.error("上传客户信息异常：", e);
			return errorResult("上传的表格不符合要求！（"+e.getMessage()+")");
		}
		}else{
			return failResult("未使用模板");
		}
	}*/

	/**
	 * 从Excel读出的客户转换成Customer Bean
	 * @param list
	 * @return
	 * @throws ServiceException 
	 *//*
	private List<Customer> convertExcelToCustomer(List<CustomerExcel> list,List<Product> products) throws ServiceException {
		List<Customer> customerList=new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			CustomerExcel customerExcel=list.get(i);
			Customer customer=new Customer();
			customer.setAccountCode(customerExcel.getAccountCode());
			customer.setAccountName(customerExcel.getAccountName());
			customer.setBackPayer(customerExcel.getBackpayer());
			Integer backPeriod;
			String backPeriodStr=customerExcel.getBackPeriod().trim();
			backPeriod = dealBackPeriod(backPeriodStr);
			customer.setBackPeriod(backPeriod);
			customer.setBackRebate(customerExcel.getBackRabate()==null?0:customerExcel.getBackRabate());
			customer.setBail(customerExcel.getBail());
			customer.setBailDesc(customerExcel.getBailDesc());
			customer.setCityId((Integer)CustomerCache.getCityMap().get(customerExcel.getCityName()));
			customer.setCustomerName(customerExcel.getCustomerName());
			customer.setDepositBank(customerExcel.getDepositBank());
			customer.setHonour("是".equals(customerExcel.getIshonour()));
			customer.setHospital(customerExcel.getHospital());
			customer.setLowerMerchan((Integer)MerchanCache.getMerchanMap().get(customerExcel.getLowerMerchan()));
			customer.setPhone(customerExcel.getPhone());
			customer.setProductId(products.get(i).getId());
			customer.setPromotionExpense(customerExcel.getPromotionExpense());
			String endDateStr=customerExcel.getContactPeriod().substring(customerExcel.getContactPeriod().indexOf("-")+1);
			String startDateStr=customerExcel.getContactPeriod().substring(0,customerExcel.getContactPeriod().indexOf("-"));
			customer.setProtocolEnd(DateUtil.fromDateStringToLong(endDateStr));
			customer.setProtocolStart(DateUtil.fromDateStringToLong(startDateStr));
			customer.setSerialCode(customerExcel.getSerialCode());
			customer.setSwitchAmount(customerExcel.getSwitchAmount());
			customer.setSwitchExpense(customerExcel.getSwitchExpense());
			if("卫生院".equals(customerExcel.getType().trim())){
				customer.setType(2);
			}else if("医院".equals(customerExcel.getType().trim())){
				customer.setType(1);
			}else{
				throw new ServiceException("客户类型越界");
			}
			customer.setUpperMerchan((Integer)MerchanCache.getMerchanMap().get(customerExcel.getLowerMerchan()));
			customer.setValid(!"作废".equals(customerExcel.getIsValid().trim()));
			customer.setZoneId((Integer)CustomerCache.getAreaMap().get(customerExcel.getZoneName()));
			customerList.add(customer);
		}
		return customerList;
	}

	*//**
	 * 处理返款周期字段
	 * @param backPeriodStr
	 * @return
	 * @throws ServiceException
	 *//*
	private Integer dealBackPeriod(String backPeriodStr)
			throws ServiceException {
		Integer backPeriod;
		switch (backPeriodStr) {
		case "120天":
			backPeriod=5;
			break;
		case "90天":
			backPeriod=4;
			break;
		case "60天":
			backPeriod=3;
			break;
		case "压批压月":
			backPeriod=2;
			break;
		case "月结":
			backPeriod=1;
			break;
		default:
			logger.debug("存在无法解析的返款周期==>"+backPeriodStr);
			throw new ServiceException("存在无法解析的返款周期");
			
		}
		return backPeriod;
	}*/
	
	/**
	 * 添加客户
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/insert/one")
	public ModelMap insertCustomer(HttpServletRequest request,String json){
		Customer customer = JsonUtil.convertJson2Object(json, Customer.class);
		int result=customerService.insertCustomer(customer);
		switch (result) {
		case 1:
			return rightResult(null, "添加成功！");
		case 0:
			return errorResult("服务故障，未添加成功！");
		case -1:
			return errorResult("客户名重复，未添加成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	/**
	 * 修改客户
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/update/one")
	public ModelMap updateCustomer(HttpServletRequest request,String json){
		Customer customer = JsonUtil.convertJson2Object(json, Customer.class);
		int result=customerService.updateCustomer(customer);
		switch (result) {
		case 1:
			return rightResult(null, "修改成功！");
		case 0:
			return errorResult("服务故障，未修改成功！");
		case -1:
			return errorResult("客户名重复，未修改成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	/**
	 * ID查询客户
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping("/query/one/{id:\\d+}")
	public ModelMap queryCustomerById(HttpServletRequest request,@PathVariable("id") Integer id){
		return rightObjectResult(null, "查询成功！", "customer", customerService.queryCustomerById(id));
	}
	
	/**
	 * 模糊查询客户列表，可分页与不分页
	 * @param request
	 * @param customer
	 * @param page
	 * @param pageSize
	 * @param flag		1：分页	0：不分页
	 * @return
	 */
	@RequestMapping("/query/list")
	public ModelMap queryCustomers(HttpServletRequest request,Customer customer,int page,int pageSize,int flag){
		if(DataCheckUtil.isStringEmpty(customer.getCustomerName())){
			customer.setCustomerName("");
		}
		if(DataCheckUtil.isStringEmpty(customer.getPhone())){
			customer.setPhone("");
		}
		int firstItem=(page-1)*pageSize;
		Map<String, Object> customers = customerService.queryCustomersBlur(customer, firstItem, pageSize, flag);
		if(flag==1){
			return rightPageListResult(null, "查询成功！", "customers", customers);
		}else{
			return rightObjectResult(null, "查询成功！", "customers", customers);
		}
	}
}
