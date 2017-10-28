package com.blueair.bean.rebate;

public class ProtocolForRebate {

	private Integer protocolId;				//协议ID
	private String customerId;			//客户ID
	private Integer hospitalId;					//医院Id
	private String productId;				//产品ID
	private Double promotionExpense;//推广费（佣金）
	private Integer switchStandard;
	private Double switchExpense;		//推广费变更价
	private Long switchAmount;			//考核数量
	private Integer rebatePeriod;				//返款（佣金）周期	 1、月结 2、压批压月 3、60天 4、90天 5、120天
	private Integer type;
	public Integer getProtocolId() {
		return protocolId;
	}
	public void setProtocolId(Integer protocolId) {
		this.protocolId = protocolId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public Double getPromotionExpense() {
		return promotionExpense;
	}
	public void setPromotionExpense(Double promotionExpense) {
		this.promotionExpense = promotionExpense;
	}
	public Double getSwitchExpense() {
		return switchExpense;
	}
	public void setSwitchExpense(Double switchExpense) {
		this.switchExpense = switchExpense;
	}
	public Long getSwitchAmount() {
		return switchAmount;
	}
	public void setSwitchAmount(Long switchAmount) {
		this.switchAmount = switchAmount;
	}
	public Integer getRebatePeriod() {
		return rebatePeriod;
	}
	public void setRebatePeriod(Integer rebatePeriod) {
		this.rebatePeriod = rebatePeriod;
	}
	public Integer getSwitchStandard() {
		return switchStandard;
	}
	public void setSwitchStandard(Integer switchStandard) {
		this.switchStandard = switchStandard;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
}
