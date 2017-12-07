package com.blueair.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.alertbean.StockExpInfo;
import com.blueair.service.IStockService;
import com.blueair.util.JsonUtil;

@RequestMapping("stock")
@RestController
public class StockController extends BaseController {
	@Autowired
	private IStockService stockService;

	@RequestMapping("update/state")
	public ModelMap updateStockState(HttpServletRequest request,String json){
		List<StockExpInfo> stockExpInfos = JsonUtil.convertJson2ListObject(json, StockExpInfo.class);
		if(stockExpInfos!=null&&!stockExpInfos.isEmpty()){
			stockService.updateStockState(stockExpInfos);
		}
		return rightResult(null, "确认状态成功！");
	}
}
