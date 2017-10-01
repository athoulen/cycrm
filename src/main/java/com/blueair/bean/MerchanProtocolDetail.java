package com.blueair.bean;

import java.util.Map;

public class MerchanProtocolDetail extends MerchanProtocolL {

	private Product product;
	private HospitalKey hospital;
	private Map<String, Object> zone;
	private Map<String, Object> city;
	private MerchandiserKey upMerchanInfo;
	private MerchandiserKey loMerchanInfo;
	private Map<String, Object> backPeriodStyleMap;
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public HospitalKey getHospital() {
		return hospital;
	}
	public void setHospital(HospitalKey hospital) {
		this.hospital = hospital;
	}
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
	public MerchandiserKey getUpMerchanInfo() {
		return upMerchanInfo;
	}
	public void setUpMerchanInfo(MerchandiserKey upMerchanInfo) {
		this.upMerchanInfo = upMerchanInfo;
	}
	public MerchandiserKey getLoMerchanInfo() {
		return loMerchanInfo;
	}
	public void setLoMerchanInfo(MerchandiserKey loMerchanInfo) {
		this.loMerchanInfo = loMerchanInfo;
	}
	public Map<String, Object> getBackPeriodStyleMap() {
		return backPeriodStyleMap;
	}
	public void setBackPeriodStyleMap(Map<String, Object> backPeriodStyleMap) {
		this.backPeriodStyleMap = backPeriodStyleMap;
	}
}
