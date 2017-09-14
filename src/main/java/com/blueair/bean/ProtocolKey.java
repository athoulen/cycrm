package com.blueair.bean;

public class ProtocolKey {

	private Integer protocolId;				//协议ID
	private String customerName;			//客户名
	private String hospital;					//医院名称
	private String productName;				//产品ID
	private Double promotionExpense;//推广费（佣金）
	private Double bail;							//保证金
	private String bailDesc;					//保证金描述
	private Double switchExpense;		//推广费变更价
	private Long switchAmount;			//考核数量
	private Integer rebatePeriod;				//返款（佣金）周期	 1、月结 2、压批压月 3、60天 4、90天 5、120天
	private boolean rebatePayer;			//二级返利支付人		true：公司支付；false：客户支付
	private Double rebate;						//二级返利金额
	private String startTime;					//合约开始时间
	private String endTime;
	
	public Integer getProtocolId() {
		return protocolId;
	}
	public void setProtocolId(Integer protocolId) {
		this.protocolId = protocolId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getPromotionExpense() {
		return promotionExpense;
	}
	public void setPromotionExpense(Double promotionExpense) {
		this.promotionExpense = promotionExpense;
	}
	public Double getBail() {
		return bail;
	}
	public void setBail(Double bail) {
		this.bail = bail;
	}
	public String getBailDesc() {
		return bailDesc;
	}
	public void setBailDesc(String bailDesc) {
		this.bailDesc = bailDesc;
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
	public boolean isRebatePayer() {
		return rebatePayer;
	}
	public void setRebatePayer(boolean rebatePayer) {
		this.rebatePayer = rebatePayer;
	}
	public Double getRebate() {
		return rebate;
	}
	public void setRebate(Double rebate) {
		this.rebate = rebate;
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
	
}
