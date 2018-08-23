package com.blueair.service.impl;

import java.util.Map;

import org.springframework.stereotype.Service;
import com.blueair.service.IAreaService;

@Service("areaService")
public class AreaServiceImpl extends BaseServiceImpl implements IAreaService {

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> loadAreaInfo() {
		Map<String,Object> areaMap = getBaseDao().queryForMap("ZoneMapper.queryForAreaInfoMap", null, "areaName", "areaId");
		return areaMap;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> loadCityInfo() {
		Map<String,Object> cityMap = getBaseDao().queryForMap("ZoneMapper.queryForCityInfoMap", null, "cityName", "cityId");
		return cityMap;
	}

}
