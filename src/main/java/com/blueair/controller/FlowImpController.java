package com.blueair.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.common.excel.ReadExcel;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("flow")
public class FlowImpController extends BaseController {
	/**
	 * 上传文件
	 * @param request
	 * @param json
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/import")
	public ModelMap importFile(HttpServletRequest request,String json) throws Exception {
		//将前台传输的json 参数进行转换
		Map<String, Object> paramMap = JsonUtil.convertJson2Object(json, Map.class);
		//导入类型(下拉框形式呈现 1-国控  2-华润  3-九州通)
		String impType = (String) paramMap.get("impType");
		if(StringUtils.isBlank(impType)){
			return parameterResult("导入类型不能为空");
		}
		//导入月份(前台以下拉框的形式呈现)
		String impMonth = (String) paramMap.get("impMonth");
		if(StringUtils.isBlank(impMonth)){
			return parameterResult("导入月份不能为空");
		}
		//导入文件列表
		List<String> pathList =  (List<String>) paramMap.get("pathList");
		//如果上传文件列表参数为空,则不行
		if(pathList.size()<=0){
			return parameterResult("上传文件列表不能为空");
		}
		//存储每个上传文件中的数据
		List<HashMap<String, String>> dataList = new ArrayList<HashMap<String, String>>();
		//循环遍历读取上传文件的数据
		for (String path : pathList) {
			ReadExcel reader = new ReadExcel(path);
			reader.processByRow(1);
			dataList.addAll(reader.excelList);
		}
		//向 service 传输的参数
		paramMap.put("dataList", dataList);
		
		return rightResult(null, "上传成功！");
	}
}
