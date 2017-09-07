package com.blueair.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.Merchandiser;
import com.blueair.constant.AdminConstants;
import com.blueair.service.IMerchandiserService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("merchan")
public class MerchandiserController extends BaseController {
	@Autowired
	private IMerchandiserService merchanService;

	private Logger logger=LoggerFactory.getLogger(MerchandiserController.class);
	/**
	 * 新增商业公司
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/merchan/add")
	public ModelMap addMerchandiser(HttpServletRequest request,String json){
		Merchandiser merchan=JsonUtil.convertJson2Object(json, Merchandiser.class);
		if(AdminConstants.USER_TYPE.equals(Generator.OPERATOR_TYPE)){
			return errorResult("用户级别不足");
		}
		if(StringUtils.isEmpty(merchan.getName())){
			return errorResult("未填写商业公司名称！");
		}
		if(DataCheckUtil.isIntegerEmpty(merchan.getClassType())){
			return errorResult("公司级别不能为空！");
		}
		if(merchanService.addMerchandiser(merchan)>0){
			return rightResult(null, "添加成功！");
		}else if(merchanService.addMerchandiser(merchan)<0){
			return errorResult("公司已存在");
		}
		return errorResult("添加失败");
	}
	/**
	 * 修改商业公司信息
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/merchan/update")
	public ModelMap updateMerchandiser(HttpServletRequest request,String json){
		Merchandiser merchan=JsonUtil.convertJson2Object(json, Merchandiser.class);
		if(AdminConstants.USER_TYPE.equals(Generator.OPERATOR_TYPE)){
			return errorResult("用户级别不足");
		}
		if(DataCheckUtil.isIntegerEmpty(merchan.getMerchId())){
			return errorResult("公司ID不能为空");
		}
		if(StringUtils.isEmpty(merchan.getName())){
			return errorResult("未填写商业公司名称！");
		}
		if(DataCheckUtil.isIntegerEmpty(merchan.getClassType())){
			return errorResult("公司级别不能为空！");
		}
		if(merchanService.updateMerchandiser(merchan)){
			return rightResult(null, "修改成功！");
		}
		return errorResult("修改失败");
	}
	
	/**
	 * 删除商业公司
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/merchan/delete/{id:\\d+}")
	public ModelMap deleteMerchandiser(HttpServletRequest request,@PathVariable("id") Integer id){
		if(AdminConstants.USER_TYPE.equals(Generator.OPERATOR_TYPE)){
			return errorResult("用户级别不足");
		}
		if(DataCheckUtil.isIntegerEmpty(id)){
			return errorResult("公司ID不能为空");
		}
		
		if(merchanService.deleteMerchandiser(id)){
			return rightResult(null, "删除成功！");
		}
		return errorResult("删除失败！");
	}
	
	/**
	 * 查询商业公司列表
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/merchan/list")
	public ModelMap queryMerchandisers(HttpServletRequest request,String name,String desc,int page,int pageSize){
		if(AdminConstants.USER_TYPE.equals(Generator.OPERATOR_TYPE)){
			return errorResult("用户级别不足");
		}
		name=DataCheckUtil.ifNullToEmpty(name);
		desc=DataCheckUtil.ifNullToEmpty(desc);
		int firstItem=(page-1)*pageSize;
		try {
			Map<String, Object> bean = merchanService.queryMerchandisers(name,desc,firstItem,pageSize);
			return rightPageListResult(null, "查询成功！", "result", bean);
		} catch (Exception e) {
			logger.debug("Merchans查询失败",e);
			return errorResult("查询失败！");
		}
	}
	
	/**
	 * 查询商业公司详情
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/merchan/one/{id:\\d+}")
	public ModelMap queryMerchandiser(HttpServletRequest request,@PathVariable("id") Integer id){
		if(AdminConstants.USER_TYPE.equals(Generator.OPERATOR_TYPE)){
			return errorResult("用户级别不足");
		}
		if(DataCheckUtil.isIntegerEmpty(id)){
			return errorResult("公司ID不能为空");
		}
		try {
			Merchandiser merchan = merchanService.queryMerchandiser(id);
			return rightObjectResult(null, "查询成功", "merchan", merchan);
		} catch (Exception e) {
			logger.debug("Merchan查询失败",e);
			return errorResult("查询失败！");	}
		}
}
