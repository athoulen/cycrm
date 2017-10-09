package com.blueair.bean;

import java.math.BigDecimal;

public class CustomerProtocol {
    private Integer protocolId;

    private String protocolCode;

    private Integer customerId;

    private Integer areaId;

    private Integer cityId;

    private Integer upperMerchan;

    private Integer lowerMerchan;

    private Integer hospitalId;

    private Integer productId;

    private BigDecimal salePrice;

    private Double promotionExpense;

    private Double bail;

    private String desc;

    private Double switchExpense;

    private Byte switchStandard;

    private Long switchAmount;

    private Integer rebatePeriod;

    private Byte rebatePayer;

    private Double rebate;

    private Byte isHonour;

    private String protocolStart;

    private String protocolEnd;

    private Integer type;

    private Byte isValid;

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

    public String getProtocolCode() {
        return protocolCode;
    }

    public void setProtocolCode(String protocolCode) {
        this.protocolCode = protocolCode == null ? null : protocolCode.trim();
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
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

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc == null ? null : desc.trim();
    }

    public Double getSwitchExpense() {
        return switchExpense;
    }

    public void setSwitchExpense(Double switchExpense) {
        this.switchExpense = switchExpense;
    }

    public Byte getSwitchStandard() {
        return switchStandard;
    }

    public void setSwitchStandard(Byte switchStandard) {
        this.switchStandard = switchStandard;
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

    public Byte getRebatePayer() {
        return rebatePayer;
    }

    public void setRebatePayer(Byte rebatePayer) {
        this.rebatePayer = rebatePayer;
    }

    public Double getRebate() {
        return rebate;
    }

    public void setRebate(Double rebate) {
        this.rebate = rebate;
    }

    public Byte getIsHonour() {
        return isHonour;
    }

    public void setIsHonour(Byte isHonour) {
        this.isHonour = isHonour;
    }

    public String getProtocolStart() {
        return protocolStart;
    }

    public void setProtocolStart(String protocolStart) {
        this.protocolStart = protocolStart == null ? null : protocolStart.trim();
    }

    public String getProtocolEnd() {
        return protocolEnd;
    }

    public void setProtocolEnd(String protocolEnd) {
        this.protocolEnd = protocolEnd == null ? null : protocolEnd.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Byte getIsValid() {
        return isValid;
    }

    public void setIsValid(Byte isValid) {
        this.isValid = isValid;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy == null ? null : createBy.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy == null ? null : updateBy.trim();
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime == null ? null : updateTime.trim();
    }
}