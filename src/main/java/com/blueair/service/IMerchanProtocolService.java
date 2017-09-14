package com.blueair.service;

import java.util.Map;

import com.blueair.bean.MerchanProtocol;
import com.blueair.bean.MerchanProtocolDetail;
import com.blueair.bean.MerchanProtocolQuery;

public interface IMerchanProtocolService {

	public int insertMerchanProtocol(MerchanProtocol protocol);

	public int updateMerchanProtocol(MerchanProtocol protocol);

	public MerchanProtocolDetail queryMerchanProtocol(Integer id);

	public Map<String, Object> queryMerchanProtocols(MerchanProtocolQuery query, int page, int pageSize, int flag);
}
