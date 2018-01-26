package com.blueair.cycrm.imp;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.blueair.cycrm.base.JunitTestBase;
import com.blueair.service.ImportService;
import com.blueair.util.Constants;

public class ImportTest extends JunitTestBase {
	@Autowired
	private ImportService service;
	@Test
	public void customerImport(){
		String path="D:\\客户列表.xlsx";
		try {
			service.importInitExcel(path, Constants.CUSTOMER_IMPORT);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void hospitalImport(){
		String path="E:\\Project\\客户关系管理\\导入表格\\医院列表.xlsx";
		try {
			service.importInitExcel(path, Constants.HOSP_IMPORT);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void productImport(){
		String path="E:\\Project\\客户关系管理\\导入表格\\产品列表.xlsx";
		try {
			service.importInitExcel(path, Constants.PRODUCT_IMPORT);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
	public void merchanImport(){
		String path="E:\\Project\\客户关系管理\\导入表格\\商业公司列表.xlsx";
		try {
			service.importInitExcel(path, Constants.MERCHAN_IMPORT);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
	public void cusProtocolImport(){
		String path="E:\\Project\\客户关系管理\\导入表格\\客户协议 .xlsx";
		try {
			service.importInitExcel(path, Constants.CUSTOMER_PROTOCOL_IMPORT);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
