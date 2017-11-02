package com.blueair.service;

import java.util.List;
import java.util.Map;

import com.blueair.bean.Merchandiser;
import com.blueair.bean.MerchandiserKey;

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
	public Map<String, Object> queryMerchandisers(String name, String desc, int firstItem, int pageSize,int flag,String classType) throws Exception;

	/**
	 * 查询公司详情
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Merchandiser queryMerchandiser(Integer id) throws Exception;

	/**
	 * 查询商业公司名称与ID对应Map
	 * @return
	 */
	public Map<String, Object> queryForMerchanMap();

	/**
	 * 查询一级商业公司列表
	 * @return
	 */
	public List<MerchandiserKey> queryUpperMerchandisers();

	/**
	 * 查询二级商业公司列表
	 * @param id
	 * @return
	 */
	public List<MerchandiserKey> queryLowerMerchandisers(Integer id);
}
