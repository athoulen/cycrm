package com.blueair.shiro.util;

import org.apache.shiro.SecurityUtils;

public class Generator {

	public static final String ADMIN_KEY="cy_admin";
	public static final String AREA_CODE="cy_area";
	public static final String OPERATOR_TYPE="cy_admin_type";
	
	public static Object getAdminId(){
	   return SecurityUtils.getSubject().getSession().getAttribute(ADMIN_KEY);
	}
	public static Object getAreaCode(){
		return SecurityUtils.getSubject().getSession().getAttribute(AREA_CODE);
	}
	public static Object getAdminTypeId(){
		return SecurityUtils.getSubject().getSession().getAttribute(OPERATOR_TYPE);
	}
	public static Object getUsername(){
		return SecurityUtils.getSubject().getPrincipal();
	}
}
