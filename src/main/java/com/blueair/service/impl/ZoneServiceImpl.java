package com.blueair.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blueair.bean.City;
import com.blueair.bean.Zone;
import com.blueair.service.IZoneService;
@Service
public class ZoneServiceImpl extends BaseServiceImpl implements IZoneService {

	@Override
	public List<Zone> queryForAllZones() {
		List<Zone> zones = getBaseDao().queryForList("ZoneMapper.queryForAllZones", null, Zone.class);
		return zones;
	}

	@Override
	public List<City> queryCityByZone(int id) {
		List<City> cities = getBaseDao().queryForList("ZoneMapper.queryCityByZone", id, City.class);
		return cities;
	}

}
