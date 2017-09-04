package com.blueair.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class BeanUtil {
	
	private static Logger logger = LoggerFactory.getLogger(BeanUtil.class);
	private static String COMPANY_CODE = "companyCode";
	/** 私有构造器 **/
	private BeanUtil() {
	}

	/**
	 * 将String转换成Date对象
	 * 
	 * @param date
	 * @return Date对象
	 */
	public static Date parse(String date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return isEmpty(date) ? null : dateFormat.parse(date);
		} catch (ParseException e) {
			logger.error("convert String 2 Date Error.", e);
		}
		return null;
	}

	/**
	 * 将Date 对象转换成String
	 * @param date
	 * @return
	 */
	public static String format(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return date == null ? "" : dateFormat.format(date);
	}

	/**
	 * 判断字符串是否为空
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isEmpty(String value) {
		return (value == null || "".equals(value.trim()));
	}

	/**
	 * 判断字符串是否不为空
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isNotEmpty(String value) {
		return !isEmpty(value);
	}

	/**
	 * 通过反射获取值
	 */
	public static Object getValueFromField(Field field, String name, String value) {
		String temp = value;
		Object object = value;
		String type = field.getType().getSimpleName();
		
		if (isEmpty(temp) && ("Short,short,int,Integer,Long,long,Double,double,Float,float".contains(type))) {
			temp = "0";
		}

		if ("short".equalsIgnoreCase(type)) { // Short
			object = Short.valueOf(temp);
		} else if ("char".equals(type) || "Character".equals(type)) { // Character
			if (!BeanUtil.isEmpty(temp)){
				object = temp.charAt(0);
			}
		} else if ("int".equals(type) || "Integer".equals(type)) { // Integer
			object = Integer.valueOf(temp);
		} else if ("long".equalsIgnoreCase(type)) { // Long
			object = Long.valueOf(temp);
		} else if ("byte".equalsIgnoreCase(type)) { // Byte
			object = Byte.valueOf(temp);
		} else if ("float".equalsIgnoreCase(type)) { // Float
			object = Float.valueOf(temp);
		} else if ("double".equalsIgnoreCase(type)) { // Double
			object = Double.valueOf(temp);
		} else if ("boolean".equalsIgnoreCase(type)) { // Boolean
			if(StringUtils.equals(temp, "1")){//转换1/0
				temp = "true";
			}
			object = Boolean.valueOf(temp);
		} else if ("Date".equals(type)) { // Date
			object = BeanUtil.parse(temp);
		} else if ("byte[]".equalsIgnoreCase(type)) { // byte[]
			object = ConvertUtil.string2Bytes(temp);
		} 
		return object;
	}

	/**
	 * 通过反射获取值
	 */
	public static Object getValueFromField(Object object, Field field) {
		try {
			Object value = field.get(object);
			
			String type = field.getType().getSimpleName();
			if ("short".equals(type)) { // Short
				value = field.getShort(object);
			} else if ("char".equals(type)) { // char
				value = field.getChar(object);
			} else if ("int".equals(type)) { // int
				value = field.getInt(object);
			} else if ("long".equals(type)) { // long
				value = field.getLong(object);
			} else if ("byte".equals(type)) { // byte
				value = field.getByte(object);
			} else if ("float".equals(type)) { // float
				value = field.getFloat(object);
			} else if ("double".equals(type)) { // double
				value = field.getDouble(object);
			} else if ("boolean".equals(type)) { // boolean
				value = field.getBoolean(object);
			} else if ("Date".equals(type)) { // Date
				value = BeanUtil.format((Date) value);
			} else if ("byte[]".equalsIgnoreCase(type)) { // byte[]
				if (value != null) {
					value = ConvertUtil.bytes2String((byte[]) value);
				}
			} else if ("String".equalsIgnoreCase(type)) {
				if (value == null) {
					value = "";
				}
			}
			return value;
		} catch (Exception e) {
			logger.error("getValueFromField", e);
			return null;
		}
	}
	
	/**
	 * 获取所有父类的属性列表
	 */
	public static Field[] getSuperFields(Class<?> subCls, List<Field> subFields) {
		Class<?> superClass = subCls.getSuperclass();
		List<Field> tempSubFields = new ArrayList<Field>(subFields);
		if (superClass != null && superClass != Object.class) {
			Field[] superFields = superClass.getDeclaredFields();
			tempSubFields.addAll(Arrays.asList(superFields));
			if (superClass.getSuperclass() != Object.class){
				getSuperFields(superClass, tempSubFields);// 递归调用
			}
		}
		return tempSubFields.toArray(new Field[subFields.size()]);
	}
	
	/**
	 * 转换Map<String,String> 转换成T对应的对象
	 * 
	 * @param 需要转换的结果类型
	 */
	public static <T> T convertMap2Bean(Map<String, Object> bean, Class<T> clz) {
		if (bean == null) {
			return null;
		}
		
		try {
			T t = clz.newInstance();
			Field[] fields = t.getClass().getDeclaredFields();
			fields = BeanUtil.getSuperFields(clz, Arrays.asList(fields));// 获取父类的属性列表
			for (Field field : fields) {
				String key = field.getName();// 获取属性名
				if(bean.get(key)==null){continue;}
				String value = bean.get(key).toString();
				if (value == null || "null".equals(value)) {continue;}// 如果对应属性的值，bean中不存在，返回继续遍历
				
				boolean visiable = field.isAccessible();
				field.setAccessible(Boolean.TRUE);
				Object object = BeanUtil.getValueFromField(field, key, value);
				field.set(t, object);
				field.setAccessible(visiable);
			}
			return t;
		} catch (Exception e) {
			logger.error("convertMap2Bean", e);
			return null;
		}
	}
	/**
	 * 将对象转换成Map<String,String>
	 * 
	 * @param 需要转换的对象
	 */
	public static HashMap<String, Object> convertBean2Map(Object object){
		if (object == null) {
			return null;
		}
		
		HashMap<String, Object> bean = new HashMap<String, Object>();
		try{
			BeanInfo beanInfo = Introspector.getBeanInfo(object.getClass());
			 PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
	         for (PropertyDescriptor property : propertyDescriptors){
	             String key = property.getName();
	             String clazzName = property.getPropertyType().getName();
	             if (!(StringUtils.equals(key,"class"))) {//不输出公司编号
	            	 if(StringUtils.equals(clazzName,"java.util.List")){//处理bean中的list
	            		 Method getter = property.getReadMethod();
		                 List<?> temps = (List<?>) getter.invoke(object);
		                 Object value = convertBeans2List(temps == null ? null : temps.toArray());
		                 bean.put(key, value);
	            	 }else if(clazzName.contains("com.cmos.ccpscore.bean")){//处理bean中的bean
		            	 Method getter = property.getReadMethod();
		                 Object temp = getter.invoke(object);
		            	 Object value = convertBean2Map(temp);
		            	 bean.put(key, value);
		             }else{
		                 Method getter = property.getReadMethod();
		                 Object value = getter.invoke(object);
		                 bean.put(key, value);
		             }
	             }
	         }
	         return bean;
		}catch(Exception e){
			logger.error("convertBean2Map", e);
			return null;
		}
	}
	
	public static List<Map<String, Object>> convertBeans2List(Object... objects) {
		if (objects == null ) {
			return null;
		}
		List<Map<String, Object>> beans = new ArrayList<Map<String,Object>>();
		for (Object object : objects) {
			Map<String, Object> bean = BeanUtil.convertBean2Map(object);
			if (bean != null && bean.size() != 0) {
				beans.add(bean);
			}
		}
		return beans;
	}
	
	public static <T> List<T>  convertList2Beans(List<Map<String, Object>> lists, Class<T> clz){
		if (lists == null || lists.isEmpty()) {
			return null;
		}
		List<T> results = new ArrayList<T>();
		for (Map<String, Object> map : lists) {
			T t = convertMap2Bean(map, clz);
			if (t != null) {
				results.add(t);
			}
		}
		return results;
	}
	
	/**
	 * 获取bean里面的公司编号
	 * @param object
	 * @return
	 */
	public static String getCompanyCode4Bean(Object object){
		if (object == null) {
			return null;
		}
		
		try{
			String code = "";
			BeanInfo beanInfo = Introspector.getBeanInfo(object.getClass());
			 PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
	         for (PropertyDescriptor property : propertyDescriptors){
	             String key = property.getName();
	             if (StringUtils.equals(key, COMPANY_CODE)) {//公司编号
		             Method getter = property.getReadMethod();
		             Object value = getter.invoke(object);
		             code = String.valueOf(value);
		             break;
	             }
	         }
	         return code;
		}catch(Exception e){
			logger.error("convertBean2Map", e);
			return null;
		}
	}
}
