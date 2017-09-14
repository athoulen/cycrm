package com.blueair.common.excel;

import java.io.IOException;

import org.apache.poi.openxml4j.exceptions.OpenXML4JException;
import org.xml.sax.SAXException;

/**
 * 接口，Excel行级处理器
 * @version 1.0
 * @date Sep 27, 2011
 */
public interface ExcelRowProcessor{
	public void processByRow() throws IOException, OpenXML4JException, SAXException;
	public void processByRow(int sheetIndex) throws IOException, OpenXML4JException, SAXException, Exception;
	public void processByRow(String sheetName) throws OpenXML4JException, SAXException, Exception;
	public void processRow(XRow row);
	public void stop() throws IOException;
}
