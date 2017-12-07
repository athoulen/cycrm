package com.blueair.cache;

import java.util.Map;

import com.blueair.service.IHospitalService;
import com.blueair.service.IMerchandiserService;
import com.blueair.util.SpringContextHolder;

public class MerchanCache{

	private static Map<String, Object> merchanMap;
	
	private static IMerchandiserService merchanService =(IMerchandiserService) SpringContextHolder.getApplicationContext().getBean("merchanService");
	
	private static Map<String, Object> hospitalMap;
	
	private static IHospitalService hospitalService =(IHospitalService) SpringContextHolder.getApplicationContext().getBean("hospitalService");

	public static Map<String, Object> getMerchanMap() {
		if(merchanMap==null){
			setMerchanMap();
		}
		return merchanMap;
	}

	public static void setMerchanMap() {
		merchanMap=merchanService.queryForMerchanMap();
	}
	
	public static Map<String, Object> getHospitalMap() {
		if(hospitalMap==null){
			setHospitalMap();
		}
		return hospitalMap;
	}

	public static void setHospitalMap() {
		hospitalMap=hospitalService.queryHospitalMap();
	}

}
