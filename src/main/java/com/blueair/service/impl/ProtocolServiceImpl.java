package com.blueair.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.Protocol;
import com.blueair.bean.ProtocolBase;
import com.blueair.bean.ProtocolKey;
import com.blueair.bean.ProtocolQuery;
import com.blueair.bean.ProtocolQueryKey;
import com.blueair.service.IProtocolService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.ConvertUtil;
import com.blueair.util.DataCheckUtil;
@Service
public class ProtocolServiceImpl extends BaseServiceImpl implements IProtocolService {

	@Override
	public int insertProtocol(ProtocolBase protocol) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(protocol);
		int count=getBaseDao().queryForObject("ProtocolMapper.queryProtocolByCondition", params, Integer.class);
		if(count>0){
			return -1;
		}
		protocol.setCreateBy(Generator.getUsername()+"");
		protocol.setCreateTime(String.valueOf(System.currentTimeMillis()));
		int result = getBaseDao().insert("ProtocolMapper.insertProtocol", protocol);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public int updateProtocol(ProtocolBase protocol) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(protocol);
		int count=getBaseDao().queryForObject("ProtocolMapper.queryProtocolByCondition", params, Integer.class);
		if(count>0){
			return -1;
		}
		protocol.setUpdateBy(Generator.getUsername().toString());
		protocol.setUpdateTime(String.valueOf(System.currentTimeMillis()));
		int result = getBaseDao().insert("ProtocolMapper.updateProtocol", protocol);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public Protocol queryProtocolById(Integer id) {
		return getBaseDao().queryForObject("ProtocolMapper.queryProtocolById", id, Protocol.class);
	}

	@Override
	public Map<String, Object> queryProtocolsByCustomerAndHospitalName(ProtocolQuery query, int firstItem, int pageSize){
		Map<String, Object> params=ConvertUtil.convertBean2Map(query);
		params.put("firstItem", firstItem);
		params.put("pageSize", pageSize);
		List<ProtocolKey> list = getBaseDao().queryForList("ProtocolMapper.queryProtocolsByCustomerAndHospitalName", params, ProtocolKey.class);
		int totalCount=getBaseDao().queryForObject("ProtocolMapper.queryProtocolCountByCustomerAndHospitalName", params,Integer.class);
		return dealWithPageList(list, totalCount);
	}

	@Override
	public Map<String, Object> queryProtocolHistory(Integer id, int firstItem, int pageSize) throws IllegalArgumentException, IllegalAccessException {
		ProtocolQueryKey bean = getBaseDao().queryForObject("ProtocolMapper.queryProtocolKeyInfo", id,ProtocolQueryKey.class);
		if(DataCheckUtil.checkBeanIfNull(bean)){
			Map<String, Object> params=ConvertUtil.convertBean2Map(bean);
			List<ProtocolKey> list =getBaseDao().queryForList("ProtocolMapper.queryRelatedInvalidProtocols", params, ProtocolKey.class);
			int totalCount=getBaseDao().queryForObject("ProtocolMapper.queryRelatedInvalidProtocolCount", params,Integer.class);
			return dealWithPageList(list, totalCount);
		}else{
			return null;
		}
	}
	
	
	
}
