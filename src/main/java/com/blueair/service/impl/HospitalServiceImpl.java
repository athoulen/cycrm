package com.blueair.service.impl;

import java.util.Map;

import com.blueair.bean.Hospital;
import com.blueair.service.IHospitalService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.ConvertUtil;

public class HospitalServiceImpl extends BaseServiceImpl implements IHospitalService {

	@Override
	public int insertHospital(Hospital hospital) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(hospital);
		int count = getBaseDao().queryForObject("HospitalMapper.queryDuplicatedHospCount", params, Integer.class);
		if(count>0){
			return -1;
		}
		params.put("createBy", Generator.getUsername());
		params.put("createTime", System.currentTimeMillis());
		int result = getBaseDao().insert("HospitalMapper.insertHospital", params);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public int updateHospital(Hospital hospital) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(hospital);
		int count = getBaseDao().queryForObject("HospitalMapper.queryDuplicatedHospCount", params, Integer.class);
		if(count>0){
			return -1;
		}
		params.put("updateBy", Generator.getUsername());
		params.put("updateTime", System.currentTimeMillis());
		int result = getBaseDao().insert("HospitalMapper.updateHospital", params);
		if(result>0){
			return 1;
		}
		return 0;
	}

}
