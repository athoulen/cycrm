package com.blueair.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.blueair.bean.Merchandiser;
import com.blueair.service.IMerchandiserService;

public class MerchandiserServiceImpl extends BaseServiceImpl implements IMerchandiserService {

	@Override
	public int addMerchandiser(Merchandiser merchan) {
		Map<String, Object> params=new HashMap<>();
		params.put("name", merchan.getName());
		int count=getBaseDao().queryForObject("MerchanMapper.queryDuplicateMerchan", params,Integer.class);
		if(count>0){
			return -1;
		}
		int result = getBaseDao().insert("MerchanMapper.insertMerchan", merchan);
		if(result>0){
			return 1;
		}
		return 0;
	}
	
	@Override
	public boolean updateMerchandiser(Merchandiser merchan) {
		int result = getBaseDao().insert("MerchanMapper.updateMerchan", merchan);
		if(result>0){
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteMerchandiser(Integer id) {
		int result=getBaseDao().delete("MerchanMapper.deleteMerchan", id);
		if(result>0){
			return true;
		}
		return false;
	}

	@Override
	public  Map<String, Object>  queryMerchandisers(String name, String desc,int firstItem,int pageSize) throws Exception {
		Map<String, Object> params=new HashMap<>();
		params.put("name", name);
		params.put("desc", desc);
		params.put("firstItem", firstItem);
		params.put("pageSize", pageSize);
		List<Merchandiser> merchans = getBaseDao().queryForList("MerchanMapper.queryMerchandisers", params, Merchandiser.class);
		int count=getBaseDao().queryForObject("MerchanMapper.queryMerchandisersCount", params, Integer.class);
		return dealWithPageList(merchans, count);
	}

	@Override
	public Merchandiser queryMerchandiser(Integer id) throws Exception{
		return getBaseDao().queryForObject("MerchanMapper.queryMerchandiser", id, Merchandiser.class);
	}
}
