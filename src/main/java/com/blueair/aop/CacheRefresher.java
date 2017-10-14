package com.blueair.aop;

import com.blueair.cache.CustomerCache;
import com.blueair.cache.MerchanCache;
import com.blueair.cache.ProductCache;

public class CacheRefresher {

	/**
	 * 刷新缓存数据
	 */
	public void refreshCacheMap(){
		CustomerCache.setCustomerPtlMap();
		MerchanCache.setHospitalMap();
		MerchanCache.setMerchanMap();
		ProductCache.setProductMap();
	}
}
