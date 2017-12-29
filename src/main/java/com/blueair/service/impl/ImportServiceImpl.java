package com.blueair.service.impl;

import java.io.File;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.blueair.bean.CityAreaIds;
import com.blueair.bean.Customer;
import com.blueair.bean.Hospital;
import com.blueair.bean.Merchandiser;
import com.blueair.bean.Product;
import com.blueair.bean.ProtocolBase;
import com.blueair.common.excel.ReadExcel;
import com.blueair.service.ImportService;
import com.blueair.util.Constants;
import com.blueair.util.DateUtil;
@Service
public class ImportServiceImpl extends BaseServiceImpl implements ImportService {

	@Override
	public void importInitExcel(String path, Integer importType) throws Exception {
		List<HashMap<String, String>> dataList = new ArrayList<HashMap<String, String>>();
		ReadExcel reader = new ReadExcel(path);
		reader.processByRow(1);
		dataList.addAll(reader.excelList);
		switch (importType) {
		case 1:
			customerData(dataList);
			break;
		case 2:
			hospData(dataList);
			break;
		case 3:
			productData(dataList);
			break;
		case 4:
			merchanData(dataList);
			break;
		case 5:
			customerProtoData(dataList);
			break;
		case 6:
			merchanProtoData(dataList);
			break;

		default:
			break;
		}
	}

	private void merchanProtoData(List<HashMap<String, String>> dataList) {
		// TODO Auto-generated method stub
		
	}

