package com.blueair.util;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

public class DataCheckUtil {

	public static boolean isStringEmpty(String data){
		return StringUtils.isEmpty(data)||"undefined".equals(data);
	}
	
	public static boolean isIntegerEmpty(Integer data){
		return data==null||data==0;
	}
	
	public static boolean isDoubleEmpty(Double data){
		return data==null||data==0;
	}
	
	public static boolean isBigDecimalEmpty(BigDecimal data){
		return data==null||data==new BigDecimal(0);
	}
	
	public static String ifNullToEmpty(String data){
		return data==null?"":data;
	}
	
	public static <T> T beanNullToEmpty(T bean) throws IllegalArgumentException, IllegalAccessException {
		Class<? extends Object> clz=bean.getClass();
		Field[] fields = clz.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			Object val=field.get(bean);
			System.out.println("name:"+field.getName()+"\t value="+val);
			String type=field.getType().toString();
			if(ObjectUtil.isEmpty(val)&&type.endsWith("String")){
				field.set(bean, "");
			}
		}
		return bean;
	}
	
	public static <T> boolean checkBeanIfNull(T bean) throws IllegalArgumentException, IllegalAccessException {
		Class<? extends Object> clz=bean.getClass();
		Field[] fields = clz.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			Object val=field.get(bean);
			System.out.println("name:"+field.getName()+"\t value="+val);
			if(val==null){
				return false;
			}
		}
		return true;
	}
	
	public static <T> boolean checkBeanIfNull(T bean,List<String> excludeNames) throws IllegalArgumentException, IllegalAccessException {
		Class<? extends Object> clz=bean.getClass();
		Field[] fields = clz.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			Object val=field.get(bean);
			System.out.println("name:"+field.getName()+"\t value="+val);
			if(excludeNames.contains(field.getName())){
				continue;
			}
			if(val==null){
				return false;
			}
		}
		return true;
	}
}
