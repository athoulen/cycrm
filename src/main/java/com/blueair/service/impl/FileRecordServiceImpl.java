package com.blueair.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.FileRecord;
import com.blueair.service.IFileRecordService;
@Service("fileRecordService")
public class FileRecordServiceImpl extends BaseServiceImpl implements IFileRecordService {

	@Override
	public int addFileRecord(FileRecord record) {
		return getBaseDao().insert("FileRecordMapper.insert", record);
	}

	@Override
	public List<FileRecord> queryFileRecord(Map<String, Object> param) {
		return getBaseDao().queryForList("FileRecordMapper.selectByPrimaryKey", param,FileRecord.class);
	}

	
}
