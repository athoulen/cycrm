package com.blueair.bean.alertbean;

public class StockExpInfo {

	private String merchanId;
	private String merchanName;
	private String productId;
	private String productName;
	private Long stock;
	private Integer isNotice;
	public String getMerchanId() {
		return merchanId;
	}
	public void setMerchanId(String merchanId) {
		this.merchanId = merchanId;
	}
	public String getMerchanName() {
		return merchanName;
	}
	public void setMerchanName(String merchanName) {
		this.merchanName = merchanName;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Long getStock() {
		return stock;
	}
	public void setStock(Long stock) {
		this.stock = stock;
	}
	public Integer getIsNotice() {
		return isNotice;
	}
	public void setIsNotice(Integer isNotice) {
		this.isNotice = isNotice;
	}
}
