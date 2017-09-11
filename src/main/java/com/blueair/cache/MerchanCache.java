package com.blueair.cache;

import java.util.HashMap;
import java.util.Map;

import com.blueair.service.IMerchandiserService;
import com.blueair.util.SpringContextHolder;

public class MerchanCache {

	private static Map<String, Object> merchanMap=new HashMap<>();
	private static IMerchandiserService merchanService=(IMerchandiserService) SpringContextHolder.getApplicationContext().getBean("merchanService");

	public static Map<String, Object> getMerchanMap() {
		if(merchanMap==null){
			setMerchanMap();
		}
		return merchanMap;
	}

	public static void setMerchanMap() {
		merchanMap=merchanService.queryForMerchanMap();
	}
	
	
}
