package com.blueair.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.City;
import com.blueair.bean.Zone;
import com.blueair.service.IZoneService;

@RestController
@RequestMapping("zone")
public class ZoneController extends BaseController {
	@Autowired
	private IZoneService zoneService;
	/**
	 * 获取所有大区
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryForAllZones")
	public ModelMap queryForAllZones(HttpServletRequest request){
		List<Zone> zones = zoneService.queryForAllZones();
		return rightObjectResult(null, "查询成功！", "zones", zones);
	}
	/**
	 * 获取大区下所有的地市
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping("/queryCityByZone/{id:\\d+}")
	public ModelMap queryCityByZone(HttpServletRequest request,@PathVariable("id") int id){
		List<City> cities = zoneService.queryCityByZone(id);
		return rightObjectResult(null, "查询成功！", "cities", cities);
	}
}
