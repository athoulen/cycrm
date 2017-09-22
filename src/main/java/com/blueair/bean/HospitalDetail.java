package com.blueair.bean;

import java.util.Map;

public class HospitalDetail extends Hospital {

	private Map<String, Object> zone;
	private Map<String, Object> city;
	public Map<String, Object> getZone() {
		return zone;
	}
	public void setZone(Map<String, Object> zone) {
		this.zone = zone;
	}
	public Map<String, Object> getCity() {
		return city;
	}
	public void setCity(Map<String, Object> city) {
		this.city = city;
	}
}
