package com.blueair.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.Product;
import com.blueair.service.IProductService;
import com.blueair.util.DataCheckUtil;
import com.blueair.util.JsonUtil;
import com.blueair.web.exception.ServiceException;

@RestController
@RequestMapping("product")
public class ProductController extends BaseController {

	@Autowired
	private IProductService productService;
	
	private Logger logger=LoggerFactory.getLogger(ProductController.class);

	/**
	 * 添加产品
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/insert/one")
	public ModelMap insertProduct(HttpServletRequest request, String json) {
		Product product = JsonUtil.convertJson2Object(json, Product.class);
		if (DataCheckUtil.isStringEmpty(product.getProductName())) {
			return errorResult("产品名称不能为空");
		}
		if (DataCheckUtil.isStringEmpty(product.getProductNorms())) {
			return errorResult("产品规格不能为空");
		}
		if (DataCheckUtil.isStringEmpty(product.getManufacture())) {
			return errorResult("产品规格不能为空");
		}
		int result = productService.insertProduct(product);
		switch (result) {
		case 1:
			return rightResult(null, "添加成功！");
		case 0:
			return errorResult("服务故障，未添加成功！");
		case -1:
			return errorResult("产品重复，未添加成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	/**
	 * 修改产品
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/update/one")
	public ModelMap updateProduct(HttpServletRequest request, String json) {
		Product product = JsonUtil.convertJson2Object(json, Product.class);
		if (DataCheckUtil.isIntegerEmpty(product.getId())) {
			return errorResult("产品ID不能为空");
		}
		if (DataCheckUtil.isStringEmpty(product.getProductName())) {
			return errorResult("产品名称不能为空");
		}
		if (DataCheckUtil.isStringEmpty(product.getProductNorms())) {
			return errorResult("产品规格不能为空");
		}
		if (DataCheckUtil.isStringEmpty(product.getManufacture())) {
			return errorResult("产品规格不能为空");
		}
		int result = productService.updateProduct(product);
		switch (result) {
		case 1:
			return rightResult(null, "修改成功！");
		case 0:
			return errorResult("服务故障，未修改成功！");
		case -1:
			return errorResult("产品重复，未修改成功！");
		default:
			return errorResult("未知错误！");
		}
	}
	
	/**
	 * 用ID查询产品
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/query/one/{id:\\d+}")
	public ModelMap queryProductById(HttpServletRequest request, @PathVariable("id") Integer id) {
		if (DataCheckUtil.isIntegerEmpty(id)) {
			return errorResult("产品ID不能为空");
		}
		Product product;
		try {
			product = productService.queryProductById(id);
		} catch (ServiceException e) {
			logger.debug("ID查询产品故障{}",e);
			return errorResult("查询失败！");
		}
		return rightObjectResult(null, "查询成功", "product", product);
	}
	
	/**
	 * 模糊查询产品列表
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/query/list")
	public ModelMap queryForProductsBlur(HttpServletRequest request,Product product,int page,int pageSize){
		if (DataCheckUtil.isStringEmpty(product.getProductName())) {
			product.setProductName("");
		}
		if (DataCheckUtil.isStringEmpty(product.getProductNorms())) {
			product.setProductNorms("");
		}
		if (DataCheckUtil.isStringEmpty(product.getManufacture())) {
			product.setManufacture("");
		}
		int firstItem=(page-1)*pageSize;
		try {
			Map<String, Object> bean=productService.queryForProductsBlur(product,firstItem,pageSize);
			return rightPageListResult(null, "查询成功！", "products", bean);
		} catch (ServiceException e) {
			logger.debug("产品列表模糊查询故障{}",e);
			return errorResult("查询失败！");
		}
	}
	
	/**
	 * 查询生成厂家列表
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/query/maf")
	public ModelMap loadProductsMaf(HttpServletRequest request){
		List<String> list=productService.loadProductsManufacture();
		return rightObjectResult(null, "查询成功！", "products", list);
	}
	
	/**
	 * 通过生产厂家查询药品名称
	 * @param request
	 * @param json
	 * @return
	 */
	@RequestMapping("/query/prodName")
	public ModelMap loadProductsName(HttpServletRequest request,String maf){
		List<String> list=productService.loadProductsManufacture();
		return rightObjectResult(null, "查询成功！", "products", list);
	}
	
	
}
