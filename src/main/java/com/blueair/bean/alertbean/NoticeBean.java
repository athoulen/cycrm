package com.blueair.bean.alertbean;

import java.util.Date;

public class NoticeBean {

	private String noticeStyle;
	private String noticeType;
	private String noticeMessage;
	private Date noticeTime;
	
	
	public NoticeBean() {
		this.noticeTime=new Date();
	}
	public String getNoticeStyle() {
		return noticeStyle;
	}

	public void setNoticeStyle(String noticeStyle) {
		this.noticeStyle = noticeStyle;
	}

	public String getNoticeType() {
		return noticeType;
	}

	public void setNoticeType(String noticeType) {
		this.noticeType = noticeType;
	}

	public String getNoticeMessage() {
		return noticeMessage;
	}
	public void setNoticeMessage(String noticeMessage) {
		this.noticeMessage = noticeMessage;
	}
	public Date getNoticeTime() {
		return noticeTime;
	}
	public void setNoticeTime(Date noticeTime) {
		this.noticeTime = noticeTime;
	}
	
}
