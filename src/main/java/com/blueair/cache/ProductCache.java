package com.blueair.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.blueair.bean.Product;
import com.blueair.service.IProductService;
import com.blueair.util.SpringContextHolder;

public class ProductCache {

	private static Map<String, Object> productMap = null;

	private static IProductService productService = (IProductService) SpringContextHolder.getApplicationContext().getBean("productService");

	public static Map<String, Object> getProductMap() {
		if (productMap == null) {
			setProductMap();
		}
		return productMap;
	}

	public static void setProductMap() {
		List<Product> proList = productService.queryProductList();
		productMap = new HashMap<String, Object>();
		for (Product pro : proList) {
			productMap.put(pro.getProductName().trim() +"-"+pro.getProductNorms().trim()
					/*+ pro.getManufacture().trim()*/, pro);
		}
	}

}
