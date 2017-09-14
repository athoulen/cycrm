package com.blueair.bean;

public class MerchanProtocolKey {

	private Integer protocolId;
	private String protocolCode;
	private Integer productId;
	private Double bidPrice;
	private Integer upMerchan;
	private Integer loMerchan;
	private Integer hospitalId;
	private Double upBack;
	private Double loBack;
	private Integer backPeriod;
	private Integer backStyle;
	private String startTime;
	private String endTime;
	private Product product;
	private HospitalKey hospital;
	private MerchandiserKey upMerchanInfo;
	private MerchandiserKey loMerchanInfo;
	
	public Integer getProtocolId() {
		return protocolId;
	}
	public void setProtocolId(Integer protocolId) {
		this.protocolId = protocolId;
	}
	public String getProtocolCode() {
		return protocolCode;
	}
	public void setProtocolCode(String protocolCode) {
		this.protocolCode = protocolCode;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public Double getBidPrice() {
		return bidPrice;
	}
	public void setBidPrice(Double bidPrice) {
		this.bidPrice = bidPrice;
	}
	public Integer getUpMerchan() {
		return upMerchan;
	}
	public void setUpMerchan(Integer upMerchan) {
		this.upMerchan = upMerchan;
	}
	public Integer getLoMerchan() {
		return loMerchan;
	}
	public void setLoMerchan(Integer loMerchan) {
		this.loMerchan = loMerchan;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Double getUpBack() {
		return upBack;
	}
	public void setUpBack(Double upBack) {
		this.upBack = upBack;
	}
	public Double getLoBack() {
		return loBack;
	}
	public void setLoBack(Double loBack) {
		this.loBack = loBack;
	}
	public Integer getBackPeriod() {
		return backPeriod;
	}
	public void setBackPeriod(Integer backPeriod) {
		this.backPeriod = backPeriod;
	}
	public Integer getBackStyle() {
		return backStyle;
	}
	public void setBackStyle(Integer backStyle) {
		this.backStyle = backStyle;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
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
}
