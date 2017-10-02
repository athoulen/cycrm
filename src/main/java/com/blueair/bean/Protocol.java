package com.blueair.bean;

import java.util.Map;

public class Protocol extends ProtocolBase {

	private CustomerKey customer;
	private HospitalKey hospital;
	private Map<String, Object> zone;
	private Map<String, Object> city;
	private Map<String, Object> rebatePeriodMap;
	private MerchandiserKey upperMerchanInfo;
	private MerchandiserKey lowerMerchanInfo;
	private Product product;
	public CustomerKey getCustomer() {
		return customer;
	}
	public void setCustomer(CustomerKey customer) {
		this.customer = customer;
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
	public MerchandiserKey getUpperMerchanInfo() {
		return upperMerchanInfo;
	}
	public void setUpperMerchanInfo(MerchandiserKey upperMerchanInfo) {
		this.upperMerchanInfo = upperMerchanInfo;
	}
	public MerchandiserKey getLowerMerchanInfo() {
		return lowerMerchanInfo;
	}
	public void setLowerMerchanInfo(MerchandiserKey lowerMerchanInfo) {
		this.lowerMerchanInfo = lowerMerchanInfo;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Map<String, Object> getRebatePeriodMap() {
		return rebatePeriodMap;
	}
	public void setRebatePeriodMap(Map<String, Object> rebatePeriodMap) {
		this.rebatePeriodMap = rebatePeriodMap;
	}
}
