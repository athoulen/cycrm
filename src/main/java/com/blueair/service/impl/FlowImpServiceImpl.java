package com.blueair.service.impl;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.StopWatch;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueair.bean.BusinessFlow;
import com.blueair.bean.BusinessFlowQuery;
import com.blueair.bean.CustomerProtocol;
import com.blueair.bean.FileRecord;
import com.blueair.bean.PageListBean;
import com.blueair.bean.Product;
import com.blueair.cache.CustomerCache;
import com.blueair.cache.MerchanCache;
import com.blueair.cache.ProductCache;
import com.blueair.constant.HandleCode;
import com.blueair.service.IFlowImpService;
import com.blueair.service.IStockService;
import com.blueair.util.Constants;
import com.blueair.util.DateUtil;
import com.blueair.web.exception.ServiceException;

@Service("flowImpService")
public class FlowImpServiceImpl extends BaseServiceImpl implements IFlowImpService {
	@Autowired
	private IStockService stockService;

	/**
	 * 导入流向数据
	 * 
	 * @param param
	 * @return map
	 * @throws SQLException
	 * @throws ServiceException
	 */
	@SuppressWarnings("unchecked")
	public boolean importFlowData(Map<String, Object> param) throws SQLException, ServiceException {
		// 导入类型(1-国控 2-华润 3-九州通)
		String impType = (String) param.get("impType");
		// 文件类型(101-国控01 102-国控02 201-华润01 202-华润02 301-九州通01 302-九州通02)
		// String fileType = (String) param.get("fileType");
		// 导入年份
		String impYear = String.valueOf(param.get("impYear"));
		// 导入月份
		String impMonth = String.valueOf(param.get("impMonth"));
		// 文件名称
		String fileName = (String) param.get("fileName");
		// 删除标志
		String delFlag = (String) param.get("delFlag");
		// 如果是覆盖导入则删除原来的数据
		if (delFlag.equals("1")) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("soldYear", impYear);
			params.put("soldMonth", impMonth);
			params.put("fileType", impType);
			//处理库存
			stockService.checkLowerMerchanStock(impYear, impMonth,impType ,true);
			getBaseDao().delete("BusinessFlowMapper.deleteFlowData", params);
			getBaseDao().delete("BusinessFlowMapper.deleteImpFileRecord", params);
			return true;
		} else {
			// 插入文件记录表
			FileRecord record = new FileRecord();
			record.setImpYear(impYear);
			record.setImpMonth(impMonth);
			record.setFileType(impType);
			record.setFileName(fileName);
			try {
				getBaseDao().insert("FileRecordMapper.insert", record);
			} catch (Exception e) {
				throw new ServiceException(HandleCode.FAIL, "该月份相应的表格已插入");
			}
		}
		// 文件数据列表
		List<HashMap<String, String>> dataList = (List<HashMap<String, String>>) param.get("dataList");
		// 流向列表
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		// 国控格式的数据
		if (impType.equals("1")) {
			flowList = processGkData(dataList, impYear, impType, impMonth);
		}
		// 华润格式的数据
		if (impType.equals("2")) {
			flowList = processHrData(dataList, impYear, impType, impMonth);
		}
		// 九州通格式的数据
		if (impType.equals("3")) {
			flowList = processJztData(dataList, impYear, impType, impMonth);
		}
		// 二级流向格式的数据
		if (impType.equals("4")) {
			flowList = processSecClassData(dataList, impYear, impType, impMonth);
		}
		if (!flowList.isEmpty()) {
			// 执行开始时间
			StopWatch watch=new StopWatch();
			watch.start();
			// 批量入库
			int result = getBaseDao().insert("BusinessFlowMapper.insertBatch", flowList);
			// 执行结束时间
			watch.stop();
			System.out.println(
					"-------向数据库插入 " + flowList.size() + " 条数据，共用时：" + watch.getTime() / 1000 + " s--------");
			//处理库存
			stockService.checkLowerMerchanStock(null, null,null, false);
			// 判断是否插入成功
			if (result <= 0) {
				return false;
			}
		}
		return true;
	}

	// 处理二级流向格式的数据
	private List<BusinessFlow> processSecClassData(List<HashMap<String, String>> dataList, String impYear,
			String impType, String impMonth) throws ServiceException {
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		for (HashMap<String, String> dataMap : dataList) {
			BusinessFlow flow = new BusinessFlow();
			// 文件类型
			flow.setFileType(Constants.ER_JI);
			// 销售年份
			flow.setSoldYear(impYear);
			// 销售月份
			flow.setSoldMonth(impMonth);

			// 销售部门
			String soldUnitName = dataMap.get("C");
			// 销售部门id
			String soldUnitId = MerchanCache.getMerchanMap().get(soldUnitName) == null ? null
					: MerchanCache.getMerchanMap().get(soldUnitName).toString();
			if(soldUnitId==null){
				throw new ServiceException(HandleCode.FAIL,
						"商业公司：" + soldUnitName + "，未找到名录");
			}
			flow.setSoldUnitId(soldUnitId);
			// 销售日期
			String soldDate = dataMap.get("D");
			soldDate.replaceAll("/", "-");
			flow.setSoldDate(soldDate);
			// 药品名称
			String productName = dataMap.get("J");
			// 生产厂家
			String manufacturer = dataMap.get("L");
			// 产品
			Product pro = (Product) ProductCache.getProductMap().get(productName.trim() + manufacturer.trim());
			if (null != pro) {
				flow.setProductId(pro.getId() + "");
			}
			// 接收部门
			String acceptUnitName = dataMap.get("H");
			// 接收部门id
			String acceptUnitId = MerchanCache.getHospitalMap().get(acceptUnitName) == null ? null
					: MerchanCache.getHospitalMap().get(acceptUnitName).toString();
			// 客户protocol
			CustomerProtocol protocol = (CustomerProtocol) CustomerCache.getCustomerPtlMap()
					.get(acceptUnitId + pro.getId());
			if (null != protocol) {
				flow.setCustomerId(protocol.getCustomerId() + "");
			} else {
				throw new ServiceException(HandleCode.SERVER_ERROR, "未找到相关协议");
			}
			int soldGoodsNum = Integer.parseInt(dataMap.get("M"));
			flow.setSoldGoodsNum(soldGoodsNum);
			// 是否是终端
			flow.setIsTerminal("1");
			// 如果有客户的话，就是客户中的销售单价，否则就是默认药品销售单价
			BigDecimal salePrice = protocol.getSalePrice();
			// 销售单价
			flow.setSoldPrice(salePrice);
			// 销售金额
			flow.setSoldMoney(salePrice.multiply(new BigDecimal(soldGoodsNum)));
			flow.setAcceptUnitId(acceptUnitId);
			// 批号信息
			String batchNo = dataMap.get("N");
			flow.setBatchNo(batchNo);
			// 一级流向
			flow.setFlowFlag("02");
			// 部门
			flow.setDepartment("商务部");
			flowList.add(flow);
		}
		return flowList;

	}

	/**
	 * 处理国控数据
	 * 
	 * @throws ServiceException
	 */
	public List<BusinessFlow> processGkData(List<HashMap<String, String>> dataList, String impYear, String fileType,
			String impMonth) throws ServiceException {
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		for (HashMap<String, String> dataMap : dataList) {
			BusinessFlow flow = new BusinessFlow();
			// 文件类型
			flow.setFileType(fileType);
			// 销售年份
			flow.setSoldYear(impYear);
			// 销售月份
			flow.setSoldMonth(impMonth);
			// 销售日期
			String soldDate = dataMap.get("A");
			flow.setSoldDate(soldDate);
			// 销售部门
			String soldUnitName = dataMap.get("C");
			// 销售部门id
			String soldUnitId = MerchanCache.getMerchanMap().get(soldUnitName) == null ? null
					: MerchanCache.getMerchanMap().get(soldUnitName).toString();
			if(soldUnitId==null){
				throw new ServiceException(HandleCode.FAIL,
						"商业公司：" + soldUnitName + "，未找到名录");
			}
			flow.setSoldUnitId(soldUnitId);
			// 药品名称
			String productName = dataMap.get("F");
			// 生产厂家
			String manufacturer = dataMap.get("I");
			// 产品
			Product pro = (Product) ProductCache.getProductMap().get(productName.trim() + manufacturer.trim());
			if (null != pro) {
				flow.setProductId(pro.getId() + "");
			} else {
				throw new ServiceException(HandleCode.FAIL,
						"产品名称规格为：" + productName + "生产厂家：" + manufacturer + "，未找到名录");
			}
			// 产品销售单价
			BigDecimal salePrice = new BigDecimal(pro.getProductPrice() + "");
			// 接收部门
			String acceptUnitName = dataMap.get("D");
			// 接收部门id
			String acceptUnitId = MerchanCache.getHospitalMap().get(acceptUnitName) == null ? null
					: MerchanCache.getHospitalMap().get(acceptUnitName).toString();
			// 调货数量
			int allocateGoodsNum = 0;
			// 销售数量
			int soldGoodsNum = 0;
			if (StringUtils.isBlank(acceptUnitId)) {
				acceptUnitId = MerchanCache.getMerchanMap().get(acceptUnitName) == null ? null
						: MerchanCache.getMerchanMap().get(acceptUnitName).toString();
				if (acceptUnitId == null) {
					/***为卫生院新增处理方式***/
					String clinic=dataMap.get("M");
					acceptUnitId=MerchanCache.getHospitalMap().get(clinic) == null ? null
							: MerchanCache.getHospitalMap().get(clinic).toString();
					if(acceptUnitId==null){
						throw new ServiceException(HandleCode.FAIL, "未找到" + acceptUnitName + "终端或公司");
					}
					String customerName=dataMap.get("N");
					// 客户protocol
					Integer customerId = (Integer) CustomerCache.getCustomerMap()
							.get(customerName.replaceAll(" ", ""));
					if (null != customerId) {
						flow.setCustomerId(customerId+"");
					} else {
						throw new ServiceException(HandleCode.FAIL,
								"未找到客户：[" + customerName + "]");
					}
					/***为卫生院新增处理方式***/
				}
				allocateGoodsNum = Integer.parseInt(dataMap.get("G"));
				flow.setAllocateGoodsNum(allocateGoodsNum);
				// 是否是终端
				flow.setIsTerminal("0");
			} else {
				// 客户protocol
				CustomerProtocol protocol = (CustomerProtocol) CustomerCache.getCustomerPtlMap()
						.get(acceptUnitId + pro.getId());
				if (null != protocol) {
					flow.setCustomerId(protocol.getCustomerId() + "");
				} else {
					throw new ServiceException(HandleCode.FAIL,
							"未找到产品名称规格为：" + productName + "生成厂家为：" + manufacturer + "发往" + acceptUnitName + "的客户协议");
				}
				soldGoodsNum = Integer.parseInt(dataMap.get("G"));
				flow.setSoldGoodsNum(soldGoodsNum);
				// 是否是终端
				flow.setIsTerminal("1");
				/*if (null != protocol) {
					// 如果有客户的话，就是客户中的销售单价，否则就是默认药品销售单价
					salePrice = protocol.getSalePrice();
				}*/
			}
			flow.setAcceptUnitId(acceptUnitId);
			// 批号信息
			String batchNoContents = dataMap.get("J");
			// 批号
			String batchNo = "";
			if (StringUtils.isNotBlank(batchNoContents)) {
				// 批号:170131/3 生产日期:2016-12-22 效期:2018-11-30 数量:30
				batchNo = batchNoContents.split("生产日期")[0].replace("批号:", "");
			}
			flow.setBatchNo(batchNo);
			// 商业调拨价
			BigDecimal allocatePrice = new BigDecimal(dataMap.get("K"));
			flow.setAllocatePrice(allocatePrice);
			// 一级流向
			flow.setFlowFlag("01");
			// 部门
			flow.setDepartment("商务部");
			// 销售单价
			flow.setSoldPrice(salePrice);
			// 销售金额
			flow.setSoldMoney(salePrice.multiply(new BigDecimal(soldGoodsNum)));
			flowList.add(flow);
		}
		return flowList;
	}

	/**
	 * 处理华润数据
	 * 
	 * @throws ServiceException
	 */
	public List<BusinessFlow> processHrData(List<HashMap<String, String>> dataList, String impYear, String fileType,
			String impMonth) throws ServiceException {
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		for (HashMap<String, String> dataMap : dataList) {
			BusinessFlow flow = new BusinessFlow();
			// 摘要
			String desc = dataMap.get("W");
			// 不考虑进货的数据
			if (desc.equals("进货")) {
				continue;
			}
			// 文件类型
			flow.setFileType(fileType);
			// 销售年份
			flow.setSoldYear(impYear);
			// 销售月份
			flow.setSoldMonth(impMonth);
			// 销售日期
			String soldDate = dataMap.get("A");
			flow.setSoldDate(soldDate.substring(0, soldDate.indexOf('.')));
			// 销售部门
			String soldUnitName = dataMap.get("B");
			// 销售部门id
			String soldUnitId = MerchanCache.getMerchanMap().get(soldUnitName) == null ? null
					: MerchanCache.getMerchanMap().get(soldUnitName).toString();
			if(soldUnitId==null){
				throw new ServiceException(HandleCode.FAIL,
						"商业公司：" + soldUnitName + "，未找到名录");
			}
			flow.setSoldUnitId(soldUnitId);
			// 药品名称
			String productName = dataMap.get("D");
			// 规格
			String productType = dataMap.get("E");
			// 生产厂家
			String manufacturer = dataMap.get("O");
			// 产品
			Product pro = (Product) ProductCache.getProductMap()
					.get(productName.trim() + productType.trim() + manufacturer.trim());
			if (null != pro) {
				flow.setProductId(pro.getId() + "");
			} else {
				throw new ServiceException(HandleCode.FAIL,
						"产品名称规格为：" + productName + "生产厂家：" + manufacturer + "，未找到名录");
			}
			// 产品销售单价
			BigDecimal salePrice = new BigDecimal(pro.getProductPrice() + "");
			// 接收部门
			String acceptUnitName = dataMap.get("K");
			// 接收部门id
			String acceptUnitId = MerchanCache.getHospitalMap().get(acceptUnitName) == null ? null
					: MerchanCache.getHospitalMap().get(acceptUnitName).toString();

			// 调货数量
			int allocateGoodsNum = 0;
			// 销售数量
			int soldGoodsNum = 0;
			if (StringUtils.isBlank(acceptUnitId)) {
				acceptUnitId = MerchanCache.getMerchanMap().get(acceptUnitName) == null ? null
						: MerchanCache.getMerchanMap().get(acceptUnitName).toString();
				if (acceptUnitId == null) {
					/***为卫生院新增处理方式***/
					String clinic=dataMap.get("X");
					acceptUnitId=MerchanCache.getHospitalMap().get(clinic) == null ? null
							: MerchanCache.getHospitalMap().get(clinic).toString();
					if(acceptUnitId==null){
						throw new ServiceException(HandleCode.FAIL, "未找到" + acceptUnitName + "终端或公司");
					}
					String customerName=dataMap.get("Y");
					// 客户protocol
					Integer customerId = (Integer) CustomerCache.getCustomerMap()
							.get(customerName.replaceAll(" ", ""));
					if (null != customerId) {
						flow.setCustomerId(customerId+"");
					} else {
						throw new ServiceException(HandleCode.FAIL,
								"未找到客户：[" + customerName + "]");
					}
					/***为卫生院新增处理方式***/
				}
				allocateGoodsNum = Integer.parseInt(dataMap.get("I"));
				flow.setAllocateGoodsNum(allocateGoodsNum);
				// 是否是终端
				flow.setIsTerminal("0");
			} else {
				// 客户protocol
				CustomerProtocol protocol = (CustomerProtocol) CustomerCache.getCustomerPtlMap()
						.get(acceptUnitId + pro.getId());
				if (null != protocol) {
					flow.setCustomerId(protocol.getCustomerId() + "");
				} else {
					throw new ServiceException(HandleCode.FAIL,
							"未找到产品名称规格为：" + productName + "生成厂家为：" + manufacturer + "发往" + acceptUnitName + "的客户协议");
				}
				soldGoodsNum = Integer.parseInt(dataMap.get("I"));
				flow.setSoldGoodsNum(soldGoodsNum);
				// 是否是终端
				flow.setIsTerminal("1");
				/*if (null != protocol) {
					// 如果有客户的话，就是客户中的销售单价，否则就是默认药品销售单价
					salePrice = protocol.getSalePrice();
				}*/
			}
			flow.setAcceptUnitId(acceptUnitId);
			// 批号
			String batchNo = dataMap.get("G");
			flow.setBatchNo(batchNo);
			// 商业调拨价
			BigDecimal allocatePrice = new BigDecimal(String.format("%.2f", Double.valueOf(dataMap.get("S"))));
			flow.setAllocatePrice(allocatePrice);
			// 一级流向
			flow.setFlowFlag("01");
			// 部门
			flow.setDepartment("商务部");
			// 销售单价
			flow.setSoldPrice(salePrice);
			// 销售金额
			flow.setSoldMoney(salePrice.multiply(new BigDecimal(soldGoodsNum)));
			flowList.add(flow);
		}
		return flowList;
	}

	/**
	 * 处理九州通数据
	 * 
	 * @throws ServiceException
	 */
	public List<BusinessFlow> processJztData(List<HashMap<String, String>> dataList, String impYear, String fileType,
			String impMonth) throws ServiceException {
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		for (HashMap<String, String> dataMap : dataList) {
			BusinessFlow flow = new BusinessFlow();
			// 文件类型
			flow.setFileType(fileType);
			// 销售年份
			flow.setSoldYear(impYear);
			// 销售月份
			flow.setSoldMonth(impMonth);
			// 销售日期
			String soldDate = dataMap.get("A");
			soldDate = DateUtil.date2String(HSSFDateUtil.getJavaDate(Long.parseLong(soldDate)), "yyyy-MM-dd HH:mm:ss");
			flow.setSoldDate(soldDate);
			// 销售部门
			String soldUnitName = dataMap.get("B");
			// 销售部门id
			String soldUnitId = MerchanCache.getMerchanMap().get(soldUnitName) == null ? null
					: MerchanCache.getMerchanMap().get(soldUnitName).toString();
			if(soldUnitId==null){
				throw new ServiceException(HandleCode.FAIL,
						"商业公司：" + soldUnitName + "，未找到名录");
			}
			flow.setSoldUnitId(soldUnitId);
			// 药品名称
			String productName = dataMap.get("F");
			// 规格
			String productType = dataMap.get("G");
			// 生产厂家
			String manufacturer = dataMap.get("M");
			// 产品
			Product pro = (Product) ProductCache.getProductMap()
					.get(productName.trim() + productType.trim() + manufacturer.trim());
			if (null != pro) {
				flow.setProductId(pro.getId() + "");
			} else {
				throw new ServiceException(HandleCode.FAIL,
						"产品名称规格为：" + productName + "生产厂家：" + manufacturer + "，未找到名录");
			}
			// 产品销售单价
			BigDecimal salePrice = new BigDecimal(pro.getProductPrice() + "");
			// 接收部门
			String acceptUnitName = dataMap.get("D");
			// 接收部门id
			String acceptUnitId = MerchanCache.getHospitalMap().get(acceptUnitName) == null ? null
					: MerchanCache.getHospitalMap().get(acceptUnitName).toString();

			// 调货数量
			int allocateGoodsNum = 0;
			// 销售数量
			int soldGoodsNum = 0;
			if (StringUtils.isBlank(acceptUnitId)) {
				acceptUnitId = MerchanCache.getMerchanMap().get(acceptUnitName) == null ? null
						: MerchanCache.getMerchanMap().get(acceptUnitName).toString();
				if (acceptUnitId == null) {
					/***为卫生院新增处理方式***/
					String clinic=dataMap.get("Q");
					acceptUnitId=MerchanCache.getHospitalMap().get(clinic) == null ? null
							: MerchanCache.getHospitalMap().get(clinic).toString();
					if(acceptUnitId==null){
						throw new ServiceException(HandleCode.FAIL, "未找到" + acceptUnitName + "终端或公司");
					}
					String customerName=dataMap.get("R");
					// 客户protocol
					Integer customerId = (Integer) CustomerCache.getCustomerMap()
							.get(customerName.replaceAll(" ", ""));
					if (null != customerId) {
						flow.setCustomerId(customerId+"");
					} else {
						throw new ServiceException(HandleCode.FAIL,
								"未找到客户：[" + customerName + "]");
					}
					/***为卫生院新增处理方式***/
				}
				allocateGoodsNum = Integer.parseInt(dataMap.get("H"));
				flow.setAllocateGoodsNum(allocateGoodsNum);
				// 是否是终端
				flow.setIsTerminal("0");
			} else {
				// 客户protocol
				CustomerProtocol protocol = (CustomerProtocol) CustomerCache.getCustomerPtlMap()
						.get(acceptUnitId + pro.getId());
				if (null != protocol) {
					flow.setCustomerId(protocol.getCustomerId() + "");
				} else {
					throw new ServiceException(HandleCode.FAIL,
							"未找到产品名称规格为：" + productName + "生成厂家为：" + manufacturer + "发往" + acceptUnitName + "的客户协议");
				}
				soldGoodsNum = Integer.parseInt(dataMap.get("H"));
				flow.setSoldGoodsNum(soldGoodsNum);
				// 是否是终端
				flow.setIsTerminal("1");
				/*if (null != protocol) {
					// 如果有客户的话，就是客户中的销售单价，否则就是默认药品销售单价
					salePrice = protocol.getSalePrice();
				}*/
			}
			flow.setAcceptUnitId(acceptUnitId);
			// 批号
			String batchNo = dataMap.get("K");
			flow.setBatchNo(batchNo);
			// 商业调拨价
			BigDecimal allocatePrice = new BigDecimal(String.format("%.2f", Double.valueOf(dataMap.get("I"))));
			flow.setAllocatePrice(allocatePrice);
			// 一级流向
			flow.setFlowFlag("01");
			// 部门
			flow.setDepartment("商务部");
			// 销售单价
			flow.setSoldPrice(salePrice);
			// 销售金额
			flow.setSoldMoney(salePrice.multiply(new BigDecimal(soldGoodsNum)));
			flowList.add(flow);
		}
		return flowList;
	}

	@Override
	public List<CustomerProtocol> selectCustomerId() {
		return getBaseDao().queryForList("CustomerProtocolMapper.selectCustomerProtocol", null, CustomerProtocol.class);
	}

	@Override
	public PageListBean<BusinessFlowQuery> queryForFlow(Map<String, Object> queryMap) throws ServiceException {
		List<BusinessFlowQuery> flows = getBaseDao().queryForListForObject("BusinessFlowMapper.queryForFlow", queryMap,
				BusinessFlowQuery.class);
		Long totalCount = getBaseDao().queryForObject("BusinessFlowMapper.queryForFlowCount", queryMap, Long.class);
		for (BusinessFlowQuery businessFlowQuery : flows) {
			if (businessFlowQuery.getMerProtocol() == null && businessFlowQuery.getIsTerminal() == 1) {
				throw new ServiceException(HandleCode.FAIL,
						"客户" + businessFlowQuery.getCustomerName() + businessFlowQuery.getSoldDate() + "销售给"
								+ businessFlowQuery.getAcceptUnit() + "的" + businessFlowQuery.getProductName()
								+ "流向缺少商业协议");
			}
			if (businessFlowQuery.getIsTerminal() != 1) {
				continue;
			}
			businessFlowQuery.setBalance();
		}
		PageListBean<BusinessFlowQuery> bean = new PageListBean<>(flows, totalCount);
		return bean;
	}
}
