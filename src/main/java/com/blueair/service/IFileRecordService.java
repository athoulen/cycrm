package com.blueair.service;

import java.util.List;
import java.util.Map;

import com.blueair.bean.FileRecord;

public interface IFileRecordService {

	/**
	 * 添加商业公司
	 * @param record
	 * @return
	 */
	public int addFileRecord(FileRecord record);


	/**
	 * 查询文件记录
	 * @return
	 */
	public List<FileRecord> queryFileRecord(Map<String, Object> param);

}
