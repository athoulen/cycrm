package com.blueair.bean;
/**
 * 商业公司
 * @author athou
 * @version	v0.1
 *
 */
public class Merchandiser {

	private Integer merchId;			//商业公司ID
	private String name;				//商业公司名称
	private Integer classType;		//级别 1：一级商业	2：二级商业
	private Integer parentId;			//上级公司ID
	private String desc;					//公司情况描述
	
	public Integer getMerchId() {
		return merchId;
	}
	public void setMerchId(Integer merchId) {
		this.merchId = merchId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getClassType() {
		return classType;
	}
	public void setClassType(Integer classType) {
		this.classType = classType;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
