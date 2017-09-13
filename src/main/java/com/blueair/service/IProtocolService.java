package com.blueair.service;

import java.util.Map;

import com.blueair.bean.Protocol;
import com.blueair.bean.ProtocolBase;
import com.blueair.bean.ProtocolQuery;

public interface IProtocolService {

	public int insertProtocol(ProtocolBase protocol);

	public int updateProtocol(ProtocolBase protocol);

	public Protocol queryProtocolById(Integer id);

	public Map<String, Object> queryProtocolsByCustomerAndHospitalName(ProtocolQuery query, int firstItem, int pageSize);

	public Map<String, Object> queryProtocolHistory(Integer id, int firstItem, int pageSize) throws IllegalArgumentException, IllegalAccessException;
}
