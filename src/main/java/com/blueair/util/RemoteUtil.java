package com.blueair.util;

import javax.servlet.http.HttpServletRequest;

public class RemoteUtil {
	
	private static String LOCAL_IP;
	
	static{
		LOCAL_IP=PropertiesUtil.getString("system", "localIp");
	}
	
	private RemoteUtil() {
		throw new IllegalAccessError("工具类");
	}

	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return "0:0:0:0:0:0:0:1".equals(ip)?LOCAL_IP:ip;
	}
}

