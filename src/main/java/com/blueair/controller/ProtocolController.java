package com.blueair.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.ProtocolBase;
import com.blueair.bean.ProtocolQuery;
import com.blueair.service.IProtocolService;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("protocol")
public class ProtocolController extends BaseController {
	@Autowired
	private IProtocolService protocolService;
	
	private Logger logger=LoggerFactory.getLogger(ProtocolController.class);

	@RequestMapping("insert/one")
	public ModelMap insertProtocol(HttpServletRequest request,String json){
		ProtocolBase protocol = JsonUtil.convertJson2Object(json, ProtocolBase.class);
		ModelMap modelMap = checkProtocol(protocol);
		if(modelMap!=null){
			return modelMap;
		}
		int result=protocolService.insertProtocol(protocol);
		switch (result) {
		case 1:
			return rightResult(null, "添加成功！");
		case 0:
			return errorResult("服务故障，未添加成功！");
		case -1:
			return errorResult("协议重复，未添加成功！");
		default:
			return errorResult("未知错误！");
		}
	}

	
	/**
	 * 修改客户协议
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("update/one")
	public ModelMap updateProtocol(HttpServletRequest request,String json){
		ProtocolBase protocol = JsonUtil.convertJson2Object(json, ProtocolBase.class);
		if(DataCheckUtil.isIntegerEmpty(protocol.getProtocolId())){
			return errorResult("协议ID不能为空");
		}
		ModelMap modelMap = checkProtocol(protocol);
		if(modelMap!=null){
			return modelMap;
		}
		int result=protocolService.updateProtocol(protocol);
		switch (result) {
		case 1:
			return rightResult(null, "修改成功！");
		case 0:
			return errorResult("服务故障，未修改成功！");
		case -1:
			return errorResult("协议重复，未修改成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	
	/**
	 * ID查询客户协议
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("query/one/{id:\\d+}")
	public ModelMap queryProtocolById(HttpServletRequest request,@PathVariable("id") Integer id){
		ProtocolBase protocol=protocolService.queryProtocolById(id);
		return rightObjectResult(null, "查询成功", "protocol", protocol);
	}
	
	/**
	 * 模糊查询客户协议列表
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("query/list/valid")
	public ModelMap queryProtocolsByCustomerAndHospitalName(HttpServletRequest request,ProtocolQuery query,int page,int pageSize){
		try {
			query=DataCheckUtil.beanNullToEmpty(query);
		} catch (Exception e) {
			logger.debug("[ProtocolController-->queryProtocolsByCustomerAndHospitalName]对象解析错误,{}",e);
			return errorResult("对象解析错误");
		}
		int firstItem=(page-1)*pageSize;
		Map<String, Object> bean = protocolService.queryProtocolsByCustomerAndHospitalName(query,firstItem,pageSize);
		return rightPageListResult(null, "查询成功！", "protocols", bean);
	}
	
	/**
	 * 查询客户协议以往协议列表
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("query/list/invalid/{id:\\d+}")
	public ModelMap queryProtocolHistory(HttpServletRequest request,@PathVariable("id") Integer id,int page,int pageSize){
		int firstItem=(page-1)*pageSize;
		Map<String, Object> bean=null;
		try {
			bean = protocolService.queryProtocolHistory(id,firstItem,pageSize);
		} catch (Exception e) {
			logger.debug("[ProtocolController-->queryProtocolHistory]对象解析错误,{}",e);
			return errorResult("对象解析错误");
		} 
		if(bean==null){
			return errorResult("客户协议未完整录入！无法关联查询");
		}
		return rightPageListResult(null, "查询成功！", "protocols", bean);
	}
	
	
	private ModelMap checkProtocol(ProtocolBase protocol) {
		if(DataCheckUtil.isIntegerEmpty(protocol.getCustomerId())){
			return errorResult("客户ID不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getZoneId())){
			return errorResult("大区ID不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getCityId())){
			return errorResult("地市ID不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getUpperMerchan())){
			return errorResult("一级商业ID不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getHospitalId())){
			return errorResult("医院不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getProductId())){
			return errorResult("产品ID不能为空");
		}
		if(DataCheckUtil.isDoubleEmpty(protocol.getPromotionExpense())){
			return errorResult("推广费不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getRebatePeriod())){
			return errorResult("返款周期不能为空");
		}
		if(DataCheckUtil.isStringEmpty(protocol.getStartTime())){
			return errorResult("合约开始时间不能为空");
		}
		if(DataCheckUtil.isStringEmpty(protocol.getEndTime())){
			return errorResult("合约结束时间不能为空");
		}
		if(DataCheckUtil.isIntegerEmpty(protocol.getType())){
			return errorResult("合约类型不能为空");
		}
		return null;
	}
}
