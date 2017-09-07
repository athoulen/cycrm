package com.blueair.util;

import org.apache.commons.lang3.StringUtils;

public class DataCheckUtil {

	public static boolean isStringEmpty(String data){
		return StringUtils.isEmpty(data);
	}
	
	public static boolean isIntegerEmpty(Integer data){
		return data==null||data==0;
	}
	
	public static String ifNullToEmpty(String data){
		return data==null?"":data;
	}
}
