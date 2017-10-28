package com.blueair.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.FileRecord;
import com.blueair.service.IFileRecordService;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("record")
public class FileRecordController extends BaseController {
	
	@Autowired
	private IFileRecordService fileRecordService;
	/**
	 * 上传文件
	 * @param request
	 * @param json
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/filelist")
	@ResponseBody
	public ModelMap queryFileRecord(HttpServletRequest request,String json) throws Exception {
		//将前台传输的json 参数进行转换
		Map<String, Object> paramMap = JsonUtil.convertJson2Object(json, Map.class);
		//导入类型(下拉框形式呈现 1-国控  2-华润  3-九州通 4-二级)
		String impType = (String) paramMap.get("impType");
		if(StringUtils.isBlank(impType)){
			return parameterResult("导入类型不能为空");
		}
		//导入年度
		String impYear = (String) paramMap.get("impYear");
		if(StringUtils.isBlank(impYear)){
			return parameterResult("导入年度不能为空");
		}
		//导入月份(前台以下拉框的形式呈现)
		String impMonth = (String) paramMap.get("impMonth");
		if(StringUtils.isBlank(impMonth)){
			return parameterResult("导入月份不能为空");
		}
		//文件类型
		paramMap.put("fileType", impType);
		List<FileRecord> records = fileRecordService.queryFileRecord(paramMap);
		return rightObjectResult(null, "查询成功", "records", records);
	}
}
