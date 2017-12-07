package com.blueair.common.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 解析Excel
 * 
 * @author ZhangHuibin
 *
 */
public class ReadExcel extends ExcelProcessor {

	/**
	 * 存储excel每一行
	 */
	public List<HashMap<String, String>> excelList = null;

	public static List<HashMap<String, String>> tempList = null;

	/**
	 * 构造器
	 * 
	 * @param fileName
	 * @throws Exception
	 */
	public ReadExcel(String fileName) throws Exception  {
		super(fileName);
		excelList = new ArrayList<HashMap<String, String>>();
		tempList = new ArrayList<HashMap<String, String>>();
	}

	/**
	 * 处理每行
	 * 
	 * @param row
	 * @return void
	 */
	public void processRow(XRow row) {
		HashMap<String, String> cells = new HashMap<String, String>();
		if (row.getRowIndex() == 1)
			return;
		for (int i = 0; i < row.getCellsSize(); i++) {
			cells.put((char) row.getCell(i).getColumnIndex() + "", row.getCell(i).getValue());
		}
		excelList.add(cells);
		tempList.add(cells);
	}

	public static void main(String[] args) throws Exception {

		Long st = System.currentTimeMillis();
		System.out.println("------------>>>>>>" + st + "---------------");
//		ReadExcel reader = new ReadExcel("C:/Users/lenovo/Desktop/国控海王一级 - 副本.xls");
//		ReadExcel reader = new ReadExcel("C:/Users/lenovo/Desktop/九州通-流向.xlsx");
		ReadExcel reader = new ReadExcel("C:/Users/lenovo/Desktop/华润一级.xls");
		reader.processByRow(1);
		System.out.println(tempList.size());
		for (HashMap<String, String> cell : tempList) {
			System.out.println(cell);
		}
		System.out.println("------------>>>>>>" + (System.currentTimeMillis() - st) / 1000 + "---------------");

		
//		Calendar c = Calendar.getInstance();
//		int year = c.get(Calendar.YEAR); 
//		System.out.println(year);
	}
}
