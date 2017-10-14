package com.blueair.bean;

import java.math.BigDecimal;

public class BusinessFlow {
    private String flowId;

    private String soldUnitId;

    private String acceptUnitId;

    private String customerId;

    private String productId;

    private String batchNo;

    private String soldDate;
    
    private String soldYear;

    private String soldMonth;
    
    private String fileType;

    private Integer allocateGoodsNum;

    private Integer soldGoodsNum;

    private BigDecimal soldPrice;

    private BigDecimal allocatePrice;

    private BigDecimal soldMoney;

    private String flowFlag;

    private String isTerminal;

    private String department;

    private String remark;

    private String createTime;

    private String updateTime;

    public String getFlowId() {
        return flowId;
    }

    public void setFlowId(String flowId) {
        this.flowId = flowId == null ? null : flowId.trim();
    }

    public String getSoldUnitId() {
        return soldUnitId;
    }

    public void setSoldUnitId(String soldUnitId) {
        this.soldUnitId = soldUnitId == null ? null : soldUnitId.trim();
    }

    public String getAcceptUnitId() {
        return acceptUnitId;
    }

    public void setAcceptUnitId(String acceptUnitId) {
        this.acceptUnitId = acceptUnitId == null ? null : acceptUnitId.trim();
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId == null ? null : customerId.trim();
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId == null ? null : productId.trim();
    }

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo == null ? null : batchNo.trim();
    }

    public String getSoldDate() {
        return soldDate;
    }

    public void setSoldDate(String soldDate) {
        this.soldDate = soldDate == null ? null : soldDate.trim();
    }

    public String getSoldMonth() {
        return soldMonth;
    }

    public String getSoldYear() {
		return soldYear;
	}

	public void setSoldYear(String soldYear) {
		this.soldYear = soldYear;
	}

	public void setSoldMonth(String soldMonth) {
        this.soldMonth = soldMonth == null ? null : soldMonth.trim();
    }

    public Integer getAllocateGoodsNum() {
        return allocateGoodsNum;
    }

    public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public void setAllocateGoodsNum(Integer allocateGoodsNum) {
        this.allocateGoodsNum = allocateGoodsNum;
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

    public BigDecimal getAllocatePrice() {
        return allocatePrice;
    }

    public void setAllocatePrice(BigDecimal allocatePrice) {
        this.allocatePrice = allocatePrice;
    }

    public BigDecimal getSoldMoney() {
        return soldMoney;
    }

    public void setSoldMoney(BigDecimal soldMoney) {
        this.soldMoney = soldMoney;
    }

    public String getFlowFlag() {
        return flowFlag;
    }

    public void setFlowFlag(String flowFlag) {
        this.flowFlag = flowFlag == null ? null : flowFlag.trim();
    }

    public String getIsTerminal() {
        return isTerminal;
    }

    public void setIsTerminal(String isTerminal) {
        this.isTerminal = isTerminal == null ? null : isTerminal.trim();
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department == null ? null : department.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime == null ? null : updateTime.trim();
    }
}