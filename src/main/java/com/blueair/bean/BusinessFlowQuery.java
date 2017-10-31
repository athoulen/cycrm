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
	private String flowFlag;
	private String department;
	private Integer type;							//一级流向没有
	private String remark;
	private Integer isTerminal;
	private String createTime;
	private String rebatePrice;
	private String secExpense;
	private MerchanProtocolBalance merProtocol;
	private BigDecimal balance;
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
	public String getFlowFlag() {
		return flowFlag;
	}
	public void setFlowFlag(String flowFlag) {
		this.flowFlag = flowFlag;
	}
	public MerchanProtocolBalance getMerProtocol() {
		return merProtocol;
	}
	public void setMerProtocol(MerchanProtocolBalance merProtocol) {
		this.merProtocol = merProtocol;
	}
	
	public void setBalance() {
		BigDecimal salePrice=this.soldPrice;
		BigDecimal upBack=new BigDecimal(merProtocol.getUpBack().toString());
		BigDecimal loBack=new BigDecimal(merProtocol.getLoBack().toString());
		BigDecimal rebate=new BigDecimal(this.rebatePrice);
		BigDecimal secRebate=new BigDecimal(secExpense);
		BigDecimal account=new BigDecimal(this.amount);
		this.balance=(salePrice.subtract(upBack).subtract(loBack).subtract(rebate).add(secRebate)).multiply(account);
	}
	public BigDecimal getBalance() {
		return this.balance;
	}
	public String getRebatePrice() {
		return rebatePrice;
	}
	public void setRebatePrice(String rebatePrice) {
		this.rebatePrice = rebatePrice;
	}
	public String getSecExpense() {
		return secExpense;
	}
	public void setSecExpense(String secExpense) {
		this.secExpense = secExpense;
	}
	public Integer getIsTerminal() {
		return isTerminal;
	}
	public void setIsTerminal(Integer isTerminal) {
		this.isTerminal = isTerminal;
	}
}
