package com.blueair.common.excel;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.openxml4j.exceptions.OpenXML4JException;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import com.blueair.common.exception.CyException;
/**
 * Excel处理器，兼容Excel-2003与Excel-2007
 * @version 1.0
 * @date Sep 29, 2011
 */
public abstract class ExcelProcessor implements ExcelRowProcessor{
	private ExcelRowProcessor processor;
	
	public ExcelProcessor(String fileName) throws CyException, FileNotFoundException{
		if(fileName==null||"".equals(fileName)){
			throw new CyException("构造Excel导入器失败，未指定文件全名。");
		}
		File file=new File(fileName);
		if(!file.exists()){
			throw new FileNotFoundException("构造Excel导入器失败，指定的文件不存在："+fileName);
		}
		try {
			if(fileName.endsWith("xls")){
				processor=new MyExcel2003RowProcessor(fileName);
			}else{
				processor=new MyExcel2007RowProcessor(fileName);
			}
		} catch (Exception e) {
			throw new CyException("构造Excel解析器失败" + e.getMessage());
		}
		
	}
	
	public ExcelProcessor(MultipartFile file) throws CyException, FileNotFoundException{
		if(file.getOriginalFilename()==null||"".equals(file.getOriginalFilename())){
			throw new CyException("构造Excel导入器失败，未指定文件全名。");
		}
		if(file.isEmpty()){
			throw new FileNotFoundException("构造Excel导入器失败，指定的文件不存在："+file.getOriginalFilename());
		}
		try {
			if(file.getOriginalFilename().endsWith("xls")){
				processor=new MyExcel2003RowProcessor(file);
			}else{
				processor=new MyExcel2007RowProcessor(file);
			}
		} catch (Exception e) {
			throw new CyException("构造Excel解析器失败" + e.getMessage());
		}
		
	}
	
	public void processByRow() throws IOException, OpenXML4JException, SAXException {
		processor.processByRow();
	}

	public void processByRow(int sheetIndex) throws Exception {
		processor.processByRow(sheetIndex);
	}
	public void processByRow(String sheetName) throws Exception {
		processor.processByRow(sheetName);
	}
	public void stop() throws IOException {
		processor.stop();
	}

	public abstract void processRow(XRow row);
	
	private class MyExcel2003RowProcessor extends Excel2003RowProcessor{
		public MyExcel2003RowProcessor(String filename) throws Exception {
			super(filename);
		}
		
		public MyExcel2003RowProcessor(MultipartFile file) throws Exception {
			super(file);
		}

		@Override
		public void processRow(XRow row) {
			ExcelProcessor.this.processRow(row);
		}

	}
	
	private class MyExcel2007RowProcessor extends Excel2007RowProcessor{
		public MyExcel2007RowProcessor(String filename) throws Exception {
			super(filename);
		}
		public MyExcel2007RowProcessor(MultipartFile file) throws Exception {
			super(file);
		}

		@Override
		public void processRow(XRow row) {
			ExcelProcessor.this.processRow(row);
		}
	}
}
