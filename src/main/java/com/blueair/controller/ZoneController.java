package com.blueair.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.Zone;
import com.blueair.service.IZoneService;

@RestController
@RequestMapping("zone")
public class ZoneController extends BaseController {
	@Autowired
	private IZoneService zoneService;
	@RequestMapping("/queryForAllZones")
	public ModelMap queryForAllZones(HttpServletRequest request){
		List<Zone> zones = zoneService.queryForAllZones();
		return rightObjectResult(null, "查询成功！", "zones", zones);
	}
}
