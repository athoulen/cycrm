package com.blueair.util;

import java.util.Map;

import com.blueair.shiro.util.Generator;

public class OperateUtil {

	/**
	 * 为添加参数增加操作者和操作时间
	 * @param params
	 */
	public static void insertOperatorInfo(Map<String, Object> params){
		params.put("operator", Generator.getUsername());
		params.put("createTime", System.currentTimeMillis());
	}
	
	/**
	 * 为修改参数增加操作者和操作时间
	 * @param params
	 */
	public static void updateOperatorInfo(Map<String, Object> params){
		params.put("operator", Generator.getUsername());
		params.put("updateTime", System.currentTimeMillis());
	}
}
