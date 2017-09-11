package com.blueair.cache;

import java.util.HashMap;
import java.util.Map;

import com.blueair.service.IAreaService;
import com.blueair.util.SpringContextHolder;

public class CustomerCache {
	
	private static IAreaService areaService=(IAreaService) SpringContextHolder.getApplicationContext().getBean("areaService");

	private static Map<String, Object> cityMap=new HashMap<>();
	private static Map<String, Object> areaMap=new HashMap<>();
	
	public static Map<String, Object> getCityMap() {
		if(cityMap==null){
			setCityMap();
		}
		return cityMap;
	}
	public static void setCityMap() {
		areaMap=areaService.loadAreaInfo();
	}
	public static Map<String, Object> getAreaMap() {
		if(areaMap==null){
			setAreaMap();
		}
		return areaMap;
	}
	public static void setAreaMap() {
		cityMap=areaService.loadCityInfo();
	}
}
