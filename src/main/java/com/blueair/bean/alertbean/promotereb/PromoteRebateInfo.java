package com.blueair.bean.alertbean.promotereb;

import java.math.BigDecimal;

public class PromoteRebateInfo {

	private BigDecimal promote;
	private BigDecimal rebate;
	private BigDecimal totalPromote;
	private String productId;
	private String hospitalId;
	private String productName;
	private String hospitalName;
	private BigDecimal substract;
	public BigDecimal getPromote() {
		return promote;
	}
	public void setPromote(BigDecimal promote) {
		this.promote = promote==null?new BigDecimal(0):promote;
	}
	public BigDecimal getRebate() {
		return rebate;
	}
	public void setRebate(BigDecimal rebate) {
		this.rebate = rebate==null?new BigDecimal(0):rebate;
	}
	public BigDecimal getTotalPromote() {
		return totalPromote;
	}
	public void setTotalPromote(BigDecimal totalPromote) {
		this.totalPromote = totalPromote==null?new BigDecimal(0):totalPromote;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(String hospitalId) {
		this.hospitalId = hospitalId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getHospitalName() {
		return hospitalName;
	}
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}
	public BigDecimal getSubstract() {
		return substract;
	}
	public void setSubstract(BigDecimal substract) {
		this.substract = substract;
	}
}
