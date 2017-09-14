package com.blueair.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.MerchanProtocol;
import com.blueair.bean.MerchanProtocolDetail;
import com.blueair.bean.MerchanProtocolQuery;
import com.blueair.service.IMerchanProtocolService;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("merchanProt")
public class MerchanProtocolController extends BaseController {
	@Autowired
	private IMerchanProtocolService protocolService;
	
	private Logger logger=LoggerFactory.getLogger(MerchanProtocolController.class);

	/**
	 * 添加商业协议
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("insert/one")
	public ModelMap insertMerchanProtocol(HttpServletRequest request,String json){
		MerchanProtocol protocol=JsonUtil.convertJson2Object(json, MerchanProtocol.class);
		List<String> excludeNames=new ArrayList<>();
		excludeNames.add("protocolId");
		excludeNames.add("contactor");
		excludeNames.add("phone");
		excludeNames.add("qq");
		try {
			if(DataCheckUtil.checkBeanIfNull(protocol, excludeNames)){
				int result = protocolService.insertMerchanProtocol(protocol);
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
			}else{
				return errorResult("对象属性不能为空！");
			}
		} catch (IllegalArgumentException | IllegalAccessException e) {
			logger.debug("[MerchanProtocolController-->insertMerchanProtocol]读取对象故障{}",e);
			return errorResult("系统故障！");
		}
	}
	
	/**
	 * 修改商业协议
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("update/one")
	public ModelMap updateMerchanProtocol(HttpServletRequest request,String json){
		MerchanProtocol protocol=JsonUtil.convertJson2Object(json, MerchanProtocol.class);
		List<String> excludeNames=new ArrayList<>();
		excludeNames.add("contactor");
		excludeNames.add("phone");
		excludeNames.add("qq");
		try {
			if(DataCheckUtil.checkBeanIfNull(protocol, excludeNames)){
				int result = protocolService.updateMerchanProtocol(protocol);
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
			}else{
				return errorResult("对象属性不能为空！");
			}
		} catch (IllegalArgumentException | IllegalAccessException e) {
			logger.debug("[MerchanProtocolController-->insertMerchanProtocol]读取对象故障{}",e);
			return errorResult("系统故障！");
		}
	}
	
	/**
	 * ID查询商业协议详情
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("query/one/{id:\\d+}")
	public ModelMap queryMerchanProtocol(HttpServletRequest request,@PathVariable("id") Integer id){
		MerchanProtocolDetail protocol = protocolService.queryMerchanProtocol(id);
		return rightObjectResult(null, "查询成功！", "protocol", protocol);
	}
	
	/**
	 * 查询商业协议列表
	 * @param request
	 * @param json
	 * @return
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	@RequestMapping("query/list")
	public ModelMap queryMerchanProtocols(HttpServletRequest request,MerchanProtocolQuery query,int page,int pageSize,int flag) throws IllegalArgumentException, IllegalAccessException{
		DataCheckUtil.beanNullToEmpty(query);
		Map<String, Object> bean=protocolService.queryMerchanProtocols(query,page,pageSize,flag);
		if(flag==1){
			return rightPageListResult(null, "查询成功！", "protocols", bean);
		}else{
			return rightObjectResult(null, "查询成功！", "protocols", bean.get("list"));
		}
	}
}
