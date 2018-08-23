package com.blueair.bean.rebate;

import java.math.BigDecimal;

import com.blueair.bean.MerchanProtocolBalance;

public class RebateMain {

	private Long rebateId;
	private Long flowId;
	private String hospitalName;
	private String customerName;
	private String productName;
	private String productNorms;
	private String batchNo;
	private String soldDate;
	private String soldPrice;
	private String soldMoney;
	private boolean isSwitch;
	private String rebateExpense;
	private Integer amount;
	private String totalExpense;
	private boolean state;
	private String remark;
	private MerchanProtocolBalance merProtocol;
	private String secExpense;
	private BigDecimal balance;
	
	public Long getRebateId() {
		return rebateId;
	}
	public void setRebateId(Long rebateId) {
		this.rebateId = rebateId;
	}
	public Long getFlowId() {
		return flowId;
	}
	public void setFlowId(Long flowId) {
		this.flowId = flowId;
	}
	public String getHospitalName() {
		return hospitalName;
	}
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
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
	public String getSoldPrice() {
		return soldPrice;
	}
	public void setSoldPrice(String soldPrice) {
		this.soldPrice = soldPrice;
	}
	public String getSoldMoney() {
		return soldMoney;
	}
	public void setSoldMoney(String soldMoney) {
		this.soldMoney = soldMoney;
	}
	public boolean isSwitch() {
		return isSwitch;
	}
	public void setSwitch(boolean isSwitch) {
		this.isSwitch = isSwitch;
	}
	public String getRebateExpense() {
		return rebateExpense;
	}
	public void setRebateExpense(String rebateExpense) {
		this.rebateExpense = rebateExpense;
	}
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getTotalExpense() {
		return totalExpense;
	}
	public void setTotalExpense(String totalExpense) {
		this.totalExpense = totalExpense;
	}
	public boolean isState() {
		return state;
	}
	public void setState(boolean state) {
		this.state = state;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public MerchanProtocolBalance getMerProtocol() {
		return merProtocol;
	}
	public void setMerProtocol(MerchanProtocolBalance merProtocol) {
		this.merProtocol = merProtocol;
	}
	
	public void setBalance() {
		BigDecimal salePrice=new BigDecimal(soldPrice);
		/*BigDecimal upBack=new BigDecimal(merProtocol.getUpBack().toString());
		BigDecimal loBack=new BigDecimal(merProtocol.getLoBack().toString());*/
//		BigDecimal upBack=new BigDecimal(merProtocol.getUpBack()==null?"0":merProtocol.getUpBack().toString());
		BigDecimal loBack=new BigDecimal((merProtocol==null||merProtocol.getLoBack()==null)?"0":merProtocol.getLoBack().toString());
		BigDecimal rebate=new BigDecimal(this.rebateExpense==null?"0":this.rebateExpense);
		BigDecimal secRebate=new BigDecimal(this.secExpense==null?"0":this.secExpense);
		BigDecimal account=new BigDecimal(this.amount);
		this.balance=(salePrice.subtract(loBack).subtract(rebate).add(secRebate)).multiply(account);
	}
	public BigDecimal getBalance() {
		return this.balance;
	}
	public String getSecExpense() {
		return secExpense;
	}
	public void setSecExpense(String secExpense) {
		this.secExpense = secExpense;
	}
}