	private void customerProtoData(List<HashMap<String, String>> dataList) throws Exception {
		List<ProtocolBase> list=new ArrayList<>();
		List<String> errorList=new ArrayList<>();
		for (HashMap<String, String> param : dataList) {
			ProtocolBase protocol=new ProtocolBase();
			String protocolCode=param.get("B");
			String customerName=param.get("C");
			Integer customerId=queryForCustomerId(protocolCode,customerName);
			String productName=param.get("D");
			String productNorms=param.get("E");
			String manufacture=param.get("F");
			Integer productId=queryForProductId(productName,productNorms,manufacture);
			if(productId==null||productId==0){
				errorList.add("药品["+productName+"]"+"规格["+productNorms+"]"+"生产厂家["+manufacture+"]没有目录");
			}
			String cityStr=param.get("G");
			Map<String, Object> params=new HashMap<>();
			params.put("cityStr", cityStr);
			CityAreaIds cityArea = getBaseDao().queryForObject("ImportMapper.queryForAreaCity", params, CityAreaIds.class);
			String upmerchanStr=param.get("H");
			Integer upMerchanId=queryForMerchanId(upmerchanStr);
			String lomerchanStr=param.get("I");
			Integer loMerchanId=queryForMerchanId(lomerchanStr);
			if(upmerchanStr!=null&&(upMerchanId==null||upMerchanId==0)){
				errorList.add("商业公司["+upmerchanStr+"]没有目录");
			}
			if (lomerchanStr!=null&&(loMerchanId==null||loMerchanId==0)) {
				errorList.add("商业公司["+lomerchanStr+"]没有目录");
			}
			String hospitalName=param.get("J");
			Integer hospitalId = queryForHospitalId(hospitalName);
			if(hospitalId==null||hospitalId==0){
				errorList.add("未找到医院["+hospitalName+"]的目录");
			}
			String expenseStr=param.get("K");
			String bail=param.get("L");
			String periodStr=param.get("M");
			Integer period=0;
			switch (periodStr) {
			case "月结":
				period=1;
				break;
			case "压批压月":
				period=2;
				break;
			case "60天":
				period=3;
				break;
			case "90天":
				period=4;
				break;
			case "120天":
				period=5;
				break;
			default:
				break;
			}
			String dateStr=param.get("R");
			String[] dateStrs=dateStr.split("-");
			String startDate=DateUtil.fromDateStringToLong2(dateStrs[0])+"";
			String endDate=DateUtil.fromDateStringToLong2((dateStrs.length==1||dateStrs[1].isEmpty())?"2018.12.31":dateStrs[1])+"";
			String backStyleStr=param.get("S");
			Byte backStyle=-1;
			if("公司".equals(backStyleStr)){
				backStyle=1;
			}else if("客户支付".equals(backStyleStr)){
				backStyle=0;
			}else{
				throw new Exception("["+customerName+"]客户协议，返利类型有误");
			}
			String cusPay=param.get("T");
			String isHonourStr=param.get("U");
			Byte isHonour=-1;
			if("是".equals(isHonourStr)){
				isHonour=1;
			}else if("否".equals(isHonourStr)){
				isHonour=0;
			}
			String protoTypeStr=param.get("V");
			Integer type=-1;
			if("县级以上".equals(protoTypeStr)){
				type=1;
			}else if("县级以下".equals(protoTypeStr)){
				type=0;
			}
			String isValidStr=param.get("W");
			Byte isValid=-1;
			if("是".equals(isValidStr)){
				isValid=1;
			}else if("否".equals(isValidStr)){
				isValid=0;
			}
			protocol.setBail((bail==null||bail.isEmpty())?0:Double.valueOf(bail));
			protocol.setCityId(cityArea.getCityId());
			protocol.setCreateBy("sysadmin");
			protocol.setCreateTime(System.currentTimeMillis()+"");
			protocol.setCustomerId(customerId);
			protocol.setEndTime(DateUtil.fromDateStringToLong2(endDate)+"");
			protocol.setHospitalId(hospitalId);
			protocol.setIsHonour(isHonour);
			protocol.setIsValid(isValid);
			protocol.setLowerMerchan(loMerchanId);
			protocol.setProductId(productId);
			protocol.setPromotionExpense((expenseStr==null||expenseStr.isEmpty())?0:Double.valueOf(expenseStr));
			protocol.setProtocolCode(protocolCode);
			System.out.println("["+cusPay+"]");
			protocol.setRebate((cusPay==null||cusPay.isEmpty())?0:Double.valueOf(cusPay));
			protocol.setRebatePayer(backStyle);
			protocol.setRebatePeriod(period);
			protocol.setStartTime(DateUtil.fromDateStringToLong2(startDate)+"");
			protocol.setType(type);
			protocol.setUpperMerchan(upMerchanId);
			protocol.setZoneId(cityArea.getAreaId());
			list.add(protocol);
		}
		PrintStream ps=new PrintStream(new File("D:\\error.txt"));
		for (String string : errorList) {
			ps.println(string);
		}
//		getBaseDao().insert("ImportMapper.insertCusProtocol", list);
		
	}

	

	

	private void merchanData(List<HashMap<String, String>> dataList) throws Exception {
		List<Merchandiser> list=new ArrayList<>();
		for (HashMap<String, String> param : dataList) {
			Merchandiser merchan=new Merchandiser();
			String merchanName=param.get("B");
			String classTypeStr=param.get("C");
			Integer classType=0;
			if("一级商业公司".equals(classTypeStr)){
				classType=1;
			}else if("二级商业公司".equals(classTypeStr)||"普通二级公司".equals(classTypeStr)){
				classType=2;
			}else{
				throw new Exception("["+merchanName+"]商业公司类型有误");
			}
			merchan.setName(merchanName);
			merchan.setClassType(classType);
			list.add(merchan);
		}
		Map<String, Object> params=new HashMap<>();
		params.put("list", list);
		params.put("createTime", System.currentTimeMillis());
		getBaseDao().insert("ImportMapper.insertMerchan", params);
		
	}

	private void productData(List<HashMap<String, String>> dataList) {
		List<Product> list=new ArrayList<>();
		for (HashMap<String, String> param : dataList) {
			Product product=new Product();
			String productName=param.get("B");
			String productNorms=param.get("C");
			String manufacture=param.get("D");
			String productPrice=param.get("E");
			String bidPrice=param.get("F");
			String promoteFee=param.get("G");
			product.setProductName(productName);
			product.setProductNorms(productNorms);
			product.setManufacture(manufacture);
			product.setProductPrice(productPrice);
			product.setBidPrice(bidPrice);
			product.setPromoteFee(new BigDecimal(promoteFee));
			list.add(product);
		}
		getBaseDao().insert("ImportMapper.insertProduct", list);
	}

