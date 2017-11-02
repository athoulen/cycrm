package com.blueair.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.service.IRebateStyleService;
@Service
public class RebateStyleServiceImpl extends BaseServiceImpl implements IRebateStyleService {

	@Override
	public List<Map<String, Object>> queryForRebateStyleList() {
		return getBaseDao().queryForList("RebateStyleMapper.queryForRebateStyleList", null);
	}

}
