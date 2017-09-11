package com.blueair.service;

import java.util.List;
import java.util.Map;

import com.blueair.bean.Product;
import com.blueair.web.exception.ServiceException;

public interface IProductService {

	public List<Product> insertProducts(List<Product> products);

	/**
	 * 新增产品
	 * @param product
	 * @return
	 */
	public int insertProduct(Product product);

	/**
	 * 修改产品
	 * @param product
	 * @return
	 */
	public int updateProduct(Product product);

	/**
	 * ID查询产品
	 * @param id
	 * @return
	 */
	public Product queryProductById(Integer id) throws ServiceException;

	/**
	 * 模糊查询产品列表
	 * @param product
	 * @param firstItem
	 * @param pageSize
	 * @return
	 * @throws ServiceException
	 */
	public Map<String, Object> queryForProductsBlur(Product product, int firstItem, int pageSize) throws ServiceException ;

	/**
	 * 级联查询产品列表
	 * @return
	 */
	public List<String> loadProductsManufacture();
}
