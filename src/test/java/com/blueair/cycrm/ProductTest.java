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
		params.put("impType", "1");
		//导入月份
		params.put("impMonth", "7");
		// 文件数据列表
		//存储每个上传文件中的数据
		List<HashMap<String, String>> dataList = new ArrayList<HashMap<String, String>>();
		//循环遍历读取上传文件的数据
		ReadExcel reader = new ReadExcel("C:\\Users\\lenovo\\Desktop\\国控海王一级 - 副本.xls");
		reader.processByRow(1);
		dataList.addAll(reader.excelList);
		params.put("dataList", dataList);
		
		flowImpService.importFlowData(params);
		
	}

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
