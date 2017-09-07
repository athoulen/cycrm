package com.blueair.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueair.dao.impl.BaseDaoImpl;


/**
 * 服务基类
 */
@Service(value="baseService")
public class BaseServiceImpl {
	@Autowired
	private BaseDaoImpl baseDao;

	public BaseDaoImpl getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(BaseDaoImpl baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 封装分页数据
	 * @param list
	 * @param totalCount
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String, Object> dealWithPageList(List list, int totalCount){
		Map<String, Object> resultMap=new HashMap<>();
		resultMap.put("list", list);
		resultMap.put("totalCount", totalCount);
		return resultMap;
	}
}
