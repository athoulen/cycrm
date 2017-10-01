package com.blueair.bean;
/**
 * 客户协议类
 * @author athou
 *
 */
public class ProtocolBase {

	private Integer protocolId;				//协议ID
	private Integer customerId;			//客户ID
	private Integer zoneId;					//大区ID
	private Integer cityId;						//地市ID
	private Integer upperMerchan;		//一级商业ID
	private Integer lowerMerchan;		//二级商业ID
	private Integer hospitalId;					//医院ID
	private Integer productId;				//产品ID
	private Double promotionExpense;//推广费（佣金）
	private Double bail;							//保证金
	private String bailDesc;					//保证金描述
	private Double switchExpense;		//推广费变更价
	private Byte switchStandard;	//推广费变更标准    true：高于考核数量；false：低于考核数量
	private Long switchAmount;			//考核数量
	private Integer rebatePeriod;				//返款（佣金）周期	 1、月结 2、压批压月 3、60天 4、90天 5、120天
	private Byte rebatePayer;			//二级返利支付人		true：公司支付；false：客户支付
	private Double rebate;						//二级返利金额
	private Byte isHonour;				//是否承兑
	private String startTime;					//合约开始时间
	private String endTime;					//合约结束时间
	private Integer type;						//合约类型			1、县级以上（医院）；2、县级以下（卫生院）
	private Byte isValid;					//是否执行			true、执行；false：作废
	private String createBy;
	private String createTime;
	private String updateBy;
	private String updateTime;
	public Integer getProtocolId() {
		return protocolId;
	}
	public void setProtocolId(Integer protocolId) {
		this.protocolId = protocolId;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public Integer getZoneId() {
		return zoneId;
	}
	public void setZoneId(Integer zoneId) {
		this.zoneId = zoneId;
	}
	public Integer getCityId() {
		return cityId;
	}
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	public Integer getUpperMerchan() {
		return upperMerchan;
	}
	public void setUpperMerchan(Integer upperMerchan) {
		this.upperMerchan = upperMerchan;
	}
	public Integer getLowerMerchan() {
		return lowerMerchan;
	}
	public void setLowerMerchan(Integer lowerMerchan) {
		this.lowerMerchan = lowerMerchan;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
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
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public Byte getSwitchStandard() {
		return switchStandard;
	}
	public void setSwitchStandard(Byte switchStandard) {
		this.switchStandard = switchStandard;
	}
	public Byte getRebatePayer() {
		return rebatePayer;
	}
	public void setRebatePayer(Byte rebatePayer) {
		this.rebatePayer = rebatePayer;
	}
	public Byte getIsHonour() {
		return isHonour;
	}
	public void setIsHonour(Byte isHonour) {
		this.isHonour = isHonour;
	}
	public Byte getIsValid() {
		return isValid;
	}
	public void setIsValid(Byte isValid) {
		this.isValid = isValid;
	}
}
