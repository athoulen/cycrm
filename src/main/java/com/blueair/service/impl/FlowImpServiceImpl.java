package com.blueair.service.impl;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.blueair.bean.BusinessFlow;
import com.blueair.bean.CustomerProtocol;
import com.blueair.bean.Product;
import com.blueair.cache.CustomerCache;
import com.blueair.cache.MerchanCache;
import com.blueair.cache.ProductCache;
import com.blueair.service.IFlowImpService;
import com.blueair.util.JsonUtil;

@Service("flowImpService")
public class FlowImpServiceImpl extends BaseServiceImpl implements IFlowImpService {

	/**
	 * 导入流向数据
	 * 
	 * @param param
	 * @return map
	 * @throws SQLException 
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> importFlowData(Map<String, Object> param) throws SQLException {
		// 导入类型(1-国控 2-华润 3-九州通)
		String impType = (String) param.get("impType");
		// 导入月份
		String impMonth = (String) param.get("impMonth");
		// 文件数据列表
		List<HashMap<String, String>> dataList = (List<HashMap<String, String>>) param.get("dataList");
		//流向列表
		List<BusinessFlow> flowList = new ArrayList<BusinessFlow>();
		//国控格式的数据
		if(impType.equals("1")){
			flowList = processGkData(dataList,impMonth);
		}
		//华润格式的数据
		if(impType.equals("2")){
			flowList = processHrData(dataList,impMonth);
		}
		//九州通格式的数据
		if(impType.equals("3")){
			flowList = processJztData(dataList,impMonth);
		}
//		if (!flowList.isEmpty()) {
//			// 执行开始时间
//			Long start = System.currentTimeMillis();
//			// 批量入库
//			int[] result = getBaseDao().insertBatch("BusinessFlowMapper.insertBatch", flowList);
//			// 执行结束时间
//			Long end = System.currentTimeMillis();
//			System.out.println(
//					"-------向数据库插入 " + flowList.size() + " 条数据，共用时：" + (double) (end - start) / 1000 + " s--------");
//			// 判断是否插入成功
//			if (result.length <= 0) {
//				System.out.println("插入异常");
//			}
//		}
		System.out.println(JsonUtil.convertObject2Json(flowList));
		return null;
	}
	
	
	/**
	 * 处理国控数据
	 */
	@SuppressWarnings("unchecked")
	public List<BusinessFlow> processGkData(List<HashMap<String, String>> dataList,String impMonth){
		List<BusinessFlow> flowList= new ArrayList<BusinessFlow>();
		for (HashMap<String, String> dataMap : dataList) {
			BusinessFlow flow = new BusinessFlow();
			//销售月份
			flow.setSoldMonth(impMonth);
			//销售日期
			String soldDate = dataMap.get("A");
			flow.setSoldDate(soldDate);
			//销售部门
			String soldUnitName = dataMap.get("C");
			//销售部门id
			String soldUnitId = MerchanCache.getMerchanMap().get(soldUnitName)+"";
			flow.setSoldUnitId(soldUnitId);
			//药品名称
			String productName = dataMap.get("F");
			//生产厂家
			String manufacturer = dataMap.get("I");
			//产品
			Product pro = (Product) ProductCache.getProductMap().get(productName.trim()+manufacturer.trim());
			if(null!=pro){
				flow.setProductId(pro.getId()+"");
			}
			//产品销售单价
			BigDecimal salePrice = new BigDecimal(pro.getProductPrice()+"");
			//接收部门
			String acceptUnitName = dataMap.get("D");
			//接收部门id
			String acceptUnitId = MerchanCache.getHospitalMap().get(acceptUnitName)+"";
			//客户protocol
			CustomerProtocol protocol = (CustomerProtocol) CustomerCache.getCustomerPtlMap().get(acceptUnitId+pro.getId());
			if(null!=protocol){
				flow.setCustomerId(protocol.getCustomerId()+"");
			}
			//调货数量
			int allocateGoodsNum = 0;
			//销售数量
			int soldGoodsNum = 0;
			if(StringUtils.isBlank(acceptUnitId)){
				acceptUnitId = (String) MerchanCache.getMerchanMap().get(acceptUnitName);
				allocateGoodsNum = Integer.parseInt(dataMap.get("G"));
				flow.setAllocateGoodsNum(allocateGoodsNum);
			}else{
				soldGoodsNum = Integer.parseInt(dataMap.get("G"));
				flow.setSoldGoodsNum(soldGoodsNum);
				//是否是终端
				flow.setIsTerminal("1");
				if(null!=protocol){
					//如果有客户的话，就是客户中的销售单价，否则就是默认药品销售单价
					salePrice = protocol.getSalePrice();
				}
			}
			flow.setAcceptUnitId(acceptUnitId);
			//批号信息
			String batchNoContents = dataMap.get("J");
			//批号
			String batchNo = "";
			if(StringUtils.isNotBlank(batchNoContents)){
				//批号:170131/3 生产日期:2016-12-22 效期:2018-11-30 数量:30
				batchNo = batchNoContents.split("生产日期")[0].replace("批号:","");
			}
			flow.setBatchNo(batchNo);
			//商业调拨价
			BigDecimal allocatePrice = new BigDecimal(dataMap.get("K"));
			flow.setAllocatePrice(allocatePrice);
			//一级流向
			flow.setFlowFlag("01");
			//部门
			flow.setDepartment("商务部");
			//销售单价
			flow.setSoldPrice(salePrice);
			//销售金额
			flow.setSoldMoney(salePrice.add(new BigDecimal(soldGoodsNum)));
			flowList.add(flow);
		}
		return flowList;
	}
	
	/**
	 * 处理华润数据
	 */
	public List<BusinessFlow> processHrData(List<HashMap<String, String>> dataList,String impMonth){
		return null;
	}

	/**
	 * 处理九州通数据
	 */
	public List<BusinessFlow> processJztData(List<HashMap<String, String>> dataList,String impMonth){
		return null;
	}


	@Override
	public List<CustomerProtocol> selectCustomerId() {
		return getBaseDao().queryForList("CustomerProtocolMapper.selectCustomerProtocol", null,CustomerProtocol.class);
	}
	
}
