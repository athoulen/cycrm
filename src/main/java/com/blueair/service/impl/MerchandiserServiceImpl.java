package com.blueair.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.Merchandiser;
import com.blueair.bean.MerchandiserKey;
import com.blueair.service.IMerchandiserService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.ConvertUtil;
import com.blueair.util.OperateUtil;
@Service("merchanService")
public class MerchandiserServiceImpl extends BaseServiceImpl implements IMerchandiserService {

	@Override
	public int addMerchandiser(Merchandiser merchan) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(merchan);
		int count=getBaseDao().queryForObject("MerchanMapper.queryDuplicateMerchan", params,Integer.class);
		if(count>0){
			return -1;
		}
		OperateUtil.insertOperatorInfo(params);
		int result = getBaseDao().insert("MerchanMapper.insertMerchan", params);
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
	public  Map<String, Object>  queryMerchandisers(String name, String desc,int firstItem,int pageSize,int flag) throws Exception {
		Map<String, Object> params=new HashMap<>();
		params.put("name", name);
		params.put("desc", desc);
		params.put("flag", flag);
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
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> queryForMerchanMap(){
		return getBaseDao().queryForMap("MerchanMapper.queryForMerchanMap", null, "name", "merchId");
	}

	@Override
	public List<MerchandiserKey> queryUpperMerchandisers() {
		return getBaseDao().queryForList("MerchanMapper.queryUpperMerchandisers", null, MerchandiserKey.class);
	}

	@Override
	public List<MerchandiserKey> queryLowerMerchandisers(Integer id) {
		return getBaseDao().queryForList("MerchanMapper.queryLowerMerchandisers", id, MerchandiserKey.class);
	}
}
