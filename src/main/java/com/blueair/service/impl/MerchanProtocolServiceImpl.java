package com.blueair.service.impl;

import java.util.List;
import java.util.Map;

import com.blueair.bean.MerchanProtocol;
import com.blueair.bean.MerchanProtocolDetail;
import com.blueair.bean.MerchanProtocolKey;
import com.blueair.bean.MerchanProtocolL;
import com.blueair.controller.bean.MerchanProtocolQuery;
import com.blueair.service.IMerchanProtocolService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.ConvertUtil;
import com.blueair.util.OperateUtil;

public class MerchanProtocolServiceImpl extends BaseServiceImpl implements IMerchanProtocolService {

	@Override
	public int insertMerchanProtocol(MerchanProtocol protocol) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(protocol);
		int count=getBaseDao().queryForObject("MerchanProtocolMapper.queryDuplicatedProtocol", params,Integer.class);
		if(count>0){
			return -1;
		}
		OperateUtil.insertOperatorInfo(params);
		int result = getBaseDao().insert("MerchanProtocolMapper.insertMerchanProtocol", params);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public int updateMerchanProtocol(MerchanProtocol protocol){
		Map<String, Object> params=ConvertUtil.convertBean2Map(protocol);
		int count=getBaseDao().queryForObject("MerchanProtocolMapper.queryDuplicatedProtocol", params,Integer.class);
		if(count>0){
			return -1;
		}
		OperateUtil.updateOperatorInfo(params);
		int result = getBaseDao().insert("MerchanProtocolMapper.updateMerchanProtocol", params);
		if(result>0){
			return 1;
		}
		return 0;
	}
	
	@Override
	public MerchanProtocolDetail queryMerchanProtocol(Integer id){
		return getBaseDao().queryForObject("MerchanProtocolMapper.queryMerchanProtocol", id, MerchanProtocolDetail.class);
	}

	@Override
	public Map<String, Object> queryMerchanProtocols(MerchanProtocolQuery query, int page, int pageSize, int flag) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(query);
		params.put("firstItem", (page-1)*pageSize);
		params.put("pageSize", pageSize);
		params.put("flag", flag);
		List<MerchanProtocolKey> list = getBaseDao().queryForList("MerchanProtocolMapper.queryMerchanProtocols", params, MerchanProtocolKey.class);
		if(flag==1){
			int totalCount=getBaseDao().queryForObject("MerchanProtocolMapper.queryMerchanProtocolCount", params, Integer.class);
			return dealWithPageList(list, totalCount);
		}
		return dealWithPageList(list, 0);
	}
	
	
}
