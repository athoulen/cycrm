package com.blueair.service;

import java.util.List;

import com.blueair.bean.City;
import com.blueair.bean.Zone;

public interface IZoneService {

	public List<Zone> queryForAllZones();

	public List<City> queryCityByZone(int id);
}
