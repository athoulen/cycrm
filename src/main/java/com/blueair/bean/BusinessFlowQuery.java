package com.blueair.bean;

import java.math.BigDecimal;

public class BusinessFlowQuery {

	private Long flowId;
	private String outUnit;
	private String acceptUnit;
	private String customerName;			//一级流向没有
	private String productName;
	private String productNorms;
	private String batchNo;
	private String soldDate;
	private Integer amount;
	private BigDecimal soldPrice;
	private BigDecimal soldMoney;
	private String department;
	private Integer type;							//一级流向没有
	private String remark;
	private String createTime;
	public Long getFlowId() {
		return flowId;
	}
	public void setFlowId(Long flowId) {
		this.flowId = flowId;
	}
	public String getOutUnit() {
		return outUnit;
	}
	public void setOutUnit(String outUnit) {
		this.outUnit = outUnit;
	}
	public String getAcceptUnit() {
		return acceptUnit;
	}
	public void setAcceptUnit(String acceptUnit) {
		this.acceptUnit = acceptUnit;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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
	public String getBatchNo() {
		return batchNo;
	}
	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}
	public String getSoldDate() {
		return soldDate;
	}
	public void setSoldDate(String soldDate) {
		this.soldDate = soldDate;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public BigDecimal getSoldPrice() {
		return soldPrice;
	}
	public void setSoldPrice(BigDecimal soldPrice) {
		this.soldPrice = soldPrice;
	}
	public BigDecimal getSoldMoney() {
		return soldMoney;
	}
	public void setSoldMoney(BigDecimal soldMoney) {
		this.soldMoney = soldMoney;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
}
