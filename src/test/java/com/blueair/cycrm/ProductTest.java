package com.blueair.cycrm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.blueair.common.excel.ReadExcel;
import com.blueair.cycrm.base.JunitTestBase;
import com.blueair.service.IFlowImpService;

public class ProductTest extends JunitTestBase{
	@Autowired
	@Qualifier("flowImpService")
	private IFlowImpService flowImpService;

	@Test
	public void processExcel() throws Exception {
		// 获取传入参数信息
		Map<String, Object> params = new HashMap<String, Object>();
		//导入类型(1-国控 2-华润 3-九州通)
		params.put("impType", "3");
		//导入年份
		params.put("impYear", "2017");
		//导入月份
		params.put("impMonth", "7");
		//文件名称
		params.put("delFlag", "0");
		// 文件数据列表
		//存储每个上传文件中的数据
		List<HashMap<String, String>> dataList = new ArrayList<HashMap<String, String>>();
		//循环遍历读取上传文件的数据
//		ReadExcel reader = new ReadExcel("C:\\Users\\lenovo\\Desktop\\国控海王一级 - 副本.xls");
//		ReadExcel reader = new ReadExcel("C:\\Users\\lenovo\\Desktop\\国控海王一级 - copy.xls");
//		ReadExcel reader = new ReadExcel("C:\\Users\\lenovo\\Desktop\\huarun.xlsx");
		ReadExcel reader = new ReadExcel("C:\\Users\\lenovo\\Desktop\\jiuhzoutong.xlsx");
		reader.processByRow(1);
		dataList.addAll(reader.excelList);
		params.put("dataList", dataList);
		
		flowImpService.importFlowData(params);
		
	}

	
	public static void main(String[] args) {
		String result = String.format("%.2f", Double.valueOf("3.156545"));
		 System.out.println(result);
		 String soldDate= "2017-07-03 18:06:27.0";
		 System.out.println(soldDate.substring(0, soldDate.indexOf('.')));
		 
		
	}
}
