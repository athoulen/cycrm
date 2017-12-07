package com.blueair.bean;

import java.util.List;

public class ProductBanlance extends Product {

	private Long sum;
	
	private List<ProductBanlance> products;

	public Long getSum() {
		return sum;
	}

	public void setSum(Long sum) {
		this.sum = sum==null?0:sum;
	}

	public List<ProductBanlance> getProducts() {
		return products;
	}

	public void setProducts(List<ProductBanlance> products) {
		this.products = products;
	}
}
