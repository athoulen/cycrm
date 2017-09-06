package com.blueair.service.impl;

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
}
