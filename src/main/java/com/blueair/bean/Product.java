package com.blueair.bean;

import java.math.BigDecimal;

public class Product {

	private Integer id;
	private String productName;
	private String productNorms;
	private String productPrice;
	private String bidPrice;
	private String manufacture;
	private BigDecimal promoteFee;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductNorms() {
		return productNorms;
	}
	public void setProductNorms(String productNorms) {
		this.productNorms = productNorms;
	}
	public String getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}
	public String getManufacture() {
		return manufacture;
	}
	public void setManufacture(String manufacture) {
		this.manufacture = manufacture;
	}
	public String getBidPrice() {
		return bidPrice;
	}
	public void setBidPrice(String bidPrice) {
		this.bidPrice = bidPrice;
	}
	public BigDecimal getPromoteFee() {
		return promoteFee;
	}
	public void setPromoteFee(BigDecimal promoteFee) {
		this.promoteFee = promoteFee;
	}
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(String productName, String productNorms) {
		super();
		this.productName = productName;
		this.productNorms = productNorms;
	}
}
