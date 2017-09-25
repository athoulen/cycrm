package com.blueair.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.Hospital;
import com.blueair.bean.HospitalDetail;
import com.blueair.bean.PageListBean;
import com.blueair.service.IHospitalService;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("hosp")
public class HospitalController extends BaseController {
	@Autowired
	private IHospitalService hospitalServie;

	/**
	 * 添加医院
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/insert/one")
	public ModelMap insertHospital(HttpServletRequest request,String json){
		Hospital hospital = JsonUtil.convertJson2Object(json, Hospital.class);
		if(DataCheckUtil.isStringEmpty(hospital.getHospitalName())){
			return errorResult("医院名称不能为空！");
		}
		if(DataCheckUtil.isIntegerEmpty(hospital.getType())){
			return errorResult("医院类型不能为空！");
		}
		int result = hospitalServie.insertHospital(hospital);
		switch (result) {
		case 1:
			return rightResult(null, "添加成功！");
		case 0:
			return errorResult("服务故障，未添加成功！");
		case -1:
			return errorResult("医院名称重复，未添加成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	/**
	 * 修改医院
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/update/one")
	public ModelMap updateHospital(HttpServletRequest request,String json){
		Hospital hospital = JsonUtil.convertJson2Object(json, Hospital.class);
		if(DataCheckUtil.isStringEmpty(hospital.getHospitalName())){
			return errorResult("医院名称不能为空！");
		}
		if(DataCheckUtil.isIntegerEmpty(hospital.getType())){
			return errorResult("医院类型不能为空！");
		}
		if(DataCheckUtil.isIntegerEmpty(hospital.getHospitalId())){
			return errorResult("医院ID不能为空！");
		}
		int result=hospitalServie.updateHospital(hospital);
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
	 * 查询医院
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/query/one/{id:\\d+}")
	public ModelMap queryHospital(HttpServletRequest request,@PathVariable("id") Integer id){
		HospitalDetail hospital=hospitalServie.queryHospital(id);
		return rightObjectResult(null, "查询成功！", "hospital", hospital);
	}
	
	/**
	 * 查询医院列表
	 * @param request
	 * @param hospitalName
	 * @param page
	 * @param pageSize
	 * @param flag
	 * @return
	 */
	@RequestMapping("/query/list")
	public ModelMap queryHospitals(HttpServletRequest request,String hospitalName,int page,int pageSize,int flag){
		hospitalName=DataCheckUtil.ifNullToEmpty(hospitalName);
		PageListBean bean=hospitalServie.queryHospitals(hospitalName,page,pageSize,flag);
		return rightPageListBeanResult(null, "查询成功！", "hospitals", bean);
	}
}
