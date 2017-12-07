package com.blueair.bean;

import java.util.List;

public class PageListBean <T> {

	private List<T> list;
	private Long totalCount;
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public Long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}
	public PageListBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PageListBean(List<T> list, Long totalCount) {
		super();
		this.list = list;
		this.totalCount = totalCount;
	}
}
