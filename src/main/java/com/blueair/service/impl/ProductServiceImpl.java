package com.blueair.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.blueair.bean.Product;
import com.blueair.constant.HandleCode;
import com.blueair.service.IProductService;
import com.blueair.util.ConvertUtil;
import com.blueair.web.exception.ServiceException;
@Service
public class ProductServiceImpl extends BaseServiceImpl implements IProductService {

	private static final Logger LOG = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Override
	public int insertProduct(Product product) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(product);
		Integer id=getBaseDao().queryForObject("ProductMapper.getProductCountByNameAndId", params,Integer.class);
			if(id==null){
				int result=getBaseDao().insert("ProductMapper.insertProduct", params);
				if(result>0){
					return 1;
				}else{
					return 0;
				}
			}else{
				return -1;
			}
	}
	
	@Override
	public List<Product> insertProducts(List<Product> products) {
		List<Map<String, Object>> params = ConvertUtil.convertBeans2List(products);
		for (Map<String, Object> map : params) {
			Integer id=getBaseDao().queryForObject("ProductMapper.getProductCountByNameAndId", map,Integer.class);
			if(id==null){
				getBaseDao().insert("ProductMapper.insertProduct", map);
			}else{
				map.put("id", id);
			}
		}
		return ConvertUtil.convertList2Beans(params, Product.class);
	}

	@Override
	public int updateProduct(Product product) {
		Map<String, Object> params=ConvertUtil.convertBean2Map(product);
		Integer id=getBaseDao().queryForObject("ProductMapper.getProductIdByName", params,Integer.class);
			if(id==null){
				int result=getBaseDao().insert("ProductMapper.updateProduct", params);
				if(result>0){
					return 1;
				}else{
					return 0;
				}
			}else{
				return -1;
			}
	}

	@Override
	public Product queryProductById(Integer id) throws ServiceException {
		Product product;
		try {
			product = getBaseDao().queryForObject("ProductMapper.queryProductById", id, Product.class);
		} catch (Exception e) {
			throw new ServiceException(HandleCode.SERVER_ERROR,e);
		}
		return product;
	}

	@Override
	public Map<String, Object> queryForProductsBlur(Product product, int firstItem, int pageSize,int flag)
			throws ServiceException {
		Map<String, Object> resultMap=new HashMap<>();
		Map<String, Object> params=ConvertUtil.convertBean2Map(product);
		params.put("firstItem", firstItem);
		params.put("pageSize", pageSize);
		params.put("flag", flag);
		List<Product> products=getBaseDao().queryForList("ProductMapper.queryProductsBlur", params, Product.class);
		Integer totalCount=getBaseDao().queryForObject("ProductMapper.queryProductsCount", params, Integer.class);
		resultMap.put("list", products);
		resultMap.put("totalCount", totalCount);
		return resultMap;
	}

	@Override
	public List<String> loadProductsManufacture() {
		List<String> list = getBaseDao().queryForList("ProductMapper.loadProductsManufacture", null,String.class);
		return list;
	}

	@Override
	public List<Map<String,Object>> queryProductsNameByMaf(String maf) {
		Map<String, Object> params=new HashMap<>();
		params.put("manufacture", maf);
		return getBaseDao().queryForList("ProductMapper.queryProductsNameByMaf", params);
	}

	@Override
	public List<Map<String, Object>> queryProductsByNameAndMaf(String maf, String productName) {
		Map<String, Object> params=new HashMap<>();
		params.put("manufacture", maf);
		params.put("productName", productName);
		return getBaseDao().queryForList("ProductMapper.queryProductsByNameAndMaf", params);
	}

	@Override
	public List<Map<String, Object>> loadProductsCas() {
		return getBaseDao().queryForList("ProductMapper.loadProductsCas", null);
	}

	
	
	
}
