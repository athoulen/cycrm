package com.blueair.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueair.constant.HandleCode;
import com.blueair.web.exception.ServiceException;

/** 
 * 读取Excel 
 *  
 * @author athou	 
 */  
public class PoiExcelUtil {  
    private Logger logger = LoggerFactory.getLogger(PoiExcelUtil.class);  
    private Workbook wb;  
    private Sheet sheet;  
    private Row row;  
    
    /**
     * 以流的方式读取
     * @param is
     * @param ext
     */
    public PoiExcelUtil(InputStream is,String ext) {  
        try {  
            if(".xls".equals(ext)){  
                wb = new HSSFWorkbook(is);  
            }else if(".xlsx".equals(ext)){  
                wb = new XSSFWorkbook(is);  
                sheet=wb.getSheetAt(0);
                row=sheet.getRow(3);
               Cell cell = row.getCell(0);
               CellStyle style=wb.createCellStyle();
               style.setFillBackgroundColor(XSSFFont.COLOR_RED);
               cell.getCellStyle();
                XSSFFont xf=(XSSFFont) wb.createFont();
                xf.setFontName("Times New Roman");
                xf.setColor(XSSFFont.COLOR_RED);
            }else{  
                wb=null;  
            }  
        } catch (FileNotFoundException e) {  
            logger.error("FileNotFoundException", e);  
        } catch (IOException e) {  
            logger.error("IOException", e);  
        }  
    } 
      
    /** 
     * 读取Excel表格表头的内容 
     *  
     * @param InputStream 
     * @return String 表头内容的数组 
     * @author caliburn 
     */  
    public String[] readExcelTitle() throws ServiceException{  
        if(wb==null){  
            throw new ServiceException(HandleCode.SERVER_ERROR, "Workbook对象为空！");  
        }  
        sheet = wb.getSheetAt(0);  
        row = sheet.getRow(0);  
        // 标题总列数  
        int colNum = row.getPhysicalNumberOfCells();  
        System.out.println("colNum:" + colNum);  
        String[] title = new String[colNum];  
        for (int i = 0; i < colNum; i++) {  
            // title[i] = getStringCellValue(row.getCell((short) i));  
            title[i] = row.getCell(i).getCellFormula();  
        }  
        return title;  
    }  
  
    /** 
     * 读取Excel数据内容 
     *  
     * @param InputStream 
     * @return Map 包含单元格数据内容的Map对象 
     * @author athou 
     */  
    public Map<Integer, Map<Integer,Object>> readExcelContent() throws ServiceException{  
        if(wb==null){  
            throw new ServiceException(HandleCode.SERVER_ERROR, "Workbook对象为空！");  
        }  
        Map<Integer, Map<Integer,Object>> content = new HashMap<Integer, Map<Integer,Object>>();  
          
        sheet = wb.getSheetAt(0);  
        // 得到总行数  
        int rowNum = sheet.getLastRowNum();  
        row = sheet.getRow(0);  
        int colNum = row.getPhysicalNumberOfCells();  
        // 正文内容应该从第二行开始,第一行为表头的标题  
        for (int i = 1; i <= rowNum; i++) {  
            row = sheet.getRow(i);  
            int j = 0;  
            Map<Integer,Object> cellValue = new HashMap<Integer, Object>();  
            while (j < colNum) {  
                Object obj = getCellFormatValue(row.getCell(j));  
                cellValue.put(j, obj);  
                j++;  
            }  
            content.put(i, cellValue);  
        }  
        return content;  
    }  
    
    /** 
     * 读取Excel数据内容 (List版)
     *  
     * @param InputStream 
     * @return List 包含单元格数据内容的List对象 
     * @author athou 
     */  
    public List<List<Object>> readExcelContentToList() throws ServiceException{  
    	if(wb==null){  
    	    throw new ServiceException(HandleCode.SERVER_ERROR, "Workbook对象为空！"); 
    	}  
    	List<List<Object>> content = new ArrayList<>();  
    	
    	sheet = wb.getSheetAt(0);  
    	// 得到总行数  
    	int rowNum = sheet.getLastRowNum();  
    	row = sheet.getRow(0);  
    	int colNum = row.getPhysicalNumberOfCells();  
    	// 正文内容应该从第二行开始,第一行为表头的标题  
    	for (int i = 1; i <= rowNum; i++) {  
    		row = sheet.getRow(i);  
    		int j = 0;  
    		List<Object> subContent=new ArrayList<>();
    		while (j < colNum) {  
    			Object obj = getCellFormatValue(row.getCell(j));  
    			subContent.add(obj);  
    			j++;  
    		}  
    		content.add(subContent);  
    	}  
    	return content;  
    }  
    
    
    
    
    public <T> List<T> readExcelContentToBean(Class<T> cls,int columnNum,boolean isLimit) throws ServiceException{  
    	
    	 if(wb==null){  
    	     throw new ServiceException(HandleCode.SERVER_ERROR, "Workbook对象为空！");  
         }  
    	List<T> list=new ArrayList<>();
    	
         sheet = wb.getSheetAt(0);  
         // 得到总行数  
         int rowNum = sheet.getLastRowNum();  
         row = sheet.getRow(0);  
         int colNum = row.getPhysicalNumberOfCells();  
         int colLimit;
         if(isLimit&&colNum>columnNum){
        	 colLimit=columnNum;
         }else{
        	 colLimit=colNum;
         }
         try {
             // 正文内容应该从第二行开始,第一行为表头的标题  
             for (int i = 1; i <= rowNum; i++) {  
                 row = sheet.getRow(i);  
                 int j = 0;  
                 T t=cls.newInstance();
                 Field[] fields = cls.getDeclaredFields();
                 while (j < colLimit) {  
                     Object obj = getCellFormatValue(row.getCell(j));  
                     fields[j+1].setAccessible(true);
                     fields[j+1].set(t, obj);
                     j++;  
                 }  
                 list.add(t);
             }  
            } catch (Exception e) {
                logger.error("readExcelContentToBean(...) 抛出异常：", e);
            }
         
         return list;  
    	
    }
  
    /** 
     *  
     * 根据Cell类型设置数据 
     *  
     * @param cell 
     * @return 
     * @author zengwendong 
     */  
    private Object getCellFormatValue(Cell cell) {  
        Object cellvalue;  
        if (cell != null) {  
            // 判断当前Cell的Type  
            switch (cell.getCellType()) {  
            case Cell.CELL_TYPE_NUMERIC:// 如果当前Cell的Type为NUMERIC  
            case Cell.CELL_TYPE_FORMULA: {  
                // 判断当前的cell是否为Date  
                if (DateUtil.isCellDateFormatted(cell)) {  
                    // 如果是Date类型则，转化为Data格式  
                    // data格式是带时分秒的：2013-7-10 0:00:00  
                    // cellvalue = cell.getDateCellValue().toLocaleString();  
                    // data格式是不带带时分秒的：2013-7-10  
                    Date date = cell.getDateCellValue();  
                    cellvalue = date;  
                } else {// 如果是纯数字  
  
                    // 取得当前Cell的数值  
                    cellvalue = String.valueOf(cell.getNumericCellValue());  
                }  
                break;  
            }  
            case Cell.CELL_TYPE_STRING:// 如果当前Cell的Type为STRING  
                // 取得当前的Cell字符串  
                cellvalue = cell.getRichStringCellValue().getString();  
                break;  
            default:// 默认的Cell值  
                cellvalue = "";  
            }  
        } else {  
            cellvalue = "";  
        }  
        return cellvalue;  
    }  

}  
