package com.blueair.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.BusinessFlowQuery;
import com.blueair.bean.PageListBean;
import com.blueair.common.excel.ReadExcel;
import com.blueair.service.IFlowImpService;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("flow")
public class FlowImpController extends BaseController {
	
	@Autowired
	private IFlowImpService flowImpService;
	
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
		//导入类型(下拉框形式呈现 1-国控  2-华润  3-九州通 4-二级)
		String impType = (String) paramMap.get("impType");
		if(StringUtils.isBlank(impType)){
			return parameterResult("导入类型不能为空");
		}
		//导入年度
		String impYear = String.valueOf(paramMap.get("impYear")) ;
		if(StringUtils.isBlank(impYear)){
			return parameterResult("导入年度不能为空");
		}
		//导入月份(前台以下拉框的形式呈现)
		String impMonth =String.valueOf(paramMap.get("impMonth"));
		if(StringUtils.isBlank(impMonth)){
			return parameterResult("导入月份不能为空");
		}
		//删除标志
		String delFlag = (String) paramMap.get("delFlag");
		if(StringUtils.isBlank(delFlag)){
			return parameterResult("删除标志不能为空");
		}
		if(!"1".equals(delFlag)){
			//导入文件列表
			List<String> pathList =  new ArrayList<>();
			String paths=(String)paramMap.get("pathList");
			pathList.add(paths);
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
				//文件名称
				paramMap.put("fileName", new File(path).getName());
			}
			//向 service 传输的参数
			paramMap.put("dataList", dataList);
		}
		//返回执行标志
		boolean result = flowImpService.importFlowData(paramMap);
		if(result&&"0".equals(delFlag)){
			return rightResult(null, "上传成功！");
		}else if(result&&"1".equals(delFlag)){
			return rightResult(null, "删除成功！");
		}
		return failResult("上传失败！");
	}
	
	/**
	 * 
	 * @param request
	 * @param json  isTerminal ex \ flowFlag  ex \ hospitalName  mi \ customerName  mi \ batchNo ex \ startDate \ endDate
	 * @param page	页码
	 * @param pageSize		页面大小
	 * @param flag		查询哪种类型的流向   1、一级流向   2、二级流向
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/query/list")
	public ModelMap queryForFlow(HttpServletRequest request,String json,int page,int pageSize) throws Exception {
		Map<String,Object> queryMap = JsonUtil.convertJson2Object(json, Map.class);
		queryMap=queryMap==null?new HashMap<String,Object>():queryMap;
		queryMap.put("firstItem", (page-1)*pageSize);
		queryMap.put("pageSize", pageSize);
		PageListBean<BusinessFlowQuery> bean = flowImpService.queryForFlow(queryMap);
		return rightPageListBeanResult(null, "查询成功！", "result", bean);
	}
}
