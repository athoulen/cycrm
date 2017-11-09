package com.blueair.bean.alertbean;

import java.util.List;
import java.util.Map;

public class AlertObject {
	private String alertCode;
	private String alertType;
	private String alertMessage;
	private Map<String, Object> bean;
	private Object object;
	private List<Map<String, Object>> beans;
	public String getAlertCode() {
		return alertCode;
	}
	public void setAlertCode(String alertCode) {
		this.alertCode = alertCode;
	}
	public String getAlertType() {
		return alertType;
	}
	public void setAlertType(String alertType) {
		this.alertType = alertType;
	}
	public String getAlertMessage() {
		return alertMessage;
	}
	public void setAlertMessage(String alertMessage) {
		this.alertMessage = alertMessage;
	}
	public Map<String, Object> getBean() {
		return bean;
	}
	public void setBean(Map<String, Object> bean) {
		this.bean = bean;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public List<Map<String, Object>> getBeans() {
		return beans;
	}
	public void setBeans(List<Map<String, Object>> beans) {
		this.beans = beans;
	}
	
}
