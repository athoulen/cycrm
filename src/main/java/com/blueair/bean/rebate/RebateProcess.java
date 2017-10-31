package com.blueair.bean.rebate;

import java.math.BigDecimal;

public class RebateProcess {

	private String flowId;

    private String soldUnitId;

    private String acceptUnitId;

    private String customerId;

    private String productId;

    private String batchNo;
    
    private String soldDate;

    private String soldYear;

    private String soldMonth;
    
    private Integer soldGoodsNum;

    private BigDecimal soldPrice;

    private BigDecimal soldMoney;

    private String remark;
    
    private Integer protocolId;
    
    private String bateDate;	//需要返佣金前的最后一个天
    
    private boolean isSwitch;
    
    private String secExpense;
    
    private String singleRebate;
    
    private String totalRebate;
    
	public String getFlowId() {
		return flowId;
	}

	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}

	public String getSoldUnitId() {
		return soldUnitId;
	}

	public void setSoldUnitId(String soldUnitId) {
		this.soldUnitId = soldUnitId;
	}

	public String getAcceptUnitId() {
		return acceptUnitId;
	}

	public void setAcceptUnitId(String acceptUnitId) {
		this.acceptUnitId = acceptUnitId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getSoldYear() {
		return soldYear;
	}

	public void setSoldYear(String soldYear) {
		this.soldYear = soldYear;
	}

	public String getSoldMonth() {
		return soldMonth;
	}

	public void setSoldMonth(String soldMonth) {
		this.soldMonth = soldMonth;
	}

	public Integer getSoldGoodsNum() {
		return soldGoodsNum;
	}

	public void setSoldGoodsNum(Integer soldGoodsNum) {
		this.soldGoodsNum = soldGoodsNum;
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getSoldDate() {
		return soldDate;
	}

	public void setSoldDate(String soldDate) {
		this.soldDate = soldDate;
	}

	public Integer getProtocolId() {
		return protocolId;
	}

	public void setProtocolId(Integer protocolId) {
		this.protocolId = protocolId;
	}

	public String getBateDate() {
		return bateDate;
	}

	public void setBateDate(String bateDate) {
		this.bateDate = bateDate;
	}

	public boolean isSwitch() {
		return isSwitch;
	}

	public void setSwitch(boolean isSwitch) {
		this.isSwitch = isSwitch;
	}

	public String getSingleRebate() {
		return singleRebate;
	}

	public void setSingleRebate(String singleRebate) {
		this.singleRebate = singleRebate;
	}

	public String getTotalRebate() {
		return totalRebate;
	}

	public void setTotalRebate(String totalRebate) {
		this.totalRebate = totalRebate;
	}

	public String getSecExpense() {
		return secExpense;
	}

	public void setSecExpense(String secExpense) {
		this.secExpense = secExpense;
	}

	

}
