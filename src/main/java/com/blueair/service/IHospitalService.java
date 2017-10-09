package com.blueair.service;

import java.util.Map;

import com.blueair.bean.Hospital;
import com.blueair.bean.HospitalDetail;
import com.blueair.bean.PageListBean;

public interface IHospitalService {

	public int insertHospital(Hospital hospital);

	public int updateHospital(Hospital hospital);

	public HospitalDetail queryHospital(Integer id);
	
	public Map<String, Object> queryHospitalMap();

	public PageListBean queryHospitals(String hospitalName, int page, int pageSize, int flag);
}
