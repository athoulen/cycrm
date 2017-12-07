package com.blueair.bean.alertbean.merchanpro;

public class MerchanProductBean {

	private Integer merchanId;
	private Integer productId;
	private Long soldSum;
	private Long allocateSum;
	private Long sum;
	public Integer getMerchanId() {
		return merchanId;
	}
	public void setMerchanId(Integer merchanId) {
		this.merchanId = merchanId;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public Long getSoldSum() {
		return soldSum;
	}
	public void setSoldSum(Long soldSum) {
		this.soldSum = soldSum==null?0:soldSum;
		this.allocateSum=this.allocateSum==null?0:this.allocateSum;
		this.sum=this.allocateSum-this.soldSum;
	}
	public Long getAllocateSum() {
		return allocateSum;
	}
	public void setAllocateSum(Long allocateSum) {
		this.allocateSum = allocateSum==null?0:allocateSum;
		this.soldSum=this.soldSum==null?0:this.soldSum;
		this.sum=this.allocateSum-this.soldSum;
	}
	public Long getSum() {
		return sum;
	}
	public void setSum(Long sum) {
		this.sum = sum;
	}
	
}
