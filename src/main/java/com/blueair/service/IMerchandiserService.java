package com.blueair.service;

import java.util.Map;

import com.blueair.bean.Merchandiser;

public interface IMerchandiserService {

	/**
	 * 添加商业公司
	 * @param merchan
	 * @return
	 */
	public int addMerchandiser(Merchandiser merchan);

	/**
	 * 修改商业公司
	 * @param merchan
	 * @return
	 */
	public boolean updateMerchandiser(Merchandiser merchan);

	/**
	 * 删除商业公司
	 * @param id
	 * @return
	 */
	public boolean deleteMerchandiser(Integer id);
	
	/**
	 * 模糊查询公司列表
	 * @param name
	 * @param desc
	 * @param pageSize 
	 * @param firstItem 
	 * @return
	 * @throws Exception 
	 */
	public Map<String, Object> queryMerchandisers(String name, String desc, int firstItem, int pageSize) throws Exception;

	/**
	 * 查询公司详情
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Merchandiser queryMerchandiser(Integer id) throws Exception;
}
