package com.blueair.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.ClinicKey;
import com.blueair.bean.Hospital;
import com.blueair.bean.HospitalDetail;
import com.blueair.bean.PageListBean;
import com.blueair.service.IHospitalService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.ConvertUtil;
@Service("hospitalService")
public class HospitalServiceImpl extends BaseServiceImpl implements IHospitalService {

	@Override
	public int insertHospital(Hospital hospital) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(hospital);
		int count = getBaseDao().queryForObject("HospitalMapper.queryDuplicatedHospCount", params, Integer.class);
		if(count>0){
			return -1;
		}
//		params.put("createBy", Generator.getUsername());
		params.put("createBy", "admin");
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

	@Override
	public HospitalDetail queryHospital(Integer id) {
		return getBaseDao().queryForObject("HospitalMapper.queryHospital", id, HospitalDetail.class);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> queryHospitalMap() {
		return getBaseDao().queryForMap("HospitalMapper.queryHospitalMap", null, "hospitalName", "hospitalId");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public PageListBean queryHospitals(String hospitalName, int page, int pageSize, int flag) {
		Map<String, Object> params=new HashMap<>();
		params.put("hospitalName", hospitalName);
		params.put("firstItem", (page-1)*pageSize);
		params.put("pageSize", pageSize);
		params.put("flag", flag);
		List<Hospital> list = getBaseDao().queryForList("HospitalMapper.queryHospitals", params, Hospital.class);
		Long totalCount=getBaseDao().queryForObject("HospitalMapper.queryHospitalsCount", params, Long.class);
		PageListBean bean=new PageListBean(list, totalCount);
		return bean;
	}

	@Override
	public ClinicKey queryClinics(String clinicName) {
		Map<String, Object> params=new HashMap<>();
		params.put("clinicName", clinicName);
		ClinicKey clinic= getBaseDao().queryForObject("HospitalMapper.queryClinics", params, ClinicKey.class);
		return clinic;
	}

	@Override
	public String queryClinicsById(String acceptUnitId) {
		Map<String, Object> params=new HashMap<>();
		params.put("hospitalId", acceptUnitId);
		String clinic= getBaseDao().queryForObject("HospitalMapper.queryClinicsById", params, String.class);
		return clinic;
	}
}
