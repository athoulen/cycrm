package com.blueair.bean;

public class User {

	private Integer id;					//用户ID
	private Integer AreaCode;		//区域ID
	private String type;					//管理员类型	0：普通权限，1：全区域权限，2：管理员权限
	private String username;		//用户名
	private String password;		//密码
	private String latestLog;		//最近登录时间
	private String loginTimes;	//登录次数
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getAreaCode() {
		return AreaCode;
	}
	public void setAreaCode(Integer areaCode) {
		AreaCode = areaCode;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLatestLog() {
		return latestLog;
	}
	public void setLatestLog(String latestLog) {
		this.latestLog = latestLog;
	}
	public String getLoginTimes() {
		return loginTimes;
	}
	public void setLoginTimes(String loginTimes) {
		this.loginTimes = loginTimes;
	}
	
}