	private void hospData(List<HashMap<String, String>> dataList) throws Exception {
		List<Hospital> list=new ArrayList<>();
		for (HashMap<String, String> param : dataList) {
			Hospital hospital=new Hospital();
			String hospitalName=param.get("B");
			String cityStr=param.get("C");
			String typeStr=param.get("D");
			Map<String, Object> params=new HashMap<>();
			params.put("cityStr", cityStr);
			CityAreaIds cityArea = getBaseDao().queryForObject("ImportMapper.queryForAreaCity", params, CityAreaIds.class);
			int type=0;
			if("县级以上医院".equals(typeStr)){
				type=1;
			}else if("县级以下卫生院".equals(typeStr)){
				type=2;
			}else{
				throw new Exception("["+hospitalName+"]医院类型有误");
			}
			hospital.setHospitalName(hospitalName);
			hospital.setType(type);
			hospital.setZoneId(cityArea.getAreaId());
			hospital.setCityId(cityArea.getCityId());
			hospital.setCreateTime(System.currentTimeMillis()+"");
			list.add(hospital);
		}
		getBaseDao().insert("ImportMapper.insertHospital", list);
	}

	private void customerData(List<HashMap<String, String>> dataList) {
		List<Customer> list=new ArrayList<>();
		for (HashMap<String, String> param : dataList) {
			Customer customer=new Customer();
			String serialCode=param.get("B");
			String customerName=param.get("C");
			String phone=param.get("D");
			String depositBank=param.get("E");
			String account=param.get("F");
			String accountName=null;
			String accountCode=null;
			if(account!=null&&!account.isEmpty()){
				accountName=account.substring(0, indexOfFirstNumber(account));
				accountCode=account.substring(indexOfFirstNumber(account));
			}
			customer.setSerialCode(serialCode);
			customer.setCustomerName(customerName);
			customer.setPhone(phone);
			customer.setDepositBank(depositBank);
			customer.setAccountName(accountName);
			customer.setAccountCode(accountCode);
			customer.setCreateTime(System.currentTimeMillis()+"");
			list.add(customer);
		}
		getBaseDao().insert("ImportMapper.insertCustomers", list);
	}
	
	private Integer queryForHospitalId(String hospitalName) {
		Map<String, Object> params=new HashMap<>();
		params.put("hospitalName", hospitalName);
		return getBaseDao().queryForObject("ImportMapper.queryForHospitalId", params, Integer.class);
	}
	
	private Integer queryForProductId(String productName, String productNorms, String manufacture) {
		Map<String, Object> params=new HashMap<>();
		params.put("productName", productName);
		params.put("productNorms", productNorms);
		params.put("manufacture", manufacture);
		return getBaseDao().queryForObject("ImportMapper.queryForProductId", params, Integer.class);
	}

	private Integer queryForMerchanId(String merchanStr) {
		Map<String, Object> params=new HashMap<>();
		params.put("merchanStr", merchanStr);
		return getBaseDao().queryForObject("ImportMapper.queryForMerchanId", params, Integer.class);
	}
	
	private Integer queryForCustomerId(String protocolCode, String customerName) {
		Map<String, Object> params=new HashMap<>();
		params.put("protocolCode", protocolCode);
		params.put("customerName", customerName);
		return getBaseDao().queryForObject("ImportMapper.queryForCustomerId", params, Integer.class);
	}
	
	private int indexOfFirstNumber(String str){
		String regEx="[^0-9]";   
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		String result=m.replaceAll("").trim();
		Character ch=result.charAt(0);
		int index=str.indexOf(ch);
		return index;
	}
	
	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
	}
}
